/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("open");


    if (navMenu.classList.contains("open")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});



/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light");


    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

});



/* =====================================================
   LOAD SAVED THEME
===================================================== */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☀️";

}



/* =====================================================
   SCROLL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section");


window.addEventListener("scroll", function () {

    let current = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});



/* =====================================================
   BACK TO TOP
===================================================== */

const topBtn =
    document.getElementById("topBtn");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    }
);



/* =====================================================
   IMAGE FALLBACK
===================================================== */

const profileImage =
    document.querySelector(
        ".profile-image img"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        function () {

            this.style.display = "none";

            const placeholder =
                document.getElementById(
                    "profilePlaceholder"
                );

            if (placeholder) {

                placeholder.style.display =
                    "flex";

            }

        }
    );

}



/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "loaded"
        );

    }
);