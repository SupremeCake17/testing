const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://youtube.com${event.path}`; // Update as needed

  try {
    const response = await fetch(corsProxy + targetUrl, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Host': 'youtube.com',
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
