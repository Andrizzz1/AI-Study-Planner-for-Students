const HamMenuBtn = document.querySelector("#HamMenu")
const MobileNav = document.getElementById("MobileNav")

HamMenuBtn.addEventListener("click",()=>{
    MobileNav.classList.toggle("hidden")
})


