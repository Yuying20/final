//1. 傳送某一段話控制台
console.log('Javascript已連結 準備進行互動...');

//2.詢問使用者的姓名
let visitorname = prompt("你好,我是你的助理,請問我應該要怎麽稱呼您:");

if (visitorname === ''|| visitorname === null){
    visitorname ='訪客'
}

window.alert('Hello ' + visitorname+',歡迎來到我的網站!');

const logoElememt = document.getElementById('main-logo');
logoElememt.innerText = '11173107' + visitorname + "'s website";

const titleElememt = document.getElementById('hero-title');
titleElememt.innerHTML = `我的未來, 由<span class='highlight'>${visitorname}</span> 主宰`;

function  changeColor(){
    const highlight = document.querySelector(".highlight");
    if (highlight.style.color === "red"){
        highlight.style.color = "#38bdf8";
    } else{
        highlight.style.color = "red";
    }
} 

function viewSource() {
    alert("想看原始碼嗎？請在網頁上按右鍵選擇「檢查」或 F12，就可以看到完整的架構囉！");
}

const SendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const aiResponse = document.getElementById("ai-response");

SendBtn.addEventListener('click', function(){
    const userMessage = userInput.value;
    if (userMessage===""){
            alert('請先輸入指令唷!!')
            return;
    }

    setTimeout(function() {
    
        if (userMessage.includes('你好') || userMessage.includes('哈囉')) {
            aiResponse.innerText='AI 助理:您好呀〜今天過得還好嗎?';
        } 
        else if (userMessage.includes('功能' ) || userMessage.includes('做什麼')) {
            aiResponse.innerText='AI助理:我可以陪你聊天、幫你換標題的顏色!';
        } 
        else if (userMessage.includes('學校') || userMessage.includes('東吳')) {
            aiResponse.innerText='AI 助理:東吳大學是個學習網頁設計最棒的地方!';
        } 
        else if (userMessage.includes('淺色') || userMessage.includes('白天')) {
            document.body.className ='theme-light'
            aiResponse.innerText='AI 助理:您好呀〜今天過得還好嗎?';
        } 
        //判斷指令二:切換至駭客任務模式
        else if (userMessage.includes("綠色") || userMessage.includes("駭客") || userMessage.includes('矩陣')){
            document.body.className = "theme-matrix";
            aiResponse.innerText = "AI助理:已啟動【駭客矩陣模式】!";
        }
        //判斷指令三:恢復深色模式
        else if (userMessage.includes("深色") | userMessage.includes("晚上") || userMessage.includes('預設')) {
            document.body.className = ""; //清除所有主題,回到預設深色
            aiResponse.innerText ="AI 助理:已為您恢復至【預設深色模式】。";}
        else {
            aiResponse.innerText="我收到你的訊息「" + userMessage + "」了!不過我目前還沒開發此功能～";
        }
        
    }, 300);

    userInput.value =""
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        SendBtn.click(); // 模擬點擊發送按鈕
    }
});