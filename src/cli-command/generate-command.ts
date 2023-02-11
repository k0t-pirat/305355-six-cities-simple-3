import got from 'got';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import { MockData } from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offersCount = Number(count);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}`);
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tSVFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offersCount; i++) {
      await tSVFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
