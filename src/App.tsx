import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/default';

import { Header } from './components/Header';

import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Orders />
			<GlobalStyles />
		</ThemeProvider>
	);
}
