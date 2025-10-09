document.querySelectorAll(".filter-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    const dropdown = this.querySelector(".dropdown-menu");
    const arrow = this.querySelector(".arrow-icon");

    if (dropdown) {
      // Close other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdown && menu.classList.contains("active")) {
          menu.classList.remove("active");
          setTimeout(() => menu.classList.remove("show"), 250);
        }
      });

      // Reset other arrows
      document.querySelectorAll(".arrow-icon").forEach((arr) => {
        if (arr !== arrow) {
          arr.classList.remove("open");
        }
      });

      // Toggle current dropdown
      if (dropdown.classList.contains("active")) {
        // Closing
        dropdown.classList.remove("active");
        setTimeout(() => dropdown.classList.remove("show"), 250);
        arrow.classList.remove("open");
      } else {
        // Opening
        dropdown.classList.add("show");
        setTimeout(() => dropdown.classList.add("active"), 10);
        arrow.classList.add("open");
      }
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".filter-item")) {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        setTimeout(() => menu.classList.remove("show"), 250);
      }
    });
    document.querySelectorAll(".arrow-icon").forEach((arrow) => {
      arrow.classList.remove("open");
    });
  }
});

// Handle checkbox selection
document.querySelectorAll(".dropdown-menu ul li").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    const checkbox = this.querySelector('input[type="checkbox"]');
    if (checkbox && e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const offcanvasEl = document.getElementsByClassName("offcanvas-Ui-bottom");

  function toggleOffcanvasClass() {
    if (window.innerWidth <= 575) {
      Array.from(offcanvasEl).forEach((el) => {
        el.classList.add("offcanvas-bottom");
        el.classList.remove("offcanvas-end");
      });
    } else {
      Array.from(offcanvasEl).forEach((el) => {
        el.classList.add("offcanvas-end");
        el.classList.remove("offcanvas-bottom");
      });
    }
  }
  toggleOffcanvasClass();
  window.addEventListener("resize", toggleOffcanvasClass);
});

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');

    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});


$(document).ready(function () {
  const mainCarousel = $('.main-carousel');
  const thumbnailCarousel = $('.thumbnail-carousel');
  const totalItems = $('.main-carousel .item').length; // Get actual item count

  // Initialize main carousel
  mainCarousel.owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    autoplay: false,
    navText: ['<span>‹</span>', '<span>›</span>'],
    onInitialized: function (event) {
      // Update on initialization
      updateThumbnails(0);
      updateCounter(1, totalItems);
    },
    onChanged: function (event) {
      // Calculate real index (excluding clones)
      let realIndex = event.item.index;

      // Adjust for loop mode clones
      if (event.item.index >= totalItems) {
        realIndex = event.item.index % totalItems;
      } else if (event.item.index < 0) {
        realIndex = totalItems + (event.item.index % totalItems);
      }

      updateThumbnails(realIndex);
      updateCounter(realIndex + 1, totalItems);
    }
  });

  // Initialize thumbnail carousel
  thumbnailCarousel.owlCarousel({
    items: 5,
    margin: 10,
    loop: false,
    nav: false,
    dots: false, // Changed to false - usually thumbnails don't need dots
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    responsive: {
      0: {
        items: 5,
        margin: 5
      },
      768: {
        items: 5,
        margin: 10
      }
    }
  });

  // Thumbnail click handler
  $('.thumbnail').on('click', function () {
    const index = parseInt($(this).data('index'));
    mainCarousel.trigger('to.owl.carousel', [index, 300]);
    updateThumbnails(index);
  });

  // Update thumbnails active state
  function updateThumbnails(index) {
    $('.thumbnail').removeClass('active');
    $(`.thumbnail[data-index="${index}"]`).addClass('active');
  }

  // Update counter (if you have counter elements)
  function updateCounter(current, total) {
    if ($('#currentIndex').length) {
      $('#currentIndex').text(current);
    }
    if ($('#totalImages').length) {
      $('#totalImages').text(total);
    }
  }

  // Keyboard navigation
  $(document).on('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      mainCarousel.trigger('prev.owl.carousel');
    } else if (e.key === 'ArrowRight') {
      mainCarousel.trigger('next.owl.carousel');
    }
  });
});

// Engraving input handling
const input = document.getElementById('engraveInput');
const applyBtn = document.getElementById('applyBtn');
const removeBtn = document.getElementById('removeBtn');
const appliedTextEl = document.getElementById('appliedText');

applyBtn.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  appliedTextEl.textContent = value;
  appliedTextEl.classList.remove('muted');
  removeBtn.disabled = false;
});

removeBtn.addEventListener('click', () => {
  appliedTextEl.textContent = 'none applied';
  appliedTextEl.classList.add('muted');
  removeBtn.disabled = true;
  input.focus();
  input.value = '';
});

input.addEventListener('input', () => {
  applyBtn.disabled = input.value.trim().length === 0;
});
applyBtn.disabled = input.value.trim().length === 0;