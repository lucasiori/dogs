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

function TOKEN_VALIDATE_POST(token) {
  return {
    url: `${API_URL}/jwt-auth/v1/token/validate`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
  TOKEN_VALIDATE_POST,
  USER_GET
};