$(document).ready(function() {
    $('.center').slick({
        dots: true, // Включаем точки навигации
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true, // Включаем автопроигрывание
        autoplaySpeed: 5000, // Интервал 3 секунды
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
});