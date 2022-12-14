import { createRef, useEffect, useMemo, useState } from 'react';
import { Order } from '../../../types/Order';

interface useMountOrderModalProps {
	isVisible: boolean;
	order: null | Order;
	onClose: () => void;
}

export function useOrderModal({
	isVisible,
	order,
	onClose
}: useMountOrderModalProps) {
	const [shouldRender, setShouldRender] = useState(false);
	const overlayRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (isVisible) {
			setShouldRender(true);
		}

		const overlayRefElement = overlayRef.current;

		function handleCloseModal(event: MouseEvent | KeyboardEvent) {
			if (overlayRefElement === event.target || event.type === 'keydown') {
				onClose();
			}
		}

		document.addEventListener('keydown', (event) => {
			handleCloseModal(event);
		});

		if (isVisible && overlayRefElement) {
			overlayRefElement.addEventListener('click', (event) =>
				handleCloseModal(event)
			);
		}

		return () => {
			if (overlayRefElement) {
				overlayRefElement.removeEventListener('click', (event) =>
					handleCloseModal(event)
				);
			}

			document.removeEventListener('keydown', (event) => {
				handleCloseModal(event);
			});
		};
	}, [isVisible, overlayRef]);

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
		total
	};
}
