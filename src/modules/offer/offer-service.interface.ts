import {DocumentType} from '@typegoose/typegoose';
import CreateOfferDTO from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
