const { builder } = require('@netlify/functions')

const bdrs = {
  'ainglis': 'https://hi.d2l.com/c/Austin-Inglis',
  'cboyal': 'https://hi.d2l.com/c/Chase-Boyall',
  'gkobe': 'https://hi.d2l.com/c/Grace-Kobe',
  'bkraelj': 'https://hi.d2l.com/c/Brad-Kragelj',
  'jphan': 'https://hi.d2l.com/c/jerry-phan'

}

const mapping = {
  'k-12': 'bkraelj',
  'gov': 'jphan',
  'he': {
    'ca': 'ainglis',
    'us': {
      'al': 'jmarwah',
      'ak': 'vsharma',
      'az': 'vsharma',
      'ar': 'gkobe'
    }
  },
  'corp': {
    'ca': {
      'ab': 'pbiswas',
      'bc': 'pbiswas',
      'mb': 'pbiswas',
      'nl': 'jreid'
    }
  }
}



const handler = async (event, context) => {
  const data = JSON.parse(event.body);

  function recursive_find(obj, searchArray) {
    const searchValue = searchArray.shift();
    console.table(obj[searchValue]);
    if (typeof obj[searchValue] !== 'object') {
      return obj[searchValue];
    } else {
      return recursive_find(obj[searchValue], searchArray);
    }
  }

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
    body: JSON.stringify({ calendar_link: bdrs[recursive_find(mapping, [data.segment,data.country,data.region])] }),
  }
}

exports.handler = builder(handler)