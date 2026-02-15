const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const images = {
    player: new Image(),
};
images.player.src = './assets/raw_liver.png';

// --- シナリオ設定 ---
const scenario = [
    "画面をタップすると文字が進みます。",
    "こんにちは！私は生レバーです。",
    "生でいっとく？それとも焼きますか？"
];

let currentScene = 0;    // 今何番目のセリフか
let displayText = "";    // 画面に表示する文字列
let charIndex = 0;       // 何文字目まで表示したか
let isTyping = false;    // 文字送り中か
let isChoiceMode = false; // 選択肢を表示中かどうかのフラグ
let answer = "";          // 選んだ結果を保存

// 選択肢のボタン設定
const choiceA = { x: 100, y: 200, w: 600, h: 80, text: "生でいっとく" };
const choiceB = { x: 100, y: 320, w: 600, h: 80, text: "焼きます" };

// 文字送りを開始する関数
function startTyping() {
    displayText = "";
    charIndex = 0;
    isTyping = true;
}

// クリック（タップ）位置を判定する関数
function handleInteraction(event) {
    // スマホとPCで座標の取得方法を統一
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clickX, clickY;

    if (event.touches) {
        clickX = (event.touches[0].clientX - rect.left) * scaleX;
        clickY = (event.touches[0].clientY - rect.top) * scaleY;
    } else {
        clickX = (event.clientX - rect.left) * scaleX;
        clickY = (event.clientY - rect.top) * scaleY;
    }

    if (isChoiceMode) {
        // --- 選択肢モードの時の判定 ---
        if (clickX > choiceA.x && clickX < choiceA.x + choiceA.w && clickY > choiceA.y && clickY < choiceA.y + choiceA.h) {
            selectChoice("だまされたな阿呆が！私は加熱用レバーだ！死ねい！");
        } else if (clickX > choiceB.x && clickX < choiceB.x + choiceB.w && clickY > choiceB.y && clickY < choiceB.y + choiceB.h) {
            selectChoice("おいしーい！");
        }
    } else {
        // --- 通常の会話モードの時の判定 ---
        if (isTyping) {
            displayText = scenario[currentScene];
            charIndex = displayText.length;
            isTyping = false;
        } else {
            currentScene++;
            if (currentScene < scenario.length) {
                startTyping();
            } else if (currentScene === scenario.length) {
                // シナリオが終わったら選択肢モードへ
                isChoiceMode = true;
            } else {
                // 選択後のセリフが終わったら最初に戻る
                currentScene = 0;
                answer = "";
                isChoiceMode = false;
                startTyping();
            }
        }
    }
}

function selectChoice(text) {
    answer = text;
    isChoiceMode = false;
    
    // 文字送りを再開するための設定
    displayText = ""; // 表示をクリア
    charIndex = 0;    // 最初から
    isTyping = true;  // タイピング開始！
    
    // コンソールで動いているか確認用
    console.log("選択結果の文字送りを開始します: " + answer);
}

setInterval(() => {
    if (isTyping) {
        // 現在表示すべき「正解の全文」を決定する
        let fullText = (isChoiceMode === false && answer !== "") ? answer : scenario[currentScene];

        if (fullText && charIndex < fullText.length) {
            displayText += fullText.charAt(charIndex);
            charIndex++;
        } else {
            isTyping = false;
        }
    }
}, 50);

function drawButton(button) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(button.x, button.y, button.w, button.h);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(button.x, button.y, button.w, button.h);
    
    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(button.text, button.x + button.w / 2, button.y + button.h / 2 + 10);
    ctx.textAlign = "left"; // 元に戻す
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (images.player.complete) {
        ctx.drawImage(images.player, 250, 100, 300, 300);
    }

    // メッセージウィンドウ
    ctx.fillStyle = "rgba(0, 0, 50, 0.8)";
    ctx.fillRect(50, 400, 700, 150);
    ctx.strokeStyle = "white";
    ctx.strokeRect(50, 400, 700, 150);

// gameLoop内の文字描画部分
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    
    // 選択肢を選んだ後は answer を表示するが、
    // isTyping が true の間は一文字ずつ増える displayText を優先する
    if (answer && !isTyping) {
        ctx.fillText(answer, 80, 460);
    } else {
        ctx.fillText(displayText, 80, 460);
    }

    // 選択肢モードならボタンを表示
    if (isChoiceMode) {
        drawButton(choiceA);
        drawButton(choiceB);
    }

    requestAnimationFrame(gameLoop);
}

startTyping();
gameLoop();

canvas.addEventListener('mousedown', (e) => handleInteraction(e));
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInteraction(e); });