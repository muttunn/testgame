const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 画像の読み込み
const images = {
    player: new Image(),
    window: new Image()
};
images.player.src = './assets/raw_liver.png';
// images.window.src = './assets/window.png'; // ウィンドウ画像を用意したらコメント解除

// ゲームの状態管理
let gameState = {
    sceneIndex: 0,
    isMessageFinished: false
};

// クリック・タップされた時の処理
canvas.addEventListener('mousedown', (e) => {
    handleInteraction();
});

// スマホのタップ用（念のため）
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // スクロールなどを防止
    handleInteraction();
});

function handleInteraction() {
    console.log("画面がクリックされました！");
    // ここでメッセージを送る処理を後で書きます
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // キャラクターの描画
    if (images.player.complete && images.player.naturalWidth !== 0) {
        ctx.drawImage(images.player, 250, 100, 300, 300);
    }

    // メッセージウィンドウの描画（仮の四角）
    ctx.fillStyle = "rgba(0, 0, 50, 0.7)"; // 半透明の紺色
    ctx.fillRect(50, 400, 700, 150);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 400, 700, 150);

    requestAnimationFrame(gameLoop);
}

gameLoop();