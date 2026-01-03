let voiceSelect = document.getElementById("voiceSelect");
let languageSelect = document.getElementById("languageSelect");

let voices = [];
let utterance = null;

// Load voices safely
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    if (voices.length === 0) {
        let option = document.createElement("option");
        option.textContent = "No voices available";
        voiceSelect.appendChild(option);
        return;
    }

    voices.forEach((voice, index) => {
        if (voice.lang.startsWith(languageSelect.value)) {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        }
    });
}

// Load voices when browser is ready
window.speechSynthesis.onvoiceschanged = loadVoices;
window.onload = loadVoices;

languageSelect.addEventListener("change", loadVoices);

function speakText() {
    let text = document.getElementById("text").value;

    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    if (voices.length === 0) {
        alert("Voices not loaded yet. Please wait 2 seconds and try again.");
        return;
    }

    utterance = new SpeechSynthesisUtterance(text);

    let selectedVoiceIndex = voiceSelect.value;
    if (selectedVoiceIndex !== "") {
        utterance.voice = voices[selectedVoiceIndex];
    }

    utterance.rate = document.getElementById("rate").value;
    utterance.pitch = document.getElementById("pitch").value;
    utterance.volume = document.getElementById("volume").value;

    speechSynthesis.cancel(); // stop previous speech
    speechSynthesis.speak(utterance);
}

function pauseSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
}

function resumeSpeech() {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}

function stopSpeech() {
    speechSynthesis.cancel();
}
