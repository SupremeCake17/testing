exports.handler = async (event, context) => {
  const { default: fetch } = await import('node-fetch'); // Dynamic import for ES module

  const url = `https://youtube.com/${event.path}`; // Directly access YouTube or your target

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Host': 'youtube.com', // Ensure this is the correct target host
      },
    });

    const body = await response.text();

    // Ensure Content-Type header is defined
    const contentType = response.headers.get('content-type') || 'text/html';

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': contentType,
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
