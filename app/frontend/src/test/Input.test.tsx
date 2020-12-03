import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { Input } from '../components/Input';

describe('Input', () => {
  it('does render', () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <Input label="Email" />
      </ThemeProvider>,
    );
    debug();
  });
});
