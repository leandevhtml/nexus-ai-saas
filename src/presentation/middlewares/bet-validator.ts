import { NextRequest, NextResponse } from 'next/server';
// Nota: Em Next.js App Router, middlewares de API podem ser implementados como helpers
// ou dentro do arquivo middleware.ts. Aqui criamos um helper de validação.

/**
 * Valida a colocação de uma aposta.
 * Verifica saldo, status da odd e limites de risco.
 */
export async function validateBet(userId: string, oddId: string, amount: number) {
  // Simulação de lógica que seria executada no servidor/API
  // Em uma implementação real, usaríamos o Prisma Client com transações.
  
  if (amount <= 0) {
    return { valid: false, error: 'O valor da aposta deve ser maior que zero.' };
  }

  // Lógica de Negócio (Exemplo):
  // 1. Buscar usuário e odd no banco (via transação FOR UPDATE)
  // 2. Verificar se balance >= amount
  // 3. Verificar se odd.isActive === true
  // 4. Verificar se event.status está entre (LIVE, SCHEDULED)
  
  return { valid: true };
}
