const url = 'wss://fep-app.herokuapp.com';
const userNameEl = document.getElementById('username');
const messageEl = document.getElementById('message');
const buttonSendEl = document.getElementById('buttonSend');
const chatContainerEl = document.getElementById('chatContainer');

let socket = null;

function initConnection() {
    socket = new WebSocket(url);

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        showMessage(data);
    }
}

function send(msg) {
    if (socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify(msg))
    }
}

initConnection();

// ----


buttonSendEl.addEventListener('click', onBtnSubmitClick);

function onBtnSubmitClick() {    
    send({
        type: "message",
        payload: {
            username: userNameEl.value,
            message: messageEl.value,
        },
    });
    resetForm();
}

function showMessage(data) {
    return chatContainerEl.insertAdjacentHTML('beforeend',
        `<p> ${data.payload.username}: <span class="text">${data.payload.message}</span></p>`
    );
}

function resetForm() {
    messageEl.value = ``;
}
