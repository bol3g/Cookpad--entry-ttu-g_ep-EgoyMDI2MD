const overlay = document.getElementById("recordOverlay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const saveBtn = document.getElementById("saveBtn");

let stream;
let recorder;
let chunks = [];
let recordedBlob = null;

    startBtn.onclick = async () => {

    chunks = [];
    recordedBlob = null;

    stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: "environment"
            }
        },
        audio: true
    });

    overlay.style.display = "block";

    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };

    recorder.start();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    saveBtn.disabled = true;
};

startBtn.onclick = async () => {

    chunks = [];
    recordedBlob = null;

    stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: "environment"
            }
        },
        audio: true
    });

    overlay.style.display = "block";

    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };

    recorder.start();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    saveBtn.disabled = true;
};

recorder.onstop = () => {

    recordedBlob = new Blob(chunks, {
        type: recorder.mimeType
    });

    stream.getTracks().forEach(track => track.stop());

    overlay.style.display = "none";

    startBtn.disabled = false;
    stopBtn.disabled = true;
    saveBtn.disabled = false;
};

stopBtn.onclick = () => {
    recorder.stop();
};

saveBtn.onclick = () => {

    if (!recordedBlob) return;

    const url = URL.createObjectURL(recordedBlob);

    const a = document.createElement("a");
    a.href = url;

    if (recorder.mimeType.includes("mp4")) {
        a.download = "test.mp4";
    } else {
        a.download = "movie.webm";
    }

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

    saveBtn.disabled = true;
};
