export type ResponseCodeDescription = {
  code: number;
  message: string;
};

export class ResponseCode {
  public static SUCCESS: ResponseCodeDescription = {
    code: 200,
    message: 'Success.',
  };

  public static BAD_REQUEST_ERROR: ResponseCodeDescription = {
    code: 400,
    message: 'Bad request.',
  };

  public static UNAUTHORIZED_ERROR: ResponseCodeDescription = {
    code: 401,
    message: 'Unauthorized error.',
  };

  public static WRONG_CREDENTIALS_ERROR: ResponseCodeDescription = {
    code: 402,
    message: 'Wrong Credentials.',
  };

  public static ACCESS_DENIED_ERROR: ResponseCodeDescription = {
    code: 403,
    message: 'Access denied.',
  };

  public static ENTITY_NOT_FOUND_ERROR: ResponseCodeDescription = {
    code: 404,
    message: 'Entity not found.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: ResponseCodeDescription = {
    code: 409,
    message: 'Entity already exists.',
  };

  public static INTERNAL_SERVER_ERROR: ResponseCodeDescription = {
    code: 500,
    message: 'Internal Server error.',
  };

  public static ENTITY_VALIDATION_ERROR: ResponseCodeDescription = {
    code: 1001,
    message: 'Entity validation error.',
  };
}
