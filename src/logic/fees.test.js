import { Fee } from '../logic/fees';

describe('Fee Class', () => {
  let fee;

  beforeEach(() => {
    fee = new Fee('Alquiler', 800, '2024-10-23', 'servicios');
  });

  it('should create a fee instance correctly', () => {
    expect(fee.description).toBe('Alquiler');
    expect(fee.amount).toBe(800);
    expect(fee.date).toBe('2024-10-23');
    expect(fee.category).toBe('servicios');
    expect(fee.type).toBe('fee');
  });

  it('should validate correctly that what we previously introduced is fine (fee)', () => {
    expect(fee.validate()).toBe(true);
  });

  it('should validate correctly that the description at least have some characters on it', () => {
    const invalid_fee_1 = new Fee('', 800, '2024-10-23', 'servicios');
    expect(invalid_fee_1.validate()).toBe(false);
  });

  it('should validate correctly that atleast the value must be greater than 0', () => {
    const invalid_fee_2 = new Fee('Alquiler', 0, '2024-10-23', 'servicios');
    expect(invalid_fee_2.validate()).toBe(false);
  });
});