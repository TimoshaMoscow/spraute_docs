(function() {
    // Определяем окружение
    var isFileProtocol = window.location.protocol === 'file:';
    var basePath = '';
    
    // Если открыто как file://, компоненты нужно вставлять иначе
    if (isFileProtocol) {
        console.log('Работа в file:// режиме, компоненты не загружаются');
    }
    
    // Функция для вставки компонентов (копипаст из comp файлов)
    function insertComponents() {
        // Логотип
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
        
        // Сайдбар меню
        var navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.innerHTML = `
                <nav class="nav-menu">
                    <div class="nav-category">Основы</div>
                    <a href="getting-started.html" class="nav-link">🚀 Начало работы</a>
                    <a href="syntax.html" class="nav-link">📝 Синтаксис</a>
                    <a href="variables.html" class="nav-link">📦 Переменные</a>
                    
                    <div class="nav-category">NPC</div>
                    <a href="npc.html" class="nav-link">🤖 Создание NPC</a>
                    
                    <div class="nav-category">Интерфейсы</div>
                    <a href="ui.html" class="nav-link">🖥️ UI система</a>
                    <a href="chat-library.html" class="nav-link">💬 Кастомный чат</a>
                    
                    <div class="nav-category">Программирование</div>
                    <a href="events.html" class="nav-link">⚡ События (on)</a>
                    <a href="functions.html" class="nav-link">🔧 Функции и await</a>
                    
                    <div class="nav-category">Игровая механика</div>
                    <a href="items.html" class="nav-link">🎒 Предметы и инвентарь</a>
                    <a href="particles.html" class="nav-link">✨ Частицы</a>
                    
                    <div class="nav-category">Примеры</div>
                    <a href="examples.html" class="nav-link">📚 Полные примеры</a>
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
    
    // Функция для загрузки компонентов (только для http/https)
    function loadComponentsFromServer() {
        var isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
        
        if (!isHttp) {
            // Если file://, просто вставляем напрямую
            insertComponents();
            return Promise.resolve();
        }
        
        // Для http/https пробуем загрузить
        var promises = [];
        
        var logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            promises.push(fetch('comp/header.html')
                .then(response => response.text())
                .then(html => { logoContainer.innerHTML = html; })
                .catch(() => insertComponents()));
        }
        
        var navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            promises.push(fetch('comp/sidebar.html')
                .then(response => response.text())
                .then(html => { navContainer.innerHTML = html; })
                .catch(() => insertComponents()));
        }
        
        return Promise.all(promises);
    }
    
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
    
    // Функция для авто-добавления классов подсветки
    function setupCodeHighlight() {
        var preBlocks = document.querySelectorAll('pre');
        
        for (var i = 0; i < preBlocks.length; i++) {
            var pre = preBlocks[i];
            var code = pre.querySelector('code');
            
            if (!code) {
                code = document.createElement('code');
                code.innerHTML = pre.innerHTML;
                pre.innerHTML = '';
                pre.appendChild(code);
            }
            
            if (!code.className || !code.className.includes('language-')) {
                code.className = 'language-spr';
            }
        }
        
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }
    
    // Регистрация языка spr
    function registerSprLanguage() {
        if (typeof hljs !== 'undefined' && !hljs.getLanguage('spr')) {
            hljs.registerLanguage('spr', function(hljs) {
                return {
                    name: 'Spraute Script',
                    keywords: {
                        keyword: 'val global world await create if else while for fun return on every stop async true false include',
                        built_in: 'chat say get_nearest_player get_player give_item set_block random play_sound ui_open ui_close ui_update ui_animate overlay_open overlay_close stop_task task_done int_str whole_str'
                    },
                    contains: [
                        hljs.COMMENT('#', '$'),
                        hljs.QUOTE_STRING_MODE,
                        hljs.C_NUMBER_MODE,
                        {
                            className: 'function',
                            begin: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/,
                            relevance: 0
                        }
                    ]
                };
            });
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
    
    // Функция для исправления ссылок
    function fixLinks() {
        var navLinks = document.querySelectorAll('.nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            var link = navLinks[i];
            var href = link.getAttribute('href');
            
            if (href && !href.includes('.html') && !href.startsWith('http') && !href.startsWith('#')) {
                link.setAttribute('href', href + '.html');
            }
        }
    }
    
    // Инициализация
    function init() {
        loadComponentsFromServer().then(function() {
            fixLinks();
            registerSprLanguage();
            setupCodeHighlight();
            setupCodeCopy();
            setupMobileMenu();
            highlightActivePage();
        }).catch(function() {
            // fallback
            fixLinks();
            registerSprLanguage();
            setupCodeHighlight();
            setupCodeCopy();
            setupMobileMenu();
            highlightActivePage();
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();