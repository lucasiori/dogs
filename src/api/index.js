const API_URL = 'https://dogsapi.origamid.dev/json';

function TOKEN_POST(body) {
  return {
    url: `${API_URL}/jwt-auth/v1/token`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  };
}

function USER_GET(token) {
  return {
    url: `${API_URL}/api/user`,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  };
}

export {
  API_URL,
  TOKEN_POST,
  USER_GET
};