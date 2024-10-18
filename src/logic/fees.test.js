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
});