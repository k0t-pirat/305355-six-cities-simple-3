import {DocumentType} from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDTO from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
