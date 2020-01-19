import * as path from 'path';
import FixturifyFixtures from './helpers/fixturify-fixtures';
import FixtureCache from '../fixture-cache';
import toJson from './helpers/json-stringify';

const { test } = QUnit;

let fixturifyFixtures: FixturifyFixtures;

QUnit.module('fixture-cache', function(hooks) {
  hooks.beforeEach(function() {
    fixturifyFixtures = new FixturifyFixtures();
  });

  hooks.afterEach(function() {
    fixturifyFixtures.dispose();
  });

  test('fixtureCache errors when trying to load unsupported file types', function(assert) {
    fixturifyFixtures.create({
      'fixture1.foo': 'I am the first fixture',
    });

    assert.throws(() => {
      new FixtureCache(fixturifyFixtures.baseDir);
    }, new Error(`Unable to get fixture data for ${path.join(fixturifyFixtures.baseDir, 'fixture1.foo')}. Make sure your fixture is a supported extension (.txt or .json).`));
  });

  test('fixtureCache caches fixtures', function(assert) {
    fixturifyFixtures.create({
      'fixture1.txt': 'I am the first fixture',
      'fixture2.txt': 'I am the second fixture',
    });

    let fixtureCache = new FixtureCache(fixturifyFixtures.baseDir);

    assert.equal(fixtureCache.get('fixture1'), 'I am the first fixture');
    assert.ok(fixtureCache.get('fixture2'), 'I am the second fixture');
    assert.equal(fixtureCache.fixtures.size, 2);
  });

  test('fixtureCache.matches matches multi-line strings', function(assert) {
    let expectedString = `I am a much longer
multi-line string`;
    fixturifyFixtures.create({
      'fixture1.txt': expectedString,
    });

    let fixtureCache = new FixtureCache(fixturifyFixtures.baseDir);

    assert.ok(fixtureCache.get('fixture1'), expectedString);
  });

  test('fixtureCache.matches JSON', function(assert) {
    let jsonObject = {
      foo: true,
      bar: {
        baz: 'bog',
      },
    };
    fixturifyFixtures.create({
      'fixture1.json': toJson(jsonObject),
    });

    let fixtureCache = new FixtureCache(fixturifyFixtures.baseDir);

    assert.deepEqual(fixtureCache.get('fixture1'), jsonObject);
  });
});
