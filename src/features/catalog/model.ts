import { z } from 'zod';
export type Gear = {
  id: string;
  name: string;
  category: 'Câmeras' | 'Lentes' | 'Iluminação' | 'Áudio';
  price: number;
  rating: number;
  owner: string;
  specs: string[];
  color: string;
};
export const catalog: Gear[] = [
  {
    id: 'sony',
    name: 'Sony Alpha A7 IV',
    category: 'Câmeras',
    price: 28000,
    rating: 4.9,
    owner: 'Estúdio Aurora',
    specs: ['Full-frame 33 MP', 'Vídeo 4K 60p', 'Lente 28–70 mm inclusa'],
    color: '#dce5e1',
  },
  {
    id: 'canon',
    name: 'Canon EOS R6',
    category: 'Câmeras',
    price: 25000,
    rating: 4.8,
    owner: 'Coletivo Norte',
    specs: [
      'Full-frame 20 MP',
      'Estabilização no corpo',
      '2 baterias inclusas',
    ],
    color: '#e9e0d8',
  },
  {
    id: 'sigma',
    name: 'Sigma 24–70 mm',
    category: 'Lentes',
    price: 14000,
    rating: 4.9,
    owner: 'Vista Criativa',
    specs: ['Abertura f/2.8', 'Montagem Sony E', 'Case de transporte'],
    color: '#e4e0ed',
  },
  {
    id: 'aputure',
    name: 'Aputure 120d II',
    category: 'Iluminação',
    price: 18000,
    rating: 4.9,
    owner: 'Studio Prisma',
    specs: ['LED daylight', 'Softbox incluso', 'Tripé de iluminação'],
    color: '#ece5cd',
  },
  {
    id: 'rode',
    name: 'RØDE Wireless GO',
    category: 'Áudio',
    price: 9000,
    rating: 4.7,
    owner: 'Estúdio Aurora',
    specs: ['2 transmissores', 'Microfones de lapela', 'Estojo de recarga'],
    color: '#d9e6e9',
  },
  {
    id: 'fuji',
    name: 'Fujifilm X-T5',
    category: 'Câmeras',
    price: 22000,
    rating: 4.8,
    owner: 'Oficina Raiz',
    specs: ['APS-C 40 MP', 'Simulações de filme', 'Lente 18–55 mm'],
    color: '#e2e6d9',
  },
  {
    id: 'prime',
    name: 'Sony FE 85 mm',
    category: 'Lentes',
    price: 11000,
    rating: 4.9,
    owner: 'Vista Criativa',
    specs: ['Abertura f/1.8', 'Foco automático', 'Ideal para retratos'],
    color: '#e6deda',
  },
  {
    id: 'godox',
    name: 'Godox SL60W',
    category: 'Iluminação',
    price: 8000,
    rating: 4.6,
    owner: 'Coletivo Norte',
    specs: ['LED de 60 W', 'Temperatura 5600 K', 'Controle remoto'],
    color: '#dce1e9',
  },
];
export const reservationSchema = z.object({
  id: z.string(),
  gearId: z.string(),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  total: z.number().nonnegative(),
  status: z.enum(['Confirmada', 'Cancelada']),
});
export const reservationsSchema = z.array(reservationSchema);
export type Reservation = z.infer<typeof reservationSchema>;
export const emptyReservations: Reservation[] = [];
export const favoritesSchema = z.array(z.string());
export const emptyFavorites: string[] = [];
function day(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const stamp = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(stamp) &&
    new Date(stamp).toISOString().slice(0, 10) === value
    ? stamp
    : NaN;
}
/** Inclusive calendar-day billing. UTC arithmetic avoids DST drift. */
export function quote(price: number, start: string, end: string) {
  const duration = (day(end) - day(start)) / 86400000 + 1;
  if (!Number.isInteger(duration) || duration < 1 || duration > 30)
    throw new Error(
      'Escolha um período de 1 a 30 dias, com a devolução após a retirada.',
    );
  const subtotal = duration * price;
  const fee = Math.round(subtotal * 0.08);
  return { days: duration, subtotal, fee, total: subtotal + fee };
}
export function reserve(
  gear: Gear,
  start: string,
  end: string,
  existing: Reservation[],
  now: string,
  id: string,
): Reservation {
  const cost = quote(gear.price, start, end);
  if (start < now) throw new Error('A retirada não pode ser anterior a hoje.');
  if (
    existing.some(
      (r) =>
        r.gearId === gear.id &&
        r.status === 'Confirmada' &&
        start <= r.end &&
        end >= r.start,
    )
  )
    throw new Error(
      'Este equipamento já está reservado nesse período. Escolha outras datas.',
    );
  return {
    id,
    gearId: gear.id,
    start,
    end,
    total: cost.total,
    status: 'Confirmada',
  };
}
