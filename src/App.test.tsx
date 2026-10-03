import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import App from './App';
it('saves a favorite and shows it in the favorites page', async () => {
  location.hash = 'explore';
  render(<App />);
  const user = userEvent.setup();
  await user.click(
    screen.getByRole('button', {
      name: 'Adicionar Sony Alpha A7 IV aos favoritos',
    }),
  );
  await user.click(screen.getByRole('link', { name: 'Meus favoritos' }));
  expect(
    await screen.findByRole('heading', { name: 'Sony Alpha A7 IV' }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Canon EOS R6' }),
  ).not.toBeInTheDocument();
});
it('completes and cancels a demo booking', async () => {
  location.hash = 'explore';
  render(<App />);
  const user = userEvent.setup();
  await user.click(
    screen.getByRole('button', { name: 'Reservar Sony Alpha A7 IV' }),
  );
  await user.click(
    screen.getByRole('button', { name: 'Confirmar reserva demonstrativa' }),
  );
  expect(await screen.findByText('Confirmada')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Cancelar reserva' }));
  expect(screen.getByText('Cancelada')).toBeInTheDocument();
});
