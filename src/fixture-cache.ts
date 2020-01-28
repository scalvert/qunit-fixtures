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

function parseFilename(fixturePath: string, filePath: string): [string, string] {
  let absoluteFilePath = path.resolve(filePath);
  let extension = path.extname(filePath);
  let absolutePath = absoluteFilePath.replace(fixturePath, '');
  let fixtureName = absolutePath.slice(0, -path.extname(absolutePath).length);

  if (fixtureName.startsWith('/')) {
    fixtureName = fixtureName.slice(1);
  }

  return [fixtureName, extension];
}

export default class FixtureCache {
  private fixtures: Map<string, ObjectOrString>;

  constructor(fixturePath: string) {
    this.fixtures = new Map<string, ObjectOrString>();

    this.loadFixtures(fixturePath);
  }

  loadFixtures(fixturePath: string) {
    try {
      let absoluteFixturePath = path.resolve(fixturePath);
      let files = recursiveReadSync(absoluteFixturePath);

      files.forEach((file: string) => {
        let [fixtureName, extension] = parseFilename(absoluteFixturePath, file);

        this.fixtures.set(fixtureName, getFixtureData(file, extension));
      });
    } catch (e) {
      let message = e.message;

      if (e.code === 'ENOENT') {
        message = `The '${fixturePath}' directory doesn't appear to exist. Please provide a directory that exists as the fixturePath`;
      }

      throw new Error(message);
    }
  }

  get(fixtureName: string) {
    if (!this.fixtures.has(fixtureName)) {
      throw new Error(`No fixture was found matching ${fixtureName}`);
    }

    return this.fixtures.get(fixtureName);
  }

  get size() {
    return this.fixtures.size;
  }
}
