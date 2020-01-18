import * as fs from 'fs';
import * as fixturify from 'fixturify';
import { dirSync, setGracefulCleanup, DirResult } from 'tmp';

setGracefulCleanup();

export default class FixturifyFixtures {
  private _tmp: DirResult;
  private _baseDir: string;

  constructor() {
    this._tmp = dirSync({ unsafeCleanup: true });
    this._baseDir = fs.realpathSync(this._tmp.name);
  }

  get baseDir(): string {
    return this._baseDir;
  }

  create(fixtures: fixturify.DirJSON) {
    fixturify.writeSync(this._baseDir, fixtures);
  }

  dispose() {
    if (this._tmp) {
      this._tmp.removeCallback();
    }
  }
}
