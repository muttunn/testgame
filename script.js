const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. 画像オブジェクトを作成
const playerImg = new Image();
playerImg.src = './assets/raw_liver.png'; // 自分のファイル名に合わせてください

let x = canvas.width / 2 - 50;
let rightPressed = false;
let leftPressed = false;
const speed = 5;

// キー操作の設定（前回と同じ）
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 画像を描画する
    // ctx.drawImage(画像変数, x座標, y座標, 幅, 高さ)
    if (playerImg.complete) { // 画像の読み込みが完了しているか確認
        ctx.drawImage(playerImg, x, 450, 100, 100);
    } else {
        // 画像が読み込まれるまでは代わりに四角を出しておく（エラー防止）
        ctx.fillStyle = 'red';
        ctx.fillRect(x, 450, 100, 100);
    }

    if (rightPressed && x < canvas.width - 100) x += speed;
    if (leftPressed && x > 0) x -= speed;

    requestAnimationFrame(gameLoop);
}

gameLoop();