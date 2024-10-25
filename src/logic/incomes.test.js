import { Income } from '../logic/incomes';
import { calculate_total_incomes } from '../logic/incomes';

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

  describe('calculate_total_incomes', () => {
    it('debería devolver 0 si no hay ingresos', () => {
      expect(calculate_total_incomes([])).toBe(0);
    });

    it('debería sumar los ingresos correctamente', () => {
      const incomes = [{ amount: 100 }, { amount: 200 }, { amount: 300 }];
      expect(calculate_total_incomes(incomes)).toBe(600);
    });

    it('debería manejar ingresos negativos', () => {
      const incomes = [{ amount: 100 }, { amount: -50 }];
      expect(calculate_total_incomes(incomes)).toBe(50);
    });
  });
});