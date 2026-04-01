(function() {
    // Функция для копирования кода
    function setupCodeCopy() {
        var preBlocks = document.querySelectorAll('pre');
        for (var i = 0; i < preBlocks.length; i++) {
            var block = preBlocks[i];
            if (block.querySelector('.copy-btn')) continue;
            
            var copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
            
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                var btn = e.currentTarget;
                var pre = btn.parentElement;
                var code = pre.querySelector('code');
                var text = code ? code.innerText : pre.innerText;
                
                navigator.clipboard.writeText(text).then(function() {
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(function() {
                        btn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
        }
    }
    
    // Функция для загрузки компонентов
    function loadComponents() {
        var isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
        
        // Логотип
        var logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            if (isHttp) {
                fetch('comp/header.html')
                    .then(function(response) { return response.text(); })
                    .then(function(html) { logoContainer.innerHTML = html; })
                    .catch(function() { insertComponents(); });
            } else {
                insertComponents();
            }
        }
        
        // Сайдбар
        var navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            if (isHttp) {
                fetch('comp/sidebar.html')
                    .then(function(response) { return response.text(); })
                    .then(function(html) { navContainer.innerHTML = html; })
                    .catch(function() { insertComponents(); });
            } else {
                insertComponents();
            }
        }
    }
    
    // Функция для вставки компонентов напрямую (для file://)
    function insertComponents() {
        var logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.innerHTML = `
                <div class="logo">
                    <a href="index.html" class="logo-link">
                        <i class="fas fa-code"></i>
                        <span>Spraute Engine</span>
                    </a>
                </div>
            `;
        }
        
        var navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.innerHTML = `
                <nav class="nav-menu">
                    <div class="nav-category"><i class="fas fa-graduation-cap"></i> Основы</div>
                    <a href="getting-started.html" class="nav-link"><i class="fas fa-rocket"></i> Начало работы</a>
                    <a href="syntax.html" class="nav-link"><i class="fas fa-code"></i> Синтаксис</a>
                    <a href="variables.html" class="nav-link"><i class="fas fa-database"></i> Переменные</a>
                    
                    <div class="nav-category"><i class="fas fa-robot"></i> NPC</div>
                    <a href="npc.html" class="nav-link"><i class="fas fa-robot"></i> Создание NPC</a>
                    
                    <div class="nav-category"><i class="fas fa-desktop"></i> Интерфейсы</div>
                    <a href="ui.html" class="nav-link"><i class="fas fa-window-maximize"></i> UI система</a>
                    <a href="chat-library.html" class="nav-link"><i class="fas fa-comment"></i> Кастомный чат</a>
                    
                    <div class="nav-category"><i class="fas fa-bolt"></i> Программирование</div>
                    <a href="events.html" class="nav-link"><i class="fas fa-bell"></i> События (on)</a>
                    <a href="functions.html" class="nav-link"><i class="fas fa-cog"></i> Функции и await</a>
                    
                    <div class="nav-category"><i class="fas fa-gamepad"></i> Игровая механика</div>
                    <a href="items.html" class="nav-link"><i class="fas fa-box"></i> Предметы и инвентарь</a>
                    <a href="particles.html" class="nav-link"><i class="fas fa-sparkles"></i> Частицы</a>
                    
                    <div class="nav-category"><i class="fas fa-folder-open"></i> Примеры</div>
                    <a href="examples.html" class="nav-link"><i class="fas fa-file-code"></i> Полные примеры</a>
                </nav>
                
                <div class="sidebar-footer">
                    <a href="https://t.me/spraute_esd" target="_blank" class="telegram-link">
                        <i class="fab fa-telegram"></i>
                        <span>Telegram канал</span>
                    </a>
                    <a href="https://t.me/spraute_community" target="_blank" class="telegram-link">
                        <i class="fab fa-telegram"></i>
                        <span>Сообщество разработчиков</span>
                    </a>
                </div>
            `;
        }
    }
    
    // Функция для мобильного меню
    function setupMobileMenu() {
        var menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(menuToggle);
        
        var sidebar = document.querySelector('.sidebar');
        
        function checkMobile() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
                if (sidebar) sidebar.classList.remove('open');
            } else {
                menuToggle.style.display = 'none';
                if (sidebar) sidebar.classList.remove('open');
            }
        }
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        menuToggle.addEventListener('click', function() {
            if (sidebar) sidebar.classList.toggle('open');
        });
        
        var links = document.querySelectorAll('.nav-link, .telegram-link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('open');
                }
            });
        }
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && e.target !== menuToggle) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
    
    // Функция для подсветки активной страницы
    function highlightActivePage() {
        var currentPath = window.location.pathname.split('/').pop() || 'index.html';
        var navLinks = document.querySelectorAll('.nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            var link = navLinks[i];
            var href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    }
    
    // Инициализация
    function init() {
        loadComponents();
        setupCodeCopy();
        setupMobileMenu();
        highlightActivePage();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();