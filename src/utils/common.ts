import { OfferFeature, OfferPhotos, OfferType } from '../types/offer.type';
import { UserType } from '../types/user.type';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, issueDate, cityName, cityCoords, previewImage, photos, isPremium, rating, type, roomsCount, guestsCount, price, features, userName, userEmail, userAvatar, userPass, userType, commentsCount] = tokens;
  return {
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
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
