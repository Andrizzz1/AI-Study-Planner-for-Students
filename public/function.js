const HamMenuBtn = document.querySelector("#HamMenu")
const MobileNav = document.getElementById("MobileNav")
const Chatbot = document.getElementById("Chatbot")
const OpenChatbot = document.getElementById("Openchatbot")
const ChatbotText = document.getElementById("ChatbotText")
const User = document.getElementById("UserMessage")
const SendMess = document.getElementById("Sendbtn")


async function sendToAI(msg) {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const data = await response.json();
        console.log("Full response:", JSON.stringify(data, null, 2)); // 👈 check this

        // Handle error from Groq
        if (data.error) {
            return `Error: ${data.error.message}`;
        }

        return data.choices[0].message.content; // This should work for Groq

    } catch (error) {
        console.error("Fetch Error:", error);
        return "Error contacting AI";
    }
}



ChatbotText.addEventListener('click',()=>{
    OpenChatbot.classList.toggle("hidden")
    if (ChatbotText.textContent == "Open Chatbot"){
        ChatbotText.textContent = "Close Chatbot"

    }else{
        ChatbotText.textContent = "Open Chatbot"
    }

})

HamMenuBtn.addEventListener("click",()=>{
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
        <p class="text-left bg-indigo-600 inline-block mt-0.5 px-1.5 rounded-md">${lastMessage}</p>
        <img src="/imgs/UserProfile.jpg" alt="UserProfile" class="w-8 rounded-2xl">
        `;
        OpenChatbot.querySelector('div').appendChild(newDiv)

        const aiReply = await sendToAI(lastMessage);
        const botDiv = document.createElement('div');
        botDiv.className = "flex items-center gap-0.5 mt-0.5 justify-start";

        botDiv.innerHTML = `
        <img src="/imgs/BotProfile.png" class="w-8 rounded-2xl">
        <p class="bg-indigo-600  inline-block px-1.5 rounded-md">${aiReply}</p>
        `;

        OpenChatbot.querySelector('div').appendChild(botDiv);
    }else{
        alert("Empty input")
    }
    User.value = '';
})



