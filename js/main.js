/* =========================================================
   宋祐嘉 個人作品集 — 互動腳本
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

    /* 年份 */
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* 行動選單開合 */
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', function () { links.classList.toggle('open'); });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { links.classList.remove('open'); });
        });
    }

    /* 捲動時導覽列陰影 + 回頂按鈕 */
    var nav = document.getElementById('nav');
    var goTop = document.getElementById('goTop');
    function onScroll() {
        var s = window.scrollY || document.documentElement.scrollTop;
        if (nav) nav.classList.toggle('scrolled', s > 10);
        if (goTop) goTop.classList.toggle('show', s > 400);
        spy();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    if (goTop) goTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    /* Scrollspy：高亮目前區塊 */
    var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
    var sections = navAnchors.map(function (a) {
        var id = a.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    });
    function spy() {
        var pos = (window.scrollY || 0) + 120;
        var idx = -1;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i] && sections[i].offsetTop <= pos) idx = i;
        }
        navAnchors.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
    }

    /* 捲動淡入動畫 */
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }

    /* ===== 證照相簿 ===== */
    var certs = [
        { f: '1.專利.png', c: '專利證書' },
        { f: '2.金牌.png', c: '發明展金牌' },
        { f: '3..png', c: '獲獎紀錄' },
        { f: '4.img48.png', c: '學習紀錄' },
        { f: '5.c++基礎.png', c: 'C++ 基礎課程結業' },
        { f: '6.c++進階.png', c: 'C++ 進階課程結業' },
        { f: '7.c++leetcode進階解題.png', c: 'C++ LeetCode 進階解題班' },
        { f: '8.c++初階解題.png', c: 'C++ 初階解題班' },
        { f: '9.c++演算法.png', c: 'C++ 演算法課程' },
        { f: '10.html初階.png', c: 'HTML / CSS 初階課程' },
        { f: '11.html進階.png', c: 'HTML / CSS 進階課程' },
        { f: '12.img101C++leetcode初階解體.png', c: 'C++ LeetCode 初階解題班' },
        { f: '13.img101sql.png', c: 'SQL 資料分析班' },
        { f: '14.react.png', c: 'React 課程' },
        { f: '15.java基礎.png', c: 'Java 基礎課程' },
        { f: '16.java進階.png', c: 'Java 進階課程' },
        { f: '17.演算法實戰班.png', c: '演算法實戰班' },
        { f: '18.python初階.png', c: 'Python 初階課程' },
        { f: '19..jpg', c: '學習與獲獎紀錄' },
        { f: '20..jpg', c: '學習與獲獎紀錄' },
        { f: '21..jpg', c: '學習與獲獎紀錄' },
        { f: '22..jpg', c: '學習與獲獎紀錄' },
        { f: '23..jpg', c: '學習與獲獎紀錄' },
        { f: '24..jpg', c: '學習與獲獎紀錄' },
        { f: '25..jpg', c: '學習與獲獎紀錄' },
        { f: '26..jpg', c: '學習與獲獎紀錄' },
        { f: '27..jpg', c: '學習與獲獎紀錄' },
        { f: '28..jpg', c: '學習與獲獎紀錄' },
        { f: '29..jpg', c: '學習與獲獎紀錄' },
        { f: '30..jpg', c: '學習與獲獎紀錄' },
        { f: '31..jpg', c: '學習與獲獎紀錄' },
        { f: '32..jpg', c: '學習與獲獎紀錄' },
        { f: '33..png', c: '學習與獲獎紀錄' },
        { f: '34..jpg', c: '學習與獲獎紀錄' }
    ];
    var gallery = document.getElementById('gallery');
    if (gallery) {
        certs.forEach(function (item) {
            var fig = document.createElement('figure');
            fig.className = 'cert';
            var src = './img/' + item.f;
            fig.innerHTML = '<img src="' + src + '" alt="' + item.c + '" loading="lazy">' +
                '<figcaption>' + item.c + '</figcaption>';
            fig.addEventListener('click', function () { openLightbox(src, item.c); });
            gallery.appendChild(fig);
        });
    }

    /* ===== Lightbox ===== */
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightboxImg');
    var lbClose = document.getElementById('lightboxClose');
    function openLightbox(src, alt) {
        if (!lb) return;
        lbImg.src = src; lbImg.alt = alt || '';
        lb.classList.add('open');
    }
    function closeLightbox() { if (lb) { lb.classList.remove('open'); lbImg.src = ''; } }
    if (lb) {
        lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
    }

    onScroll();
});
