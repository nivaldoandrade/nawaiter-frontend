import { Order } from '../../../types/Order';
import { Container } from './styles';

type CompleteButtonProps = Pick<Order, 'status'>;

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

export function CompleteButton({ status }: CompleteButtonProps) {
	return (
		<Container type="button">
			<i>{statusOrder[status].icon}</i>
			<strong>{statusOrder[status].title}</strong>
		</Container>
	);
}
