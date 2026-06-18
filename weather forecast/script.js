// Initialize Web Audio Context dynamically on first user interaction
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Synthesizer Audio Engines
const synthSounds = {
    kick: () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    },
    snare: () => {
        // White noise generation for snare snap
        const bufferSize = audioCtx.sampleRate * 0.2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
    },
    hihat: () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'square';
        filter.type = 'highpass';
        filter.frequency.value = 7000;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);
    },
    clap: () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);

        gain.connect(audioCtx.destination);
        osc.connect(gain);

        // Mimic handclap burst density
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.02);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.15);
    }
};

// Core Execution Trigger
function playSound(key) {
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const pad = document.querySelector(`.pad[data-key="${key.toLowerCase()}"]`);
    if (!pad) return;

    // Trigger visual pop state
    pad.classList.add('playing');
    setTimeout(() => pad.classList.remove('playing'), 70);

    // Trigger audio block mapping
    if (key === 'a' || key === 'A') synthSounds.kick();
    if (key === 's' || key === 'S') synthSounds.snare();
    if (key === 'd' || key === 'D') synthSounds.hihat();
    if (key === 'f' || key === 'F') synthSounds.clap();
}

// User Interaction Hook listeners
window.addEventListener('keydown', (e) => playSound(e.key));

document.querySelectorAll('.pad').forEach(pad => {
    pad.addEventListener('click', () => {
        const key = pad.getAttribute('data-key');
        playSound(key);
    });
});