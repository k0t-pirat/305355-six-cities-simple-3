import { User } from './user.type';

export type City = {
  name: string;
  latlng: [number, number]
}

export type OfferPhotos = [string, string, string, string, string, string]
export type OfferType = 'apartment' | 'apartment' | 'room' | 'hotel';
export type OfferFeature = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

// export enum OfferType {
//   Apartment = 'apartment',
//   House = 'apartment',
//   Room = 'room',
//   Hotel = 'hotel',
// }

// export enum OfferFeatures {
//   Breakfast = 'Breakfast',
//   AirConditioning = 'Air conditioning',
//   LaptopFriendlyWorkspace = 'Laptop friendly workspace',
//   BabySeat = 'Baby seat',
//   Washer = 'Washer',
//   Towels = 'Towels',
//   Fridge = 'Fridge',
// }

export type Offer = {
  title: string;
  description: string;
  issueDate: Date;
  city: City;
  previewImage: string;
  photos: OfferPhotos;
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: OfferFeature[];
  author: User;
  commentsCount: number;
  coords: [number, number];
}
