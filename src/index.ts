import FixtureCache from './fixture-cache';
import FixtureAssertions from './fixture-assertions';
import { IFixtureAssert, FixtureCacheOptions } from './types';

let fixtureCache: FixtureCache | undefined;

export function setupFixtures(options: FixtureCacheOptions) {
  if (fixtureCache === undefined) {
    if (typeof options === 'undefined' || typeof options.fixturePath === 'undefined') {
      throw new Error(
        'You must supply options with a `fixturePath` property that contains your fixtures.'
      );
    }

    fixtureCache = new FixtureCache(options.fixturePath);

    (<IFixtureAssert>QUnit.assert).fixture = function(fixtureName: string): FixtureAssertions {
      let fixture = fixtureCache!.get(fixtureName)!;
      return new FixtureAssertions(fixtureName, fixture, this);
    };
  }

  return () => {
    fixtureCache = undefined;
  };
}
