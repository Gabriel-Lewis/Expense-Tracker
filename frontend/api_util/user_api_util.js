export const signUp = (user, success, error) => {
  $.ajax({
    "url": "/api/users",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": "{\"email\":\"asdfas@gmail.com\",\"password\":\"asdfklja\",\"admin\":true}",
    "success": success,
    "error": error
  })
}

export const logIn = (user, success) => {
  $.ajax({
    url: '/api/session',
    method: 'POST',
    data: JSON.stringify({user:{user}}),
    success: (data) => {console.log(data)}
  })
}

export const logOut = success => {
  $.ajax({
    url: '/api/session',
    method: 'DELETE',
    success: success
  });
};

export const requestUser = (token, success) => {
  $.ajax({
    method: 'get',
    url: '/api/session',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    success: success
  })
}
