import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

import "swiper/css";
import "swiper/css/pagination";
import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "./styles/main.scss";
import "./styles/responsive.scss";

const animationSpeed = 300;

$(document).ready(function () {
    init();
});

function init() {
    menu();
    sliders();
    bestOffers();
}

function menu() {
    const md = 928;

    $(document).on("click", function (e) {
        const $menu = $(".menu");
        const $target = $(e.target);
        console.log("e");

        if (
            $(window).width() < md &&
            !$target.closest(".menu").length &&
            !$target.closest(".header__burger-mob").length
        ) {
            $menu.css("transform", "translateX(-100%)");
            return;
        }

        if (!$menu.hasClass("menu--expanded") || $target.closest(".menu").length) return;

        $(".wide-logo").fadeOut(animationSpeed, () => {
            $(".logo").fadeIn(animationSpeed);
        });

        $(".nav__link-text").fadeOut(animationSpeed);
        $(".menu__address").slideUp(animationSpeed, () => {
            $(".menu__burger").slideDown(animationSpeed);
        });
        $(".menu__second-nav").slideUp(animationSpeed);
        $(".menu__search-input").css("opacity", 0);

        setTimeout(function () {
            $menu.removeClass("menu--expanded");
        }, animationSpeed / 1.1);
    });

    $(".menu__burger").on("click", function () {
        const $menu = $(".menu");

        $menu.addClass("menu--expanded").on("transitionend", function () {
            if ($menu.hasClass("menu--expanded")) {
                $(".logo").fadeOut(animationSpeed, () => {
                    $(".wide-logo").fadeIn(animationSpeed);
                });

                $(".nav__link-text").fadeIn(animationSpeed);
                $(".menu__burger").slideUp(animationSpeed, () => {
                    $(".menu__address").slideDown(animationSpeed);
                });
                $(".menu__second-nav").slideDown(animationSpeed);

                setTimeout(function () {
                    $(".menu__search-input").css("opacity", 1);
                }, animationSpeed);
            }
        });
    });

    $(".header__burger-mob").on("click", function () {
        if ($(window).width() < md) $(".menu").css("transform", "translateX(0)");
    });
}

function sliders() {
    new Swiper(".hero__swiper", {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        height: "100%",
        loop: true,
        navigation: {
            nextEl: ".hero__slider-next",
            prevEl: ".hero__slider-prev",
        },
        pagination: {
            el: ".hero__slider-pagination",
            type: "fraction",
        },

        breakpoints: {
            0: {
                pagination: {
                    el: ".hero__slider-pagination",
                    type: "bullets",
                    clickable: true,
                },
            },
            928: {
                pagination: {
                    el: ".hero__slider-pagination",
                    type: "fraction",
                },
            },
        },
    });

    new Swiper(".best-offers__swiper", {
        modules: [Navigation, Pagination],
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 32,
        autoHeight: false,
        loop: true,

        breakpoints: {
            0: {
                slidesPerView: "auto",
                slidesPerGroup: 1,
                freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumBounce: true,
                },
                grabCursor: true,
                loop: false,
            },
            928: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1140: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1440: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
        },

        navigation: {
            nextEl: ".best-offers__slider-next",
            prevEl: ".best-offers__slider-prev",
        },
        pagination: {
            el: ".best-offers__slider-pagination",
            type: "fraction",
        },
    });
}

function bestOffers() {
    $(".best-offers__vars-btn").on("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        const $this = $(this);
        const $otherVars = $this.closest(".best-offers__vars").find(".best-offers__more-vars");

        if ($this.hasClass("best-offers__more-vars--active")) {
            $this.removeClass("best-offers__more-vars--active").find("svg").css("transform", "rotate(0)");
            $otherVars.slideUp(animationSpeed);
            return;
        }

        $this.addClass("best-offers__more-vars--active").find("svg").css("transform", "rotate(-3.14rad)");
        $otherVars.slideDown(animationSpeed);
    });
}
