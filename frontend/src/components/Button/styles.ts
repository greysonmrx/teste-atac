import styled, { css } from 'styled-components';

import { spin } from './animations';

interface ContainerProps {
  buttonType: 'primary' | 'secondary';
  isLoading: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 25px;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.36px;
  border-radius: 5px;
  transition: all 0.2s;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};

  ${({ buttonType }) =>
    buttonType === 'secondary'
      ? css`
          color: #365df0;
          background-color: #e1e7fd;
        `
      : css`
          color: #ffffff;
          background-color: #365df0;
        `};

  &:hover {
    ${({ isLoading, buttonType }) =>
      !isLoading &&
      (buttonType === 'secondary'
        ? css`
            background-color: #cad6fc;
          `
        : css`
            background-color: #2f55cc;
          `)};
  }

  div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid
      ${({ buttonType }) =>
        buttonType === 'secondary' ? '#365DF0' : '#FFFFFF'};
    animation: ${spin} 1s linear infinite;
    border-left-color: transparent;
  }
  
  svg {
    margin-right: 5px;
  }
`;
