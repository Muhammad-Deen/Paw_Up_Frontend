
const newChatButton = document.getElementById("new-chat-btn");

const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector(".send-btn");

const fallbackResponses = ["Error in Message"];
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

const getBotReply = async (msg) => {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    return data.reply;
  } catch (error) {
    return "Oops! Something went wrong.";
  }
};

const handleOutgoingMessage = async (e) => {
  e.preventDefault();

  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  messageInput.value = "";
  displayUserMessage(userMessage);
  chatHistory.push({ role: "user", content: userMessage });

  const thinkingDiv = displayBotThinking();

  const botReply = await getBotReply(userMessage); // ✅ Awaiting response
  thinkingDiv.remove();
  displayBotMessage(botReply);
  chatHistory.push({ role: "model", content: botReply });
};

messageInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && messageInput.value.trim()) {
    await handleOutgoingMessage(e);
  }
});

sendMessageButton.addEventListener("click", async (e) => {
  await handleOutgoingMessage(e);
});

