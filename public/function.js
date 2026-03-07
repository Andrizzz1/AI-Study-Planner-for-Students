const HamMenuBtn = document.querySelector("#HamMenu")
const MobileNav = document.getElementById("MobileNav")
const Chatbot = document.getElementById("Chatbot")
const OpenChatbot = document.getElementById("Openchatbot")
const ChatbotText = document.getElementById("ChatbotText")
const User = document.getElementById("UserMessage")
const SendMess = document.getElementById("Sendbtn")
const MessagesArea = document.getElementById("MessagesArea")

async function sendToAI(msg) {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: msg })
        });

        // ADD THESE DEBUG LINES
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Full response:", data);  // see exactly what's coming back

        if (!response.ok) {
            return `API Error: ${data.error?.message || response.status}`;
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error("Fetch Error:", error);
        return "Error contacting AI";
    }
}


ChatbotText.addEventListener('click', () => {
    if (ChatbotText.textContent == "Open Chatbot") {
        OpenChatbot.classList.replace('hidden', 'flex')
        ChatbotText.textContent = "Close Chatbot"
    } else {
        OpenChatbot.classList.replace('flex', 'hidden')
        ChatbotText.textContent = "Open Chatbot"
    }
})

HamMenuBtn.addEventListener("click", () => {
    MobileNav.classList.toggle("hidden")
})
UserMsgList = []
SendMess.addEventListener('click', async ()=>{
    const msg = User.value.trim();
    if (msg !== ""){
        UserMsgList.push(msg)
        const lastMessage = UserMsgList[UserMsgList.length - 1]
        const newDiv = document.createElement('div')
        newDiv.className = "flex items-center gap-0.5 mt-0.5 justify-end";
        newDiv.innerHTML = `
        <p class="text-left bg-indigo-600 inline-block mt-0.5 px-1.5 rounded-md text-xs">${lastMessage}</p>
        <img src="/imgs/UserProfile.jpg" alt="UserProfile" class="w-8 rounded-2xl">
        `;
        MessagesArea.appendChild(newDiv) 

        const aiReply = await sendToAI(lastMessage);
        const botDiv = document.createElement('div');
        botDiv.className = "flex justify-start items-start";

      botDiv.innerHTML = `
        <img src="/imgs/BotProfile.png" style="width:32px; height:32px; border-radius:50%; object-fit:cover; flex-shrink:0; margin-top:auto;">
        <p class="bg-indigo-600 inline-block  rounded-md text-xs">${aiReply}</p>
        `;

        MessagesArea.appendChild(botDiv);
    }else{
        alert("Empty input")
    }
    User.value = '';
})



