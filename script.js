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

if (chatToggle && chatWindow) {
    chatToggle.addEventListener("click", () => {
        chatWindow.style.display =
            chatWindow.style.display === "flex" ? "none" : "flex";
    });
}

const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const messages = document.getElementById("chat-messages");

const API_KEY = "AQ.Ab8RN6K3-6iQIKxIS3sSrF0tIKvM0RnIHSh9Qps-jUf0IXQecA";

async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    messages.innerHTML += `<p><b>You:</b> ${message}</p>`;
    chatInput.value = "";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        messages.innerHTML += `<p><b>VG:</b> ${reply}</p>`;

    } catch (error) {

        console.error(error);

        messages.innerHTML += `<p><b>VG:</b> Something went wrong. Please try again.</p>`;

    }

    messages.scrollTop = messages.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});
