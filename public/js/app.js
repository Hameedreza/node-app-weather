// const forecast = require("../../src/utils/forecast");

// console.log('Client side Javascript file is loaded');

// fetch('http://localhost:3000/weather?address=boston').then( response =>{
//   response.json().then( data =>{
//     if(data.error){
//       return console.log(data.error);
//     }
//     console.log(data.location);
//     console.log(data.forecast);
//   })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit' , (event) =>{
  event.preventDefault();
  messageOne.textContent = '';
  const location = search.value;
  
  messageOne.textContent = 'Loading message...';
  fetch('http://localhost:3000/weather?address=' + location).then(response =>{
    response.json().then(data =>{
      if(data.error){
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      }else{
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
      }
    })
  })
  
});