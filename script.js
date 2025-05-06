// Mobile Navbar Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Services Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanels.forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId)?.classList.add("active");
  });
});

// Map Region Tabs
const locButtons = document.querySelectorAll(".loc-btn");
const mapFrame = document.getElementById("mapFrame");

const mapLinks = {
  ny: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.981040179041!2d-73.8445390875717!3d40.78443097126362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e95aaaaaaab%3A0xa9ffe3f1b3a2c085!2sPatriot%20Electric%20Corp.!5e0!3m2!1sen!2sus!4v1746466066019!5m2!1sen!2sus",
  nj: "https://www.google.com/maps/embed?pb=YOUR_NJ_EMBED_URL",
  fl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28644.027895967607!2d-80.17695902037251!3d26.180295077706138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d90103c8d3816d%3A0xe399fd6e7c35ce69!2sOakland%20Park%2C%20FL!5e0!3m2!1sen!2sus!4v1746478291165!5m2!1sen!2sus",
  tc: "https://www.google.com/maps/embed?pb=YOUR_TC_EMBED_URL",
};

locButtons.forEach(button => {
  button.addEventListener("click", () => {
    locButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const region = button.getAttribute("data-map");
    if (mapLinks[region]) {
      mapFrame.src = mapLinks[region];
    }
  });
});

// Counter Animation
function animateCounter(element) {
  const target = +element.getAttribute('data-target');
  const isDecimal = element.dataset.target.includes('.');
  const increment = target / 80;
  let current = 0;

  const update = () => {
    current += increment;
    if (current >= target) {
      element.textContent = isDecimal ? target.toFixed(2) : Math.floor(target);
    } else {
      element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
      requestAnimationFrame(update);
    }
  };

  update();
}

// Use IntersectionObserver to animate when in view
const counters = document.querySelectorAll('.count-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  observer.observe(counter);
});
