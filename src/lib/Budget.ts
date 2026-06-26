export class Budget {
  private limit: number;
  private spent: number;

  constructor(limit: number, spent: number) {
    this.limit = limit;
    this.spent = spent;
  }

  remaining(): number {
    return this.limit - this.spent;
  }

  percentUsed(): number {
    if (this.limit <= 0) return 0;
    return (this.spent / this.limit) * 100;
  }

  isOverBudget(): boolean {
    return this.spent > this.limit;
  }

  overspendBy(): number {
    return Math.max(0, this.spent - this.limit);
  }
}
