import { Order } from '../types/Order';

export function deleteOrder(deletedOrderId: string, orders: Order[]) {
	return orders.filter((order) => order._id !== deletedOrderId);
}
