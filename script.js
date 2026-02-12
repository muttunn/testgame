const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 50; // 四角形のX座標（横の位置）

function gameLoop() {
    // 1. 画面をいったん真っさらに消す（これがないと残像が残る）
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 四角形を描画する
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 50, 100, 100);

    // 3. 座標を少しずつ更新する
    x += 2;

    // 4. 画面端に行ったら左に戻る（ループ処理）
    if (x > canvas.width) {
        x = -100;
    }

    // 5. 次のフレームでも自分自身（gameLoop）を呼び出す
    requestAnimationFrame(gameLoop);
}

// 最初の実行
gameLoop();

// 3. 文字を表示
ctx.fillStyle = 'black';
ctx.font = '24px Arial';
ctx.fillText('きをつけな だんなの うごきは KGBに よまれてるぜ', 200, 100);