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
        name: 'James C. F. Huang',
        title: 'President, China Steel Corporation (CSC)',
        img: './assets/image/speaker-1.png',
        bio: `<p>With over 30 years of experience in the steel industry, he began his career in engineering and participated in CSC’s Phase III and IV expansions, as well as the planning and construction of Dragon Steel’s hot rolling mill. He later served as Plant Manager of Rolling Mill No. 2 and Deputy Vice President of Production.</p>
		<p>With extensive expertise in engineering planning and production management, he is committed to enhancing manufacturing capabilities and advancing low-carbon and sustainability initiatives, strengthening CSC’s global competitiveness.</p>`,
      },
      2: {
        name: 'Dr. Marc Succi',
        title: 'Founder & Executive Director, Mass General Brigham MESH Incubator and Associate Professor of Radiology, Harvard Medical School',
        img: './assets/image/speaker-2.png',
        bio: `<p>Ed Smith has spent the past 30 years in the fastener industry working across distribution, sales, and procurement — most recently as part of the Procurement team at Wurth Industry USA.</p>
		<p>In 2025, Ed took on the role of President of the National Fastener Distributors Association, where he’s focused on helping members navigate an uncertain market and building a stronger, more connected industry for the next generation.</p>`,
      },
	  3: {
        name: 'Jan Beger',
        title: 'GE Global Head of AI Advocacy',
        img: './assets/image/speaker-3.png',
        bio: `<p>Former Deputy Secretary General of Thailand BOI, Mr. Chanin Khaochan has extensive experience in global investment and industrial development.</p>
		<p>He initiated SUBCON Thailand to connect international markets and support SME growth, and continues to serve as an investment advisor.</p>`,
      },
      4: {
        name: 'Dr. Shih-An Chen',
        title: 'Honorary Superintendent, Taichung Veterans General Hospital',
        img: './assets/image/speaker-4.png',
        bio: `<p>Specialized in greenhouse gas inventory, emissions reduction, and carbon footprint verification, with qualifications including ISO 14064 and ISO 14067, and experience in multiple ISO management system audits.</p> 
		<p>Previously served as Deputy General Manager of Bureau Veritas Certification Taiwan, with extensive experience in international certification and sustainability practices.</p>`,
      },
      5: {
        name: 'Dr. Mai-Szu Wu',
        title: 'President, Taipei Medical University (TMU)',
        img: './assets/image/speaker-5.png',
        bio: `<p>With nearly 20 years of experience in industry analysis and policy research, she serves as an Industry Consultant at MIRDC, focusing on Taiwan’s fastener industry, smart manufacturing, and low-carbon transformation.</p>
		<p>She previously worked at a Washington, D.C. think tank and was selected for Japan’s IDE-JETRO program. She has published over 100 articles and delivered numerous keynote speeches on industry trends and policy insights.</p>`,
      },
      6: {
        name: 'Dr. Chen, Chien-Tzung',
        title: 'Superintendent, Linkou Chang Gung Memorial Hospital',
        img: './assets/image/speaker-6.png',
        bio: `<p>With over 30 years in the fastener industry, he founded Yow Chern in 2001 and led its transformation into a manufacturer of automotive and industrial specialty fasteners, serving supply chains across Europe, the U.S., and Japan. The company was successfully listed in 2025.</p>
		<p>Yow Chern continues to advance automation and smart manufacturing, achieving IATF 16949 and ISO 14001 certifications, and developing the TEC Washer solution for high-end applications, strengthening Taiwan’s global competitiveness.</p>`,
      },
      7: {
        name: 'Chao-Yuan (Joe) Yeh',
        title: 'MD, PhD, Founder and CEO, aetherAI',
        img: './assets/image/speaker-7.png',
        bio: `<p>With extensive experience in the aerospace fastener industry, he leads the transition from traditional manufacturing to global operations, strengthening partnerships with aerospace customers in Europe, the United States, and Asia.</p> 
		<p>Focusing on future technology and talent development, he promotes organizational transformation and enhances competitiveness, reinforcing Taiwan’s position in the global aerospace supply chain.</p>`,
      },
      8: {
        name: 'Dr. Wen-Han Chang',
        title: 'Superintendent of MacKay Memorial Hospital',
        img: './assets/image/speaker-8.png',
        bio: `<p>With extensive experience in the aerospace fastener industry, he leads the transition from traditional manufacturing to global operations, strengthening partnerships with aerospace customers in Europe, the United States, and Asia.</p> 
		<p>Focusing on future technology and talent development, he promotes organizational transformation and enhances competitiveness, reinforcing Taiwan’s position in the global aerospace supply chain.</p>`,
      },
      9: {
        name: 'Allen Chia-En Lien',
        title: 'Chairman & Chief Executive Officer, Acer Medical ',
        img: './assets/image/speaker-9.png',
        bio: `<p>With extensive experience in the aerospace fastener industry, he leads the transition from traditional manufacturing to global operations, strengthening partnerships with aerospace customers in Europe, the United States, and Asia.</p> 
		<p>Focusing on future technology and talent development, he promotes organizational transformation and enhances competitiveness, reinforcing Taiwan’s position in the global aerospace supply chain.</p>`,
      },
      10: {
        name: 'Julie Chen',
        title: 'Executive Vice President, Business Development & Operation Group, Medimaging Integrated Solution Inc.',
        img: './assets/image/speaker-10.png',
        bio: `<p>With extensive experience in the aerospace fastener industry, he leads the transition from traditional manufacturing to global operations, strengthening partnerships with aerospace customers in Europe, the United States, and Asia.</p> 
		<p>Focusing on future technology and talent development, he promotes organizational transformation and enhances competitiveness, reinforcing Taiwan’s position in the global aerospace supply chain.</p>`,
      },
      11: {
        name: 'James C. L. Lee',
        title: 'Chief Operating Officer (COO), V5med Inc.',
        img: './assets/image/speaker-11.png',
        bio: `<p>With extensive experience in the aerospace fastener industry, he leads the transition from traditional manufacturing to global operations, strengthening partnerships with aerospace customers in Europe, the United States, and Asia.</p> 
		<p>Focusing on future technology and talent development, he promotes organizational transformation and enhances competitiveness, reinforcing Taiwan’s position in the global aerospace supply chain.</p>`,
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
