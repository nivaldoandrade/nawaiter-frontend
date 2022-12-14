export function formatPrice(price: number) {
	return new Intl.NumberFormat('BRL', {
		style: 'currency',
		currency: 'BRL'
	}).format(price);
}
