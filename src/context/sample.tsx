import * as React from 'react';

interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}
 type TodoContextType = {
  todos: ITodo[];
};

interface IChildren {
  children: React.ReactNode;
}

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider = ({ children }: IChildren) => {
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      title: 'post 1',
      description: 'this is a description',
      status: false,
    },
    {
      id: 2,
      title: 'post 2',
      description: 'this is a description',
      status: true,
    },
  ]);

  return (
    <TodoContext.Provider value={{ todos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;