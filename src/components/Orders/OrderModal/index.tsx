import { ReactPortal } from '../../ReactPortal';

import { useOrderModal } from './useOrderModal';

import { CompleteButton } from '../CompleteButton';

import { formatPrice } from '../../../utils/formartPrice';

import { Order } from '../../../types/Order';

import closeIconImg from '../../../assets/images/close-icon.svg';

import {
	CancelButton,
	Container,
	Items,
	Overlay,
	Status,
	Title
} from './styles';

interface OrderModalProps {
	isVisible: boolean;
	order: null | Order;
	onClose: () => void;
	onDeleteOrder: (orderId: string, orderStatus: Order['status']) => void;
	onChangeOrder: (order: Order) => void;
}

const statusOrder = {
	WAITING: {
		icon: '🕑',
		title: 'Fila de espera'
	},
	IN_PRODUCTION: {
		icon: '👩‍🍳',
		title: 'Em produção'
	},
	DONE: {
		icon: '✅',
		title: 'Pronto!'
	}
};

export function OrderModal({
	isVisible,
	order,
	onClose,
	onDeleteOrder,
	onChangeOrder
}: OrderModalProps) {
	const {
		shouldRender,
		overlayRef,
		total,
		handleCancelOrder,
		isLoadingCancelOrder,
		handleChangeOrder
	} = useOrderModal({
		isVisible,
		order,
		onClose,
		onDeleteOrder,
		onChangeOrder
	});

	if (!shouldRender || !order) {
		return null;
	}

	return (
		<ReactPortal containerId="order-modal-root">
			<Overlay ref={overlayRef}>
				<Container>
					<header>
						<h4>Mesa {order.table}</h4>
						<button
							type="button"
							onClick={onClose}
							disabled={isLoadingCancelOrder}
						>
							<img src={closeIconImg} alt="Icone de fechar" />
						</button>
					</header>
					<main>
						<Status>
							<Title>Status do Pedido</Title>
							<div className="status-content">
								<i>{statusOrder[order.status].icon}</i>
								<h6>{statusOrder[order.status].title}</h6>
							</div>
						</Status>
						<Items>
							<Title>Itens</Title>
							<div className="items-content">
								{order.products.map(({ _id, product, quantity }) => (
									<div className="item" key={_id}>
										<img
											src={`http://localhost:3333/upload/${product.imagePath}`}
											alt={product.name}
										/>
										<span className="quantity">{quantity}x</span>
										<div>
											<h6>{product.name}</h6>
											<span>{formatPrice(product.price)}</span>
										</div>
									</div>
								))}
							</div>
							<div className="total-content">
								<Title>Total</Title>
								<h6>{total && formatPrice(total)}</h6>
							</div>
						</Items>
					</main>
					<footer>
						<CompleteButton
							status={order.status}
							disabled={isLoadingCancelOrder}
							onClick={() => handleChangeOrder(order)}
						/>
						<CancelButton
							disabled={isLoadingCancelOrder}
							type="button"
							onClick={() => handleCancelOrder(order._id, order.status)}
						>
							Cancelar Pedido
						</CancelButton>
					</footer>
				</Container>
			</Overlay>
		</ReactPortal>
	);
}
