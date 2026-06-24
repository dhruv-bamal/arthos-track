export type Category =
  | "Food"
  | "Transport"
  | "Subscriptions"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Transaction {
  id: number;
  amount: number;
  merchant: string;
  date: string; // ISO format: YYYY-MM-DD
}

export type CategoryTotals = {
  [key in Category]: number;
};

export interface RecurringSubscription {
  merchant: string;
  amount: number;
  count: number;
}
