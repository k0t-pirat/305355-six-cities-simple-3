import { City, OfferFeature, OfferPhotos, OfferType } from '../../../types/offer.type';

export default class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public issueDate?: Date;
  public city?: City;
  public previewImage?: string;
  public photos?: OfferPhotos;
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public features?: OfferFeature[];
  // public userId?: string;
  public commentsCount?: number;
  public coords?: [number, number];
}
