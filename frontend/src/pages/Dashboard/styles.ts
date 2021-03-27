import styled from 'styled-components';
import { darken } from 'polished';

import RNButton from '../../components/Button';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 10px;
  padding: 100px 30px;

  @media only screen and (max-width: 600px) {
    padding: 60px 30px;
  }

  @media only screen and (max-width: 400px) {
    padding: 30px 30px;
  }

  h1 {
    margin-bottom: 40px;

    @media only screen and (max-width: 600px) {
      margin-bottom: 30px;
    }

    @media only screen and (max-width: 400px) {
      margin-bottom: 20px;
    }
  }

  form {
    display: flex;

    button {
      background-color: #365DF0;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      border-radius: 5px;
      min-width: 52px;
      height: 52px;
      transition: all 0.2s;

      @media only screen and (max-width: 600px) {
        min-width: 48px;
        height: 48px;
        margin-left: 20px;
      }

      @media only screen and (max-width: 400px) {
        min-width: 45px;
        height: 45px;
        margin-left: 10px;
      }

      &:hover {
        background-color: ${darken(0.1, '#365DF0')};
      }

      svg {
        color: #FFFFFF;
        font-size: 30px;
      }
    }
  }

  > button {
    background-color: #d80026;

    &:hover {
      background-color: ${darken(0.1, '#d80026')};
    }
  } 
`;

export const Button = styled(RNButton)`
  margin: 30px 0;
`;

export const TodoContainer = styled.div`
  margin: 30px 0;
`;
