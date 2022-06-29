const socket = io()


const formMessage = document.querySelector('#formMessage')
const messageInput = document.querySelector('#messageInput')
const usernameInput = document.querySelector('#usernameInput')
const messagesPool = document.querySelector('#messagesPool')

function sendMessage(){
    try{
        const username = usernameInput.value
        const message = messageInput.value
        
        socket.emit('client:message', {username, message})
    }catch(err){
        console.log(`Hubo un error: ${err}`)
    }
}

function renderMessages(messagesArray){
    try{
        const html = messagesArray.map(messageInfo => {
            return(`<div>
                <strong>${messageInfo.username}</strong>:
                <em>${messageInfo.message}</em> </div>`)
        }).join(" ");
        messagesPool.innerHTML = html
    }catch(err){

        console.log(`Hubo un error: ${err}`)
    }
}


formMessage.addEventListener('submit', event=>{
    event.preventDefault()
    sendMessage()
})

socket.on('server:message', renderMessages);