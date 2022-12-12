import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/default';

import { Header } from './components/Header';

import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<GlobalStyles />
		</ThemeProvider>
	);
}
