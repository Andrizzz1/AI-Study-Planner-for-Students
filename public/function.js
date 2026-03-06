const HamMenuBtn = document.querySelector("#HamMenu")
const MobileNav = document.getElementById("MobileNav")
const Chatbot = document.getElementById("Chatbot")
const OpenChatbot = document.getElementById("Openchatbot")
const ChatbotText = document.getElementById("ChatbotText")
const User = document.getElementById("UserMessage")
const SendMess = document.getElementById("Sendbtn")

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
SendMess.addEventListener('click',()=>{
    const msg = User.value.trim();
    if (msg !== ""){
        UserMsgList.push(msg)
    }else{
        alert("Empty input")
    }
    User.value = '';
})



