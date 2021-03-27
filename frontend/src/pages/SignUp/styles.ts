import styled from 'styled-components';

import RNButton from '../../components/Button';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  h1 {
    margin-bottom: 40px;

    @media only screen and (max-width: 600px) {
      margin-bottom: 35px;
    }

    @media only screen and (max-width: 400px) {
      margin-bottom: 30px;
    }
  }

  form {
    max-width: 400px;
    width: 85vw;
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const Button = styled(RNButton)`
  margin: 30px 0;
`;
