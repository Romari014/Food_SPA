import {hideModal, showModal} from './modal';
import {postData} from '../services/services';


function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся!',
        failure: 'Что-то пошло не так :('
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        showModal('.modal', modalTimerId);

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
            hideModal('.modal');
        }, 4000);
    }

}

export default form;