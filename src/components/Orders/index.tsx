import { useCallback, useEffect, useMemo, useState } from 'react';

import { Order } from '../../types/Order';
import { OrderModal } from './OrderModal';
import { OrdersBoard } from './OrdersBoard';

import { io } from 'socket.io-client';
import api from '../../utils/api';
import { deleteOrder } from '../../utils/deleteOrder';
import { Container } from './styles';

interface handleOpenOrderModalParams {
	order: Order;
}

export function Orders() {
	const [ordersWaiting, setOrdersWaiting] = useState<Order[]>([]);
	const [ordersInProduction, setOrdersInProduction] = useState<Order[]>([]);
	const [ordersDone, setOrdersDone] = useState<Order[]>([]);
	const [isVisibleOrderModal, setIsVisibleOrderModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

	const socket = useMemo(() => io(`${import.meta.env.VITE_API_URL}`), []);

	useEffect(() => {
		socket.on('newOrder', (order: Order) => {
			setOrdersWaiting((state) => state.concat(order));
		});

		return () => {
			socket.off('newOrder');
		};
	}, [socket]);

	useEffect(() => {
		const controller = new AbortController();

		async function loadOrders() {
			try {
				const { data } = await api.get<Order[]>('/orders', {
					signal: controller.signal
				});

				data?.forEach((order) => {
					order.status === 'WAITING' &&
						setOrdersWaiting((state) => [...state, order]);
					order.status === 'IN_PRODUCTION' &&
						setOrdersInProduction((state) => [...state, order]);
					order.status === 'DONE' &&
						setOrdersDone((state) => [...state, order]);
				});
			} catch {}
		}

		loadOrders();

		return () => {
			controller.abort();
		};
	}, []);

	const handleOpenOrderModal = useCallback(
		({ order }: handleOpenOrderModalParams) => {
			setSelectedOrder(order);
			setIsVisibleOrderModal(true);
		},
		[]
	);

	const handleCloseOrderModal = useCallback(() => {
		setIsVisibleOrderModal(false);
		setSelectedOrder(null);
	}, []);

	const handleDeleteOrder = useCallback(
		(orderId: string, orderStatus: Order['status']) => {
			orderStatus === 'WAITING' &&
				setOrdersWaiting((state) => deleteOrder(orderId, state));
			orderStatus === 'IN_PRODUCTION' &&
				setOrdersInProduction((state) => deleteOrder(orderId, state));
			orderStatus === 'DONE' &&
				setOrdersDone((state) => deleteOrder(orderId, state));
		},
		[]
	);

	const handleChangeStatusOrder = useCallback((order: Order) => {
		order.status === 'IN_PRODUCTION' &&
			setOrdersInProduction((state) => [...state, order]);
		order.status === 'DONE' && setOrdersDone((state) => [...state, order]);
	}, []);

	return (
		<Container>
			<OrdersBoard
				icon="????"
				title="Fila de espera"
				orders={ordersWaiting}
				handleOpenOrderModal={handleOpenOrderModal}
			/>

			<OrdersBoard
				icon="???????????"
				title="Em produ????o"
				orders={ordersInProduction}
				handleOpenOrderModal={handleOpenOrderModal}
			/>
			<OrdersBoard
				icon="???"
				title="Pronto!"
				orders={ordersDone}
				handleOpenOrderModal={handleOpenOrderModal}
			/>

			<OrderModal
				isVisible={isVisibleOrderModal}
				order={selectedOrder}
				onDeleteOrder={handleDeleteOrder}
				onClose={handleCloseOrderModal}
				onChangeOrder={handleChangeStatusOrder}
			/>
		</Container>
	);
}
