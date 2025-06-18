// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    // Открытие/закрытие меню
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Плавный скролл к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Фильтрация карточек
const productCards = document.querySelectorAll('.product-card');
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            productCards.forEach(card => {
                const category = card.dataset.category || 'all';
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });
}

// Кнопка "Наверх"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--secondary-color, #754F44);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 100;
    font-size: 20px;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
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
const observerOptions = { threshold: 0.1 };
const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');

if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => observer.observe(element));
}

// Пример обработки формы
document.getElementById('contact-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Ваше сообщение отправлено!');
});

// Закрытие модального окна
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('order-form').style.display = 'none';
});


// Работа с категориями
document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const contentContainer = document.getElementById('categoryContent');

    function loadCategory(category) {
        const template = document.getElementById(`template-${category}`);
        if (!template || !contentContainer) return;
        contentContainer.innerHTML = template.innerHTML;
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            loadCategory(category);
        });
    });

    const firstCategoryButton = document.querySelector('.category-btn.active');
    if (firstCategoryButton) {
        const firstCategory = firstCategoryButton.dataset.category;
        loadCategory(firstCategory);
    }
});

// При клике на карточку открываем модальное окно
productCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.dataset.title || '';
        const image = card.dataset.image || '';
        const description = card.dataset.description || '';
        const size = card.dataset.size || '—';
        const weight = card.dataset.weight || '—';
        const pallet = card.dataset.pallet || '—';

        modalImage.src = image;
        modalTitle.textContent = title;

        // Компактное отображение характеристик
        modalDetails.innerHTML = `
            <li><strong>Описание:</strong> ${description}</li>
            <li><strong>Размер:</strong> ${size}</li>
            <li><strong>Вес:</strong> ${weight}</li>
            <li><strong>Количество на поддоне:</strong> ${pallet}</li>
        `;

        modal.style.display = 'block';
    });
});