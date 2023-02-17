import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '../../../http-method.enum.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { fillDTO } from '../../utils/common.js';
import CreateUserDTO from './dto/create-user.dto.js';
import UserResponse from './response/user.response.js';
import { UserServiceInterface } from './user-service.iterface.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDTO>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email <<${body.email}>> exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result),
    );
  }
}