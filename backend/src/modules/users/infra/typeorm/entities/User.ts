import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import IUser from '@modules/users/entities/IUser';

import Todo from '../../../../todos/infra/typeorm/entities/Todo';

@Entity('user')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column()
  email: string;

  @Column()
  senha: string;

  @ManyToMany(() => Todo)
  @JoinTable({
    name: 'user_to_do',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'to_do_id' },
  })
  todos: Todo[];
}

export default User;
