import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { City, OfferFeature, OfferPhotos, OfferType } from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public issueDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop()
  public previewImage!: string;

  @prop({required: true, default: []})
  public photos!: OfferPhotos;

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true, default: 1})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({required: true, default: 3})
  public roomsCount!: number;

  @prop({required: true, default: 3})
  public guestsCount!: number;

  @prop({required: true, default: 100})
  public price!: number;

  @prop({required: true, default: []})
  public features!: OfferFeature[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({required: true, default: [0, 0]})
  public coords!: [number, number];
}

export const OfferModel = getModelForClass(OfferEntity);
