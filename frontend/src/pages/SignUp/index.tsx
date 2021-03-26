import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';

import { Container, Button } from './styles';

interface SignUpFormData {
  nome: string;
  email: string;
  idade: number;
  senha: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: SignUpFormData) {
    setLoading(true);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório.'),
        email: Yup.string()
          .required('O e-mail é obrigatório.')
          .email('E-mail inválido.'),
        idade: Yup.string().required('A idade é obrigatória'),
        senha: Yup.string()
          .required('A senha é obrigatória.')
          .min(6, 'No mínimo 6 dígitos.'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      addToast({
        type: 'success',
        title: 'Logado com sucesso!',
        description: 'Seus dados foram guardados com êxito.',
      });

      setLoading(false);

      history.push('/');
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
  }

  return (
    <Container>
      <h1>Teste - Atac</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="nome"
          required
          label="Nome completo"
          placeholder="Insira seu nome completo"
        />
        <Input
          name="email"
          required
          label="Endereço de e-mail"
          placeholder="Insira seu endereço de e-mail"
        />
        <Input
          name="idade"
          required
          label="Idade"
          placeholder="Insira sua idade"
          type="number"
        />
        <Input
          name="senha"
          required
          label="Senha"
          placeholder="Insira sua senha"
          type="password"
        />
        <Button type="submit" loading={loading}>
          Cadastrar
        </Button>
      </Form>
      <Link to="/">Fazer login</Link>
    </Container>
  );
};

export default SignUp;
