# NexusAI - SaaS Plataforma Premium 🚀 PARA ESTUDO!!!

O **NexusAI** é uma plataforma SaaS completa de Inteligência Artificial desenvolvida com as mais modernas práticas de Engenharia de Software. O projeto foi construído do zero, combinando uma interface visual Premium (UI/UX) com uma arquitetura Full-Stack robusta, segura e escalável, pronta para ambientes corporativos (Enterprise).

## 🌟 Principais Funcionalidades

- **Painel do Usuário (App)**: Dashboard interativo com ferramentas de IA generativas, separadas por nível de plano (Free vs Pro).
- **Gerador Nexus**: Integração com IA para geração de textos e códigos, atrelada a banco de dados para salvar histórico de prompts (MongoDB).
- **Gestão de Assinaturas Self-Service**: Usuários podem alterar perfil, cancelar planos e deletar conta diretamente pelo painel interativo.
- **Integração de Pagamentos Bidirecional**: Checkout simulado avançado (Cartão, PIX, Boleto) sincronizado com o banco de dados (MongoDB) para ativação de serviços em tempo real.
- **Painel de Administração (Dashboard)**: Controle total sobre métricas, leads, planos de assinatura e transações em tempo real.
- **Design Premium & Glassmorphism**: UI ultra-moderna construída com Tailwind CSS, focada em alta conversão.

## 🛡️ Padrão Ouro de Segurança (Stealth Mode)

O projeto foi blindado com **medidas essenciais de segurança** que o tornam invisível para hackers e scanners automatizados:

1. **Stealth Proxy (Modo Furtivo)**: O `middleware.ts` intercepta requisições não autenticadas para rotas sensíveis (`/admin`, `/app`) e as reescreve como erro 404 (Not Found), escondendo a arquitetura do servidor.
2. **Anti-Bot Edge Blocking**: Bloqueio ativo de User-Agents maliciosos (Nmap, Sqlmap, Gobuster, etc.) diretamente no Edge Runtime (Status 403).
3. **Strict Security Headers & CSP**: Regras estritas de onde os scripts podem rodar, prevenindo ataques XSS, Clickjacking e forçando conexões HTTPS.
4. **Rate Limiting Global**: Proteção contra ataques de negação de serviço (DDoS) e Força Bruta (Brute-Force) limitando o consumo excessivo das APIs de IA e Autenticação.
5. **Prevenção de NoSQL Injection**: Consultas tipadas e seguras usando Mongoose com schemas rigorosamente validados via Zod.
6. **Middleware Anti-CSRF**: Proteção de mutações (POST/PUT/DELETE) garantindo que apenas requisições da mesma origem (Same-Origin) sejam processadas.

## 🛠️ Stack Tecnológica

- **Framework**: Next.js (App Router, Server Components & Server Actions)
- **Database**: MongoDB (via Mongoose + MongoDB Adapter)
- **Autenticação**: NextAuth v5 (Autenticação JWT, Credenciais e Google Auth)
- **Styling**: Tailwind CSS + Lucide React (Ícones)
- **Validação de Dados**: Zod (End-to-end type safety)
- **Arquitetura**: Full-Stack Serverless + Edge Functions

## 💡 Como Executar Localmente

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env.local` com as variáveis necessárias (MongoDB URI, Auth Secret, etc).
4. Execute o servidor de desenvolvimento com `npm run dev`.
5. Acesse `http://localhost:3000`.

---
*Projeto desenvolvido para fins de estudo e demonstração de arquitetura de software avançada com AI.
