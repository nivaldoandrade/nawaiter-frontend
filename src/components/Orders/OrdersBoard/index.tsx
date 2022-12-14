import { Order } from '../../../types/Order';

import { Board } from './styles';

interface OrdersBoardProps {
	icon: string;
	title: string;
	orders: Order[];
	handleOpenOrderModal: (params: handleOpenOrderModalParams) => void;
}

interface handleOpenOrderModalParams {
	order: Order;
	iconStatus: string;
	titleStatus: string;
}

export function OrdersBoard({
	icon,
	title,
	orders,
	handleOpenOrderModal
}: OrdersBoardProps) {
	return (
		<Board>
			<header>
				<i>{icon}</i>
				<strong>{title}</strong>
				<span>{`(${orders.length})`}</span>
			</header>
			{orders.length > 0 && (
				<main>
					{orders.map((order) => (
						<button
							key={order._id}
							type="button"
							onClick={() =>
								handleOpenOrderModal({
									order,
									iconStatus: icon,
									titleStatus: title
								})
							}
						>
							<strong>Mesa {order.table}</strong>
							<span>
								{order.products.length}
								{order.products.length === 1 ? ' item' : ' itens'}
							</span>
						</button>
					))}
				</main>
			)}
		</Board>
	);
}
