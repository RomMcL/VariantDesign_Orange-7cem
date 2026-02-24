
// ===== МЕНЮ БУРГЕР =====
function initMenuBurger() {
    const burger = document.querySelector('.btn-burger-menu');
    const nav = document.querySelector('.header_nav');
    const overlay = document.createElement('div');
    overlay.className = 'main-display-overlay';
    document.body.appendChild(overlay);
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Закрытие при клике на overlay
        overlay.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Закрытие при клике на ссылку
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}


// ===== СЛУШАТЕЛИ =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Бургер Меню
    initMenuBurger();

});