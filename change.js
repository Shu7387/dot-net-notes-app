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
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling to document click listener
      dropdown.classList.toggle("open");
    });
  }

  // Close dropdown when clicking anywhere outside
  document.addEventListener("click", () => {
    if (dropdown) {
      dropdown.classList.remove("open");
    }
  });

  // ====================================
  // 5. MAIN SECTION COLLAPSIBLE TOGGLE
  // ====================================

  /**
   * Toggle Main Section Behavior
   * Opens/closes the entire main section
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
      const iconEl = el.querySelector(".toggle-icon");
      if (iconEl) {
        iconEl.classList.remove("rotated");
      }
    });

    // If this section was closed, open it
    if (!isOpen) {
      content.classList.add("open");
      headerElement.classList.add("active");
      if (icon) {
        icon.classList.add("rotated");
      }
    }
  };

  // ====================================
  // 6. SERVICE CARD COLLAPSIBLE TOGGLE
  // ====================================

  /**
   * Toggle Service Card Body
   * Each service card can be expanded/collapsed independently
   */
  window.toggleService = function (headerElement) {
    const serviceCard = headerElement.closest(".service-card");
    const serviceBody = serviceCard.querySelector(".service-body");
    const icon = headerElement.querySelector(".toggle-icon");

    if (!serviceBody) return;

    // Toggle service body visibility
    if (
      serviceBody.style.display === "none" ||
      serviceBody.style.display === ""
    ) {
      serviceBody.style.display = "block";
      if (icon) {
        icon.classList.add("rotated");
      }
      // Smooth scroll to service
      setTimeout(() => {
        headerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      serviceBody.style.display = "none";
      if (icon) {
        icon.classList.remove("rotated");
      }
    }
  };

  // ====================================
  // 7. STEPS SECTION COLLAPSIBLE TOGGLE
  // ====================================

  /**
   * Toggle Steps Body (How to implement)
   * Each "How to implement" section can be expanded/collapsed independently
   */
  window.toggleSteps = function (headerElement) {
    const stepsBody = headerElement.nextElementSibling;
    const icon = headerElement.querySelector(".toggle-icon");

    if (!stepsBody) return;

    // Toggle steps body visibility
    if (stepsBody.style.display === "none" || stepsBody.style.display === "") {
      stepsBody.style.display = "block";
      if (icon) {
        icon.classList.add("rotated");
      }
    } else {
      stepsBody.style.display = "none";
      if (icon) {
        icon.classList.remove("rotated");
      }
    }
  };

  // ====================================
  // 8. INITIALIZE ALL SERVICE BODIES
  // ====================================

  /**
   * On page load, hide all service bodies by default
   * This makes all services collapsed initially
   */
  function initializeServiceCards() {
    const serviceBodies = document.querySelectorAll(".service-body");
    const stepsBoddies = document.querySelectorAll(".steps-body");

    // Hide all service bodies
    serviceBodies.forEach((body) => {
      body.style.display = "none";
    });

    // Hide all steps bodies
    stepsBoddies.forEach((body) => {
      body.style.display = "none";
    });

    // Reset all toggle icons to down position
    document
      .querySelectorAll(".service-header .toggle-icon")
      .forEach((icon) => {
        icon.classList.remove("rotated");
      });

    document.querySelectorAll(".steps-header .toggle-icon").forEach((icon) => {
      icon.classList.remove("rotated");
    });
  }

  // Initialize after slight delay to ensure DOM is ready
  setTimeout(initializeServiceCards, 100);

  // ====================================
  // 9. KEYBOARD NAVIGATION
  // ====================================

  /**
   * Allow pressing Enter/Space on service headers to toggle
   */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const target = e.target;

      if (target.classList.contains("service-header")) {
        e.preventDefault();
        toggleService(target);
      } else if (target.classList.contains("steps-header")) {
        e.preventDefault();
        toggleSteps(target);
      } else if (target.classList.contains("section-header")) {
        e.preventDefault();
        toggleSection(target);
      }
    }
  });

  // ====================================
  // 10. COLLAPSE ALL SERVICES BUTTON
  // ====================================

  /**
   * Optional: Add a "Collapse All" functionality
   * Can be called from HTML with onclick="collapseAllServices()"
   */
  window.collapseAllServices = function () {
    const serviceBodies = document.querySelectorAll(".service-body");
    const stepsBoddies = document.querySelectorAll(".steps-body");

    serviceBodies.forEach((body) => {
      body.style.display = "none";
    });

    stepsBoddies.forEach((body) => {
      body.style.display = "none";
    });

    document
      .querySelectorAll(".service-header .toggle-icon")
      .forEach((icon) => {
        icon.classList.remove("rotated");
      });

    document.querySelectorAll(".steps-header .toggle-icon").forEach((icon) => {
      icon.classList.remove("rotated");
    });
  };

  // ====================================
  // 11. EXPAND ALL SERVICES BUTTON
  // ====================================

  /**
   * Optional: Add an "Expand All" functionality
   * Can be called from HTML with onclick="expandAllServices()"
   */
  window.expandAllServices = function () {
    const serviceBodies = document.querySelectorAll(".service-body");
    const stepsBoddies = document.querySelectorAll(".steps-body");

    serviceBodies.forEach((body) => {
      body.style.display = "block";
    });

    stepsBoddies.forEach((body) => {
      body.style.display = "block";
    });

    document
      .querySelectorAll(".service-header .toggle-icon")
      .forEach((icon) => {
        icon.classList.add("rotated");
      });

    document.querySelectorAll(".steps-header .toggle-icon").forEach((icon) => {
      icon.classList.add("rotated");
    });
  };

  // ====================================
  // 12. SEARCH/FILTER FUNCTIONALITY
  // ====================================

  /**
   * Optional: Filter services by search term
   * Can be called with: searchServices('text')
   */
  window.searchServices = function (searchTerm) {
    if (!searchTerm) {
      // If no search term, show all services
      document.querySelectorAll(".service-card").forEach((card) => {
        card.style.display = "block";
      });
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
      const title = card.querySelector(".service-title");
      if (title && title.textContent.toLowerCase().includes(lowerSearchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };
});

// ====================================
// 13. BACKWARD COMPATIBILITY
// ====================================
// Kept for backward compatibility with other pages

/**
 * Legacy toggleSection function
 * Supports both old and new style calls
 */
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
    // New style (for Azure notes and main sections)
    const content = headerElement.nextElementSibling;
    const icon = headerElement.querySelector(".toggle-icon");

    const isOpen = content.classList.contains("open");

    document.querySelectorAll(".section-content").forEach((el) => {
      el.classList.remove("open");
    });

    document.querySelectorAll(".section-header").forEach((el) => {
      el.classList.remove("active");
      const iconEl = el.querySelector(".toggle-icon");
      if (iconEl) {
        iconEl.classList.remove("rotated");
      }
    });

    if (!isOpen) {
      content.classList.add("open");
      headerElement.classList.add("active");
      if (icon) {
        icon.classList.add("rotated");
      }
    }
  }
}
