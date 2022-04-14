function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    //Слайдер
    //1) Сложный слайдер
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.getElementById(totalCounter),
          current = document.getElementById(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {//добавление 0 перед счетчиком слайдов
        total.textContent = `0${slides.length}`;
        current.textContent  = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent  = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';//задаем ширину всех слайдов вместе
    slidesField.style.display = 'flex';//в линию
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';//скрываем весь слайдер

    slides.forEach(slide => {
        slide.style.width = width;
    });

    //добавление точек к слайдеру
    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          indicators = [];//перемещение активности индикатора по dots

    dots.classList.add('slider-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.appendChild(dots);//добавляем dots (новый элемент) в конец блока slider

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);//устанавливаем для dot дата-атрибут, чтобы привязать к слайду
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 5px;
            margin-left: 5px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);//добавляем dot (новый элемент) в конец dots
        indicators.push(dot);
    }

     //функция добавления 0 перед счетчиком слайдов
     function addZeroCurrent() {
        if (slides.length < 10) {
            current.textContent  = `0${slideIndex}`;
        } else {
           current.textContent  = slideIndex;
        }
    }

    //функция яркости активного индикатора (точки)
    function opacityActive() {
        indicators.forEach(dot => dot.style.opacity = '.5');//яркость активного индикатора
        indicators[slideIndex - 1].style.opacity = '1';
    }

    //функция замены при помощи регулярного выражения все "нецифры" на пустое место ''
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    //обработчик на кнопку вперед
    next.addEventListener('click', () => {
        //возвращаемся к первому слайду, если это конец слайдера
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);//или добавляем ширину след. слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`;//перемещение слайдера по оси Х

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZeroCurrent(slideIndex);//вызываем функцию добавления 0 перед счетчиком слайдов

        opacityActive(indicators);//вызываем функцию яркости активного индикатора (точки)      
        });

    //обработчик на кнопку назад
    prev.addEventListener('click', () => {
        if (offset == 0) { 
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZeroCurrent(slideIndex);//вызываем функцию добавления 0 перед счетчиком слайдов

        opacityActive(indicators);//вызываем функцию яркости активного индикатора (точки)      
    });

    //клик по индикатору для перелистывания
    indicators.forEach(dot => { 
        dot.addEventListener('click', (e) => {
            const slideTo= e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroCurrent(slideIndex);//вызываем функцию добавления 0 перед счетчиком слайдов

            opacityActive(indicators);//вызываем функцию яркости активного индикатора (точки)               
        });
    });
    
    //2) Простой слайдер
    //showSlides(slideIndex);

    //счетчик общего количества слайдов
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    //функция смены слайдов
    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    
    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     //счетчик текущего слайда
    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    
    //функция прибавления или вычитания цифры 
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    //клик по стрелочке назад
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // //клик по стрелочке вперед
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

export default slider;