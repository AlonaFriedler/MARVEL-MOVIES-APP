import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Actor } from './actor';
import { Movie } from './movie';
import { ActorMovieCharacter } from './actorMovieCharacter';

@Table
export class Character extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @BelongsToMany(() => Actor, () => ActorMovieCharacter)
  actors!: Actor[];

  @BelongsToMany(() => Movie, () => ActorMovieCharacter)
  movies!: Movie[];
}