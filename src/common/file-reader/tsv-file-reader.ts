import { readFileSync } from 'fs';
import { Offer, OfferFeature, OfferPhotos, OfferType } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader-interface.js';
import { UserType } from '../../types/user.type.js';

export default class TsvFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, issueDate, cityName, cityCoords, previewImage, photos, isPremium, rating, type, roomsCount, guestsCount, price, features, userName, userEmail, userAvatar, userPass, userType, commentsCount]) => ({
        title,
        description,
        issueDate: new Date(issueDate),
        city: {
          name: cityName,
          latlng: cityCoords.split(';').map((coord) => Number(coord)) as [number, number],
        },
        previewImage,
        photos: photos.split(';') as OfferPhotos,
        isPremium: isPremium === 'true',
        rating: Number(rating),
        type: type as OfferType,
        roomsCount: Number(roomsCount),
        guestsCount: Number(guestsCount),
        price: Number(price),
        features: features.split(';') as OfferFeature[],
        author: {
          name: userName,
          email: userEmail,
          avatar: userAvatar,
          password: userPass,
          type: userType as UserType,
        },
        commentsCount: Number(commentsCount),
        coords: [1,2],
      }));
  }
}
