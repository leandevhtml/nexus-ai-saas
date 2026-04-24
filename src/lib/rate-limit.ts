import { NextResponse } from 'next/server';

const ipCache = new Map<string, { count: number; startTime: number }>();

/**
 * Rate Limiter simples baseado em memória para proteção de APIs.
 * @param ip Endereço IP do solicitante
 * @param limit Limite de requisições
 * @param windowMs Janela de tempo em milissegundos
 */
export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const entry = ipCache.get(ip);

  if (!entry) {
    ipCache.set(ip, { count: 1, startTime: now });
    return { success: true };
  }

  // Reset se a janela de tempo passou desde o PRIMEIRO pedido
  if (now - entry.startTime > windowMs) {
    entry.count = 1;
    entry.startTime = now;
    return { success: true };
  }

  if (entry.count >= limit) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}
