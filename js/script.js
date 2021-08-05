"use strict";
document.addEventListener('DOMContentLoaded', () => {

    ///////////////////////////////////////////////////////////
    /////////////////   Tabs   //////////////////////////////
    ////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    ///////////////////////////////////////////////////////////
    /////////////////   Timer   //////////////////////////////
    ////////////////////////////////////////////////////////

    const deadline = '2021-08-21';

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),//Date.parse Строковое представление даты 
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //Сщитаем количество дней.  Math.floor(округляет числа)
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
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


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();//вызовем  функцию здесь чтоб избежать мигания на странице

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }


        }
    }

    setClock('.timer', deadline);


    ///////////////////////////////////////////////////////////
    /////////////////   Modal   //////////////////////////////
    ////////////////////////////////////////////////////////

    const openModal = document.querySelectorAll('.btn[data-open]'),
        closeModal = document.querySelector('.modal__close[data-close]'),
        modal = document.querySelector('.modal');

    // function showModal() {
    openModal.forEach(item => {
        item.addEventListener('click', () => {

            // modal.style.display = 'block';
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';//отключает прокрутку страницы когда модальное окно открыто

        });
    });

    // }
    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
    }

    closeModal.addEventListener('click', hideModal);
    // function hideModal() {
    // closeModal.addEventListener('click', () => {
    //     // modal.style.display = 'none';
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');

    //     document.body.style.overflow = '';
    // });
    // }
    // showModal();
    // hideModal();

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            hideModal();
        }
    });


});