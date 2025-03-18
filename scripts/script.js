
// //login functionality (challange part)
// document.querySelector('#loginForm button[type="submit"]').addEventListener('click', function (event) {
//   event.preventDefault(); 

//   const username = document.getElementById('username').value.trim();
//   const password = document.getElementById('password').value.trim();

//   if (!username) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Please enter your name!',
//     });
//     return;
//   }

//   if (password !== '123456') {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Incorrect password! Please try again.',
//     });
//     return;
//   }

//   Swal.fire({
//     icon: 'success',
//     title: 'Login Successful!',
//     text: `Welcome, ${username}!`,
//   }).then(() => {
    
//     document.getElementById('banner').classList.add('hidden');
//     document.getElementById('navbar').classList.remove('hidden');
//     document.getElementById('learnVocab').classList.remove('hidden');
//     document.getElementById('FAQ').classList.remove('hidden');
//   });
// });





// vocabulary functionality (main mark)
function loadCategories() {

  // API 1
  fetch("https://openapi.programming-hero.com/api/levels/all")

    .then((res) => res.json())
    .then((data) => displaydata(data.data));
}

function displaydata(btnData){
 const vocabularyContainer = document.getElementById("vocabulary-container");

 for (let btn of btnData) {
  const categoryDiv = document.createElement("div");

  categoryDiv.innerHTML = `
  <button class=" btn btn-outline btn-primary"><img class="mr-1" src="assets/fa-book-open.png" > Lesson -${btn.level_no}</button>
  `;

  vocabularyContainer.append(categoryDiv);
}}
loadCategories();



// Load cards
function loadcards() {

  // API 2
  fetch("https://openapi.programming-hero.com/api/level/5")

    .then((res) => res.json())
    .then((data) => console.log(data.data));
}


loadcards();




// Logout Functionality (challange part)

// document.getElementById('logoutBtn').addEventListener('click', function () {
  
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You are about to log out. Do you want to continue?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, log out!',
//     cancelButtonText: 'Cancel',
//   }).then((result) => {

   
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: 'Logged Out!',
//         text: 'You have been successfully logged out.',
//         icon: 'success',
//         confirmButtonColor: '#3085d6',
//       }).then(() => {

//         document.getElementById('navbar').classList.add('hidden');
//         document.getElementById('learnVocab').classList.add('hidden');
//         document.getElementById('FAQ').classList.add('hidden');
//         document.getElementById('banner').classList.remove('hidden');

//         document.getElementById('username').value = '';
//         document.getElementById('password').value = '';
//       });
//     }
//   });
// });