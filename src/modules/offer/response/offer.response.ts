import { Expose } from 'class-transformer';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
