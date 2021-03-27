import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #170C3A;
  border-top: none;

  p {
    margin-bottom: 5px;
  }

  span {
    font-size: 1.1rem;
  }

  &:first-child {
    border-top: 1px solid #170C3A;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
