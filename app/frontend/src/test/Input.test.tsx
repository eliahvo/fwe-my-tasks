import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { Input } from '../components/Input';

describe('Input', () => {
  it('does render', () => {
    render(
      <ThemeProvider theme={theme}>
        <Input label="Email" />
      </ThemeProvider>,
    );
  });

  it('Label and input are connected', async () => {
    const { findByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Input label="Email" />
      </ThemeProvider>,
    );

    const input = (await findByLabelText('Email')) as HTMLInputElement;

    expect(input.type).toBe('text');
    expect(input.tagName).toBe('INPUT');
  });

  it('can type into input', async () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Input label="Email" />
      </ThemeProvider>,
    );

    const input = getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

});
