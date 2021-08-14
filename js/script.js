'use strict';

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
        // closeModal = document.querySelector('.modal__close[data-close]'),
        modal = document.querySelector('.modal');

    function showModal() {

        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';//отключает прокрутку страницы когда модальное окно открыто
        clearInterval(modalTimerId);
    }

    openModal.forEach(item => {
        item.addEventListener('click', showModal);
    });


    function hideModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';

    }

    // closeModal.addEventListener('click', hideModal);
    // function hideModal() {
    // closeModal.addEventListener('click', () => {
    //     // modal.style.display = 'none';
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');

    //     document.body.style.overflow = '';
    // });
    // }

    // hideModal();

    modal.addEventListener('click', (e) => {

        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    // }, {once:true});

    ///////////////////////////////////////////////////////////
    /////////////////   Use classes for cards   ///////////////
    ///////////////////////////////////////////////////////////

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//classes - rest оператор
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }

    const getResources = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    };

    // getResources('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    ///////////////////////////////////////////////////////////
    /////////////////   Axios Library  ///////////////////////
    /////////////////////////////////////////////////////////

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    ///////////////////////////////////////////////////////////
    /////////////////   Form   ///////////////////////////////
    /////////////////////////////////////////////////////////

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся!',
        failure: 'Что-то пошло не так :('
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {//async , await делает синхронный код вместо асинхронного
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();//возращаем promies
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            //когда мы используем XMLHttpReques вместе с FormData, заголовка нам не нужно(ставиться автоматически)

            const formData = new FormData(form);

            // const object = {};
            //     formData.forEach(function(value, key){  //перевод FormData  в JSON 
            //         object[key] = value;
            //     });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));//enteries переводит в массив в массиве
            //Object.fromEntries превращает formData в класический массив
            //Потом все это превращается в JSON
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        }, 4000);
    }



    ///////////////////////////////////////////////////////////
    /////////////////   Fetch   ///////////////////////////////
    ///////////////////////////////////////////////////////////
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    ///////////////////////////////////////////////////////////
    /////////////////  Slider  ///////////////////////////////
    /////////////////////////////////////////////////////////

    const slides = document.querySelectorAll('.offer__slide'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let slideIndex = 1;
    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = "block";

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    }

    function plusSlide(n) {
        showSlides(slideIndex += n);
    }

    prevSlide.addEventListener('click', () => {
        plusSlide(-1);
    });

    nextSlide.addEventListener('click', () => {
        plusSlide(1);
    });

});