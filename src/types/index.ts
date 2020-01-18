export type ObjectOrString = object | string;

export type FixtureCacheOptions = {
  fixturePath: string;
};

export interface IFixtureAssertions {
  matches(value: ObjectOrString, message?: string): void;
}

export interface IFixtureAssert extends Assert {
  fixture: (fixtureName: string) => IFixtureAssertions;
}
