function timer(id, deadLine) {
    //Таймер Timer
   
    //функция, определяющая разницу между дедлайном и текущим временем
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //вспомогательная функция добавления ноля впереди
    function getZiro(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //Функция установки часов на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'), 
            timeInterval = setInterval(updateClock, 1000); //обновление каждую секунду

        updateClock();//чтобы не было задержки в первый раз

        //функция обновления часов каждую секунду
        function updateClock() {
            const t = getTimeRemaining(endtime); //расчет времени, который остался

            //помещаем расчетные величины на страницу
            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            //остановка таймера, (когда время закончится, подставляются 00)
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }

    setClock(id, deadLine);
}

export default timer;