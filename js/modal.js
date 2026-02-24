// Определение ширины скролла
function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

// Проверка наличия вертикального скролла
function hasVerticalScroll() {
    return document.body.scrollHeight > window.innerHeight;
}

// Слушатели
document.addEventListener('DOMContentLoaded', function() {
    // ===== МОДАЛЬНЫЕ ОКНА =====
    const modals = {
        login: document.getElementById('modal-login'),
        demo: document.getElementById('modal-demo')
    };

    const openButtons = {
        login: document.getElementById('btn-login'),
        demo: document.getElementById('btn-demo-calc')
    };

    // Открытие модалок по кнопкам
    if (openButtons.login && modals.login) {
        openButtons.login.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modals.login);
        });
    }

    if (openButtons.demo && modals.demo) {
        openButtons.demo.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modals.demo);
        });
    }

    // Закрытие по крестику
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.main-display-overlay');
            if (modal) closeModal(modal);
        });
    });

    // Закрытие по клику на оверлей
    document.querySelectorAll('.main-display-overlay').forEach(overlay => {
        overlay.addEventListener('mousedown', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.main-display-overlay.active');
            if (activeModal) closeModal(activeModal);
        }
    });

    // Функции открытия/закрытия
    function openModal(modal) {
        if (!modal) return;
        
        // Закрываем другие открытые модалки
        document.querySelectorAll('.main-display-overlay.active').forEach(m => {
            if (m !== modal) closeModal(m);
        });

        // Проверяем наличие скролла
        if (hasVerticalScroll()) {
            const scrollbarWidth = getScrollbarWidth();
            document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
        } else {
            document.documentElement.style.setProperty('--scrollbar-width', '0px');
        }
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        
        setTimeout(() => {
            if (!document.querySelector('.main-display-overlay.active')) {
                document.body.classList.remove('modal-open');
                // Сбрасываем отступ после закрытия
                document.documentElement.style.setProperty('--scrollbar-width', '0px');
            }
        }, 300);
    }
});