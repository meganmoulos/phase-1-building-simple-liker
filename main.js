// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// When user clicks an empty heart
// Invoke mimicServerCall to simulate making a server request

const likeHeartArr = document.querySelectorAll('.like-glyph')

likeHeartArr.forEach(e => {
  e.addEventListener('click', () => {

    // When a user clicks on a full heart change the heart back to an empty heart and remove the activated-heart class
    if (e.style.color === 'red') {
      e.classList.remove('activated-heart')
      e.textContent = EMPTY_HEART
      e.style.color = ''
      return
    }
    let promiseResult = mimicServerCall(e)

    // When the server returns a failure status respond to the error with a catch block after the then block
    // When the server returns a success status change the heart to a full heart
    promiseResult.then(() => {
      console.log('success')
      e.classList.add('activated-heart')
      e.style.color = 'red'
      e.textContent = FULL_HEART
    })

    // Display the error modal and modal message if rejected
    .catch(() => {
      document.querySelector('#modal').classList.remove('hidden')
      document.getElementById('modal-message').textContent = 'Random server error. Try again.'
      
    // SetTimeout for error modal to 3 seconds
    setTimeout(function() {
      document.querySelector('#modal').classList.add('hidden')
    }, 3000)
    })
  })
})



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

