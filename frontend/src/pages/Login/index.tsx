import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';

import { Container, Button } from './styles';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: LoginFormData) => {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail é obrigatório.')
          .email('E-mail inválido.'),
        senha: Yup.string()
          .required('A senha é obrigatória.')
          .min(6, 'No mínimo 6 dígitos.'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn(data);

      addToast({
        type: 'success',
        title: 'Logado com sucesso!',
        description: 'Seus dados foram guardados com êxito.',
      });

      setLoading(false);

      history.push('/dashboard');
    } catch (err) {
      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description: err.response?.data.message,
      });
    }
  }, [addToast, history, signIn]);

  return (
    <Container>
      <h1>Teste - Atac</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
            name="email"
            required
            label="Endereço de e-mail"
            placeholder="Insira seu endereço de e-mail"
          />
          <Input
            name="senha"
            required
            label="Senha"
            placeholder="Insira sua senha"
            type="password"
          />
          <Button type="submit" loading={loading}>
            Entrar
          </Button>
      </Form>
      <Link to="/sign-up">Criar nova conta</Link>
    </Container>
  );
};

export default Login;
