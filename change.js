/**
 * CONSOLIDATED JAVASCRIPT FILE
 * Contains all scripts for header management, navigation, and interactive elements
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
        <a href="Azure.html">Azure</a>
        <a href="DevOps.html">DevOps</a>

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

  // ====================================
  // 5. AZURE NOTES - COLLAPSIBLE SECTIONS
  // ====================================

  /**
   * Toggle Section Behavior
   * Only one section open at a time
   */
  window.toggleSection = function (headerElement) {
    const content = headerElement.nextElementSibling;
    const icon = headerElement.querySelector(".toggle-icon");

    // Check if this section is already open
    const isOpen = content.classList.contains("open");

    // Close all sections
    document.querySelectorAll(".section-content").forEach((el) => {
      el.classList.remove("open");
    });

    document.querySelectorAll(".section-header").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".toggle-icon").classList.remove("rotated");
    });

    // If this section was closed, open it
    if (!isOpen) {
      content.classList.add("open");
      headerElement.classList.add("active");
      icon.classList.add("rotated");
    }
  };
});

// ====================================
// 6. LEGACY COLLAPSIBLE SECTION TOGGLE
// ====================================
// Kept for backward compatibility with other pages

function toggleSection(headerElement) {
  // If called without argument (old style)
  if (!headerElement) {
    const content = document.getElementById("scenarioContent");
    const icon = document.getElementById("toggleIcon");

    if (content && icon) {
      if (content.classList.contains("expanded")) {
        content.classList.remove("expanded");
        icon.classList.remove("rotated");
      } else {
        content.classList.add("expanded");
        icon.classList.add("rotated");
      }
    }
  } else {
    // New style (for Azure notes)
    const content = headerElement.nextElementSibling;
    const icon = headerElement.querySelector(".toggle-icon");

    const isOpen = content.classList.contains("open");

    document.querySelectorAll(".section-content").forEach((el) => {
      el.classList.remove("open");
    });

    document.querySelectorAll(".section-header").forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".toggle-icon").classList.remove("rotated");
    });

    if (!isOpen) {
      content.classList.add("open");
      headerElement.classList.add("active");
      icon.classList.add("rotated");
    }
  }
}
