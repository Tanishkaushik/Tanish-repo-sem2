
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(soundType) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (soundType === 'kick') {
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    } else if (soundType === 'snare') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (soundType === 'hihat') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(10000, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (soundType === 'clap') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
}

const keyMap = {
    'a': 'kick',
    's': 'snare',
    'd': 'hihat',
    'f': 'clap'
};

document.querySelectorAll('.pad').forEach(pad => {
    pad.addEventListener('click', () => {
        const sound = keyMap[pad.getAttribute('data-key')];
        playSound(sound);
        pad.classList.add('playing');
        setTimeout(() => pad.classList.remove('playing'), 100);
    });
});

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
        const sound = keyMap[key];
        playSound(sound);
        const pad = document.querySelector(`.pad[data-key="${key}"]`);
        if (pad) {
            pad.classList.add('playing');
            setTimeout(() => pad.classList.remove('playing'), 100);
        }
    }
});
