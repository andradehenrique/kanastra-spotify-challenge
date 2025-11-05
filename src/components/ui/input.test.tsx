import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

// Teste de componente real: Input

describe('Input component', () => {
  it('renderiza com placeholder e valor', () => {
    render(<Input placeholder="Digite algo" defaultValue="abc" />);
    const input = screen.getByPlaceholderText('Digite algo') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('abc');
  });

  it('dispara evento de mudança de valor', async () => {
    render(<Input placeholder="Nome" />);
    const input = screen.getByPlaceholderText('Nome') as HTMLInputElement;
    await userEvent.type(input, 'Henrique');
    expect(input.value).toBe('Henrique');
  });

  it('aplica classe customizada', () => {
    render(<Input data-testid="custom-input" className="bg-red-500" />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveClass('bg-red-500');
  });

  it('fica desabilitado quando prop disabled', () => {
    render(<Input placeholder="Desabilitado" disabled />);
    const input = screen.getByPlaceholderText('Desabilitado');
    expect(input).toBeDisabled();
  });
});
