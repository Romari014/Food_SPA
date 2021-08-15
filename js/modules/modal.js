function modal() {

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

}

module.exports = modal;