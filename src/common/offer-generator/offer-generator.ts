import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomBoolean, generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;
const MIN_RATING = 1;
const MAX_RATING = 15;
const MIN_COORDS = 0;
const MAX_COORDS = 180;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const issueDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const cityCoords = [generateRandomValue(MIN_COORDS, MAX_COORDS, 2), generateRandomValue(MIN_COORDS, MAX_COORDS, 2)].join(';');
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItems<string>(this.mockData.photos.slice(0, 6)).join(';');
    const isPremium = generateRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem<string>(this.mockData.offerTypes);
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const features = getRandomItems<string>(this.mockData.offerFeatures).join(';');
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = generateRandomBoolean() ? 'pro' : 'обычный';
    const commentsCount = generateRandomValue(0, 50).toString();
    const coords = [generateRandomValue(MIN_COORDS, MAX_COORDS, 2), generateRandomValue(MIN_COORDS, MAX_COORDS, 2)].join(';');

    return [
      title, description, issueDate, city, cityCoords, previewImage, photos, isPremium, rating, type,
      roomsCount, guestsCount, price, features, author, email, avatar, password, userType,
      commentsCount, coords,
    ].join('\t');
  }
}
