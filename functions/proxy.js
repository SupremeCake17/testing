const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const url = 'https://youtube.com' + event.path;
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Host': 'youtube.com'
      },
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type'),
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error: ' + error.message,
    };
  }
};
