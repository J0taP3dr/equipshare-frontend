import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { money, today } from '../../lib/format';
import { quote, reserve, type Gear, type Reservation } from './model';
import { GearArt } from './GearArt';
export function Booking({
  gear,
  reservations,
  onSave,
  onClose,
}: {
  gear: Gear;
  reservations: Reservation[];
  onSave: (r: Reservation) => void;
  onClose: () => void;
}) {
  const [start, setStart] = useState(today());
  const [end, setEnd] = useState(today());
  const [error, setError] = useState('');
  let estimate: ReturnType<typeof quote> | undefined;
  try {
    estimate = quote(gear.price, start, end);
  } catch {
    /* Validation appears in the form. */
  }
  return (
    <Modal title="Planeje sua próxima criação" onClose={onClose}>
      <div className="booking-product">
        <GearArt gear={gear} />
        <div>
          <span className="eyebrow">{gear.category}</span>
          <h3>{gear.name}</h3>
          <p>{money(gear.price)} / dia</p>
        </div>
      </div>
      <ul className="spec-list">
        {gear.specs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const r = reserve(
              gear,
              start,
              end,
              reservations,
              today(),
              crypto.randomUUID(),
            );
            onSave(r);
          } catch (err) {
            setError((err as Error).message);
          }
        }}
      >
        <div className="form-row">
          <label className="field">
            Retirada
            <input
              type="date"
              value={start}
              min={today()}
              required
              onChange={(e) => {
                setStart(e.target.value);
                setError('');
              }}
            />
          </label>
          <label className="field">
            Devolução
            <input
              type="date"
              value={end}
              min={start}
              required
              onChange={(e) => {
                setEnd(e.target.value);
                setError('');
              }}
            />
          </label>
        </div>
        {estimate ? (
          <div className="quote">
            <div>
              <span>{estimate.days} diária(s)</span>
              <strong>{money(estimate.subtotal)}</strong>
            </div>
            <div>
              <span>Taxa de serviço (8%)</span>
              <strong>{money(estimate.fee)}</strong>
            </div>
            <div className="quote-total">
              <span>Total demonstrativo</span>
              <strong>{money(estimate.total)}</strong>
            </div>
          </div>
        ) : (
          <p className="error">Selecione um período válido de até 30 dias.</p>
        )}
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <p className="demo-disclaimer">
          Reserva de demonstração. Nenhuma cobrança, contrato ou contato com
          fornecedores será realizado.
        </p>
        <button className="primary" disabled={!estimate}>
          Confirmar reserva demonstrativa
        </button>
      </form>
    </Modal>
  );
}
