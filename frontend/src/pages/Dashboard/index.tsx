import React, { useCallback, useEffect, useRef } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import TodoItem from '../../components/TodoItem';

import { useToast } from '../../hooks/toast';
import { useTodo } from '../../hooks/todo';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Wrapper, TodoContainer } from './styles';

interface TodoFormData {
  descricao: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const { todos, addTodo, fetchTodos } = useTodo();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: TodoFormData) => {
    try {
      await addTodo(data);

      addToast({
        type: 'success',
        title: 'Tarefa cadastrada!',
        description: 'A tarefa foi cadastrada com sucesso.',
      });
    } catch(err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description: err.response?.data.message,
      });
    }

    formRef.current?.clearField('descricao');
  }, [addToast, addTodo]);

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [fetchTodos]);

  return (
    <Container>
      <Wrapper>
        <h1>Tarefas</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input 
            name="descricao"
            placeholder="Nova tarefa"
          />
          <button type="submit">
            <IoAddOutline />
          </button>
        </Form>
        <TodoContainer>
          {
            todos.length > 0 ? todos.map(todo => (
              <TodoItem data={todo}/>
            )) : <p>Nenhuma tarefa cadastrada</p>
          }
        </TodoContainer>
        <Button onClick={signOut}>Sair</Button>
      </Wrapper>
    </Container>
  );
}

export default Dashboard;
