import { Fee } from '../logic/fees';
import { calculate_total_fees } from '../logic/fees';

describe('Fee Class', () => {
  let test_fee;
  beforeEach(() => {
    test_fee = new Fee('Alquiler', 800, '2024-10-23', 'servicios');
  });
  describe('Fee Creation', () => {
    it('should create a fee instance with correct properties', () => {
      expect(test_fee.description).toBe('Alquiler');
      expect(test_fee.amount).toBe(800);
      expect(test_fee.date).toBe('2024-10-23');
      expect(test_fee.category).toBe('servicios');
      expect(test_fee.type).toBe('fee');
    });
  });
  describe('Fee Validation', () => {
    it('should validate a correctly formed fee', () => {
      expect(test_fee.validate()).toBe(true);
    });
    it('should reject empty description', () => {
      const fee_with_empty_description = new Fee('', 800, '2024-10-23', 'servicios');
      expect(fee_with_empty_description.validate()).toBe("");
    });
    it('should reject zero amount', () => {
      const fee_with_zero_amount = new Fee('Alquiler', 0, '2024-10-23', 'servicios');
      expect(fee_with_zero_amount.validate()).toBe(false);
    });
    it('should reject negative amount', () => {
      const fee_with_negative_amount = new Fee('Alquiler', -50, '2024-10-23', 'servicios');
      expect(fee_with_negative_amount.validate()).toBe(false);
    });
    it('should reject invalid date', () => {
      const fee_with_invalid_date = new Fee('Alquiler', 800, '', 'servicios');
      expect(fee_with_invalid_date.validate()).toBe(false);
    });
    it('should reject empty category', () => {
      const fee_with_empty_category = new Fee('Alquiler', 800, '2024-10-23', '');
      expect(fee_with_empty_category.validate()).toBe("");
    });
  });
  describe('Fee Calculations', () => {
    describe('calculate_total_fees', () => {
      it('should return zero for empty fee list', () => {
        expect(calculate_total_fees([])).toBe(0);
      });
      it('should correctly sum multiple fees', () => {
        const test_fees = [
          { amount: 100 },
          { amount: 200 },
          { amount: 300 }
        ];
        expect(calculate_total_fees(test_fees)).toBe(600);
      });
      it('should handle negative amounts in calculation', () => {
        const test_fees = [
          { amount: 100 },
          { amount: -50 }
        ];
        expect(calculate_total_fees(test_fees)).toBe(50);
      });
    });
  });
});