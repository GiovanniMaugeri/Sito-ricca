(function () {
    var APP_STORE_HTTPS = 'https://apps.apple.com/it/app/id6758889696';
    var APP_STORE_ITMS = 'itms-apps://apps.apple.com/it/app/id6758889696';
    var APP_STORE_IG = 'instagram://extbrowser/?url=' + encodeURIComponent(APP_STORE_HTTPS);
    var PLAY_HTTPS = 'https://play.google.com/store/apps/details?id=com.wimii.app';
    var PLAY_MARKET = 'market://details?id=com.wimii.app';

    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isAndroid = /Android/i.test(ua);
    var isInstagram = /Instagram/i.test(ua);

    function openIosStore(e) {
        // Fuori da Instagram: lascia il link https normale.
        if (!isInstagram) return;

        e.preventDefault();
        // Solo schemi che escono dal browser IG.
        // NON usare https://apps.apple.com qui: in IG diventa la schermata bianca.
        window.location.href = APP_STORE_IG;
        setTimeout(function () {
            window.location.href = APP_STORE_ITMS;
        }, 400);
    }

    function openAndroidStore(e) {
        if (!isInstagram && !isAndroid) return;
        e.preventDefault();
        window.location.href = PLAY_MARKET;
        setTimeout(function () {
            window.location.href = PLAY_HTTPS;
        }, 500);
    }

    document.querySelectorAll('[data-store="ios"]').forEach(function (el) {
        el.removeAttribute('target');
        // Su Instagram il href nativo deve già essere lo schema giusto (non https).
        el.href = isInstagram ? APP_STORE_IG : APP_STORE_HTTPS;
        el.addEventListener('click', openIosStore);
    });

    document.querySelectorAll('[data-store="android"]').forEach(function (el) {
        el.removeAttribute('target');
        el.href = isInstagram ? PLAY_MARKET : PLAY_HTTPS;
        el.addEventListener('click', openAndroidStore);
    });

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
