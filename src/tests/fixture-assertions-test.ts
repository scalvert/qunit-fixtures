import FixturifyFixtures from './helpers/fixturify-fixtures';
import { setupFixtureCache } from '../';
import { IFixtureAssert } from '../types';
import toJson from './helpers/json-stringify';

const { test } = QUnit;

let fixturifyFixtures: FixturifyFixtures;

QUnit.module('fixture-assertions', function(hooks) {
  hooks.beforeEach(function() {
    fixturifyFixtures = new FixturifyFixtures();
  });

  hooks.afterEach(function() {
    fixturifyFixtures.dispose();
  });

  test('can assert against .txt fixture by name', function(assert: IFixtureAssert) {
    fixturifyFixtures.create({
      'fixture1.txt': 'I am the first fixture',
      'fixture2.txt': 'I am the second fixture',
    });

    let dispose = setupFixtureCache({ fixturePath: fixturifyFixtures.baseDir });

    assert.fixture('fixture1').matches('I am the first fixture');

    dispose();
  });

  test('can assert against .json fixture by name', function(assert: IFixtureAssert) {
    let fixture1 = {
      foo: true,
      bar: {
        baz: 'bog',
      },
    };
    let fixture2 = {
      baz: false,
      foo: {
        bar: 'blarg',
      },
    };
    fixturifyFixtures.create({
      'fixture1.json': toJson(fixture1),
      'fixture2.json': toJson(fixture2),
    });

    let dispose = setupFixtureCache({ fixturePath: fixturifyFixtures.baseDir });

    assert.fixture('fixture1').matches(fixture1);
    assert.fixture('fixture2').matches(fixture2);

    dispose();
  });
});
