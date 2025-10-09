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

const itemWidth = 215; // 200px width + 15px gap
const slideStep = itemWidth * 1; // scroll 1 item per click

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

// Update buttons on various events
window.addEventListener("resize", updateButtons);
window.addEventListener("load", updateButtons);
slider.addEventListener("scroll", updateButtons);
updateButtons();

