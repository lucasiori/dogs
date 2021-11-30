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

function USER_POST(body) {
  return {
    url: `${API_URL}/api/user`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  };
}

function PHOTO_POST(formData, token) {
  return {
    url: `${API_URL}/api/photo`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
  };
}


function PHOTOS_GET({ page, total, user }) {
  return {
    url: `${API_URL}/api/photo?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    }
  };
}

function PHOTO_GET(id) {
  return {
    url: `${API_URL}/api/photo/${id}`,
  };
}

function COMMENT_POST(id, body) {
  return {
    url: `${API_URL}/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('dogs:token')}`
      },
      body: JSON.stringify(body)
    }
  };
}

function PHOTO_DELETE(id) {
  return {
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('dogs:token')}`
      }
    }
  };
}

function FORGOT_PASSWORD_POST(body) {
  return {
    url: `${API_URL}/api/password/lost`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
  };
}

function RESET_PASSWORD_POST(body) {
  return {
    url: `${API_URL}/api/password/reset`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
  };
}

export {
  API_URL,
  TOKEN_POST,
  TOKEN_VALIDATE_POST,
  USER_GET,
  USER_POST,
  PHOTO_POST,
  PHOTOS_GET,
  PHOTO_GET,
  COMMENT_POST,
  PHOTO_DELETE,
  FORGOT_PASSWORD_POST,
  RESET_PASSWORD_POST
};