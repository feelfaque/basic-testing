// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      data: { a: 2, b: 3, action: Action.Add },
      result: 5,
    };

    expect(simpleCalculator(input.data)).toBe(input.result);
  });

  test('should subtract two numbers', () => {
    const input = {
      data: { a: 57, b: 33, action: Action.Subtract },
      result: 24,
    };
    expect(simpleCalculator(input.data)).toBe(input.result);
  });

  test('should multiply two numbers', () => {
    const input = {
      data: { a: 18, b: 3, action: Action.Multiply },
      result: 54,
    };
    expect(simpleCalculator(input.data)).toBe(input.result);
  });

  test('should divide two numbers', () => {
    const input = {
      data: { a: 18, b: 3, action: Action.Divide },
      result: 6,
    };
    expect(simpleCalculator(input.data)).toBe(input.result);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      data: { a: 8, b: 3, action: Action.Exponentiate },
      result: 512,
    };
    expect(simpleCalculator(input.data)).toBe(input.result);
  });

  test('should return null for invalid action', () => {
    const input = { a: 18, b: 3, action: Action };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'eighteen', b: 3, action: Action.Multiply };
    expect(simpleCalculator(input)).toBeNull();
  });
});
