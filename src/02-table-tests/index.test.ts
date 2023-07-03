import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 3, action: Action.Subtract, expected: 4 },
  { a: 8, b: 5, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 5, b: 4, action: Action.Exponentiate, expected: 625 },
  { a: 3, b: 2, action: Action, expected: null },
  { a: 3, b: 2, action: 'subtract', expected: null },
  { a: 'three', b: 2, action: Action.Multiply, expected: null },
  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
];

describe.each(testCases)(
  'perform an action with two numbers({ %a, %b, %action })',
  ({ a, b, action, expected }) => {
    test(`Action ${action} with numbers ${a}, ${b} should return ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);
