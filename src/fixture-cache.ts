import * as fs from 'fs';
import * as path from 'path';
import * as recursiveReadSync from 'recursive-readdir-sync';
import { ObjectOrString } from './types';

function getFixtureData(filePath: string, extension: string): ObjectOrString {
  let fixtureData: ObjectOrString;

  switch (extension) {
    case '.json':
      fixtureData = require(filePath);
      break;
    case '.txt':
      fixtureData = fs.readFileSync(filePath, {
        encoding: 'utf-8',
      });
      break;
    default:
      throw new Error(
        `Unable to get fixture data for ${filePath}. Make sure your fixture is a supported extension (.txt or .json).`
      );
  }

  return fixtureData;
}

export default class FixtureCache {
  fixtures: Map<string, ObjectOrString>;

  constructor(fixturePath: string) {
    this.fixtures = new Map<string, ObjectOrString>();

    this.loadFixtures(fixturePath);
  }

  loadFixtures(fixturePath: string) {
    try {
      let files = recursiveReadSync(fixturePath);

      files.forEach((file: string) => {
        let extension = path.extname(file);

        this.fixtures.set(path.basename(file, extension), getFixtureData(file, extension));
      });
    } catch (e) {
      console.log(`Fixtures located in ${fixturePath} could not be loaded. Reason: ${e.message}`);
    }
  }

  get(fixtureName: string) {
    if (!this.fixtures.has(fixtureName)) {
      throw new Error(`No fixture was found matching ${fixtureName}`);
    }

    return this.fixtures.get(fixtureName);
  }
}
