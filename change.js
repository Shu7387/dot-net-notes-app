/**
 * Header Management Script
 *
 * This script handles:
 * 1. Injecting header HTML into the page
 * 2. Highlighting the active navigation link
 * 3. Hiding/showing header on scroll
 * 4. Dropdown menu functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  // ====================================
  // 1. INJECT HEADER HTML
  // ====================================

  const headerHTML = `
    <header class="app-header">
      <nav>
        <a href="SQL.html">SQL</a>
        <a href="CSharp.html">C#</a>
        <a href="WebAPI.html">Web API</a>
        <a href="MVC.html">MVC</a>
        <a href="JS.html">Javascript</a>
        <a href="TS.html">Typescript</a>
        <a href="Angular.html">Angular</a>
        <a href="GitDocker.html">DevOps</a>

        <div class="nav-right">
          <div class="dropdown">
            <button class="dropdown-btn">☰ Shubham</button>
            <div class="dropdown-menu">
              <a href="#">Azure</a>
              <hr />
              <a href="https://github.com/Shu7387">Github</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;

  // Insert header at the beginning of body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // ====================================
  // 2. HIGHLIGHT ACTIVE NAVIGATION LINK
  // ====================================

  // Extract current page filename from URL path
  // Example: "/Notes/SQL.html" -> "SQL.html"
  const currentPage = location.pathname.split("/").pop();

  // Loop through all navigation links and add "active" class to matching link
  document.querySelectorAll(".app-header a").forEach((link) => {
    const linkHref = link.getAttribute("href");

    // Check if link href matches current page
    if (linkHref === currentPage || linkHref === `/Notes/${currentPage}`) {
      link.classList.add("active");
    }
  });

  // ====================================
  // 3. HIDE/SHOW HEADER ON SCROLL
  // ====================================

  let lastScrollY = window.scrollY; // Track previous scroll position
  const header = document.querySelector(".app-header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Hide header when scrolling down (after 60px)
    // Show header when scrolling up
    if (currentScroll > lastScrollY && currentScroll > 60) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    // Update last scroll position for next comparison
    lastScrollY = currentScroll;
  });

  // ====================================
  // 4. DROPDOWN MENU FUNCTIONALITY
  // ====================================

  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".dropdown");

  // Toggle dropdown when button is clicked
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document click listener
    dropdown.classList.toggle("open");
  });

  // Close dropdown when clicking anywhere outside
  document.addEventListener("click", () => {
    dropdown.classList.remove("open");
  });
});

// ====================================
// 5. COLLAPSIBLE SECTION TOGGLE
// ====================================

function toggleSection() {
  const content = document.getElementById("scenarioContent");
  const icon = document.getElementById("toggleIcon");

  if (content.classList.contains("expanded")) {
    content.classList.remove("expanded");
    icon.classList.remove("rotated");
  } else {
    content.classList.add("expanded");
    icon.classList.add("rotated");
  }
}
