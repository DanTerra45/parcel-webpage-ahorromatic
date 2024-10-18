import { Income } from '../logic/incomes';

describe('Income Class', () => {
  let income;

  beforeEach(() => {
    income = new Income('Salario', 2000, '2024-10-23');
  });

  it('should create an income instance correctly', () => {
    expect(income.description).toBe('Salario');
    expect(income.amount).toBe(2000);
    expect(income.date).toBe('2024-10-23');
    expect(income.type).toBe('income');
  });
});