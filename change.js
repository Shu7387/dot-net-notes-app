/**
 * ============================================================
 * change.js  — COMMON JS FOR ALL NOTES
 * ============================================================
 * ✅ Injects common header
 * ✅ Highlights active nav link
 * ✅ Auto-hide header on scroll
 * ✅ Dropdown menu
 * ✅ Section accordion toggle (toggleSection)
 * ✅ Service card toggle (toggleService)
 * ✅ Steps toggle (toggleSteps)
 * ✅ HR Q&A toggle (toggleHRSection)
 * ✅ Image expand/collapse (toggleImage)
 * ✅ Keyboard accessibility
 * ============================================================
 */

/* ============================================================
   0) GLOBAL TOGGLE FUNCTIONS
   ============================================================ */

/**
 * MAIN SECTION TOGGLE — Accordion
 * HTML pattern:
 *   <h2 class="section-header" onclick="toggleSection(this)">
 *     Title <span class="toggle-icon">▼</span>
 *   </h2>
 *   <div class="section-content"> ... </div>
 */
window.toggleSection = function (headerElement) {
  if (!headerElement) return;

  const content = headerElement.nextElementSibling;
  const icon = headerElement.querySelector(".toggle-icon");

  if (!content || !content.classList.contains("section-content")) return;

  const isOpen = content.classList.contains("open");

  // Close all sections
  document.querySelectorAll(".section-content.open").forEach((el) => {
    el.classList.remove("open");
  });

  // Reset all headers + icons
  document.querySelectorAll(".section-header").forEach((h) => {
    h.classList.remove("active");
    const ic = h.querySelector(".toggle-icon");
    if (ic) ic.classList.remove("rotated");
  });

  // Close any open image previews and reset active icons
  document.querySelectorAll(".image-preview-box.open").forEach((box) => {
    box.classList.remove("open");
    box.innerHTML = "";
  });
  document.querySelectorAll(".image-icon.active").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Open clicked if it was closed
  if (!isOpen) {
    content.classList.add("open");
    headerElement.classList.add("active");
    if (icon) icon.classList.add("rotated");

    setTimeout(() => {
      headerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
};

/**
 * SERVICE CARD TOGGLE — Independent collapse
 * HTML pattern:
 *   <div class="service-card">
 *     <div class="service-header" onclick="toggleService(this)">...</div>
 *     <div class="service-body">...</div>
 *   </div>
 */
window.toggleService = function (headerElement) {
  if (!headerElement) return;

  const serviceCard = headerElement.closest(".service-card");
  if (!serviceCard) return;

  const serviceBody = serviceCard.querySelector(".service-body");
  const icon = headerElement.querySelector(".toggle-icon");

  if (!serviceBody) return;

  const hidden =
    serviceBody.style.display === "none" || serviceBody.style.display === "";
  serviceBody.style.display = hidden ? "block" : "none";

  if (icon) icon.classList.toggle("rotated", hidden);

  if (hidden) {
    setTimeout(() => {
      headerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
};

/**
 * STEPS TOGGLE — Independent collapse
 * HTML pattern:
 *   <div class="steps-header" onclick="toggleSteps(this)">...</div>
 *   <ol class="steps-body">...</ol>
 */
window.toggleSteps = function (headerElement) {
  if (!headerElement) return;

  const stepsBody = headerElement.nextElementSibling;
  const icon = headerElement.querySelector(".toggle-icon");

  if (!stepsBody) return;

  const hidden =
    stepsBody.style.display === "none" || stepsBody.style.display === "";
  stepsBody.style.display = hidden ? "block" : "none";

  if (icon) icon.classList.toggle("rotated", hidden);
};

/**
 * HR INTERVIEW Q&A TOGGLE — Accordion
 * HTML pattern:
 *   <div class="hr-interview-header" onclick="toggleHRSection(this)">...</div>
 *   <div class="hr-interview-content">...</div>
 */
window.toggleHRSection = function (headerElement) {
  if (!headerElement) return;

  const content = headerElement.nextElementSibling;
  const icon = headerElement.querySelector(".hr-toggle-icon");

  if (!content || !content.classList.contains("hr-interview-content")) return;

  const isOpen = content.classList.contains("open");

  // Close all HR sections
  document.querySelectorAll(".hr-interview-content.open").forEach((el) => {
    el.classList.remove("open");
  });

  document.querySelectorAll(".hr-interview-header").forEach((h) => {
    h.classList.remove("active");
    const ic = h.querySelector(".hr-toggle-icon");
    if (ic) ic.classList.remove("rotated");
  });

  if (!isOpen) {
    content.classList.add("open");
    headerElement.classList.add("active");
    if (icon) icon.classList.add("rotated");
  }
};

/**
 * IMAGE ICON TOGGLE — Expand / collapse an image inline
 *
 * HTML pattern (place inside .scenario-item or .service-body):
 *
 *   <div class="image-icons">
 *     <button class="image-icon" onclick="toggleImage(this)" data-src="path/to/image.png">📷 1</button>
 *     <button class="image-icon" onclick="toggleImage(this)" data-src="path/to/image2.png">📷 2</button>
 *   </div>
 *   <div class="image-preview-box"></div>
 *
 * When user clicks a button:
 *  - If image is already showing for that button → close it (toggle off)
 *  - If a different image is showing → swap to new one
 *  - If none showing → open new one
 */
window.toggleImage = function (buttonElement) {
  if (!buttonElement) return;

  const src = buttonElement.getAttribute("data-src");

  // Find the preview box — sibling after .image-icons container
  const iconsContainer = buttonElement.closest(".image-icons");
  if (!iconsContainer) return;

  let previewBox = iconsContainer.nextElementSibling;
  if (!previewBox || !previewBox.classList.contains("image-preview-box"))
    return;

  const isActive = buttonElement.classList.contains("active");

  // Reset all buttons in this icon group
  iconsContainer.querySelectorAll(".image-icon").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (isActive) {
    // Toggle off — close preview
    previewBox.classList.remove("open");
    previewBox.innerHTML = "";
  } else {
    // Open / swap image
    buttonElement.classList.add("active");

    if (src) {
      // Has a real image path — show the image
      previewBox.innerHTML = `<img src="${src}" alt="Reference image" /><button class="image-close-btn" onclick="closeImagePreview(this)">✕ Close</button>`;
    } else {
      // No image path yet — show a placeholder message
      previewBox.innerHTML = `<p class="image-placeholder">📷 No image added yet. Set the <code>data-src</code> attribute on this button to link an image.</p><button class="image-close-btn" onclick="closeImagePreview(this)">✕ Close</button>`;
    }

    previewBox.classList.add("open");

    // Smooth scroll to preview
    setTimeout(() => {
      previewBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
};

/**
 * CLOSE IMAGE PREVIEW
 * Called by the ✕ Close button inside the preview box
 */
window.closeImagePreview = function (btnElement) {
  if (!btnElement) return;

  const previewBox = btnElement.closest(".image-preview-box");
  if (!previewBox) return;

  // Deactivate any active icon buttons
  const iconsContainer = previewBox.previousElementSibling;
  if (iconsContainer && iconsContainer.classList.contains("image-icons")) {
    iconsContainer.querySelectorAll(".image-icon").forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  previewBox.classList.remove("open");
  previewBox.innerHTML = "";
};

/* ============================================================
   OPTIONAL HELPERS
   ============================================================ */

window.collapseAllServices = function () {
  document
    .querySelectorAll(".service-body")
    .forEach((b) => (b.style.display = "none"));
  document
    .querySelectorAll(".steps-body")
    .forEach((b) => (b.style.display = "none"));
  document
    .querySelectorAll(
      ".service-header .toggle-icon, .steps-header .toggle-icon",
    )
    .forEach((i) => i.classList.remove("rotated"));
};

window.expandAllServices = function () {
  document
    .querySelectorAll(".service-body")
    .forEach((b) => (b.style.display = "block"));
  document
    .querySelectorAll(".steps-body")
    .forEach((b) => (b.style.display = "block"));
  document
    .querySelectorAll(
      ".service-header .toggle-icon, .steps-header .toggle-icon",
    )
    .forEach((i) => i.classList.add("rotated"));
};

window.searchServices = function (searchTerm) {
  const cards = document.querySelectorAll(".service-card");
  const q = (searchTerm || "").trim().toLowerCase();

  if (!q) {
    cards.forEach((c) => (c.style.display = "block"));
    return;
  }

  cards.forEach((card) => {
    const title = card.querySelector(".service-title");
    const text = title ? title.textContent.toLowerCase() : "";
    card.style.display = text.includes(q) ? "block" : "none";
  });
};

/* ============================================================
   1) DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------------------------------------
     1.1) INJECT COMMON HEADER
  ---------------------------------------------------------- */
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
        <a href="HR.html">HR</a>
        <div class="nav-right">
          <div class="dropdown">
            <button class="dropdown-btn" type="button">☰ Shubham</button>
            <div class="dropdown-menu">
              <a href="Azure.html">Azure</a>
              <hr />
              <a href="https://github.com/Shu7387" target="_blank" rel="noopener">Github</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;

  if (!document.querySelector(".app-header")) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* ----------------------------------------------------------
     1.2) HIGHLIGHT ACTIVE NAV LINK
  ---------------------------------------------------------- */
  const currentPage = location.pathname.split("/").pop();

  document.querySelectorAll(".app-header a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === currentPage || href.endsWith("/" + currentPage)) {
      link.classList.add("active");
    }
  });

  /* ----------------------------------------------------------
     1.3) HIDE / SHOW HEADER ON SCROLL
  ---------------------------------------------------------- */
  const header = document.querySelector(".app-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!header) return;
    const currentScroll = window.scrollY;
    if (currentScroll > lastScrollY && currentScroll > 60) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollY = currentScroll;
  });

  /* ----------------------------------------------------------
     1.4) DROPDOWN MENU
  ---------------------------------------------------------- */
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".dropdown");

  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });
  }

  /* ----------------------------------------------------------
     1.5) INITIALIZE COLLAPSED STATES
  ---------------------------------------------------------- */
  function initializeCollapsedBlocks() {
    document
      .querySelectorAll(".service-body")
      .forEach((b) => (b.style.display = "none"));
    document
      .querySelectorAll(".steps-body")
      .forEach((b) => (b.style.display = "none"));
    document
      .querySelectorAll(
        ".service-header .toggle-icon, .steps-header .toggle-icon",
      )
      .forEach((i) => i.classList.remove("rotated"));
  }

  setTimeout(initializeCollapsedBlocks, 50);

  /* ----------------------------------------------------------
     1.6) KEYBOARD ACCESSIBILITY
  ---------------------------------------------------------- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains("service-header")) {
      e.preventDefault();
      window.toggleService(target);
    } else if (target.classList.contains("steps-header")) {
      e.preventDefault();
      window.toggleSteps(target);
    } else if (target.classList.contains("section-header")) {
      e.preventDefault();
      window.toggleSection(target);
    } else if (target.classList.contains("hr-interview-header")) {
      e.preventDefault();
      window.toggleHRSection(target);
    } else if (target.classList.contains("image-icon")) {
      e.preventDefault();
      window.toggleImage(target);
    }
  });
});
