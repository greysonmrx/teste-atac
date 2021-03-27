import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface Todo {
  id: string;
  descricao: string;
  data_de_inclusao: string;
}

interface TodoContextData {
  todos: Todo[];
  addTodo(data: Pick<Todo, 'descricao'>): Promise<void>;
  fetchTodos(): Promise<void>;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(async ({ descricao }) => {
    const response = await api.post<Todo>('/todos', { descricao });

    const { data } = response;

    setTodos((oldState) => [...oldState, data]);
  }, []);

  const fetchTodos = useCallback(async () => {
    const response = await api.get<Todo[]>('/todos');

    const { data } = response;

    setTodos(data);
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, fetchTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function useTodo(): TodoContextData {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within an AuthProvider');
  }

  return context;
}

export { TodoProvider, useTodo };
