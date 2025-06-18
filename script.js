// Мобильная навигация
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Плавный скролл к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Фильтрация галереи товаров
const productCards = document.querySelectorAll('.product-card');
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// Кнопка "Наверх"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--secondary-color);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 100;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
animatedElements.forEach(element => observer.observe(element));

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Ваше сообщение отправлено!');
});


// Close the modal when clicking on the close button
document.querySelector('.close').onclick = function () {
    document.getElementById('order-form').style.display = 'none';
}

// Initialize cart count
document.addEventListener('DOMContentLoaded', () => {
    cart.updateUI();
});

document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const contentContainer = document.getElementById('categoryContent');

    // Функция для загрузки шаблона
    function loadCategory(category) {
        const template = document.getElementById(`template-${category}`);
        if (!template || !contentContainer) return;

        // Записываем в контейнер
        contentContainer.innerHTML = template.innerHTML;
    }

    // Обработчики кликов
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;

            // Активная кнопка
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Загружаем нужную категорию
            loadCategory(category);
        });
    });

    // Автоматически загружаем первую категорию при старте
    const firstCategory = document.querySelector('.category-btn.active').dataset.category;
    loadCategory(firstCategory);
});

