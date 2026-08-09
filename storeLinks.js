(function () {
    var APP_STORE_HTTPS = 'https://apps.apple.com/it/app/id6758889696';
    var APP_STORE_ITMS = 'itms-apps://apps.apple.com/it/app/id6758889696';
    var PLAY_HTTPS = 'https://play.google.com/store/apps/details?id=com.wimii.app';
    var PLAY_MARKET = 'market://details?id=com.wimii.app';

    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isAndroid = /Android/i.test(ua);
    var isInstagram = /Instagram/i.test(ua);

    function openIosStore(e) {
        if (e) e.preventDefault();

        // Instagram: chiede di aprire Safari (serve un tap utente).
        if (isInstagram) {
            window.location.href = 'instagram://extbrowser/?url=' + encodeURIComponent(APP_STORE_HTTPS);
        }

        setTimeout(function () {
            window.location.href = APP_STORE_ITMS;
        }, 250);

        setTimeout(function () {
            window.location.href = APP_STORE_HTTPS;
        }, 700);
    }

    function openAndroidStore(e) {
        if (e) e.preventDefault();
        window.location.href = PLAY_MARKET;
        setTimeout(function () {
            window.location.href = PLAY_HTTPS;
        }, 500);
    }

    function bind(el, handler) {
        if (!el) return;
        el.removeAttribute('target');
        el.addEventListener('click', handler);
    }

    document.querySelectorAll('[data-store="ios"]').forEach(function (el) {
        el.href = APP_STORE_HTTPS;
        bind(el, openIosStore);
    });

    document.querySelectorAll('[data-store="android"]').forEach(function (el) {
        el.href = PLAY_HTTPS;
        bind(el, openAndroidStore);
    });

    // Ordina i bottoni nella landing /download (store del dispositivo prima).
    var wrap = document.getElementById('storeButtons');
    var iosBtn = document.getElementById('iosBtn');
    var androidBtn = document.getElementById('androidBtn');
    var hint = document.getElementById('downloadHint');
    if (wrap && iosBtn && androidBtn) {
        if (isAndroid) {
            wrap.insertBefore(androidBtn, iosBtn);
            androidBtn.className = 'btn-store btn-store-primary';
            iosBtn.className = 'btn-store btn-store-secondary';
            if (hint) hint.textContent = 'Tocca Google Play per installare Wimii.';
        } else if (isIOS) {
            wrap.insertBefore(iosBtn, androidBtn);
            iosBtn.className = 'btn-store btn-store-primary';
            androidBtn.className = 'btn-store btn-store-secondary';
            if (hint) hint.textContent = 'Tocca App Store per installare Wimii.';
        }
    }
})();
