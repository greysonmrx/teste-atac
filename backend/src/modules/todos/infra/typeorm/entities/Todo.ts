import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import ITodo from '@modules/todos/entities/ITodo';

import User from '../../../../users/infra/typeorm/entities/User';

@Entity('to_do')
class Todo implements ITodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  data_de_inclusao: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_to_do',
    joinColumn: { name: 'to_do_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}

export default Todo;
