const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2 - 50; // 左右の位置（最初は真ん中）
let rightPressed = false;      // 右キーが押されているか
let leftPressed = false;       // 左キーが押されているか
const speed = 5;               // 動く速さ

// 1. キーが押された時の処理
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
});

// 2. キーが離された時の処理
document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 四角を描画
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 250, 100, 100);

    // 3. 押されているキーに応じて座標を更新
    if (rightPressed && x < canvas.width - 100) {
        x += speed;
    }
    if (leftPressed && x > 0) {
        x -= speed;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();