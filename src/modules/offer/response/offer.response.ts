import { Expose } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import { OfferType, OfferFeature } from '../../../types/offer.type.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public issueDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: OfferFeature[];

  @Expose({name: 'userId'})
  public user!: UserResponse;

  @Expose()
  public commentsCount!: string;

  @Expose()
  public coords!: string;
}
