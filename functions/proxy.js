exports.handler = async (event, context) => {
  const { default: fetch } = await import('node-fetch'); // Dynamic import for ES module

  const url = `https://loquacious-bonbon-325a62.netlify.app/${event.path}`; // Customize this URL as needed

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Host': 'youtube.com', // Replace with the target host if necessary
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

