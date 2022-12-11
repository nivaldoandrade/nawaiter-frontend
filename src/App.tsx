import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/default';

import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>Hello World!</h1>
    </ThemeProvider>
  );
}
