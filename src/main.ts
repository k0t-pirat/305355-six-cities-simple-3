import 'reflect-metadata';
import Application from './app/application.js';
import { applicationContainer } from './app/application.container.js';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import { userContainer } from './modules/user/user.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import { offerContainer } from './modules/offer/offer.container.js';


async function bootstrap() {
  const mainContainer = Container.merge(applicationContainer, userContainer, commentContainer, offerContainer);
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
