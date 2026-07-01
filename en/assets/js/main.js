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
        title: 'Founder & Executive Director, MESH Incubator／Associate Professor, Harvard Medical School',
        img: './assets/image/speaker-1.png',
        bio: '<p>Dr. Succi is a radiologist, entrepreneur, inventor, and Associate Professor at Harvard Medical School whose work focuses on artificial intelligence, smart healthcare, and clinical innovation. He is the Founder and Executive Director of the MESH Incubator at Massachusetts General Hospital, where he helps transform frontline clinical needs into patentable, commercializable, and licensable healthcare solutions. He also leads research on generative AI for clinical decision support. Named to the Forbes 30 Under 30 list in Science and Healthcare and a recipient of the MIT Data Prize, Dr. Succi regularly teaches and speaks internationally on AI, healthcare innovation, and the translation of medical technologies from clinical practice to industry.</p>'
      },
      2: {
        name: 'Jan Beger',
        title: 'Global Head of AI Advocacy, GE HealthCare',
        img: './assets/image/speaker-2.png',
        bio: '<p>Jan Beger is Global Head of AI Advocacy at GE HealthCare and Executive Director of HelloAI, helping healthcare professionals translate AI from theory into practical clinical impact. With over 20 years of experience in healthcare informatics, medical imaging, and AI, he focuses on the real challenges of AI adoption: trust, workflow integration, clinical implementation, and patient benefit. Known for making complex AI developments clear and actionable, Jan supports clinicians and health system leaders in understanding how AI can improve workflows, empower care teams, and move healthcare organizations from hype to real-world implementation.</p>',
      },
	  3: {
        name: 'Shih-An Chen',
        title: 'Laureate, Industrial Technology Research Institute (ITRI), Professor of Medicine, National Yang Ming Chiao Tung University (NYCU)',
        img: './assets/image/speaker-3.png',
        bio: `<p>Prof. Shih-An Chen is a global pioneer in catheter ablation therapy for cardiac arrhythmias. He proposed the theory of non-pulmonary vein atrial fibrillation and introduced spectral analysis of electrophysiological signals to improve the success rate of atrial fibrillation ablation, a method widely recognized as the “Taipei Approach.” Beyond his clinical and academic achievements, Prof. Chen has played a key role in advancing smart healthcare in Taiwan. He has led national and international initiatives in smart medical devices, clinical trials, and healthcare technology collaborations, helping accelerate AI-enabled healthcare innovation and global partnerships.</p>`,
      },
      4: {
        name: 'Mai-Szu Wu',
        title: 'President, Taipei Medical University (TMU)',
        img: './assets/image/speaker-4.png',
        bio: `<p>President of Taipei Medical University, Prof. Mai-Szu Wu is a nephrology expert with extensive clinical, teaching, and research experience. He leads TMU’s medical and digital transformation by advancing AI healthcare platforms, integrating clinical data, cross-disciplinary resources, and workflow automation into clinical practice and long-term care. He also promotes future medical education through virtual hospital initiatives and innovative training models, cultivating next-generation healthcare professionals with a global perspective.</p>`,
      },
      5: {
        name: 'Chien-Tzung Chen',
        title: 'Superintendent, Linkou Chang Gung Memorial Hospital',
        img: './assets/image/speaker-5.png',
        bio: `<p>Dr. Chien-Tzung Chen is Superintendent of Linkou Chang Gung Memorial Hospital. A graduate of Kaohsiung Medical University, he completed fellowship training in plastic surgery at the University of Texas Southwestern Medical Center and has held key leadership roles at Chang Gung, including Director of Trauma and Plastic Surgery, Superintendent of Keelung Chang Gung Memorial Hospital, and Executive Vice Superintendent of Linkou Chang Gung Memorial Hospital. </p>
		<p>With more than 130 academic papers and book chapters, he has been actively involved in international medical societies and collaborations, contributing to the advancement of general and plastic surgery in Taiwan and beyond.</p>`,
      },
      6: {
        name: 'Joe Yeh',
        title: 'CEO, aetherAI Co., Ltd.',
        img: './assets/image/speaker-6.png',
        bio: `<p>Dr. Joe Yeh is CEO of aetherAI Co., Ltd. He graduated from National Taiwan University College of Medicine and later pursued a PhD in pathology at the University of Southern California, where he applied optical microscopy to study cellular dynamics in embryonic development. </p> 
		<p>Inspired by the precision of computer algorithms in image analysis, he left academia to found aetherAI. As a leading medical imaging AI company in Taiwan, aetherAI collaborates with top medical centers to help pathologists make faster and more accurate diagnoses. The company has received multiple innovation awards and is expanding its digital pathology solutions into overseas markets.</p>`,
      },
      7: {
        name: 'Wen-Han Chang',
        title: 'Superintendent / DRPH, MacKay Memorial Hospital',
        img: './assets/image/speaker-7.png',
        bio: `<p>Dr. Wen-Han Chang is Superintendent of MacKay Memorial Hospital, where he has served for nearly 27 years in key leadership roles, including Director of Emergency Medicine and Vice Superintendent. </p> 
		<p>His expertise spans surgery, emergency medicine, geriatric emergency and critical care, trauma medicine, and emergency ultrasound. His research focuses on emergency and trauma care, long-term care, hospital management, and AI-enabled healthcare applications. Recognized with multiple medical and sustainability awards, he has also represented Taiwan in international medical exchanges, demonstrating strong healthcare leadership and global influence.</p>`,
      },
      8: {
        name: 'Allen Lien',
        title: 'Chairman & Chief Executive Officer, Acer Medical Inc.',
        img: './assets/image/speaker-8.png',
        bio: `<p>Dr. Allen Chia-En Lien is Chairman and CEO of Acer Medical, with a Doctor of Public Health degree from Harvard University and extensive experience in frontline medicine, public health, and international practice. A former epidemic prevention physician and diplomat, he leads Acer Medical in bridging technology and healthcare through AI and clinical big data.</p> 
		<p>His work focuses on empowering healthcare professionals, improving workflow efficiency, advancing early disease screening, and bringing innovative AI healthcare solutions to global markets.</p>`,
      },
      9: {
        name: 'Julie Chen',
        title: 'EVP, Medimaging Integrated Solution Inc.',
        img: './assets/image/speaker-9.png',
        bio: `<p>Julie Chen is one of the founding members of Medimaging Integrated Solution Inc. and currently serves as Director and Executive Vice President, while also serving as General Manager of Aitronics. With more than 20 years of experience in medical devices and medical imaging, she focuses on the development of smart healthcare and digital imaging applications.</p> 
		<p>Since the company’s founding, she has led international market expansion, built long-term partnerships with global strategic partners, and promoted the commercialization of AI medical imaging and telemedicine solutions. She is dedicated to strengthening the company’s global competitiveness and bringing Taiwan’s innovative medical technologies to the world.</p>`,
      },
      10: {
        name: 'James Lee',
        title: 'Chief Operating Officer, V5med Inc.',
        img: './assets/image/speaker-10.png',
        bio: `<p>James Lee is Chief Operating Officer of V5med, with over 21 years of experience in international market development across medical devices, digital health, and AI healthcare. </p> 
		<p>He has expanded markets in more than 50 countries across North America, Europe, the Middle East, Asia, and Latin America. His work focuses on the global commercialization of ultrasound AI and medical imaging AI solutions, including applications in thyroid cancer detection, sleep apnea assessment, and lung cancer screening. He is experienced in clinical validation, regulatory strategy, and overseas market expansion, helping Taiwan’s smart healthcare innovations connect with global markets.</p>`,
      },
    };

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
