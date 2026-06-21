console.log('Javascript已連結 準備進行互動...');
let visitorname = prompt("你好,我是你的助理,請問我應該要怎麽稱呼您:");

if (visitorname === '' || visitorname === null){
    visitorname = '訪客';
}

window.alert('Hello ' + visitorname + ',歡迎來到我的網站!');

const logoElememt = document.getElementById('main-logo');
logoElememt.innerText = '11173107 ' + visitorname + "'s website";

const titleElememt = document.getElementById('hero-title');
titleElememt.innerHTML = `我的未來, 由<span class='highlight'>${visitorname}</span> 主宰`;

function changeColor(){
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

// ==========================================================================
//彈出式視窗開關邏輯
// ==========================================================================
const todoModal = document.getElementById('todo-modal');
const todoNavBtn = document.getElementById('todo-nav-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

// 點擊導覽列開啟視窗
todoNavBtn.addEventListener('click', function(e) {
    e.preventDefault(); // 防止超連結跳頁
    todoModal.style.display = 'flex';
});

// 點擊叉叉關閉視窗
closeModalBtn.addEventListener('click', function() {
    todoModal.style.display = 'none';
});

// 點擊視窗外部（暗色背景）也能關閉
window.addEventListener('click', function(e) {
    if (e.target === todoModal) {
        todoModal.style.display = 'none';
    }
});


// ==========================================================================
//To-Do List
// ==========================================================================
if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
}

function notifyUser(task, time) {
    if (Notification.permission === "granted") {
        new Notification("任務提醒", {
            body: `提醒時間到囉！該去做：${task} (${new Date(time).toLocaleString()})`
        });
    }
}

function scheduleReminder(task, time) {
    const now = new Date();
    const reminderTime = new Date(time);
    const delay = reminderTime - now;

    if (delay > 0) {
        setTimeout(() => {
            notifyUser(task, time);
        }, delay);
    }
}

function insertTodoItem(text, time) {
    const todoList = document.getElementById('todo-list');
    
    const li = document.createElement("li");
    li.className = "todo-item";

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = text;
    li.appendChild(textSpan);

    const timeSpan = document.createElement("span");
    timeSpan.className = "todo-time-text";
    timeSpan.textContent = time 
        ? `⏰ 提醒時間：${new Date(time).toLocaleString()}` 
        : "💡 沒有設定提醒時間";
    li.appendChild(timeSpan);

    li.onclick = function() {
        this.classList.toggle("completed");
    };

    li.ondblclick = function() {
        this.remove();
    };

    todoList.appendChild(li);

    if (time) {
        scheduleReminder(text, time);
    }
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const timeInput = document.getElementById('todo-time');
    const newTodoText = input.value.trim();
    const reminderTime = timeInput.value;

    if (newTodoText !== "") {
        insertTodoItem(newTodoText, reminderTime);

        input.value = "";
        timeInput.value = "";
    } else {
        alert('請先輸入提醒事項!!');
    }
}


// ==========================================================================
//AI 助理對話框邏輯
// ==========================================================================
const SendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const aiResponse = document.getElementById("ai-response");

SendBtn.addEventListener('click', function(){
    const userMessage = userInput.value.trim();
    if (userMessage === ""){
        alert('請先輸入指令!!');
        return;
    }

    setTimeout(function() {
        if (userMessage.startsWith('新增') || userMessage.includes('新增 ')) {
            const taskText = userMessage.replace(/^新增\s*/, '').trim();
            
            if (taskText === "") {
                aiResponse.innerText = 'AI助理: 請問您要新增什麼待辦事項呢？（例如輸入：新增 買牛奶）';
            } else {
                insertTodoItem(taskText, "");
                aiResponse.innerText = `AI助理: 已幫您將「${taskText}」加入待辦清單囉！你可以點擊上方「我的待辦事項」去查看。`;
            }
        } 
        else if (userMessage.includes('你好') || userMessage.includes('哈囉')) {
            aiResponse.innerText = 'AI 助理:您好呀〜今天過得還好嗎?';
        } 
        else if (userMessage.includes('功能') || userMessage.includes('做什麼')) {
            aiResponse.innerText = 'AI助理:我可以陪你聊天、幫你換標題的顏色，還能用「新增 任務名稱」指令直接幫你把事情記錄到待辦清單喔！';
        } 
        else if (userMessage.includes('學校') || userMessage.includes('東吳')) {
            aiResponse.innerText = 'AI 助理:東吳大學是個學習網頁設計最棒的地方!';
        } 
        else if (userMessage.includes('淺色') || userMessage.includes('白天')) {
            document.body.className = 'theme-light';
            aiResponse.innerText = 'AI 助理:已為您切換至【白天淺色模式】。';
        } 
        else if (userMessage.includes("綠色") || userMessage.includes("駭客") || userMessage.includes('矩陣')){
            document.body.className = "theme-matrix";
            aiResponse.innerText = "AI助理:已啟動【駭客矩陣模式】!";
        }
        else if (userMessage.includes("深色") || userMessage.includes("晚上") || userMessage.includes('預設')) {
            document.body.className = ""; //清除所有主題
            aiResponse.innerText = "AI 助理:已為您恢復至【預設深色模式】。";
        }
        else {
            aiResponse.innerText = "我收到你的訊息「" + userMessage + "」了!不過我目前還沒開發此功能～";
        }
        
    }, 300);

    userInput.value = "";
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        SendBtn.click(); 
    }
});
