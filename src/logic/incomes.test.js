import { Income } from '../logic/incomes';
import { calculate_total_incomes } from '../logic/incomes';

describe('Income Class', () => {
  let test_income;
  beforeEach(() => {
    test_income = new Income('Salario', 2000, '2024-10-23');
  });
  describe('Income Creation', () => {
    it('should create an income instance with correct properties', () => {
      expect(test_income.description).toBe('Salario');
      expect(test_income.amount).toBe(2000);
      expect(test_income.date).toBe('2024-10-23');
      expect(test_income.type).toBe('income');
    });
  });
  describe('Income Validation', () => {
    it('should validate a correctly formed income', () => {
      expect(test_income.validate()).toBe(true);
    });
    it('should reject empty description', () => {
      const income_with_empty_description = new Income('', 2000, '2024-10-23');
      expect(income_with_empty_description.validate()).toBe("");
    });
    it('should reject zero amount', () => {
      const income_with_zero_amount = new Income('Salario', 0, '2024-10-23');
      expect(income_with_zero_amount.validate()).toBe(false);
    });
    it('should reject negative amount', () => {
      const income_with_negative_amount = new Income('Salario', -100, '2024-10-23');
      expect(income_with_negative_amount.validate()).toBe(false);
    });
    it('should reject invalid date', () => {
      const income_with_invalid_date = new Income('Salario', 2000, '');
      expect(income_with_invalid_date.validate()).toBe(false);
    });
  });
  describe('Income Calculations', () => {
    describe('calculate_total_incomes', () => {
      it('should return zero for empty income list', () => {
        expect(calculate_total_incomes([])).toBe(0);
      });
      it('should correctly sum multiple incomes', () => {
        const test_incomes = [
          { amount: 100 },
          { amount: 200 },
          { amount: 300 }
        ];
        expect(calculate_total_incomes(test_incomes)).toBe(600);
      });
      it('should handle negative amounts in calculation', () => {
        const test_incomes = [
          { amount: 100 },
          { amount: -50 }
        ];
        expect(calculate_total_incomes(test_incomes)).toBe(50);
      });
    });
  });
});