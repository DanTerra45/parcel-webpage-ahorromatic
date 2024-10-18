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

  it('should validate correctly that what we previously introduced is fine (income)', () => {
    expect(income.validate()).toBe(true);
  });

  it('should validate correctly that the description at least have some characters on it', () => {
    const invalid_income_1 = new Income('', 2000, '2024-10-23');
    expect(invalid_income_1.validate()).toBe(false);
  });

  it('should validate correctly that atleast the value must be greater than 0', () => {
    const invalid_income_2 = new Income('Salario', 0, '2024-10-23');
    expect(invalid_income_2.validate()).toBe(false);
  });

  it('should validate correctly that never the value is below 0', () => {
    const invalid_income_3 = new Income('Salario', -100, '2024-10-23');
    expect(invalid_income_3.validate()).toBe(false);
  });

  it('should validate correctly that the date is valid and never setted in the future', () => {
    const invalid_income_4 = new Income('Salario', 50, '');
    expect(invalid_income_4.validate()).toBe(false);
  });
});