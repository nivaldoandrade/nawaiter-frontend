import { Order } from '../../../types/Order';
import { Container } from './styles';

// type CompleteButtonProps = ;

interface CompleteButtonProps
	extends Pick<Order, 'status'>,
		React.ButtonHTMLAttributes<HTMLButtonElement> {}

const statusOrder = {
	WAITING: {
		icon: '👩‍🍳',
		title: 'Iniciar Produção'
	},
	IN_PRODUCTION: {
		icon: '✅',
		title: 'Concluir Pedido'
	},
	DONE: {
		icon: '🙉',
		title: 'Pedido Entregue'
	}
};

export function CompleteButton({ status, ...rest }: CompleteButtonProps) {
	return (
		<Container {...rest} type="button">
			<i>{statusOrder[status].icon}</i>
			<strong>{statusOrder[status].title}</strong>
		</Container>
	);
}
