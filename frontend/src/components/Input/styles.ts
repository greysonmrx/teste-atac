import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

interface InputContainerProps {
  isErrored: boolean;
  isFilled: boolean;
  isFocused: boolean;
  hasLabel: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  & + div {
    margin-top: 30px;

    @media only screen and (max-width: 600px) {
      margin-top: 25px;
    }

    @media only screen and (max-width: 400px) {
      margin-top: 20px;
    }
  }

  label {
    font-size: 1.4rem;
    color: #170c3a;
    letter-spacing: 0.4px;
    font-weight: 600;

    span {
      position: absolute;
      margin-left: 5px;
      font-size: 1.8rem;
      color: ${({ isErrored }) => (isErrored ? '#F95E5A' : '#8F8A9B')};
      transition: all 0.2s;
    }
  }

  p {
    text-align: right;
    margin-top: 8px;
    color: #f95e5a;
    font-size: 18px;
    letter-spacing: 0.36px;
    transition: all 0.2s;
    margin-bottom: -10px;
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  justify-content: center;
  margin-top: ${({ hasLabel }) => hasLabel && 20}px;

  @media only screen and (max-width: 600px) {
    margin-top: ${({ hasLabel }) => hasLabel && 15}px;
  }

  @media only screen and (max-width: 400px) {
    margin-top: ${({ hasLabel }) => hasLabel && 10}px;
  }

  width: 100%;
  padding: 13px 20px;
  border-radius: 5px;
  background-color: #f5f4f6;
  border: 1px solid #ebeaed;
  transition: all 0.2s;
  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: #ebeaed;
      border-color: #dedce1;
    `}
  ${({ isFilled }) =>
    isFilled &&
    css`
      border-color: #ebeaed;
      background-color: #f5f4f6;
    `}
  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #f95e5a;
      background-color: #feefee;
    `}

  svg {
    width: 20px;
    height: 25px;
    margin-right: 15px;
  }
  
  input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({ isErrored }) => (isErrored ? '#F95E5A' : '#170C3A')};
    transition: all 0.2s;
    font-size: 1.4rem;
    min-width: 0px;
  }
`;
