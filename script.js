// =======================================================================
//                  All DOM Elements
// =======================================================================
const TextToSpeechToogleBtn = document.getElementById("open");
const formCloseBtn = document.getElementById("close");
const speakBtn = document.getElementById("speak");
const form = document.getElementById("form");
const selectLanguage = document.getElementById("language");
const container = document.getElementById("container");


// =======================================================================
//                  All Required Variables
// =======================================================================
const synth = window.speechSynthesis;
let voices = [];
let images = [
    {
        name: 'astraunout.jpg',
        title: 'Astronaut in Space',
        description: 'A stunning view of an astronaut floating in space with Earth in the background.'
    },
    {
        name: 'deer.jpg',
        title: 'Majestic Deer',
        description: 'A serene image of a deer standing in a lush forest, bathed in soft sunlight.'
    },
    {
        name: 'giraffe.jpg',
        title: 'Giraffe at Sunset',
        description: 'A tall giraffe silhouetted against the setting sun in the African savannah.'
    },
    {
        name: 'horse.jpg',
        title: 'Galloping Horse',
        description: 'A powerful horse running freely in an open field, showcasing its strength and grace.'
    },
    {
        name: 'moon.jpg',
        title: 'Full Moon',
        description: 'A close-up view of a full moon illuminating the night sky with its bright glow.'
    },
    {
        name: 'panda.jpg',
        title: 'Playful Panda',
        description: 'A cute panda bear playing in a bamboo forest, displaying its playful nature.'
    },
    {
        name: 'parrot.jpg',
        title: 'Colorful Parrot',
        description: 'A vibrant parrot perched on a branch, showcasing its colorful feathers.'
    },
    {
        name: 'puppies.jpg',
        title: 'Adorable Puppies',
        description: 'A group of adorable puppies playing together, full of energy and joy.'
    },
    {
        name: 'rabbit.jpg',
        title: 'Cute Rabbit',
        description: 'A fluffy rabbit sitting in a meadow, nibbling on fresh grass.'
    },
    {
        name: 'royal-bike.jpg',
        title: 'Royal Bike',
        description: 'A sleek and stylish royal bike parked against a scenic backdrop.'
    },
    {
        name: 'royalenfield.jpg',
        title: 'Royal Enfield',
        description: 'A classic Royal Enfield motorcycle, a symbol of timeless elegance and power.'
    },
    {
        name: 'tiger.jpg',
        title: 'Fierce Tiger',
        description: 'A fierce tiger prowling through the jungle, showcasing its majestic presence.'
    },
    {
        name: 'triump-bike.jpg',
        title: 'Triumph Bike',
        description: 'A modern Triumph motorcycle, representing speed and adventure on the open road.'
    }
];


// =======================================================================
//                  All Functions
// =======================================================================

// Function to toggle form
function toggleForm() {
    form.classList.toggle("show");
}

// Function to populate select tag for all available voices
const populateVoiceList = () => {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        selectLanguage.appendChild(option);
    }
}

// Function to render images
const setImage = () => {
    container.innerHTML = '';
    images.forEach(data => {
        const box = document.createElement('div');
        box.className = 'box';
        box.setAttribute('data-description', data.description);
        const img = document.createElement('img');
        img.src = `./images/${data.name}`;
        const p = document.createElement('p');
        p.id = 'text-to-speech';
        p.textContent = data.title;
        box.appendChild(img);
        box.appendChild(p);
        container.appendChild(box);

        // Add click event listener to each box
        box.addEventListener('click', () => {
            readDescription(data.description);
        });
    });
}

// Function to read the description
function readDescription(description) {
    const utterThis = new SpeechSynthesisUtterance(description);
    const selectedOption = selectLanguage.selectedOptions[0];
    const lang = selectedOption.getAttribute("data-lang");
    const name = selectedOption.getAttribute("data-name");

    const selectedVoice = voices.find(voice => voice.name === name && voice.lang === lang);
    if (selectedVoice) {
        utterThis.voice = selectedVoice;
    }

    synth.speak(utterThis);
}

// Function to handle text-to-speech from form input
function handleTextToSpeech() {
    const text = document.getElementById("text").value;
    const selectedOption = selectLanguage.selectedOptions[0];
    const lang = selectedOption.getAttribute("data-lang");
    const name = selectedOption.getAttribute("data-name");

    const utterThis = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(voice => voice.name === name && voice.lang === lang);
    if (selectedVoice) {
        utterThis.voice = selectedVoice;
    }

    synth.speak(utterThis);
}

// =======================================================================
//                  All Event Listeners
// =======================================================================

TextToSpeechToogleBtn.addEventListener("click", e => {
    console.log("Clicked");
    console.log("Triggered by text to speech");
    e.preventDefault();
    toggleForm();
});

formCloseBtn.addEventListener("click", (e) => {
    console.log("trigger by form close");
    e.preventDefault();
    toggleForm();
});

form.addEventListener("submit", (e) => {
    console.log("Form submitted");
    e.preventDefault();
    handleTextToSpeech();
});

// init
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

setImage();
