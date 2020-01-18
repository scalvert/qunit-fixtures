import FixtureCache from './fixture-cache';
import FixtureAssertions from './fixture-assertions';
import { IFixtureAssert, FixtureCacheOptions } from './types';

let fixtureCache: FixtureCache | null;

export function setupFixtureCache(options: FixtureCacheOptions) {
  if (typeof options.fixturePath !== undefined) {
    fixtureCache = new FixtureCache(options.fixturePath);
  }

  (<IFixtureAssert>QUnit.assert).fixture = function(fixtureName: string): FixtureAssertions {
    let fixture = fixtureCache!.get(fixtureName)!;
    return new FixtureAssertions(fixtureName, fixture, this);
  };

  return () => {
    fixtureCache = null;
  };
}
