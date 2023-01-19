const { builder } = require('@netlify/functions')

function do_something_local() {
  return "My custom string"
}

const handler = async (event, context) => {
  const data = JSON.parse(event.body);

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405
    }
  }

  if (typeof data.segment === "undefined") {
    return {  
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing Segment",
      })
    }
  }

  if (typeof data.country === "undefined") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing Country",
      })
    }
  }

  if (typeof data.region === "undefined") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing Region",
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: 'Hello World!', 
      local_message: do_something_local(),
      data: typeof data.segment
    }),
  }
}

exports.handler = builder(handler)