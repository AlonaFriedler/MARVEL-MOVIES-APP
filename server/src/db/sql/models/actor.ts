import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Movie } from './movie';
import { Character } from './character';
import { ActorMovieCharacter } from './actorMovieCharacter';

@Table
export class Actor extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string;

  @BelongsToMany(() => Movie, () => ActorMovieCharacter)
  movies!: Movie[];


  @BelongsToMany(() => Character, () => ActorMovieCharacter)
  characters!: Character[];
}