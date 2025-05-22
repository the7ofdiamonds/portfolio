export class RepoSize {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  display(): string {
    if (this.amount < 1024) return `${this.amount.toFixed(2)} KB`;
    const mb = this.amount / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }
}