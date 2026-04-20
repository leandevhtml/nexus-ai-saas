import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(apiKey, {
  apiVersion: '2025-01-27-ac' as any, // Ignorando erro de tipagem caso a versão mude
  typescript: true,
});
