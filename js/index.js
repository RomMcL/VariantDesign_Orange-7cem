// ===== КАРУСЕЛЬ СКРЫТОЙ ЧАСТИ ПЕРВОЙ СЕКЦИИ =====
function initFeaturesCarousel() {
    const section = document.querySelector('.section_1');
    const featureItems = document.querySelectorAll('.feature-item');
    const featureDescs = document.querySelectorAll('.feature-desc');
    const featuresContainer = document.querySelector('.features-list');
    let currentIndex = 0;
    let intervalId = null;
    let isPaused = false;
    
    if (!section || !featureItems.length) return;
    
    function activateFeature(index) {
        // Проверяем, что индекс в пределах массива
        if (index < 0 || index >= featureItems.length) return;
        
        featureItems.forEach(item => item.classList.remove('active'));
        featureDescs.forEach(desc => desc.classList.remove('active'));
        
        featureItems[index].classList.add('active');
        featureDescs[index].classList.add('active');
        currentIndex = index; // Обновляем текущий индекс
    }
    
    function nextFeature() {
        if (!isPaused) {
            const nextIndex = (currentIndex + 1) % featureItems.length;
            activateFeature(nextIndex);
        }
    }
    
    function startAutoRotate() {
        if (intervalId) clearInterval(intervalId);
        // Активируем текущий элемент (не сбрасываем на 0)
        activateFeature(currentIndex);
        intervalId = setInterval(nextFeature, 3000);
    }
    
    function stopAutoRotate() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    // Клик по пункту
    featureItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие
            
            // Активируем выбранный пункт
            activateFeature(index);
            
            // Перезапускаем интервал
            if (intervalId) {
                stopAutoRotate();
                startAutoRotate();
            }
        });
    });
    
    // Пауза при наведении на список
    if (featuresContainer) {
        featuresContainer.addEventListener('mouseenter', () => {
            isPaused = true;
            // Добавляем класс для смены значка
            featuresContainer.classList.add('paused');
        });
        
        featuresContainer.addEventListener('mouseleave', () => {
            isPaused = false;
            // Убираем класс для возврата значка
            featuresContainer.classList.remove('paused');
        });
    }
    
    // Запускаем карусель при открытии секции, останавливаем при закрытии
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('section_1')) {
                if (mutation.target.classList.contains('reveal-active')) {
                    startAutoRotate();
                } else {
                    stopAutoRotate();
                    isPaused = false;
                    // Убираем класс паузы при закрытии
                    if (featuresContainer) {
                        featuresContainer.classList.remove('paused');
                    }
                }
            }
        });
    });
    
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    
    // Активируем первый элемент (без запуска авто)
    activateFeature(0);
}


// ===== ОБРАБОТЧИК кнопки "Узнать больше" 1й СЕКЦИИ =====
function learnMoreFeatures() {
    const section = document.querySelector('.section_1');
    const openBtn = document.getElementById('btn-open-reveal');
    const closeBtn = document.getElementById('btn-close-reveal');
    
    if (!section || !openBtn || !closeBtn) return;
    
    // Открытие
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        section.classList.add('reveal-active');
    });
    
    // Закрытие крестиком
    closeBtn.addEventListener('click', function() {
        section.classList.remove('reveal-active');
    });

    // Закрытие по клику вне блока
    document.addEventListener('click', function(e) {
        if (!section.classList.contains('reveal-active')) return;

        const isClickInside = section.contains(e.target) || openBtn.contains(e.target);

        if (!isClickInside) {
            section.classList.remove('reveal-active');
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && section.classList.contains('reveal-active')) {
            section.classList.remove('reveal-active');
        }
    });
}


