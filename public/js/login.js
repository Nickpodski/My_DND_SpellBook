loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const book = document.getElementById("book");

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
// *********************  NEED BOOK TO BE RESPONSIVE ****************************
// $(window).width(function(){
//   var win = $(this); //this = window
//   if (win.width() >= 820) { book.turn('display','double');}
//   else {
//     book.turn('display','single');
//   }
// });
// $(window).resize(function(){
// var win = $(this); //this = window
// if (win.width() >= 820) { book.turn('display','double');}
// else {
//   book.turn('display','single');
// }
// });


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
