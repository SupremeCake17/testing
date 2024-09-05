exports.handler = async (event, context) => {
  const { default: fetch } = await import('node-fetch'); // Dynamic import for ES module

  const url = `https://youtube.com${event.path}`; // Customize this URL as needed

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Host': 'youtube.com' // Replace with the target host if necessary
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

