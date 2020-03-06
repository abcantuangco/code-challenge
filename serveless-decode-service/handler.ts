import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { TextHandler } from './libs/text-handler';

const ResponseHandler = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers
    }
  };
};

export const decode: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (!('body' in event)) {
      throw new Error('Invalid payload.');
    }

    const body = JSON.parse(event.body);

    if (!('key' in body)) {
      throw new Error('Key is required.');
    }
    if (!('text' in body)) {
      throw new Error('Text is required.');
    }
    const textHandler = new TextHandler();
    const decodedMessage = textHandler.decode(body.key, body.text);
    return ResponseHandler(200, {
      code: 200,
      details: {
        decoded_message: decodedMessage
      }
    });
  } catch (error) {
    return ResponseHandler(400, {
      code: 400,
      message: error.message
    });
  }
};
