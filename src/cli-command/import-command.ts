import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      console.log(err);
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log('Не удалось импортировать файл!');
    }
  }
}
