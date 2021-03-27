import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { TodoProvider } from './todo';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <TodoProvider>{children}</TodoProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