// ===== ГАЛЕРЕЯ ЧЕТВЁРТОЙ СЕКЦИИ =====
function initGallery() {
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.section_4 .thumbnail');
    const expertName = document.getElementById('expert-name');
    const expertPosition = document.getElementById('expert-position');
    const expertText = document.getElementById('expert-text');
    
    // Массив с текстами
    const experts = [
        {
            name: "Орангутан Цементоделов",
            position: "Главный цементолог всея Руси",
            comment: "Наконец-то! Инновационный продукт, который позволяет технологам не просто рассчитывать смеси для производства цементов, а делать это с таким же удовольствием, как и заказ пиццы онлайн. Теперь можно забыть о сложных формулах и бесконечных таблицах — всё стало настолько просто, что даже я, старый цементный волк, смог разобраться за пару минут. Рекомендую всем, кто устал от рутины и хочет добавить немного инноваций в свою работу."
        },
        {
            name: "Гоги Шимпанидзе",
            position: "Начальник технологического отдела",
            comment: "Этот продукт не только упрощает жизнь технологам, но и делает её экономически выгодной. Теперь можно не только быстро и точно рассчитывать смеси, но и экономить на материалах, как будто ты на распродаже в супермаркете. С ним мои сотрудники чувствуют себя не просто технологоми, а настоящими финансовыми гениями. Рекомендую всем, кто хочет не только улучшить эффективность работы своей команды, но и сократить расходы, не потеряв при этом в качестве. Это как найти деньги на улице — только лучше!"
        },
        {
            name: "Василий Горилов",
            position: "Ведущий технолог очень крупного завода",
            comment: "Когда я впервые увидел этот продукт, я подумал: «Ну вот, ещё одна игрушка для технологов». Но, к моему удивлению, он оказался не только полезным, но и чертовски удобным. Теперь я могу тратить меньше времени на расчёты и больше — на то, чтобы рассказывать анекдоты коллегам. Рекомендую всем, кто хочет сделать свою работу чуть менее скучной и максимально продуктивной."
        },
        {
            name: "Эллочка Людоедочка",
            position: "Технолог экстра-класса (НИИ «Мексиканский тушкан»)",
            comment: "Этот продукт — настоящая находка для тех, кто считает, что цементное производство — это не только пыль и шум, но и место для творчества. С ним можно экспериментировать со смесями так, как будто ты на кухне, готовишь новый рецепт торта. И да, теперь у меня есть время на кофе-брейки, потому что всё считается само. Рекомендую всем, кто хочет добавить немного легкости в свою тяжёлую работу."
        } 
    ];

    // Устанавливаем начальный текст из первого элемента массива
    expertName.textContent = experts[0].name;
    expertPosition.textContent = experts[0].position;
    expertText.textContent = experts[0].comment;

    // Убеждаемся, что первый thumbnail активен
    thumbnails.forEach(t => t.classList.remove('active'));
    if (thumbnails[0]) {
        thumbnails[0].classList.add('active');
    }
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Убираем active у всех
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Добавляем active текущему
            this.classList.add('active');
            
            // Анимация смены фото
            mainImage.style.opacity = '0.5';
            
            setTimeout(() => {
                // Меняем фото
                const imgInThumb = this.querySelector('img');
                if (imgInThumb) {
                    const thumbSrc = imgInThumb.src;
                    const mainSrc = thumbSrc.replace('thumb', 'recommend');
                    mainImage.src = mainSrc;
                }
                
                mainImage.style.opacity = '1';
            }, 200);
                        

            // Смена текста 
        
            // Индекс для получения текста из массива
            const index = parseInt(this.dataset.index) - 1;
            // Берём текст из массива по индексу
            const newName = experts[index].name || 'Имя эксперта';
            const newPosition = experts[index].position || 'Должность эксперта';
            const newText = experts[index].comment || 'Рекомендация эксперта';

            expertName.style.opacity = '0';
            expertName.style.transform = 'translateX(-140%)';

            expertPosition.style.opacity = '0';
            expertPosition.style.transform = 'translateX(-140%)';

            expertText.style.opacity = '0';
            expertText.style.transform = 'translateX(110%)';

            setTimeout(() => {
                expertName.textContent = newName;
                expertName.style.opacity = '1';
                expertName.style.transform = 'translateX(0)';

                expertPosition.textContent = newPosition;
                expertPosition.style.opacity = '1';
                expertPosition.style.transform = 'translateX(0)';

                expertText.textContent = newText;
                expertText.style.opacity = '1';
                expertText.style.transform = 'translateX(0)';
            }, 200);

        });
    });
}


// ===== СЛУШАТЕЛИ =====
document.addEventListener('DOMContentLoaded', function() {

    // Обработчик кнопки "Узнать больше" в первой секции
    learnMoreFeatures();

    // Инициализация перебора достоинств 1 секции
    initFeaturesCarousel();

    // Инициализация галереи 4 секции
    initGallery();   
});