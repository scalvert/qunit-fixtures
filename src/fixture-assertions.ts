import * as util from 'util';
import { ObjectOrString, IFixtureAssertions } from './types';

type AssertResult = {
  result: boolean;
  actual: any;
  expected: any;
  message: string;
};

export default class FixtureAssertions implements IFixtureAssertions {
  constructor(
    private fixtureName: string,
    private fixture: ObjectOrString,
    private testContext: Assert
  ) {}

  matches(value: ObjectOrString, message?: string): void {
    let result: boolean = util.isDeepStrictEqual(value, this.fixture);
    let expected = `Expected value matches fixture ${this.fixtureName}`;
    let actual = result
      ? `Expected value matches fixture ${this.fixtureName}`
      : `Expected value not match fixture ${this.fixtureName}`;

    if (!message) {
      message = expected;
    }

    this.pushResult({ result, actual, expected, message });
  }

  private pushResult(result: AssertResult) {
    this.testContext.pushResult(result);
  }
}
