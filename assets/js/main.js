function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  (function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navEl = document.querySelector('nav');

    if (!hamburger || !mobileMenu || !navEl) return;

    function openMenu() {
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    let rafId = null;
    window.addEventListener(
      'scroll',
      () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          navEl.classList.toggle('is-scrolled', window.scrollY > 50);
          rafId = null;
        });
      },
      { passive: true },
    );
  })();

  // :::todo 要在這裡新增講者資料，並確保與HTML中data-speaker對應
  (function initSpeakers() {
    const speakerData = {
	  1: {
        name: '黃志芳',
        title: '中華民國對外貿易發展協會 董事長',
        img: './assets/image/speaker-1.png',
        bio: `<p>擁有逾三十年鋼鐵產業經驗。自工程部門歷練，參與中鋼三、四階擴建及中龍熱軋廠規劃建廠，歷任軋鋼二廠廠長與生產部門副總經理等要職。</p>
            <p>具備完整工程規劃與生產管理經驗，致力提升製造能力並推動低碳與永續轉型，強化中鋼在全球鋼鐵產業的競爭力。</p>`,
      },
	  2: {
        name: 'Dr. Marc Succi',
        title: 'Massachusetts General Hospital 新創中心創辦人暨執行董事',
        img: './assets/image/speaker-2.png',
		bio: `<p>&nbsp;</p>`,
      },
	  3: {
        name: 'Jan Beger',
        title: 'GE HealthCare 全球人工智慧倡導負責人',
        img: './assets/image/speaker-3.png',
		bio: `<p>&nbsp;</p>`,
      },
      4: {
        name: '陳適安',
        title: '臺中榮民總醫院 名譽院長',
        img: './assets/image/speaker-4.png',
        bio: `<p>專精於溫室氣體盤查、減量與碳足跡查證，以及多項國際管理系統驗證。</p>
            <p>具備 ISO 14064-1、14064-2、14067等專業資格，並為多項 ISO 管理系統稽核員。</p>
            <p>曾擔任 Bureau Veritas Certification Taiwan 副總經理，具備深厚的國際驗證經驗與豐富的產業實務經驗。</p>`,
      },
      5: {
        name: '吳麥斯',
        title: '臺北醫學大學 校長',
        img: './assets/image/speaker-5.png',
        bio: `<p>具近20年產業分析與政策研究經驗，現任金屬工業研究發展中心產業顧問，長期負責經濟部ITIS金屬扣件產業研究，並參與多項國家級政策與企業輔導專案，涵蓋車用扣件、智慧製造、無人機與低碳轉型等領域。</p>
			<p>曾任職美國華府智庫與證券機構，並獲選日本IDE-JETRO海外學者計畫。累計發表產業文章百篇、專題演講逾百場，具豐富產業觀察與政策洞察經驗。</p>`,
      },
      6: {
        name: '陳建宗',
        title: '林口長庚紀念醫院 院長',
        img: './assets/image/speaker-6.png',
        bio: `<p>深耕扣件產業逾三十年，2001年創立友鋮，帶領企業由出口貿易轉型為汽車與工業用特殊扣件製造與客製化解決方案供應商，產品應用於歐美日汽車與工業供應鏈，並於2025年成功上櫃。</p>
			<p>公司積極導入自動化與智慧製造，取得IATF 16949與ISO 14001等認證，並開發TEC Washer防鬆華司打入AI高階應用市場，持續提升台灣扣件產業的國際競爭力。</p>`,
      },
      7: {
        name: '葉肇元',
        title: '雲象科技 創辦人暨執行長',
        img: './assets/image/speaker-7.png',
        bio: `<p>長期深耕航太扣件產業，對全球供應鏈重整與產業升級具前瞻視野，帶領企業由傳統製造邁向國際營運，深化與歐美航太客戶合作並拓展亞洲據點，提升跨區域供應與服務能力。</p>
			<p>除持續強化品質與製程優勢外，亦著眼未來十年技術發展與人才布局，推動跨國人才培育與組織轉型，提升企業與台灣扣件產業在國際航太供應鏈中的競爭力與韌性。</p>`,
      },
      8: {
        name: '張文瀚',
        title: '馬偕紀念醫院 總院長',
        img: './assets/image/speaker-8.png',
        bio: `<p>長期深耕航太扣件產業，對全球供應鏈重整與產業升級具前瞻視野，帶領企業由傳統製造邁向國際營運，深化與歐美航太客戶合作並拓展亞洲據點，提升跨區域供應與服務能力。</p>
			<p>除持續強化品質與製程優勢外，亦著眼未來十年技術發展與人才布局，推動跨國人才培育與組織轉型，提升企業與台灣扣件產業在國際航太供應鏈中的競爭力與韌性。</p>`,
      },
      9: {
        name: '連加恩',
        title: '宏碁智醫 董事長',
        img: './assets/image/speaker-9.png',
        bio: `<p>長期深耕航太扣件產業，對全球供應鏈重整與產業升級具前瞻視野，帶領企業由傳統製造邁向國際營運，深化與歐美航太客戶合作並拓展亞洲據點，提升跨區域供應與服務能力。</p>
			<p>除持續強化品質與製程優勢外，亦著眼未來十年技術發展與人才布局，推動跨國人才培育與組織轉型，提升企業與台灣扣件產業在國際航太供應鏈中的競爭力與韌性。</p>`,
      },
      10: {
        name: '陳靜怡',
        title: '晉弘科技股份有限公司 副總經理',
        img: './assets/image/speaker-10.png',
        bio: `<p>長期深耕航太扣件產業，對全球供應鏈重整與產業升級具前瞻視野，帶領企業由傳統製造邁向國際營運，深化與歐美航太客戶合作並拓展亞洲據點，提升跨區域供應與服務能力。</p>
			<p>除持續強化品質與製程優勢外，亦著眼未來十年技術發展與人才布局，推動跨國人才培育與組織轉型，提升企業與台灣扣件產業在國際航太供應鏈中的競爭力與韌性。</p>`,
      },
      11: {
        name: '李俊霖',
        title: '倍智醫電 營運長',
        img: './assets/image/speaker-11.png',
        bio: `<p>長期深耕航太扣件產業，對全球供應鏈重整與產業升級具前瞻視野，帶領企業由傳統製造邁向國際營運，深化與歐美航太客戶合作並拓展亞洲據點，提升跨區域供應與服務能力。</p>
			<p>除持續強化品質與製程優勢外，亦著眼未來十年技術發展與人才布局，推動跨國人才培育與組織轉型，提升企業與台灣扣件產業在國際航太供應鏈中的競爭力與韌性。</p>`,
      },
    };

    const $carousel = $('.speakers-carousel');

    $carousel.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0px',
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><img src="./assets/image/arrow-prev.svg" alt="prev"></button>',
      nextArrow:
        '<button type="button" class="slick-next"><img src="./assets/image/arrow-next.svg" alt="next"></button>',
      dots: false,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      pauseOnFocus: true,
      speed: 500,
      cssEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      useCSS: true,
      useTransform: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: '0',
            arrows: false,
            autoplay: false,
          },
        },
      ],
    });

    const LIFT = -70;
    const SPEED = 500;

    function updateSlidePositions(centerIndex) {
      const isMobile = window.innerWidth <= 991;
      const slideCount = $carousel.find('.slick-slide:not(.slick-cloned)').length;

      $carousel.find('.slick-slide').each(function () {
        const $slide = $(this);
        const slideIndex = parseInt($slide.data('slick-index'));
        // Normalize to handle cloned slides (infinite mode creates clones with out-of-range indices)
        const normalizedIndex = ((slideIndex % slideCount) + slideCount) % slideCount;
        const isCenter = normalizedIndex === centerIndex;
        const y = !isMobile && isCenter ? LIFT : 0;

        $slide.css({
          transform: `translateY(${y}px) translateZ(0)`,
          transition: `transform ${SPEED}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        });
      });
    }

    $carousel.on(
      'beforeChange',
      function (event, slick, currentSlide, nextSlide) {
        updateSlidePositions(nextSlide);
      },
    );

    $carousel.on('init', function (event, slick) {
      updateSlidePositions(slick.currentSlide);
    });

    const $popup = $('#speakerPopup');

    function openPopup(id) {
      const data = speakerData[id];
      if (!data) return;
      $popup.find('.popup-name').text(data.name);
      $popup.find('.popup-title').text(data.title);
      $popup.find('.popup-bio').html(data.bio);
      if (data.img) {
        $popup.find('.avatar-placeholder img').attr('src', data.img);
      }
      $popup.addClass('active');
      $('body').css('overflow', 'hidden');
    }

    function closePopup() {
      $popup.removeClass('active');
      $('body').css('overflow', '');
    }

    $(document).on('click', '.speaker-slide', function () {
      openPopup($(this).data('speaker'));
    });

    $popup.on('click', '.popup-close, .popup-overlay', closePopup);
    $(document).on('keydown', (e) => {
      if (e.key === 'Escape' && $popup.hasClass('active')) closePopup();
    });

    AOS.init({ duration: 800, easing: 'ease-out-cubic', offset: 80 });
  })();

  (function initScrollHash() {
    const anchors = document.querySelectorAll('section .anchor[id]');
    let lastGAHash = '';
    let ticking = false;

    function sendGAEvent(hash) {
      if (typeof dataLayer === 'undefined') return;
      dataLayer.push({
        eventCategory: 'cwdigiteam',
        eventAction: '2026globalaihealth',
        eventLabel: hash,
        event: 'sendMyEvent',
      });
    }

    function updateHash(id) {
      if (!id || id === lastGAHash) return;
      history.pushState
        ? history.pushState(null, null, `#${id}`)
        : (location.hash = `#${id}`);
      sendGAEvent(id);
      lastGAHash = id;
    }

    function findCurrentAnchor() {
      if (window.scrollY < 100) {
        updateHash('index');
        return;
      }

      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let closest = null;
      let closestDist = Infinity;

      anchors.forEach((anchor) => {
        const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
        if (anchorTop > viewportMid) return;
        const dist = viewportMid - anchorTop;
        if (dist < closestDist) {
          closestDist = dist;
          closest = anchor;
        }
      });

      if (closest) updateHash(closest.id);
    }

    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          findCurrentAnchor();
          ticking = false;
        });
      },
      { passive: true },
    );

    findCurrentAnchor();
  })();
});
