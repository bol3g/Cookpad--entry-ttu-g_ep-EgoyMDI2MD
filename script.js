const overlay = document.getElementById("recordOverlay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let stream;
let recorder;
let chunks = [];startBtn.onclick = async () => {

    chunks = [];

    stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: "environment"
            }
        },
        audio: true
    });

    // 録画開始で黒画面表示
    overlay.style.display = "block";

    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };

    recorder.onstop = () => {

        const blob = new Blob(chunks, {
            type: recorder.mimeType
        });

        const url = URL.createObjectURL(blob);

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

        stream.getTracks().forEach(track => track.stop());

        // 黒画面を非表示
        overlay.style.display = "none";

        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recorder.start();

    startBtn.disabled = true;
    stopBtn.disabled = false;
};

stopBtn.onclick = () => {
    recorder.stop();
};
