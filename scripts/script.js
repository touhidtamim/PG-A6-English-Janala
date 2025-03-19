//login functionality (challange part)
document.querySelector('#loginForm button[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter your name!',
    });
    return;
  }

  if (password !== '123456') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Incorrect password! Please try again.',
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: `Welcome, ${username}!`,
  }).then(() => {
    
    document.getElementById('banner').classList.add('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    document.getElementById('learnVocab').classList.remove('hidden');
    document.getElementById('FAQ').classList.remove('hidden');
  });
});


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
   <button id="btn-${btn.level_no}" onclick="loadSpecificCard(${btn.level_no})" class="mb-10 btn btn-outline btn-primary"><img class="mr-1" src="assets/fa-book-open.png" > Lesson -${btn.level_no}</button>
   `;
 
   vocabularyContainer.append(categoryDiv);
 }}
 loadCategories();


// load specific card
const loadSpecificCard = (level_no) => {
  showLoader();

  document.getElementById("defaultText").classList.add("hidden");

  // API 2
  const url = `https://openapi.programming-hero.com/api/level/${level_no}`


  fetch(url)
  .then((res) => res.json())
  .then((result) => {

    removeActiveClass();

    const clickedButton = document.getElementById(`btn-${level_no}`);
    clickedButton.classList.add("active");
    displayCards(result.data) 
    hideLoader();
  
  });
}


// Active btn
function removeActiveClass () {
  const activeButtons = document.getElementsByClassName("active")
  
for ( let btn of activeButtons) {
  btn.classList.remove("active")
}
}

// Loader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("cards-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("cards-container").classList.remove("hidden");
};


// Load cards
function loadcards() {

  // API 4
  fetch("https://openapi.programming-hero.com/api/words/all")

    .then((res) => res.json())
    .then((data) => displayCards(data.data));
}

// display cards
function displayCards(cardData){
  const cardContainer = document.getElementById("cards-container");

  cardContainer.innerHTML = "";

  if (cardData.length == 0){
    cardContainer.innerHTML =`
     <div class=" col-span-3 flex flex-col justify-center items-center bg-gray-100  border rounded-lg border-gray-50 mb-10">
          <img class="mt-10 mb-5" src="assets/alert-error.png" alt="">
          <p class="text-hind text-center text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
          <h2 class="text-3xl font-medium text-center mt-5 mb-10">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    return;


  }

  for (let card of cardData) {
   const cardsDiv = document.createElement("div");
 
   cardsDiv.innerHTML = `
   <div class="m-3 card card-border">
   <div class="card-body bg-white rounded-lg">
            <h2 class="text-2xl font-bold text-center  mb-6">${card.word || 'No word available'}</h2>
            <p class="text-base font-medium text-center mb-6">Meaning / Pronounciation</p>
            <p class="text-lg font-semibold text-[#18181B90] text-center mb-10">${card.meaning || 'এই শব্দের অর্থ পাওয়া যায়নি'} / ${card.pronunciation  || 'উচ্চারণ তথ্য অনুপস্থিত'}</p>
            
            <div class="card-actions justify-between mx-4">
              <button onclick=loadModals(${card.id})  ><i class=" btn p-2 bg-[#1A91FF10] rounded-xl text-xl fa-solid fa-circle-info"></i></button>
             <button class=" btn p-2 bg-[#1A91FF10] rounded-xl" href="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
              </svg>
              
             </button>
              
            </div>
          </div>
   </div>
   `;
 
   cardContainer.append(cardsDiv);
 }
}

// MODALS

const loadModals = (modalId)  => {
  
  const url = `https://openapi.programming-hero.com/api/word/${modalId}`;

  fetch(url)
  .then((res) => res.json())
  .then((data) => displayModals(data.data));
}

const displayModals = (data) => {

  document.getElementById("word_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML =`
  
  <h1 class="text-xl font-bold mb-6">${data.word  || 'No word available'}  (<i class="fa-solid fa-microphone-lines"></i>  ${data.pronunciation || 'উচ্চারণ তথ্য অনুপস্থিত' }   )</h1>

      <h3 class="text-lg font-medium mb-2">Meaning</h3>
      <p class=" text-xl font-normal text-hind mb-4">${data.meaning || 'এই শব্দের অর্থ পাওয়া যায়নি'}</p>

      <h3 class="text-lg font-medium mb-2">Example</h3>
      <p class="text-lg font-normal mb-7">${data.sentence  || 'এই শব্দের কোনো বাক্য উদাহরণ নেই'}</p>

      <h3 class="text-xl text-hind font-medium mb-3">সমার্থক শব্দ গুলো</h3>
      <ul class="flex gap-4">
        <li class=" p-3 bg-[#EDF7FF] rounded-lg">${data.synonyms[0] || 'কোনো সমার্থক শব্দ পাওয়া যায়নি'}</li>
        <li class=" p-3 bg-[#EDF7FF] rounded-lg">${data.synonyms[1] || 'কোনো সমার্থক শব্দ পাওয়া যায়নি'}</li>
        <li class=" p-3 bg-[#EDF7FF] rounded-lg">${data.synonyms[2] || 'কোনো সমার্থক শব্দ পাওয়া যায়নি'}</li>
      </ul> 
  
  `
};

document.getElementById('completeLearningBtn').addEventListener('click', function () {
  document.getElementById('word_details').close();
});


//log-out functionality (challange part)
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('logoutBtn').addEventListener('click', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out. Do you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          document.getElementById('navbar').classList.add('hidden');
          document.getElementById('learnVocab').classList.add('hidden');
          document.getElementById('FAQ').classList.add('hidden');
          document.getElementById('banner').classList.remove('hidden');

          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        });
      }
    });
  });
});

