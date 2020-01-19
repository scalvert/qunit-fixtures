# qunit-fixtures

![CI Build](https://github.com/scalvert/qunit-fixtures/workflows/CI%20Build/badge.svg)

Store test fixtures in files within a designated directory, and assert on those test fixtures in tests.

## Installation

```bash
yarn add qunit-fixtures --dev

# or

npm install qunit-fixtures --save-dev
```

## Usage

### Set up fixture path

Import and run the one-time fixture setup function to load the fixtures for your tests:

```js
import { setupFixtures } from 'qunit-fixtures';

setupFixtures({ fixturePath: './tests/fixtures' });

// ...
```

:bulb: Tip: It's safe to invoke the `setupFixtures` function multiple times; the fixtures will be setup only once per test run.

### Using the fixture assertion

Fixtures can be asserted on by fixture name. The name corresponds to the path of the fixture within the `fixturePath`. The following illustrates some examples:

Given the directory with the `fixturePath` of `root/tests/fixtures` and the contents below:

```bash
├── fixture1.txt
└── sub
    └── fixture2.txt
```

The fixtures would be read and cached in a data structure like so:

```json
{
  "fixture1": "I am the first fixture",
  "sub/fixture2": "I am the section fixture"
}
```

And each fixture would be accessible via the key.

The `qunit-fixtures` library extends QUnit's `assert` object to include a new function and assertion. The following example illustrates it:

```js
assert.fixture(fixtureName).matches(expectedValue);
```

#### Putting it all together

Below is a complete example of using `qunit-fixtures` in tests.

```js
import { module, test } from 'qunit';
import { setupFixtures } from 'qunit-fixtures';

setupFixtures({ fixturePath: './tests/fixtures' });

module('some-stuff', function() {
  test('doSomeStuff matches the expected result', function(assert) {
    let actualValue = doSomeStuff();

    assert.fixture('some-stuff-result').matches(actualValue);
  });
});
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
