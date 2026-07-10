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
