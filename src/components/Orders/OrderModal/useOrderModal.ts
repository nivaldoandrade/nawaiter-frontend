/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Order } from '../../../types/Order';
import api from '../../../utils/api';

interface useMountOrderModalProps {
	isVisible: boolean;
	order: null | Order;
	onClose: () => void;
	onDeleteOrder: (orderId: string, orderStatus: Order['status']) => void;
	onChangeOrder: (order: Order) => void;
}

interface EventCloseModal {
	target: EventTarget | null;
	key?: string;
}

export function useOrderModal({
	isVisible,
	order,
	onClose,
	onDeleteOrder,
	onChangeOrder
}: useMountOrderModalProps) {
	const [isLoadingCancelOrder, setIsloadingCancelOrder] = useState(false);

	const [shouldRender, setShouldRender] = useState(false);

	let overlayRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
		}

		const overlayRefElement = overlayRef.current;

		function handleCloseModal(event: EventCloseModal) {
			console.log(event);
			if (overlayRefElement === event.target || event.key === 'Escape') {
				onClose();
			}
		}

		if (isVisible && overlayRefElement && !isLoadingCancelOrder) {
			overlayRefElement.addEventListener('click', handleCloseModal);

			document.addEventListener('keydown', handleCloseModal);
		}

		return () => {
			overlayRefElement?.removeEventListener('click', handleCloseModal);

			document.removeEventListener('keydown', handleCloseModal);
		};
	}, [isVisible, overlayRef, isLoadingCancelOrder, onClose]);

	const handleCancelOrder = useCallback(
		async (orderId: string, orderStatus: Order['status']) => {
			setIsloadingCancelOrder(true);

			await new Promise((resolve) => setTimeout(resolve, 2000));
			await api.delete(`orders/${orderId}`);
			onDeleteOrder(orderId, orderStatus);

			setIsloadingCancelOrder(false);
			onClose();
		},
		[onDeleteOrder, onClose]
	);

	const handleChangeOrder = useCallback(
		async (order: Order) => {
			setIsloadingCancelOrder(true);

			if (order.status === 'DONE') {
				alert('Pedido Entregue!');

			} else {
				const newStatus = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
				const route = `/orders/${order._id}/${order.status === 'WAITING' ? 'production' : 'done'
					}`;


				await new Promise((resolve) => setTimeout(resolve, 2000));
				await api.put(route);

				onDeleteOrder(order._id, order.status);

				const newOrder: Order = { ...order, status: newStatus };

				onChangeOrder(newOrder);
			}



			setIsloadingCancelOrder(false);
			onClose();
		},
		[onChangeOrder, onClose, onDeleteOrder]
	);

	const total = useMemo(
		() =>
			order?.products.reduce((acc, { product, quantity }) => {
				return acc + product.price * quantity;
			}, 0),
		[order]
	);

	return {
		shouldRender,
		overlayRef,
		total,
		handleCancelOrder,
		isLoadingCancelOrder,
		handleChangeOrder
	};
}
