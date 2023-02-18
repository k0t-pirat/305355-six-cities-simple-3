import {DocumentType, types} from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import UpdateOfferDTO from './dto/update-offer.dto.js';
import { SortTypes } from '../../types/sort-types.enum.js';

const DEFAULT_OFFERS_LIMIT = 60;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(limit?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: {offerId: '$_id'},
            pipeline: [
              {$match: {$expr: {$eq: ['$offerId', '$$offerId']}}},
              {$project: {_id: 1}}
            ],
            as: 'comments',
          },
        },
        {
          $addFields: {id: {$toString: '$_id'}, commentsCount: {$size: '$comments'}}
        },
        {$unset: 'comments'},
        {$limit: limit || DEFAULT_OFFERS_LIMIT},
        {$sort: {offersCount: SortTypes.DOWN}},
      ]).exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async calculateRatingById(offerId :string, newRating: number): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      return null;
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$set': {
          rating: ((offer.rating + newRating) / 2).toFixed(1),
        }
      }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
