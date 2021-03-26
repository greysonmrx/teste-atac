import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import IUser from '@modules/users/entities/IUser';

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
}

export default User;
