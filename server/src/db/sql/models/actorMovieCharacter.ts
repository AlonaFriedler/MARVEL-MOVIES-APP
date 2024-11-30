import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Actor } from './actor';
import { Movie } from './movie';
import { Character } from './character';


@Table
export class ActorMovieCharacter extends Model {
  @ForeignKey(() => Actor)
  actorId!: number;

  @ForeignKey(() => Movie)
  movieId!: number;

  @ForeignKey(() => Character)
  characterId!: string; 

  @BelongsTo(() => Actor)
  actor!: Actor;

  @BelongsTo(() => Movie)
  movie!: Movie;

  @BelongsTo(() => Character)
  character!: Character;
}