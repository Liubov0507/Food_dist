 // функция: модалка появляется при клике на кнопки
 function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    //1 способ
    modal.classList.add('show');
    modal.classList.remove('hide');

    //2 способ
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';//убираем скролл при открытой модалке

    // console.log(modalTimerId);
    
    if (modalTimerId) {
        clearInterval(modalTimerId);// не вызывать модалку, если пользователь сам ее открыл
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    //1 способ
    modal.classList.add('hide');
    modal.classList.remove('show');

    //2 способ
    //modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    
    //Модальное окно
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    //вызываем open Modal
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));//оборачиваем, чтобы функция не вызывалась сразу, а только при клике
    });
    
    //закрытие окна по клику на подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    //закрытие окна по клику на Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    //Вызов модалки при скролле до конца страницы
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        } 
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal, closeModal};