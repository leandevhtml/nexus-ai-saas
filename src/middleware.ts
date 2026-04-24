import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de User-Agents comuns em bots e scanners maliciosos
const BLOCKED_USER_AGENTS = [
  'nmap', 'sqlmap', 'curl', 'wget', 'python-requests', 'postmanruntime', 'nikto', 'dirb', 'gobuster'
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  
  // 1. Bloqueio de Scanners e Bots Maliciosos (Proteção Anti-Hacker)
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = BLOCKED_USER_AGENTS.some(bot => userAgent.includes(bot));
  
  if (isBot && !url.pathname.startsWith('/api/webhooks')) {
    // Retorna 403 Forbidden vazio para não dar dicas ao hacker
    return new NextResponse(null, { status: 403 });
  }

  // 2. Modo Furtivo (Stealth Mode) para rotas protegidas
  // Se alguém tentar acessar o Admin ou App sem estar logado, dizemos que a página não existe (404) 
  // ao invés de redirecionar para o login. Isso torna a rota "invisível" para scanners.
  const isProtectedPath = url.pathname.startsWith('/admin') || url.pathname.startsWith('/app');
  
  if (isProtectedPath) {
    // Verifica a presença do token de sessão (nome varia em prod vs dev)
    const hasSessionToken = request.cookies.has('authjs.session-token') || 
                            request.cookies.has('__Secure-authjs.session-token') ||
                            request.cookies.has('next-auth.session-token') ||
                            request.cookies.has('__Secure-next-auth.session-token');
                            
    if (!hasSessionToken) {
      // Oculta a existência da rota retornando um 404 real do Next.js
      return new NextResponse(null, { status: 404 });
    }
  }

  // 3. Prevenção Básica de CSRF para requisições POST/PUT/DELETE/PATCH
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // Bloquear requisições cross-origin não autorizadas para rotas sensíveis
    if (origin && host && !origin.includes(host)) {
      if (!url.pathname.startsWith('/api/webhooks')) {
        return new NextResponse(
          JSON.stringify({ error: "Acesso Restrito: Política de Segurança" }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  // 4. Controle de Cache e Headers Seguros no nível do Edge
  response.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
