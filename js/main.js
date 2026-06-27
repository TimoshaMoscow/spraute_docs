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
                    <a href="getting-started.html" class="nav-link">Начало работы</a>
                    <a href="syntax.html" class="nav-link">Синтаксис</a>
                    <a href="variables.html" class="nav-link">Переменные</a>
                    
                    <div class="nav-category"><i class="fas fa-robot"></i> NPC</div>
                    <a href="npc.html" class="nav-link">Создание NPC</a>
                    
                    <div class="nav-category"><i class="fas fa-desktop"></i> Интерфейсы</div>
                    <a href="ui.html" class="nav-link">UI система</a>
                    <a href="chat-library.html" class="nav-link">Кастомный чат</a>
                    
                    <div class="nav-category"><i class="fas fa-camera"></i> Камера</div>
                    <a href="camera.html" class="nav-link">Кинематографическая камера</a>
                    
                    <div class="nav-category"><i class="fas fa-bolt"></i> Программирование</div>
                    <a href="events.html" class="nav-link">События (on)</a>
                    <a href="functions.html" class="nav-link">Функции и await</a>
                    
                    <div class="nav-category"><i class="fas fa-gamepad"></i> Игровая механика</div>
                    <a href="items.html" class="nav-link">Предметы и инвентарь</a>
                    <a href="particles.html" class="nav-link">Частицы</a>
                    
                    <div class="nav-category"><i class="fas fa-cube"></i> Кастомные ресурсы</div>
                    <a href="custom-resources.html" class="nav-link">Блоки, предметы, крафты</a>
                    <a href="visual-blocks.html" class="nav-link">Визуальные блоки</a>
                    <a href="java-api.html" class="nav-link">Java API</a>
                    
                    <div class="nav-category"><i class="fas fa-folder-open"></i> Примеры</div>
                    <a href="examples.html" class="nav-link">Полные примеры</a>
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
    
    // Регистрация языка spr для Highlight.js
    function registerSprLanguage() {
        if (typeof hljs !== 'undefined' && !hljs.getLanguage('spr')) {
            hljs.registerLanguage('spr', function(hljs) {
                return {
                    name: 'Spraute Script',
                    keywords: {
                        keyword: 'val global world await create if else while for fun return on every stop async true false include import startScript stopScript cancelEvent camera',
                        built_in: 'chat say getNearestPlayer getPlayer giveItem setBlock random playSound stopSound uiOpen uiClose uiUpdate uiAnimate overlayOpen overlayClose stopTask taskDone intStr wholeStr strLen strWidth strNewlineCount replace getHeldItem getSlot hasItem countItem execute spawnOrb removeOrbs addMobDrop addBlockDrop startScript stopScript save_snapshot load_snapshot setColor getVar java_class java_new sendPacket particleSpawn particleLine particleCircle particleSpiral particleStartBone particleStopBone openBlockUi getBlockSlot setBlockDisplay setBlockDisplayModel setBlockDisplayBlock removeBlockDisplay healEntity heal playersInRadius entitiesInRadius getPlayerMotion setPlayerMotion getPlayerMovementSpeed setPlayerMovementSpeed getPlayerJumpStrength setPlayerJumpStrength getPlayerStepHeight setPlayerStepHeight getPlayerAttackDamage setPlayerAttackDamage getPlayerDigSpeed setPlayerDigSpeed setCamera setCameraLookAt animateCamera animateCameraLookAt stopCamera resetCamera playCameraRoute cameraRoute getPlayerInventory getItemInSlot isSlotEmpty hasItemInSlot findItemSlot setItemInSlot setItemCount clearItemSlot removeItem getItemName setItemName getItemLore setItemLore getItemAttackDamage setItemAttackDamage getItemNbt setItemNbt setBlockSlot setChestLoot clearChestLoot'
                    },
                    contains: [
                        // Комментарии для визуальных блоков (#\)
                        {
                            className: 'comment',
                            begin: /#\\/,
                            end: /$/,
                            contains: [
                                {
                                    className: 'keyword',
                                    begin: /\b(row|template|if|else|block|category|color|shape|input)\b/,
                                    relevance: 10
                                },
                                {
                                    className: 'variable',
                                    begin: /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/,
                                    relevance: 10
                                },
                                {
                                    className: 'string',
                                    begin: /"(\\"|[^"])*"/
                                },
                                {
                                    className: 'params',
                                    begin: /\([^)]*\)/
                                }
                            ]
                        },
                        // Обычные комментарии
                        hljs.COMMENT('#', '$'),
                        // Строки
                        hljs.QUOTE_STRING_MODE,
                        // Числа
                        hljs.C_NUMBER_MODE,
                        // Функции
                        {
                            className: 'function',
                            begin: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/,
                            relevance: 0
                        },
                        // Методы и свойства через точку
                        {
                            className: 'property',
                            begin: /\.([a-zA-Z_][a-zA-Z0-9_]*)/,
                            relevance: 0
                        },
                        // Индексы массивов
                        {
                            className: 'variable',
                            begin: /\[[^\]]*\]/,
                            relevance: 0
                        },
                        // Ключевые слова в обычном коде
                        {
                            className: 'keyword',
                            begin: /\b(val|global|world|await|create|if|else|while|for|fun|return|on|every|stop|async|true|false|include|import|startScript|stopScript|cancelEvent|camera)\b/,
                            relevance: 10
                        }
                    ]
                };
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
    
    // Функция для исправления ссылок (добавляет .html если нет)
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
    
    // Функция для баннера релиза (по МСК, 9 июля 2026)
    function setupReleaseBanner() {
        var banner = document.getElementById('releaseBanner');
        if (!banner) return;
        
        // 9 июля 2026, 00:00:00 по московскому времени (UTC+3)
        var targetDate = new Date('2026-07-09T00:00:00+03:00');
        var now = new Date();
        
        // Если дата уже прошла
        if (now >= targetDate) {
            banner.classList.add('released');
            var titleEl = document.getElementById('releaseTitle');
            var msgEl = document.getElementById('releaseMessage');
            var timerEl = document.getElementById('releaseTimer');
            var dateEl = document.querySelector('.release-date');
            
            if (titleEl) titleEl.textContent = '🎉 Релиз Spraute Engine состоялся!';
            if (msgEl) msgEl.innerHTML = 'Скачать язык можно в Telegram: <a href="https://t.me/spraute_esd" target="_blank">@spraute_esd</a>';
            if (timerEl) timerEl.style.display = 'none';
            if (dateEl) dateEl.textContent = '🎉 Доступен для всех!';
            return;
        }
        
        // Обновление таймера
        function updateTimer() {
            var now = new Date();
            var diff = targetDate - now;
            
            if (diff <= 0) {
                banner.classList.add('released');
                var titleEl = document.getElementById('releaseTitle');
                var msgEl = document.getElementById('releaseMessage');
                var timerEl = document.getElementById('releaseTimer');
                var dateEl = document.querySelector('.release-date');
                
                if (titleEl) titleEl.textContent = '🎉 Релиз Spraute Engine состоялся!';
                if (msgEl) msgEl.innerHTML = 'Скачать язык можно в Telegram: <a href="https://t.me/spraute_esd" target="_blank">@spraute_esd</a>';
                if (timerEl) timerEl.style.display = 'none';
                if (dateEl) dateEl.textContent = '🎉 Доступен для всех!';
                return;
            }
            
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            var daysEl = document.getElementById('days');
            var hoursEl = document.getElementById('hours');
            var minutesEl = document.getElementById('minutes');
            var secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }
    
    // Инициализация
    function init() {
        fixLinks();
        loadComponents();
        registerSprLanguage();
        setupCodeHighlight();
        setupCodeCopy();
        setupMobileMenu();
        highlightActivePage();
        setupReleaseBanner();  // баннер с таймером до 9 июля 2026
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();