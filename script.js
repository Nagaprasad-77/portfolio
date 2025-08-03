// Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleSidebar = document.getElementById("themeToggleSidebar");
    const body = document.body;

    function toggleTheme() {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    }

    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleSidebar?.addEventListener("click", toggleTheme);

    // Apply saved theme on load
    window.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        body.classList.add("dark-mode");
      }
      highlightCurrentSection();
      setupScrollTop();
    });

    // Scroll highlight
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    function highlightCurrentSection() {
      let scrollY = window.scrollY;
      sections.forEach((section) => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= offset && scrollY < offset + height) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", () => {
      highlightCurrentSection();
      toggleScrollTop();
    });

    // Scroll to top button
    function setupScrollTop() {
      const scrollTopBtn = document.getElementById("scrollTop");
      
      function toggleScrollTop() {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      }
      
      scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
      
      window.addEventListener("scroll", toggleScrollTop);
      toggleScrollTop();
    }

    // Contact form submission
    const form = document.getElementById("contactForm");
    const statusMessage = document.getElementById("formStatus");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      statusMessage.textContent = "Sending your message...";
      
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          statusMessage.textContent = "✓ Message sent successfully!";
          form.reset();
        } else {
          statusMessage.textContent = "⚠️ Something went wrong. Please try again.";
        }
      } catch (error) {
        statusMessage.textContent = "⚠️ Network error. Please check your connection.";
      }

      setTimeout(() => {
        statusMessage.textContent = "";
      }, 5000);
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarNavLinks = document.querySelectorAll('.sidebar .nav-links a');

    // Open sidebar
    menuBtn?.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close sidebar
    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a nav link
    sidebarNavLinks.forEach(link => {
      link.addEventListener('click', closeSidebar);
    });

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });