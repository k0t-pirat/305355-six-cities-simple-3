import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { CommentServiceInterface } from './comment-service.iterface.js';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';

const commentContainer = new Container();

commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer};
