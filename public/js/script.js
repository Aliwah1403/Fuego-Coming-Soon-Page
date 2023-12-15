// Getting and displaying current time
let time = document.getElementById('current-time');

setInterval(() => {
  let d = new Date()
  time.innerHTML = d.toLocaleTimeString() + ' NRB';
}, 1000)

// Fade In animation
window.addEventListener('load', () => {
  const inputBox = document.querySelector('.email-content');
  inputBox.classList.add('active');
})