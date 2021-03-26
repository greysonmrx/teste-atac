import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  buttonType = 'primary',
  ...rest
}) => {
  return (
    <Container
      disabled={loading}
      isLoading={loading}
      buttonType={buttonType}
      {...rest}
    >
      {loading ? <div /> : children}
    </Container>
  );
};

export default Button;
