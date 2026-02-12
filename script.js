// 1. Canvas要素を取得
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. 赤い四角を描画（テスト用）
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

// 3. 文字を表示
ctx.fillStyle = 'black';
ctx.font = '24px Arial';
ctx.fillText('Canvasが正常に動作しています！', 200, 100);