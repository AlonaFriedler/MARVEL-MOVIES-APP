import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Actor } from './actor';
import { ActorMovieCharacter } from './actorMovieCharacter';

@Table
export class Movie extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @BelongsToMany(() => Actor, () => ActorMovieCharacter)
  actors!: Actor[];
}