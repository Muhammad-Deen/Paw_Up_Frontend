const messageInput = document.querySelector(".message-input") 
const chatBody = document.querySelector(".chat-body")
const sendMessageButton = document.querySelector('.send-btn ')

const userData = {
    message: null
}


// Create message element with dynamic classes and return it
const createMessageElement = (content, classes) => {
    const div = document.createElement("div"); 
    div.classList.add("message", classes); 
    div.innerHTML = content; 
    return div; 
}



// Handle Outgoing User Messages
const handleOutgoingMessage = (e) => {
    e.preventDefault(); 
    userData.message = messageInput.value.trim(); 
    messageInput.value = ""; 

    //create and display User Message 
    const messageContent = `<div class = "user-message-text"></div>`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message"); 
    outgoingMessageDiv.querySelector(".user-message-text").textContent = userData.message; 
        
    chatBody.appendChild(outgoingMessageDiv); 

    
}


// Handle Enter Key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutgoingMessage(e)
    }
})

sendMessageButton.addEventListener("click", (e) =>  handleOutgoingMessage(e))