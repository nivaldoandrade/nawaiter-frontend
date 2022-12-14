import { useCallback, useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from './OrderModal';
import { OrdersBoard } from './OrdersBoard';

import { ordersArray } from '../../data';

import { Container } from './styles';

// const ordersArray: Order[] = [
// 	{
// 		_id: '6391f86a7e8597d71c7351ac',
// 		table: '1',
// 		status: 'WAITING',
// 		products: [
// 			{
// 				product: {
// 					name: 'Pizza 4 queijos',
// 					imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
// 					price: 40
// 				},
// 				quantity: 1,
// 				_id: '63950f38c01ff34dfdf01c81'
// 			},
// 			{
// 				product: {
// 					name: 'Pizza de 3 queijos',
// 					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
// 					price: 40
// 				},
// 				quantity: 2,
// 				_id: '63950f38c01ff34dfdf01c82'
// 			}
// 		]
// 	},
// 	{
// 		_id: '63951dc022e658e1a5a1f5d2',
// 		table: '2',
// 		status: 'IN_PRODUCTION',
// 		products: [
// 			// {
// 			// 	product: {
// 			// 		name: 'Pizza 4 queijos',
// 			// 		imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
// 			// 		price: 40
// 			// 	},
// 			// 	quantity: 1,
// 			// 	_id: '63951dc022e658e1a5a1f5d3'
// 			// },
// 			{
// 				product: {
// 					name: 'Pizza de 3 queijos',
// 					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
// 					price: 40
// 				},
// 				quantity: 3,
// 				_id: '63951dc022e658e1a5a1f5d4'
// 			}
// 		]
// 	},
// 	{
// 		_id: '63951ef4ea9b907230ca6f7f',
// 		table: '3',
// 		status: 'DONE',
// 		products: [
// 			{
// 				product: {
// 					name: 'Pizza 4 queijos',
// 					imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
// 					price: 40
// 				},
// 				quantity: 1,
// 				_id: '63951ef4ea9b907230ca6f80'
// 			},
// 			{
// 				product: {
// 					name: 'Pizza de 3 queijos',
// 					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
// 					price: 40
// 				},
// 				quantity: 3,
// 				_id: '63951ef4ea9b907230ca6f81'
// 			}
// 		]
// 	}
// ];

interface handleOpenOrderModalParams {
	order: Order;
	iconStatus: string;
	titleStatus: string;
}

export function Orders() {
	const [orders, setOrders] = useState<Order[]>();
	const [ordersWaiting, setOrdersWaiting] = useState<Order[]>([]);
	const [ordersInProduction, setOrdersInProduction] = useState<Order[]>([]);
	const [ordersDone, setOrdersDone] = useState<Order[]>([]);
	const [isVisibleOrderModal, setIsVisibleOrderModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
	const [iconStatus, setIconStatus] = useState('');
	const [titleStatus, setTitleStatus] = useState('');

	useEffect(() => {
		setOrders(ordersArray);
		setOrdersWaiting([]);
		setOrdersInProduction([]);
		setOrdersDone([]);
	}, []);

	useEffect(() => {
		orders?.forEach((order) => {
			order.status === 'WAITING' &&
				setOrdersWaiting((state) => [...state, order]);
			order.status === 'IN_PRODUCTION' &&
				setOrdersInProduction((state) => [...state, order]);
			order.status === 'IN_PRODUCTION' &&
				setOrdersDone((state) => [...state, order]);
		});
	}, [orders]);

	const handleOpenOrderModal = useCallback(
		({ order, iconStatus, titleStatus }: handleOpenOrderModalParams) => {
			setSelectedOrder(order);
			setIconStatus(iconStatus);
			setTitleStatus(titleStatus);
			setIsVisibleOrderModal(true);
		},
		[]
	);

	const handleCloseOrderModal = useCallback(() => {
		setIsVisibleOrderModal(false);
		setSelectedOrder(null);
		setIconStatus('');
		setTitleStatus('');
	}, []);

	return (
		<Container>
			<OrdersBoard
				icon="🕑"
				title="Fila de espera"
				orders={ordersWaiting}
				handleOpenOrderModal={handleOpenOrderModal}
			/>

			<OrdersBoard
				icon="👩‍🍳"
				title="Em produção"
				orders={ordersInProduction}
				handleOpenOrderModal={handleOpenOrderModal}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto!"
				orders={ordersDone}
				handleOpenOrderModal={handleOpenOrderModal}
			/>

			<OrderModal
				isVisible={isVisibleOrderModal}
				order={selectedOrder}
				iconStatus={iconStatus}
				titleStatus={titleStatus}
				onClose={handleCloseOrderModal}
			/>
		</Container>
	);
}
