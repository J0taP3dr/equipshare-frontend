import { describe, it, expect } from 'vitest';
import { catalog, quote, reserve } from './model';
describe('rental rules', () => {
  it('bills inclusive dates and rounds service fee in cents', () => {
    expect(quote(10001, '2026-10-10', '2026-10-11')).toEqual({
      days: 2,
      subtotal: 20002,
      fee: 1600,
      total: 21602,
    });
  });
  it('rejects invalid dates and periods over 30 days', () => {
    expect(() => quote(100, '2026-02-30', '2026-03-02')).toThrow();
    expect(() => quote(100, '2026-10-20', '2026-10-10')).toThrow();
    expect(() => quote(100, '2026-10-01', '2026-11-01')).toThrow();
  });
  it('rejects past bookings', () => {
    expect(() =>
      reserve(catalog[0], '2026-01-01', '2026-01-02', [], '2026-10-01', 'a'),
    ).toThrow(/anterior/);
  });
  it('blocks overlaps including boundary day but allows cancelled reservations', () => {
    const r = reserve(
      catalog[0],
      '2026-10-10',
      '2026-10-12',
      [],
      '2026-10-01',
      'a',
    );
    expect(() =>
      reserve(catalog[0], '2026-10-12', '2026-10-13', [r], '2026-10-01', 'b'),
    ).toThrow(/reservado/);
    expect(
      reserve(
        catalog[0],
        '2026-10-12',
        '2026-10-13',
        [{ ...r, status: 'Cancelada' }],
        '2026-10-01',
        'b',
      ).status,
    ).toBe('Confirmada');
  });
});
