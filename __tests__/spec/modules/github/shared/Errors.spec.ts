import { GeneralError, SchemaError } from '../../../../../src/shared/Errors';

describe('General error class', () => {
  it('should return instance of General error', () => {
    const error = new GeneralError({ message: 'Test error message' });

    expect(error instanceof GeneralError).toBe(true);
    expect(error.getErrorDetails()).toStrictEqual({
      status: 500,
      message: 'Test error message',
    });
  });

  it('should schema error with status 400 and provided message', () => {
    const error = new SchemaError({ message: 'Test error message' });

    expect(error instanceof SchemaError).toBe(true);
    expect(error.getErrorDetails()).toStrictEqual({
      status: 400,
      message: 'Test error message',
    });
  });
});
