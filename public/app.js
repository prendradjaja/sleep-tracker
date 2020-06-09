main();

const displayElement = document.getElementById('display');
const awakeButton = document.getElementById('awake-button');
const pushingIndicator = document.getElementById('pushing-indicator');

function main() {
  refreshDisplay();
}

function displayWakeTimes(wakeTimes) {
  displayElement.innerHTML = wakeTimes
    .map(record => JSON.stringify(record))
    .join('<br>');
}

function refreshDisplay() {
  fetch('/api/wake_times')
    .then(result => result.json())
    .then(data => displayWakeTimes(data))
    .catch(error => console.log('Error'));
}

function handleAwakeClick() {
  const yes = confirm("Push wake time?");
  if (yes) {
    pushWakeTime();
  }
}

function pushWakeTime() {
  awakeButton.classList.add('hidden');
  pushingIndicator.innerText = 'Recording wake time...';
  fetch('/api/wake_times/now', { method: 'PUT' })
    .then(() => {
      // TODO error handling
      pushingIndicator.innerText += ' Done.';
      refreshDisplay();
    });
}
