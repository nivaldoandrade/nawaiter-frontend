import styled from 'styled-components';

export const Overlay = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Title = styled.small`
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 150%;
	opacity: 0.8;
`;

export const Container = styled.div`
	width: 30rem;
	padding: 2rem;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.colors.background};

	display: flex;
	flex-direction: column;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		button {
			font-size: 0px;
			background-color: transparent;
			border: 0;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;
	}
`;

export const Status = styled.div`
	margin-bottom: 2rem;

	strong {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 150%;
		opacity: 0.8;
	}

	.status-content {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;

		h6 {
			margin-left: 0.5rem;
		}
	}
`;

export const Items = styled.div`
	.items-content {
		margin-top: 1rem;

		.item {
			display: flex;
			align-items: flex-start;

			& + .item {
				margin-top: 1rem;
			}

			img {
				width: 48px;
				border-radius: 0.375rem;
			}

			.quantity {
				min-width: 1.25rem;
				margin-left: 12px;
				margin-right: 4px;
			}

			span {
				font-size: 0.875rem;
				color: ${({ theme }) => theme.colors.gray[400]};
			}
		}
	}

	.total-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.5rem;
	}
`;

export const CompleteButton = styled.button`
	width: 100%;
	padding: 0.687rem 1.5rem;
	margin-bottom: 1rem;
	background-color: ${({ theme }) => theme.colors.gray[500]};
	border-radius: 3rem;
	border: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	strong {
		margin-left: 0.5rem;
		color: ${({ theme }) => theme.colors.gray[0]};
	}
`;

export const CancelButton = styled.button`
	width: 100%;
	padding: 0.875rem 1.5rem;
	background-color: transparent;
	border: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 600;
	color: ${({ theme }) => theme.colors.primary.main};
`;
