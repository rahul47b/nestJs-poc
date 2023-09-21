import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql'; // this is for graphql only

@Entity({ name: 'users', synchronize: true })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'json', nullable: true })
  @Field(() => [String], { nullable: true })
  roles: string[];

  @Column({ type: 'json', nullable: true })
  @Field(() => [String], { nullable: true })
  permissions: string[];
}
