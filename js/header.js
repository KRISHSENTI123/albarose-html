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

const filter = document.getElementById('filterheader');
let lastScroll = 0;
const filterTop = filter.offsetTop + 30;
let isFilterFixed = false;
let placeholder = null;

function fixedFilter() {
  if (window.innerWidth <= 575) {
    const currentScroll = window.scrollY;
    const scrollingUp = currentScroll < lastScroll;
    
    if (scrollingUp && currentScroll > filterTop && !isFilterFixed) {
      // Create placeholder to prevent content jump
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.style.height = filter.offsetHeight + 'px';
        filter.parentNode.insertBefore(placeholder, filter);
      }
      
      filter.style.position = "fixed";
      filter.style.top = "50px";
      filter.style.left = "0";
      filter.style.right = "0";
      filter.style.zIndex = "15";
      filter.style.transition = "all 0.4s ease-in-out";
      filter.style.padding = "15px 20px";
      filter.style.background = "#fff";
      filter.style.borderBottom = "1px solid #e5e5e5";
      filter.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
      isFilterFixed = true;
    } 
    else if (currentScroll <= filterTop) {
      filter.style.position = "static";
      filter.style.padding = "0px";
      filter.style.borderBottom = "none";
      filter.style.transition = "none";
      filter.style.top = "50px";
      filter.style.boxShadow = "none";
      isFilterFixed = false;
      
      // Remove placeholder
      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
    }
    else if (!scrollingUp && isFilterFixed) {
      filter.style.top = "-60px";
      setTimeout(() => {
        filter.style.transition = "none";
        filter.style.position = "static";
        filter.style.padding = "0px";
        filter.style.borderBottom = "none";
        filter.style.top = "50px";
        filter.style.boxShadow = "none";
        isFilterFixed = false;
        
        // Remove placeholder
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
    
    // Remove placeholder on larger screens
    if (placeholder) {
      placeholder.remove();
      placeholder = null;
    }
  }
}

window.addEventListener("scroll", fixedFilter);
window.addEventListener("resize", fixedFilter);
window.addEventListener('resize', fixedHeader);





