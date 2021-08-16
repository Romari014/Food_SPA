function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';//отключает прокрутку страницы когда модальное окно открыто

    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);   
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';

}



function modal(openModalTrigger, modalSelector, modalTimerId) {

    const openModal = document.querySelectorAll(openModalTrigger),
        // closeModal = document.querySelector('.modal__close[data-close]'),
        modal = document.querySelector(modalSelector);

   

    openModal.forEach(item => {
        item.addEventListener('click', () =>  showModal(modalSelector, modalTimerId));
    });

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
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    // }, {once:true});

}

export default modal;
export {showModal};
export {hideModal};