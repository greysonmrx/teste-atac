import React from 'react';

import handleDateFormat from '../../utils/handleDateFormat';

import { Container } from './styles';

interface TodoItemProps {
  data: {
    id: string;
    descricao: string;
    data_de_inclusao: string;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ data }) => {
  const { id, descricao, data_de_inclusao } = data;

  return (
    <Container key={id}>
      <p>{descricao}</p>
      <span>Criado em: {handleDateFormat(data_de_inclusao)}</span>
    </Container>
  );
}

export default TodoItem;
