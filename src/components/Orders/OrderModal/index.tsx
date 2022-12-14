import { ReactPortal } from '../../ReactPortal';

import { useOrderModal } from './useOrderModal';

import { CompleteButton } from '../CompleteButton';

import { formatPrice } from '../../../utils/formartPrice';

import { Order } from '../../../types/Order';

import closeIconImg from '../../../assets/images/close-icon.svg';

import {
	Overlay,
	Title,
	Container,
	Status,
	Items,
	CancelButton
} from './styles';

interface OrderModalProps {
	isVisible: boolean;
	order: null | Order;
	iconStatus: string;
	titleStatus: string;
	onClose: () => void;
}

export function OrderModal({
	isVisible,
	order,
	iconStatus,
	titleStatus,
	onClose
}: OrderModalProps) {
	const { shouldRender, overlayRef, total } = useOrderModal({
		isVisible,
		order,
		onClose
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
						<button type="button" onClick={onClose}>
							<img src={closeIconImg} alt="Icone de fechar" />
						</button>
					</header>
					<main>
						<Status>
							<Title>Status do Pedido</Title>
							<div className="status-content">
								<i>{iconStatus}</i>
								<h6>{titleStatus}</h6>
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
						<CompleteButton status={order.status} />
						<CancelButton type="button">Cancelar Pedido</CancelButton>
					</footer>
				</Container>
			</Overlay>
		</ReactPortal>
	);
}
