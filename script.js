// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});
// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const desktopNav = document.querySelector(".desktop-nav");

console.log(typeof menuToggle);
console.log(typeof desktopNav);

if (menuToggle && desktopNav) {
    menuToggle.addEventListener("click", () => {
        console.log("clicked");
        desktopNav.classList.toggle("active");
    });
}// Close mobile menu after clicking a link
document.querySelectorAll(".desktop-nav a").forEach(link => {
    link.addEventListener("click", () => {
        desktopNav.classList.remove("active");
    });
});
// ================= AI CHATBOT =================

const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");

chatToggle.addEventListener("click", () => {
    if (chatWindow.style.display === "flex") {
        chatWindow.style.display = "none";
    } else {
        chatWindow.style.display = "flex";
    }
});
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const messages = document.getElementById("chat-messages");

const API_KEY = "AQ.Ab8RN6JZbpSdKViwcH-2jhgv9-KdSseGOFw88Jiz7STmBEIgGA";

async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    messages.innerHTML += `<p><b>You:</b> ${message}</p>`;

    chatInput.value = "";

    const response = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "command-r-plus",
            message: message
        })
    });

    const data = await response.json();

console.log(data);

messages.innerHTML += `<p><b>VG:</b> ${data.text || JSON.stringify(data)}</p>`;

    messages.scrollTop = messages.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});
