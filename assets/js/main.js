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
        name: 'Marc Succi',
        title: 'Mass General Brigham MESH Incubator 創辦人暨執行董事 / 哈佛醫學院放射學副教授',
        img: './assets/image/speaker-1.png',
        bio: `<p>Dr. Succi為放射科醫師、企業家、發明家及哈佛醫學院副教授，長期投入人工智慧、智慧醫療與臨床創新。</p>
            <p>他是麻省總醫院MESH醫療創新孵化器創辦人暨執行主任，致力將第一線臨床需求轉化為可專利化、商品化及授權的醫療解決方案，並主持生成式AI臨床決策支援研究。Dr. Succi曾入選《富比士》科學與醫療領域30位30歲以下菁英，並獲MIT Data Prize等多項國際肯定。他亦經常於哈佛及全球各地講授智慧醫療、AI與醫療創新，推動醫療、科技與產業之間的跨域合作。</p>`,
      },
	  2: {
        name: 'Jan Beger',
        title: 'GE HealthCare 全球人工智慧倡導負責人',
        img: './assets/image/speaker-2.png',
		bio: `<p>Jan Beger 現任 GE HealthCare 全球人工智慧倡導負責人，並擔任 HelloAI 執行董事，致力協助醫療專業者將 AI 從理論概念轉化為臨床實務影響。</p>
          <p>擁有超過20年醫療資訊、醫學影像與AI領域經驗，他長期關注AI醫療落地的核心挑戰，包括信任建立、工作流程整合、臨床導入與病患效益。Jan 擅長將複雜AI發展轉化為醫師與醫療體系領導者可理解、可應用的洞察，並透過社群、電子報與創新平台推動醫療AI實務交流，協助組織從AI熱潮走向真實落地。</p>`,
      },
	  3: {
        name: '陳適安',
        title: '工研院院士 / 國立陽明交通大學教授',
        img: './assets/image/speaker-3.png',
		bio: `<p>陳適安教授是世界心律不整電燒治療領域的先驅，曾提出「非肺靜脈起源性的心房顫動」理論，並首創以頻譜分析電生理訊號輔助心房顫動電燒手術，提升治療成功率，其方法被國際醫界稱為「臺北方法」。</p>
          <p>除臨床與學術成就外，陳教授也長期推動臺灣智慧醫療發展，曾擔任國科會智慧醫療聯盟臨床試驗計畫主持人、台法醫療科技專案召集人、國際智慧醫療專案主持人及衛福部AI中心召集人等，協助智慧醫材臨床驗證與國際合作，並帶領臺中榮總獲選全球百大最佳智慧醫院。</p>`,
  },
      4: {
        name: '吳麥斯',
        title: '臺北醫學大學校長',
        img: './assets/image/speaker-4.png',
        bio: `<p>現任臺北醫學大學校長，為深耕臨床、教學與研究的腎臟科專家。面對AI醫療與高齡化社會趨勢，他以宏觀視野推動醫療與數位轉型，帶領北醫大發展次世代醫療AI整合平台，串聯臨床資料、跨域資源與流程自動化，將智慧科技導入臨床實務與長照照護。同時，他也積極布局未來醫學教育，導入虛擬醫院與創新教學模式，培育具國際視野的次世代醫療人才，推動臺灣智慧醫療鏈結全球。</p>`,
      },
      5: {
        name: '陳建宗',
        title: '林口長庚紀念醫院 院長',
        img: './assets/image/speaker-5.png',
        bio: `<p>陳建宗院長現任林口長庚紀念醫院院長，畢業於高雄醫學大學醫學系，曾赴美國達拉斯西南醫學中心整外擔任研究員，並歷任林口長庚外傷整形外科主任、基隆長庚院長、林口長庚執行副院長等職務。</p>
			<p>學術方面著有超過130篇優秀論文及書籍章節，並長期投入國際醫療交流，曾獲邀擔任多項國際醫學會臺灣代表與重要職務。陳院長專精一般外科及整形外科，持續推動整形外科醫學發展與國際合作。</p>`,
      },
      6: {
        name: '葉肇元',
        title: '雲象科技 總經理',
        img: './assets/image/speaker-6.png',
        bio: `<p>葉肇元醫師畢業於臺灣大學醫學系，其後赴南加州大學攻讀病理學博士，運用光學顯微技術探索胚胎發育的細胞動態。因深受電腦演算法在影像分析上的精準能力啟發，葉醫師毅然離開學術界，創辦雲象科技。</p>
			<p>雲象是臺灣領先的醫療影像AI公司，與頂尖醫療中心合作，協助病理科醫師更快速、精準完成診斷。公司屢獲殊榮，包含科技部、經濟部、數發部等多項創新獎項，目前為臺灣數位病理市場最大份額業者，並積極布局海外市場。</p>`,
      },
      7: {
        name: '張文瀚',
        title: '馬偕紀念醫院 總院長',
        img: './assets/image/speaker-7.png',
        bio: `<p>現任馬偕紀念醫院總院院長，於馬偕服務近27年，歷任急診醫學部主任、總院副院長等職務，長期深耕急重症醫療、醫院管理與智慧醫療發展。專精外科、急診醫學、老人急重症醫學、重症醫學、創傷醫學及急診超音波等領域，研究涵蓋急重症與外傷醫學、長期照護、醫院管理及AI智慧醫療應用。</p>
			<p>曾獲台北市醫師公會杏林獎、台灣醫療典範獎與永續傑出人物獎，並代表臺灣醫療團隊參與國際交流，展現卓越醫療領導與國際影響力。</p>`,
      },
      8: {
        name: '連加恩',
        title: '宏碁智醫股份有限公司 董事長暨執行長',
        img: './assets/image/speaker-8.png',
        bio: `<p>現任宏碁智醫董事長暨執行長，擁有哈佛大學公衛博士學位，具備醫療前線、公共衛生與跨國實務經驗。曾任衛福部防疫醫師及駐外外交官，並獲醫療奉獻獎等多項肯定。</p>
			<p>在宏碁智醫，他致力於串聯科技與醫學，引領團隊運用人工智慧與臨床大數據推動「智在醫療」，協助醫療從業人員提升流程效率、推進疾病早期篩檢，並將創新產品導入全球市場，打造以人為本的智慧醫療生態系。</p>`,
      },
      9: {
        name: '陳靜怡',
        title: '晉弘科技事業開發總部 執行副總',
        img: './assets/image/speaker-9.png',
        bio: `<p>陳錦怡為晉弘科技初始共同創辦人之一，現任董事暨執行副總經理，並兼任 Aitronics 總經理。她深耕醫療器材與醫療影像產業逾二十年，專注於智慧醫療與數位影像應用發展。</p>
			<p>自創立以來，陳錦怡持續帶領團隊推動公司國際化布局，積極拓展全球市場，建立與國際策略夥伴的長期合作關係，推動 AI 醫療影像與遠距醫療商業化。她以國際視野與整合能力提升晉弘科技全球競爭力，致力將臺灣創新醫材推向世界。</p>`,
      },
      10: {
        name: '李俊霖',
        title: '倍智醫電股份有限公司 營運長',
        img: './assets/image/speaker-10.png',
        bio: `<p>現任倍智醫電（V5med）營運長，擁有超過21年醫療器材、數位健康與AI醫療產業國際市場開發經驗，曾拓展北美、歐洲、中東、亞洲與拉丁美洲等50餘國市場。</p>
			<p>長期投入超音波AI與醫療影像AI產品的國際商業化推廣，涵蓋甲狀腺癌偵測、睡眠呼吸中止症評估與肺癌篩檢等應用。他熟悉臨床驗證、法規布局與海外市場拓展，並持續推動跨國臨床研究、策略聯盟與產業合作，協助臺灣智慧醫療創新成果鏈結全球市場。</p>`,
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
