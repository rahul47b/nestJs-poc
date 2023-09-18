import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', synchronize: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'json', nullable: true })
  roles: string[];

  @Column({ type: 'json', nullable: true })
  permissions: string[];
}
