export interface User {
  id: string;
  email: string;
  balance: number;
  role: 'USER' | 'ADMIN';
}

export interface Bet {
  id: string;
  userId: string;
  oddId: string;
  amount: number;
  status: 'PENDING' | 'WON' | 'LOST' | 'REFUNDED';
}
