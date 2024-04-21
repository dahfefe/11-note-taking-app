
const getStartedBtn = document.getElementById('getStarted-btn');

getStartedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/notes';
});