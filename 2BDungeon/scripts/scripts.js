document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('playAudio').play();
    document.removeEventListener('click', musicPlay);
}