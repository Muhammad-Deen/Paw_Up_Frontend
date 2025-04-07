// const messageInput = document.querySelector(".message-input") 
// const chatBody = document.querySelector(".chat-body")
// const sendMessageButton = document.querySelector('.send-btn ')

// const userData = {
//     message: null
// }


// // Create message element with dynamic classes and return it
// const createMessageElement = (content, classes) => {
//     const div = document.createElement("div"); 
//     div.classList.add("message", classes); 
//     div.innerHTML = content; 
//     return div; 
// }



// // Handle Outgoing User Messages
// const handleOutgoingMessage = (e) => {
//     e.preventDefault(); 
//     userData.message = messageInput.value.trim(); 
//     messageInput.value = ""; 

//     //create and display User Message 
//     const messageContent = `<div class = "user-message-text"></div>`;

//     const outgoingMessageDiv = createMessageElement(messageContent, "user-message"); 
//     outgoingMessageDiv.querySelector(".user-message-text").textContent = userData.message; 
        
//     chatBody.appendChild(outgoingMessageDiv); 

//     setTimeout(() => {
//         const botMessageContent = `
//             <img class="chatbot-image" src="/assets/Group 2.png"/>
//             <div class="bot-message-text">
//                 <div class="thinking-indicator">
//                     <div class="dot"></div>
//                     <div class="dot"></div>
//                     <div class="dot"></div>
//                 </div>
//             </div>`;

//         const incomingMessageDiv = createMessageElement(botMessageContent, "bot-message");
//         chatBody.appendChild(incomingMessageDiv);
//         chatBody.scrollTop = chatBody.scrollHeight;
//     }, 600); 
// }


// // Handle Enter Key press for sending messages
// messageInput.addEventListener("keydown", (e) => {
//     const userMessage = e.target.value.trim();
//     if (e.key === "Enter" && userMessage) {
//         handleOutgoingMessage(e)
//     }
// })

// sendMessageButton.addEventListener("click", (e) =>  handleOutgoingMessage(e))

const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector(".send-btn");

// Sample fallback responses
const fallbackResponses = [
  "That's interesting! Tell me more.",
  "I'm here to help! 😊",
  "Could you please clarify that?",
  "Thanks for sharing!",
  "Hmm... let me think about that.",
  "Can you explain it in a different way?",
  "Got it! What else would you like to know?"
];

const chatHistory = [];

const createMessageElement = (content, classes) => {
  const div = document.createElement("div");
  div.classList.add("message", classes);
  div.innerHTML = content;
  return div;
};

const displayUserMessage = (text) => {
  const messageContent = `<div class="user-message-text">${text}</div>`;
  const userMessageDiv = createMessageElement(messageContent, "user-message");
  chatBody.appendChild(userMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
};

const displayBotMessage = (text) => {
  const messageContent = `
    <img class="chatbot-image" src="/assets/Group 2.png"/>
    <div class="bot-message-text">${text}</div>`;
  const botMessageDiv = createMessageElement(messageContent, "bot-message");
  chatBody.appendChild(botMessageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
};

const displayBotThinking = () => {
  const thinkingHTML = `
    <img class="chatbot-image" src="/assets/Group 2.png"/>
    <div class="bot-message-text">
      <div class="thinking-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;
  const thinkingDiv = createMessageElement(thinkingHTML, "bot-message");
  chatBody.appendChild(thinkingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  return thinkingDiv;
};

const getBotReply = (msg) => {
  const message = msg.toLowerCase();
  if (message.includes("hello") || message.includes("hi")) return "Hey there! 👋";
  if (message.includes("help")) return "Sure! What do you need help with?";
  if (message.includes("bye")) return "Goodbye! Hope to see you again soon.";
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();

  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  messageInput.value = "";
  displayUserMessage(userMessage);
  chatHistory.push({ role: "user", content: userMessage });

  const thinkingDiv = displayBotThinking();

  setTimeout(() => {
    const botReply = getBotReply(userMessage);
    thinkingDiv.remove();
    displayBotMessage(botReply);
    chatHistory.push({ role: "model", content: botReply });
  }, 1000);
};

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && messageInput.value.trim()) {
    handleOutgoingMessage(e);
  }
});

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));

