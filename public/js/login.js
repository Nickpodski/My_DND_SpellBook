// const { default: axios } = require("axios");

loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  // const book = document.getElementById("book");

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#user_name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const spellbook = null;
  

  // if (name && email && password) {
  //   const response = await fetch('/api/users', {
  //     method: 'POST',
  //     body: JSON.stringify({ name, email, password, spellbook}),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/');
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
  if (name && email && password) {
    // body = JSON.stringify({ name, email, password});
    // console.log(body);
    // axios.post('/api/users/', body)
    //   .then(function (res) {
    //     console.log(res);
    //     return;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     return;
    // });
    console.log(name);
    await axios.post('/api/users', {
      name: name,
      email: email,
      password: password 
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (res) {
        console.log(res);
        return;
      })
      .catch( function (err) {
        console.log(err);
        return;
      })
}};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
  document
  .querySelector('.create-account-form')
  .addEventListener('submit', signupFormHandler);
