import { IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDTO {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max length is 1024'})
  public text!: string;

  @Min(1, {message: 'rating must be 1 or more'})
  @Max(5, {message: 'rating must be 5 or less'})
  public rating!: number;

  @IsMongoId({message: 'offerId must be a valid id'})
  public offerId!: string;

  // @IsMongoId({message: 'userId must be a valid id'})
  public userId!: string;
}
