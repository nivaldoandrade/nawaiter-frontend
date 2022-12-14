import styled from 'styled-components';

export const Container = styled.button`
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
