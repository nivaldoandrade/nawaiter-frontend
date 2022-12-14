import { Order } from './types/Order';

export const ordersArray: Order[] = [
	{
		_id: '6391f86a7e8597d71c7351ac',
		table: '1',
		status: 'WAITING',
		products: [
			{
				product: {
					name: 'Pizza 4 queijos',
					imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
					price: 40
				},
				quantity: 1,
				_id: '63950f38c01ff34dfdf01c81'
			},
			{
				product: {
					name: 'Pizza de 3 queijos',
					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
					price: 40
				},
				quantity: 2,
				_id: '63950f38c01ff34dfdf01c82'
			}
		]
	},
	{
		_id: '63951dc022e658e1a5a1f5d2',
		table: '2',
		status: 'IN_PRODUCTION',
		products: [
			{
				product: {
					name: 'Pizza 4 queijos',
					imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
					price: 40
				},
				quantity: 1,
				_id: '63951dc022e658e1a5a1f5d3'
			},
			{
				product: {
					name: 'Pizza de 3 queijos',
					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
					price: 40
				},
				quantity: 3,
				_id: '63951dc022e658e1a5a1f5d4'
			}
		]
	},
	{
		_id: '63951ef4ea9b907230ca6f7f',
		table: '3',
		status: 'DONE',
		products: [
			{
				product: {
					name: 'Pizza 4 queijos',
					imagePath: '004cc50b2a7d-pizza-4-queijos.jpg',
					price: 40
				},
				quantity: 1,
				_id: '63951ef4ea9b907230ca6f80'
			},
			{
				product: {
					name: 'Pizza de 3 queijos',
					imagePath: 'e2ec966877ed-pizza-3-queijos.jpg',
					price: 40
				},
				quantity: 3,
				_id: '63951ef4ea9b907230ca6f81'
			}
		]
	}
];
