function fixedHeader() {
  const header = document.querySelector('header');
  const sticky = header.offsetTop;
  window.onscroll = function () {
    if (window.pageYOffset > sticky) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  };
}

fixedHeader();
window.addEventListener('resize', fixedHeader);

// custom carousel for trending products
const slider = document.getElementById("trendingSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (slider && prevBtn && nextBtn) {
  const itemWidth = 215;
  const slideStep = itemWidth * 1;

  function updateButtons() {
    if (window.innerWidth <= 1199) {
      const scrollLeft = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";

      prevBtn.style.opacity = scrollLeft > 5 ? "1" : "0.25";
      nextBtn.style.opacity = scrollLeft < maxScroll - 5 ? "1" : "0.25";
    } else {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  }

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -slideStep, behavior: "smooth" });
    setTimeout(updateButtons, 400);
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: slideStep, behavior: "smooth" });
    setTimeout(updateButtons, 400);
  });

  window.addEventListener("resize", updateButtons);
  window.addEventListener("load", updateButtons);
  slider.addEventListener("scroll", updateButtons);
  updateButtons();
}

// Our6PreciousMetalColours carousel
const sliderone = document.getElementById("trendingSliderone");
const prevBtnone = document.getElementById("prevBtnone");
const nextBtnone = document.getElementById("nextBtnone");

if (sliderone && prevBtnone && nextBtnone) {
  const itemWidthone = 215;
  const slideStepone = itemWidthone * 1;

  function updateButtons1() {
    if (window.innerWidth <= 1199) {
      const scrollLeftone = sliderone.scrollLeft;
      const maxScrollone = sliderone.scrollWidth - sliderone.clientWidth;
      prevBtnone.style.display = "block";
      nextBtnone.style.display = "block";

      prevBtnone.style.opacity = scrollLeftone > 5 ? "1" : "0.25";
      nextBtnone.style.opacity = scrollLeftone < maxScrollone - 5 ? "1" : "0.25";
    } else {
      prevBtnone.style.display = "none";
      nextBtnone.style.display = "none";
    }
  }

  prevBtnone.addEventListener("click", () => {
    sliderone.scrollBy({ left: -slideStepone, behavior: "smooth" });
    setTimeout(updateButtons1, 400);
  });

  nextBtnone.addEventListener("click", () => {
    sliderone.scrollBy({ left: slideStepone, behavior: "smooth" });
    setTimeout(updateButtons1, 400);
  });

  window.addEventListener("resize", updateButtons1);
  window.addEventListener("load", updateButtons1);
  sliderone.addEventListener("scroll", updateButtons1);
  updateButtons1();
}

// Fixed Filter Logic
const filter = document.getElementById('filterheader');

if (filter) {
  let lastScroll = 0;
  const filterTop = filter.offsetTop + 30;
  let isFilterFixed = false;
  let placeholder = null;

  function fixedFilter() {
    if (window.innerWidth <= 5075) {
      const currentScroll = window.scrollY;
      const scrollingUp = currentScroll < lastScroll;

      if (scrollingUp && currentScroll > filterTop && !isFilterFixed) {
        if (!placeholder) {
          placeholder = document.createElement('div');
          placeholder.style.height = filter.offsetHeight + 'px';
          filter.parentNode.insertBefore(placeholder, filter);
        }

        filter.style.position = "fixed";
        filter.style.top = "53px";
        filter.style.left = "0";
        filter.style.right = "0";
        filter.style.zIndex = "15";
        filter.style.transition = "all 0.4s ease-in-out";
        filter.style.padding = "15px 20px";
        filter.style.background = "#fff";
        filter.style.borderTop = "1px solid #e5e5e5";
        filter.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        isFilterFixed = true;
      } else if (currentScroll <= filterTop) {
        filter.style.position = "static";
        filter.style.padding = "0px";
        filter.style.borderTop = "none";
        filter.style.transition = "none";
        filter.style.top = "50px";
        filter.style.boxShadow = "none";
        isFilterFixed = false;

        if (placeholder) {
          placeholder.remove();
          placeholder = null;
        }
      } else if (!scrollingUp && isFilterFixed) {
        filter.style.top = "-60px";
        setTimeout(() => {
          filter.style.transition = "none";
          filter.style.position = "static";
          filter.style.padding = "0px";
          filter.style.borderTop = "none";
          filter.style.top = "50px";
          filter.style.boxShadow = "none";
          isFilterFixed = false;

          if (placeholder) {
            placeholder.remove();
            placeholder = null;
          }
        }, 400);
      }

      lastScroll = currentScroll;
    } else {
      filter.style.position = "static";
      filter.style.padding = "0px";
      filter.style.borderBottom = "none";
      isFilterFixed = false;

      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
    }
  }

  // Function to reset filter to static position
  function resetFilterToStatic() {
    filter.style.transition = "none";
    filter.style.position = "static";
    filter.style.padding = "0px";
    filter.style.borderTop = "none";
    filter.style.top = "50px";
    filter.style.boxShadow = "none";
    isFilterFixed = false;

    if (placeholder) {
      placeholder.remove();
      placeholder = null;
    }
  }

  // Add click event listener to partnerSidebar
  const partnerSidebar = document.getElementById('partnerSidebar');
  if (partnerSidebar) {
    partnerSidebar.addEventListener('click', resetFilterToStatic);
  }

  window.addEventListener("scroll", fixedFilter);
  window.addEventListener("resize", fixedFilter);
}


document.addEventListener('DOMContentLoaded', function () {
  const nestedTriggers = document.querySelectorAll('.nested-offcanvas-trigger');

  nestedTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('data-target');
      const buyersGuideEl = document.getElementById('buyersGuide');
      const buyersGuideInstance = bootstrap.Offcanvas.getInstance(buyersGuideEl);

      if (buyersGuideInstance) {
        buyersGuideInstance.hide();
      }

      setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        const targetInstance = new bootstrap.Offcanvas(targetEl);
        targetInstance.show();
      }, 300);
    });
  });

  // Back button handler
  const backButtons = document.querySelectorAll('.back-to-buyers');

  backButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const currentOffcanvasEl = this.closest('.offcanvas');
      const currentInstance = bootstrap.Offcanvas.getInstance(currentOffcanvasEl);

      if (currentInstance) {
        currentInstance.hide();
      }
      setTimeout(() => {
        const buyersGuideEl = document.getElementById('buyersGuide');
        const buyersGuideInstance = new bootstrap.Offcanvas(buyersGuideEl);
        buyersGuideInstance.show();
      }, 300);
    });
  });
})