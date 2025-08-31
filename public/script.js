// 성능 최적화 설정
const PERFORMANCE_CONFIG = {
    // 애니메이션 프레임 레이트 제한 (60fps)
    targetFPS: 60,
    frameInterval: 1000 / 60,
    
    // 스크롤 이벤트 쓰로틀링
    scrollThrottle: 16, // ~60fps
    
    // 파티클 개수 제한
    maxParticles: 100,
    
    // 모바일에서 파티클 개수 줄이기
    mobileMaxParticles: 50
};

// 성능 모니터링
let frameCount = 0;
let lastTime = performance.now();
let fps = 60;

function updateFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // 성능이 낮으면 애니메이션 복잡도 줄이기
        if (fps < 30) {
            console.warn('성능 저하 감지, 애니메이션 복잡도 감소');
            reduceAnimationComplexity();
        }
    }
    
    requestAnimationFrame(updateFPS);
}

function reduceAnimationComplexity() {
    // 파티클 개수 줄이기
    if (window.particles && window.particles.length > PERFORMANCE_CONFIG.mobileMaxParticles) {
        window.particles = window.particles.slice(0, PERFORMANCE_CONFIG.mobileMaxParticles);
    }
    
    // 애니메이션 간격 늘리기
    PERFORMANCE_CONFIG.frameInterval = 1000 / 30;
}

// 성능 모니터링 시작
updateFPS();

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 관련 요소들
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 스크롤 애니메이션을 위한 요소들
    const fadeInElements = document.querySelectorAll('.fade-in');

    // 텍스트 애니메이션 초기화
    initParticleText();
    
    // 아스키 아트 애니메이션 초기화
    initAsciiArtAnimation();
    
    // 워터마크 배경 초기화
    initWatermarkBackground();
    


    // 햄버거 메뉴 토글
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // 햄버거 아이콘 애니메이션
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 스크롤 시 네비게이션 바 스타일 변경
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 네비게이션 바 표시/숨김
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 아래로 스크롤
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 위로 스크롤
            navbar.style.transform = 'translateY(0)';
        }
        
        // 스크롤 위치에 따른 네비게이션 바 배경 투명도 조절
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(120, 120, 120, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(120, 120, 120, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 모든 fade-in 요소들을 관찰
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // 부드러운 스크롤을 위한 네비게이션 링크 처리
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 네비게이션 바 높이만큼 오프셋
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 현재 섹션 하이라이트
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 스크롤 이벤트에 현재 섹션 하이라이트 추가
    window.addEventListener('scroll', updateActiveNavLink);

    // 페이지 로드 시 초기 상태 설정
    updateActiveNavLink();

    // 스크롤 표시기 클릭 이벤트
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 타이핑 효과 (선택사항)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }

    // 히어로 섹션 텍스트 애니메이션
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        // 페이지 로드 후 잠시 후에 애니메이션 시작
        setTimeout(() => {
            heroTitle.classList.add('visible');
            setTimeout(() => {
                heroSubtitle.classList.add('visible');
            }, 300);
        }, 500);
    }

    // 카드 호버 효과 개선 (전시 카드 제외)
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 전시 카드는 호버 효과 제거 (버튼 클릭과 충돌 방지)
    const exhibitionCards = document.querySelectorAll('.exhibition-card');
    exhibitionCards.forEach(card => {
        // 호버 효과 제거
        card.style.pointerEvents = 'none';
        
        // 버튼만 클릭 가능하도록
        const button = card.querySelector('.exhibition-view-btn');
        if (button) {
            button.style.pointerEvents = 'auto';
        }
    });

    // 패럴랙스 스크롤 효과 (가벼운 버전)
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .placeholder-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // 성능 최적화를 위한 스크롤 이벤트 쓰로틀링
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(parallaxScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });

    // 로딩 애니메이션 (페이지 로드 시)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // 첫 번째 섹션의 요소들을 순차적으로 나타나게 함
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    });

    // 이미지 레이지 로딩 (실제 이미지가 있을 때 사용)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // 스크롤 진행률 표시 (선택사항)
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // 진행률 바가 있다면 업데이트
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // 마우스 커서 효과 (데스크톱에서만)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // 링크나 버튼에 호버할 때 커서 크기 변경
        const interactiveElements = document.querySelectorAll('a, button, .activity-card, .exhibition-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(37, 99, 235, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(37, 99, 235, 0.3)';
            });
        });
    }

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모바일 메뉴 닫기
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 다크모드 토글 (선택사항 - 추후 확장 가능)
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // 저장된 다크모드 설정 불러오기
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }



    // 모바일 영상 자동 재생 강화
    initMobileVideoAutoplay();

    // 전시 슬라이더 기능 초기화
    initExhibitionSlider();
    
    // 전시 슬라이더 버튼에 직접 이벤트 리스너 추가
    initExhibitionSliderButtons();
    
    // 모바일 터치 스와이프 기능 초기화
    initTouchSwipe();
    

    
    // 전시 자세히보기 버튼 이벤트 추가
    initExhibitionViewButtons();
    
    // 모달 닫기 기능 초기화
    initModalClose();
    
    // 동아리 신청 팝업 초기화
    initApplicationPopup();

    console.log('E-UM 미디어아트 동아리 홈페이지가 로드되었습니다.');
});



// 모바일 터치 스와이프 기능 초기화
function initTouchSwipe() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTranslateX = 0;
    let currentTranslateX = 0;

    // 터치 시작
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        
        const sliderTrack = document.querySelector('.slider-track');
        if (sliderTrack) {
            const transform = window.getComputedStyle(sliderTrack).transform;
            const matrix = new DOMMatrix(transform);
            startTranslateX = matrix.m41;
        }
    }

    // 터치 이동
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        currentTranslateX = startTranslateX + diffX;
        
        const sliderTrack = document.querySelector('.slider-track');
        if (sliderTrack) {
            sliderTrack.style.transition = 'none';
            sliderTrack.style.transform = `translateX(${currentTranslateX}px)`;
        }
    }

    // 터치 종료
    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        const diffX = currentX - startX;
        const threshold = 50; // 스와이프 감지 임계값
        
        const sliderTrack = document.querySelector('.slider-track');
        if (sliderTrack) {
            sliderTrack.style.transition = 'transform 0.3s ease';
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0 && window.slideExhibitions) {
                    // 오른쪽으로 스와이프 - 이전 슬라이드
                    window.slideExhibitions('prev');
                } else if (diffX < 0 && window.slideExhibitions) {
                    // 왼쪽으로 스와이프 - 다음 슬라이드
                    window.slideExhibitions('next');
                }
            } else {
                // 임계값보다 작으면 원래 위치로 복원
                sliderTrack.style.transform = `translateX(${startTranslateX}px)`;
            }
        }
    }

    // 이벤트 리스너 추가
    sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    sliderContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    console.log('모바일 터치 스와이프 기능 초기화 완료');
}



// 모바일 영상 자동 재생 설정
function initMobileVideoAutoplay() {
    // 활동 영상과 전시 영상 모두 포함
    const videos = document.querySelectorAll('.activity-video, .exhibition-img');
    videos.forEach(video => {
        // video 태그인지 확인
        if (video.tagName.toLowerCase() === 'video') {
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.preload = 'metadata';
            
            // 영상 로드 에러 처리
            video.addEventListener('error', (e) => {
                console.log('영상 로드 에러:', video.src, e);
                // fallback 이미지 표시
                const fallbackImg = video.querySelector('img');
                if (fallbackImg) {
                    video.style.display = 'none';
                    fallbackImg.style.display = 'block';
                }
            });
            
            // 영상 로드 성공시 처리
            video.addEventListener('loadeddata', () => {
                console.log('영상 로드 성공:', video.src);
            });
            
            // Intersection Observer로 화면에 보일 때만 재생
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => {
                            console.log('영상 재생 실패:', video.src, e);
                            // fallback 이미지 표시
                            const fallbackImg = video.querySelector('img');
                            if (fallbackImg) {
                                video.style.display = 'none';
                                fallbackImg.style.display = 'block';
                            }
                        });
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(video);
        }
    });
}

// 전시 슬라이더 초기화
function initExhibitionSlider() {
    console.log('전시 슬라이더 초기화 시작');
    
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.exhibition-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    console.log('찾은 요소들:', {
        sliderTrack: !!sliderTrack,
        slidesCount: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsCount: dots.length
    });
    
    if (!sliderTrack || slides.length === 0) {
        console.log('전시 슬라이더 요소를 찾을 수 없습니다.');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // 슬라이더 트랙의 너비를 슬라이드 개수에 맞게 설정
    sliderTrack.style.width = `${totalSlides * 100}%`;
    console.log(`슬라이더 트랙 너비 설정: ${totalSlides * 100}%`);
    
    console.log(`전시 슬라이더 초기화: ${totalSlides}개 슬라이드`);
    
    function updateSlider() {
        const translateX = -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        console.log(`슬라이더 이동: translateX(${translateX}%), 현재 슬라이드: ${currentSlide}`);
        
            // 모바일에서 슬라이더가 보이도록 강제 리페인트
    if (window.innerWidth <= 768) {
        sliderTrack.style.display = 'flex';
        sliderTrack.style.visibility = 'visible';
        sliderTrack.style.opacity = '1';
        sliderTrack.style.position = 'relative';
        sliderTrack.style.width = '100%';
    }
        
        // 슬라이드 활성화 상태 업데이트
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('current');
            } else {
                slide.classList.remove('current');
            }
        });
        
        // 도트 업데이트
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 버튼 상태 업데이트
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
            console.log(`이전 버튼 상태: ${prevBtn.disabled ? '비활성' : '활성'}`);
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
            console.log(`다음 버튼 상태: ${nextBtn.disabled ? '비활성' : '활성'}`);
        }
        
        console.log(`슬라이더 업데이트: 현재 슬라이드 ${currentSlide + 1}/${totalSlides}`);
    }
    
    // 전역 함수로 노출 - 한 번에 한 슬라이드씩만 이동
    window.slideExhibitions = function(direction) {
        console.log(`slideExhibitions 호출: ${direction}, 현재 슬라이드: ${currentSlide}`);
        
        // 이벤트 중복 방지를 위한 디바운싱
        if (window.sliderTransitioning) {
            console.log('슬라이더 전환 중, 무시됨');
            return;
        }
        
        window.sliderTransitioning = true;
        
        if (direction === 'prev' && currentSlide > 0) {
            currentSlide--;
            console.log(`이전 슬라이드로 이동: ${currentSlide}`);
        } else if (direction === 'next' && currentSlide < totalSlides - 1) {
            currentSlide++;
            console.log(`다음 슬라이드로 이동: ${currentSlide}`);
        } else {
            console.log(`이동 불가: ${direction} 방향으로 더 이상 슬라이드가 없습니다.`);
            window.sliderTransitioning = false;
            return;
        }
        
        updateSlider();
        
        // 전환 완료 후 플래그 해제 (CSS transition 시간과 맞춤)
        setTimeout(() => {
            window.sliderTransitioning = false;
        }, 500);
    };
    
    window.goToSlide = function(index) {
        console.log(`goToSlide 호출: ${index}, 현재 슬라이드: ${currentSlide}`);
        
        // 이벤트 중복 방지를 위한 디바운싱
        if (window.sliderTransitioning) {
            console.log('슬라이더 전환 중, 무시됨');
            return;
        }
        
        if (index >= 0 && index < totalSlides && index !== currentSlide) {
            window.sliderTransitioning = true;
            currentSlide = index;
            console.log(`슬라이드 ${index}로 이동`);
            updateSlider();
            
            // 전환 완료 후 플래그 해제 (CSS transition 시간과 맞춤)
            setTimeout(() => {
                window.sliderTransitioning = false;
            }, 500);
        } else {
            console.log(`잘못된 슬라이드 인덱스 또는 현재 슬라이드와 동일: ${index}`);
        }
    };
    
    // 초기 상태 설정
    updateSlider();
    
    // 모바일에서 슬라이더 강제 표시
    if (window.innerWidth <= 768) {
        sliderTrack.style.display = 'flex';
        sliderTrack.style.visibility = 'visible';
        sliderTrack.style.opacity = '1';
        sliderTrack.style.position = 'relative';
        sliderTrack.style.width = '100%';
        
        // 슬라이더 컨테이너도 강제 표시
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.style.display = 'block';
            sliderContainer.style.visibility = 'visible';
            sliderContainer.style.opacity = '1';
        }
        
        // 모바일에서 슬라이더 네비게이션 강제 표시
        const sliderNav = document.querySelector('.slider-nav');
        if (sliderNav) {
            sliderNav.style.display = 'flex';
            sliderNav.style.visibility = 'visible';
            sliderNav.style.opacity = '1';
            sliderNav.style.zIndex = '1002';
            sliderNav.style.position = 'relative';
        }
    }
    
    // 전역 변수 초기화
    window.sliderTransitioning = false;
    
    console.log('전시 슬라이더 초기화 완료');
}

// 전시 슬라이더 버튼에 직접 이벤트 리스너 추가
function initExhibitionSliderButtons() {
    console.log('전시 슬라이더 버튼 이벤트 리스너 추가 시작');
    
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    console.log('찾은 버튼들:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsCount: dots.length
    });
    
    // 이전 버튼 이벤트 리스너
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            console.log('이전 버튼 클릭됨!');
            e.preventDefault();
            e.stopPropagation();
            
            // 전환 중이면 무시
            if (window.sliderTransitioning) {
                console.log('슬라이더 전환 중, 클릭 무시');
                return;
            }
            
            if (window.slideExhibitions) {
                window.slideExhibitions('prev');
            } else {
                console.log('slideExhibitions 함수가 정의되지 않았습니다.');
            }
        });
        console.log('이전 버튼 이벤트 리스너 추가됨');
    }
    
    // 다음 버튼 이벤트 리스너
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            console.log('다음 버튼 클릭됨!');
            e.preventDefault();
            e.stopPropagation();
            
            // 전환 중이면 무시
            if (window.sliderTransitioning) {
                console.log('슬라이더 전환 중, 클릭 무시');
                return;
            }
            
            if (window.slideExhibitions) {
                window.slideExhibitions('next');
            } else {
                console.log('slideExhibitions 함수가 정의되지 않았습니다.');
            }
        });
        console.log('다음 버튼 이벤트 리스너 추가됨');
    }
    
    // 도트 버튼 이벤트 리스너
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            console.log(`도트 ${index} 클릭됨!`);
            e.preventDefault();
            e.stopPropagation();
            
            // 전환 중이면 무시
            if (window.sliderTransitioning) {
                console.log('슬라이더 전환 중, 클릭 무시');
                return;
            }
            
            if (window.goToSlide) {
                window.goToSlide(index);
            } else {
                console.log('goToSlide 함수가 정의되지 않았습니다.');
            }
        });
    });
    
    console.log('전시 슬라이더 버튼 이벤트 리스너 추가 완료');
}



// 전시 데이터 정의
const exhibitionData = {
    'sensory-dissolution': {
        title: 'DISSOLUTION OF SENSES: 감각해체',
        period: '2025.07.01 - 2025.07.31',
        location: '아트코리아랩 미디어월',
        description: '단체전시 기획 및 작품 제작',
        photos: [
            'exhibition-details/sensory-dissolution/sensory_dissolution1.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution2.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution3.png',
            'exhibition-details/sensory-dissolution/sensory_dissolution4.png',
            'exhibition-details/sensory-dissolution/sensory_dissolution5.png',
            'exhibition-details/sensory-dissolution/sensory_dissolution6.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution7.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution8.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution9.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution10.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution11.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution12.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution13.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution14.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution15.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution16.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution17.jpeg',
            'exhibition-details/sensory-dissolution/sensory_dissolution18.jpeg'
        ],
        videos: [
            'exhibition-details/sensory-dissolution/sensory_dissolution_video.mov'
        ]
    },
    'zip': {
        title: '.zip',
        period: '2025.05.26 - 2025.05.29',
        location: '경일대학교 12호관 1F',
        description: '학기말 전시 기획 및 작품 제작',
        photos: [
            'exhibition-details/zip/zipphoto1.jpg',
            'exhibition-details/zip/zipphoto2.jpeg',
            'exhibition-details/zip/zipphoto3.jpeg',
            'exhibition-details/zip/zipphoto4.jpeg',
            'exhibition-details/zip/zipphoto5.jpeg',
            'exhibition-details/zip/zipphoto6.jpeg',
            'exhibition-details/zip/zipphoto7.jpeg',
            'exhibition-details/zip/zipphoto8.jpeg',
            'exhibition-details/zip/zipphoto9.jpeg',
            'exhibition-details/zip/zipphoto10.jpeg',
            'exhibition-details/zip/zipphoto11.jpeg',
            'exhibition-details/zip/zipphoto12.jpeg',
            'exhibition-details/zip/zipphoto13.jpeg',
            'exhibition-details/zip/zipphoto14.jpeg',
            'exhibition-details/zip/zipphoto15.jpeg',
            'exhibition-details/zip/zipphoto16.jpg',
            'exhibition-details/zip/zipphoto17.JPG',
            'exhibition-details/zip/zipphoto18.jpeg',
            'exhibition-details/zip/zipphoto19.jpeg',
            'exhibition-details/zip/zipphoto20.jpeg',
            'exhibition-details/zip/zipphoto21.jpeg',
            'exhibition-details/zip/zipphoto22.jpeg',
            'exhibition-details/zip/zipphoto23.jpeg'
        ],
        videos: []
    },
    'clear-things': {
        title: '선명해져야 할 것들',
        period: '2024.12.20 - 2024.12.31',
        location: 'MOV.A(성미산로 888-11 5F)',
        description: '김다슬 교수님 전시 참여 및 작품 제작',
        photos: [
            'exhibition-details/clear-things/clear-things1.jpg',
            'exhibition-details/clear-things/clear-things2.jpg',
            'exhibition-details/clear-things/clear-things3.jpg',
            'exhibition-details/clear-things/clear-things4.jpg',
            'exhibition-details/clear-things/clear-things5.jpg',
            'exhibition-details/clear-things/clear-things6.jpg',
            'exhibition-details/clear-things/clear-things7.jpg',
            'exhibition-details/clear-things/clear-things8.jpg'
        ],
        videos: []
    },
    'sobok': {
        title: '소복',
        period: '2024.12.16 - 2024.12.20',
        location: '경일대학교 12호관 1F',
        description: '학기말 전시 기획 및 작품 제작',
        photos: [
            'exhibition-details/sobok/sobok_photo1.jpg',
            'exhibition-details/sobok/sobok_photo3.jpg',
            'exhibition-details/sobok/sobok_photo4.jpg',
            'exhibition-details/sobok/sobok_photo5.jpg',
            'exhibition-details/sobok/sobok_photo6.jpg',
            'exhibition-details/sobok/sobok_photo7.jpg',
            'exhibition-details/sobok/sobok_photo8.jpg',
            'exhibition-details/sobok/sobok_photo10_edited.jpg',
            'exhibition-details/sobok/sobok_photo11.jpg',
            'exhibition-details/sobok/sobok_photo12.jpg',
            'exhibition-details/sobok/sobok_photo13.jpg',
            'exhibition-details/sobok/sobok_photo14.jpg',
            'exhibition-details/sobok/sobok_group_photo.jpg',
            'exhibition-details/sobok/sobok_seungje.png',
            'exhibition-details/sobok/sobok_seunghun.png',
            'exhibition-details/sobok/sobok_additional_photo1.jpg',
            'exhibition-details/sobok/sobok_additional_photo2.jpg',
            'exhibition-details/sobok/sobok_additional_photo5.jpg',
            'exhibition-details/sobok/sobok_additional_photo6.jpg',
            'exhibition-details/sobok/sobok_additional_photo7.jpg'
        ],
        videos: []
    },
    'future-fragments': {
        title: '미래의 파편들',
        period: '2024.10.18 - 2024.11.10',
        location: '대구경북디자인센터 1F Media Wall',
        description: '교외 전시 작가로 참여 및 작품 제작',
        photos: [
            'exhibition-details/future-fragments/future_fragments_photo1_edited.jpg',
            'exhibition-details/future-fragments/future_fragments_photo2_edited.jpg',
            'exhibition-details/future-fragments/future_fragments_photo3_edited.jpg',
            'exhibition-details/future-fragments/future_fragments_photo5_edited_edited.jpg',
            'exhibition-details/future-fragments/future_fragments_photo6_edited.jpg',
            'exhibition-details/future-fragments/future_fragments_photo7.jpg'
        ],
        videos: []
    },
    'mimyo': {
        title: '美, 묘하다',
        period: '2024.06.04 - 2024.06.10',
        location: '경일대학교 11호관 갤러리',
        description: '학기말 전시 기획 및 작품 제작',
        photos: [
            'exhibition-details/mimyo/mimyo_photo1.jpg',
            'exhibition-details/mimyo/mimyo_photo2.jpg',
            'exhibition-details/mimyo/mimyo_photo3.jpg',
            'exhibition-details/mimyo/mimyo_photo4.jpg',
            'exhibition-details/mimyo/mimyo_photo5.jpg',
            'exhibition-details/mimyo/mimyo_photo6.jpg'
        ],
        videos: []
    },
    'meta-festival': {
        title: 'GYEONGBUK META CONTENTS FESTIVAL',
        period: '2024.05.31 - 2024.06.02',
        location: '대구 EXCO 동관 1F HALL 6',
        description: '메타콘텐츠 학과 대표 전시 기획 및 작품 제작',
        photos: [
            'exhibition-details/metacontents-festival/metacontents-composition.png',
            'exhibition-details/metacontents-festival/metacontents-photo1_edited.jpg',
            'exhibition-details/metacontents-festival/metacontents-photo2_edited.jpg',
            'exhibition-details/metacontents-festival/metacontents-photo3_edited.png',
            'exhibition-details/metacontents-festival/metacontents-photo4_edited.jpg',
            'exhibition-details/metacontents-festival/metacontents-photo5_edited_edited.jpg',
            'exhibition-details/metacontents-festival/metacontents-process_edited.png',
            'exhibition-details/metacontents-festival/metacontents-process2_edited.jpg'
        ],
        videos: []
    },
    'survival': {
        title: 'SURVIVAL',
        period: '2024.02.17 - 2024.02.25',
        location: '대구 중구 동덕로 30길 117 2F 아트스텔라 소노',
        description: '메타콘텐츠융합전공의 성과 보고회',
        photos: [
            'exhibition-details/SURVIVAL/survival_photo1.png',
            'exhibition-details/SURVIVAL/survival_photo2.png',
            'exhibition-details/SURVIVAL/survival_photo3.png',
            'exhibition-details/SURVIVAL/survival_photo4.png',
            'exhibition-details/SURVIVAL/survival_photo5.png',
            'exhibition-details/SURVIVAL/survival_photo6.png'
        ],
        videos: [
            'exhibition-details/SURVIVAL/survival_video2.mp4'
        ]
    }
};

// 전시 자세히보기 버튼 이벤트 초기화
function initExhibitionViewButtons() {
    console.log('전시 자세히보기 버튼 이벤트 초기화 시작');
    
    const viewButtons = document.querySelectorAll('.exhibition-view-btn');
    console.log('찾은 버튼 개수:', viewButtons.length);
    
    viewButtons.forEach((button, index) => {
        console.log(`버튼 ${index} 설정 중:`, button);
        
        // 모든 기존 이벤트 리스너 제거
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.exhibition-view-btn')[index];
        
        // 클릭 이벤트
        newButton.addEventListener('click', function(e) {
            console.log('버튼 클릭됨!', e);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const exhibitionCard = this.closest('.exhibition-card');
            console.log('전시 카드:', exhibitionCard);
            
            const exhibitionId = exhibitionCard.getAttribute('data-exhibition');
            console.log('전시 ID:', exhibitionId);
            
            if (exhibitionId) {
                // 현재 창에서 전시 상세 페이지로 이동
                const detailUrl = `exhibition-detail.html?id=${exhibitionId}`;
                console.log('이동할 URL:', detailUrl);
                
                // 즉시 이동
                window.location.href = detailUrl;
            } else {
                console.log('전시 ID를 찾을 수 없습니다');
            }
        });
        
        // 터치 이벤트
        newButton.addEventListener('touchend', function(e) {
            console.log('터치 이벤트 발생!', e);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const exhibitionCard = this.closest('.exhibition-card');
            const exhibitionId = exhibitionCard.getAttribute('data-exhibition');
            
            if (exhibitionId) {
                const detailUrl = `exhibition-detail.html?id=${exhibitionId}`;
                console.log('터치로 이동할 URL:', detailUrl);
                window.location.href = detailUrl;
            } else {
                console.log('터치: 전시 ID를 찾을 수 없습니다');
            }
        });
        
        // 포인터 이벤트 추가 (모바일 호환성 향상)
        newButton.addEventListener('pointerdown', function(e) {
            console.log('포인터다운 이벤트 발생!', e);
        });
    });
    
    console.log('전시 자세히보기 버튼 이벤트 초기화 완료');
}

// 전시 모달 열기
function openExhibitionModal(data) {
    const modal = document.getElementById('exhibitionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalLocation = document.getElementById('modalLocation');
    const modalDescription = document.getElementById('modalDescription');
    const photoGallery = document.getElementById('photoGallery');
    const exhibitionVideo = document.getElementById('exhibitionVideo');
    
    // 모달 내용 설정
    modalTitle.textContent = data.title;
    modalPeriod.textContent = `기간: ${data.period}`;
    modalLocation.textContent = `장소: ${data.location}`;
    modalDescription.textContent = data.description;
    
    // 사진 갤러리 설정
    photoGallery.innerHTML = '';
    if (data.photos && data.photos.length > 0) {
        data.photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = photo;
            img.alt = data.title;
            img.loading = 'lazy';
            
            // 이미지 로드 에러 처리
            img.onerror = function() {
                console.log('이미지 로드 실패:', photo);
                // 대체 이미지나 플레이스홀더 표시
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuydtOuvuOyngCDsl4bsnYw8L3RleHQ+PC9zdmc+';
                this.style.opacity = '0.5';
            };
            
            img.onload = function() {
                console.log('이미지 로드 성공:', photo);
                this.style.opacity = '1';
            };
            
            const overlay = document.createElement('div');
            overlay.className = 'photo-overlay';
            overlay.innerHTML = '<span>클릭하여 확대</span>';
            
            photoItem.appendChild(img);
            photoItem.appendChild(overlay);
            
            // 사진 클릭 시 확대 기능 추가
            img.addEventListener('click', function() {
                openImageModal(this.src, data.title);
            });
            
            photoGallery.appendChild(photoItem);
        });
    } else {
        photoGallery.innerHTML = '<p>사진이 없습니다.</p>';
    }
    
    // 영상 설정
    if (data.videos && data.videos.length > 0) {
        // 영상 선택 드롭다운 생성
        const videoContainer = document.querySelector('.video-container');
        videoContainer.innerHTML = '';
        
        if (data.videos.length === 1) {
            // 영상이 하나만 있으면 바로 표시
            const video = document.createElement('video');
            video.id = 'exhibitionVideo';
            video.controls = true;
            video.src = encodeURI(data.videos[0]);
            videoContainer.appendChild(video);
        } else {
            // 여러 영상이 있으면 선택 드롭다운 추가
            const videoSelect = document.createElement('select');
            videoSelect.id = 'videoSelect';
            videoSelect.style.cssText = `
                width: 100%;
                padding: 0.5rem;
                margin-bottom: 1rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 1rem;
            `;
            
            data.videos.forEach((videoSrc, index) => {
                const option = document.createElement('option');
                option.value = videoSrc;
                option.textContent = `영상 ${index + 1}`;
                videoSelect.appendChild(option);
            });
            
            const video = document.createElement('video');
            video.id = 'exhibitionVideo';
            video.controls = true;
            video.src = encodeURI(data.videos[0]);
            
            videoContainer.appendChild(videoSelect);
            videoContainer.appendChild(video);
            
            // 영상 선택 시 변경
            videoSelect.addEventListener('change', function() {
                video.src = encodeURI(this.value);
                video.load();
            });
        }
        
        videoContainer.style.display = 'block';
    } else {
        const videoContainer = document.querySelector('.video-container');
        videoContainer.style.display = 'none';
    }
    
    // 모달 열기
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 탭 기능 초기화
    initModalTabs();
}

// 이미지 확대 모달 열기
function openImageModal(imageSrc, imageTitle) {
    // 기존 이미지 모달이 있다면 제거
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 새로운 이미지 모달 생성
    const imageModal = document.createElement('div');
    imageModal.id = 'imageModal';
    imageModal.className = 'image-modal active';
    imageModal.innerHTML = `
        <div class="image-modal-overlay"></div>
        <div class="image-modal-content">
            <div class="image-modal-header">
                <h3>${imageTitle}</h3>
                <button class="image-modal-close">&times;</button>
            </div>
            <div class="image-modal-body">
                <img src="${encodeURI(imageSrc)}" alt="${imageTitle}">
            </div>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    
    // 모달 닫기 기능
    const closeBtn = imageModal.querySelector('.image-modal-close');
    const overlay = imageModal.querySelector('.image-modal-overlay');
    
    function closeImageModal() {
        imageModal.classList.remove('active');
        setTimeout(() => {
            imageModal.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeImageModal);
    overlay.addEventListener('click', closeImageModal);
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
}

// 모달 탭 기능 초기화
function initModalTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 버튼 활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 패널 활성화
            tabPanes.forEach(pane => {
                if (pane.id === `${targetTab}-tab`) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// 모달 닫기 기능 초기화
function initModalClose() {
    const modal = document.getElementById('exhibitionModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // 영상 정지
        const video = document.getElementById('exhibitionVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        
        // 영상 컨테이너 초기화
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.innerHTML = '';
        }
    }
    
    // 이벤트 리스너
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 탭 전환 기능
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 버튼 활성화
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 패널 활성화
            tabPanes.forEach(pane => {
                if (pane.id === `${targetTab}-tab`) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// 입자 효과가 있는 텍스트
function initParticleText() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let textParticles = [];
    let animationId;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mainTitle = document.getElementById('mainTitle');

    // 캔버스 크기 설정
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 텍스트 파티클 클래스 (간소화된 버전)
    class TextParticle {
        constructor(x, y) {
            this.originalX = x;
            this.originalY = y;
            this.x = x + (Math.random() - 0.5) * 150;
            this.y = y + (Math.random() - 0.5) * 80;
            this.radius = Math.random() * 2 + 1; // 더 작은 크기
            this.opacity = Math.random() * 0.4 + 0.1; // 더 투명하게
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
            this.floatSpeed = Math.random() * 0.02 + 0.005;
        }

        update() {
            // 부드러운 떠다니는 움직임
            this.x += Math.sin(this.life * this.floatSpeed) * 0.3;
            this.y += Math.cos(this.life * this.floatSpeed * 0.7) * 0.2;

            // 생명주기
            this.life--;
            if (this.life <= 0) {
                this.life = this.maxLife;
                this.x = this.originalX + (Math.random() - 0.5) * 150;
                this.y = this.originalY + (Math.random() - 0.5) * 80;
            }
        }

        draw() {
            const lifeRatio = this.life / this.maxLife;
            const currentOpacity = this.opacity * lifeRatio * 0.6; // 더 투명하게
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 100, 100, ${currentOpacity})`; // 회색계열로 변경
            ctx.fill();
        }
    }

    // 텍스트 주변 파티클 생성 (개수 줄임)
    function createTextParticles() {
        textParticles = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const numParticles = 60; // 파티클 개수 대폭 감소

        for (let i = 0; i < numParticles; i++) {
            // E-UM 텍스트 주변에 파티클 배치 (더 넓은 영역)
            const angle = (i / numParticles) * Math.PI * 2;
            const radius = Math.random() * 400 + 250; // 더 넓은 반경
            const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 300;
            const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 150;
            
            textParticles.push(new TextParticle(x, y));
        }
    }

    // 애니메이션 루프
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 스크롤에 따른 파티클 투명도 조절 (홈 페이지에서만 표시)
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const fadeEnd = windowHeight * 0.5; // 조금 더 길게 유지
        let globalOpacity = 1;
        
        if (scrollTop > 0) {
            globalOpacity = Math.max(0, 1 - (scrollTop / fadeEnd));
        }

        // 파티클 업데이트 및 그리기 (투명도 적용)
        if (globalOpacity > 0) {
            textParticles.forEach(particle => {
                particle.update();
                
                // 파티클 그리기 시 전체 투명도 적용
                const originalOpacity = particle.opacity;
                particle.opacity = originalOpacity * globalOpacity * 0.3; // 더 투명하게
                particle.draw();
                particle.opacity = originalOpacity; // 원래 투명도로 복원
            });
        }

        animationId = requestAnimationFrame(animateParticles);
    }

    // 스크롤 시 아스키 아트 텍스트 사라지는 효과
    const heroMainTitle = document.querySelector('.hero-main-title');
    const asciiArt = document.getElementById('asciiArt');
    
    function handleMainTitleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (heroMainTitle && asciiArt) {
            // 스크롤이 시작되면 바로 사라지기 시작
            const fadeStart = 0;
            const fadeEnd = windowHeight * 0.3; // 30% 스크롤하면 완전히 사라짐
            
            if (scrollTop <= fadeStart) {
                heroMainTitle.style.opacity = '1';
                heroMainTitle.style.transform = 'translate(-50%, -50%) scale(1)';
                asciiArt.style.animationPlayState = 'running';
            } else if (scrollTop >= fadeEnd) {
                heroMainTitle.style.opacity = '0';
                heroMainTitle.style.transform = 'translate(-50%, -60%) scale(0.9)';
                asciiArt.style.animationPlayState = 'paused';
            } else {
                const progress = (scrollTop - fadeStart) / (fadeEnd - fadeStart);
                const opacity = 1 - progress;
                const scale = 1 - (progress * 0.1);
                const translateY = -50 - (progress * 10);
                
                heroMainTitle.style.opacity = opacity.toString();
                heroMainTitle.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
                
                // 스크롤에 따라 애니메이션 속도 조절
                const animationSpeed = Math.max(0.5, 1 - progress);
                asciiArt.style.animationDuration = `${6 / animationSpeed}s`;
            }
        }
    }

    // 마우스 이벤트 제거 - 정적인 텍스트 유지

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleMainTitleScroll);

    // 초기화
    resizeCanvas();
    createTextParticles();
    animateParticles();

    // 리사이즈 이벤트
    window.addEventListener('resize', () => {
        resizeCanvas();
        createTextParticles();
    });

    // 페이지 가시성 변경 시 애니메이션 제어
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateParticles();
        }
    });
}



// 아스키 아트 애니메이션 초기화
function initAsciiArtAnimation() {
    const asciiArt = document.getElementById('asciiArt');
    if (!asciiArt) return;

    // 모바일 환경 감지
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 개별 문자 애니메이션 효과
    function createCharacterAnimation() {
        const text = asciiArt.textContent;
        const lines = text.split('\n').filter(line => line.trim());
        
        // 각 줄을 span으로 감싸기
        const animatedLines = lines.map((line, lineIndex) => {
            const chars = line.split('').map((char, charIndex) => {
                if (char === ' ') return char;
                
                const delay = (lineIndex * 0.1) + (charIndex * 0.02);
                const span = `<span class="ascii-char" style="
                    display: inline-block;
                    animation: charFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                    animation-delay: ${delay}s;
                    transform-origin: center;
                ">${char}</span>`;
                
                return span;
            }).join('');
            
            return chars;
        });

        asciiArt.innerHTML = animatedLines.join('\n');
    }

    // 파동 효과 - 화면 크기별 최적화
    function createWaveEffect() {
        const chars = asciiArt.querySelectorAll('.ascii-char');
        const screenWidth = window.innerWidth;
        
        let waveIntensity, rotationIntensity, animationSpeed;
        
        if (screenWidth >= 415 && screenWidth <= 768) {
            // 대형 모바일
            waveIntensity = 3.5;
            rotationIntensity = 2.5;
            animationSpeed = 55;
        } else if (screenWidth >= 361 && screenWidth <= 414) {
            // 표준 모바일 (iPhone 12 Pro, 갤럭시 S21/S22)
            waveIntensity = 4;
            rotationIntensity = 3;
            animationSpeed = 60;
        } else if (screenWidth <= 360) {
            // 소형 모바일
            waveIntensity = 4.5;
            rotationIntensity = 3.5;
            animationSpeed = 65;
        } else {
            // 웹/데스크톱
            waveIntensity = 3;
            rotationIntensity = 2;
            animationSpeed = 45;
        }
        
        setInterval(() => {
            chars.forEach((char, index) => {
                const wave = Math.sin((Date.now() * 0.002) + (index * 0.1)) * waveIntensity;
                const rotation = Math.cos((Date.now() * 0.001) + (index * 0.15)) * rotationIntensity;
                
                char.style.transform = `translateY(${wave}px) rotateZ(${rotation}deg)`;
            });
        }, animationSpeed);
    }

    // 글리치 효과 (간헐적으로)
    function createGlitchEffect() {
        if (Math.random() > 0.995) { // 0.5% 확률로 글리치 효과
            const glitchDuration = 100 + Math.random() * 200;
            
            asciiArt.style.transform = `
                translateX(${(Math.random() - 0.5) * 4}px) 
                translateY(${(Math.random() - 0.5) * 2}px)
                skew(${(Math.random() - 0.5) * 2}deg)
            `;
            
            asciiArt.style.filter = `
                hue-rotate(${Math.random() * 360}deg) 
                saturate(${1 + Math.random() * 2}) 
                contrast(${1 + Math.random() * 0.5})
            `;
            
            setTimeout(() => {
                asciiArt.style.transform = '';
                asciiArt.style.filter = '';
            }, glitchDuration);
        }
    }

    // 초기화 - 모바일에서도 개별 문자 애니메이션 활성화
    createCharacterAnimation();
    
    // 모바일에서도 파동 효과 활성화하되 더 부드럽게
    if (!isMobile) {
        setTimeout(() => createWaveEffect(), 1000); // 1초 후 파동 효과 시작
        setInterval(createGlitchEffect, 500); // 글리치 효과 체크
    } else {
        // 모바일에서도 파동 효과 활성화 (더 부드럽게)
        setTimeout(() => createWaveEffect(), 1500); // 1.5초 후 파동 효과 시작
        setInterval(createGlitchEffect, 1500); // 적당한 속도의 글리치 효과
    }
}

// CSS 키프레임 동적 추가 (더 세밀한 디바이스 분류)
const screenWidth = window.innerWidth;
const isMobileDevice = screenWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLargeMobile = screenWidth >= 415 && screenWidth <= 768;
const isStandardMobile = screenWidth >= 361 && screenWidth <= 414;
const isSmallMobile = screenWidth <= 360;

let translateIntensity, rotateIntensity;

if (isLargeMobile) {
    translateIntensity = { light: '-3px', medium: '-5px', heavy: '-4px' };
    rotateIntensity = { light: '1.5deg', medium: '2.5deg', heavy: '2deg' };
} else if (isStandardMobile) {
    translateIntensity = { light: '-4px', medium: '-6px', heavy: '-5px' };
    rotateIntensity = { light: '2deg', medium: '3deg', heavy: '2.5deg' };
} else if (isSmallMobile) {
    translateIntensity = { light: '-5px', medium: '-7px', heavy: '-6px' };
    rotateIntensity = { light: '2.5deg', medium: '3.5deg', heavy: '3deg' };
} else {
    // 웹/데스크톱
    translateIntensity = { light: '-2px', medium: '-4px', heavy: '-3px' };
    rotateIntensity = { light: '1deg', medium: '2deg', heavy: '1.5deg' };
}

const style = document.createElement('style');
style.textContent = `
    @keyframes charFloat {
        0%, 100% { 
            transform: translateY(0px) rotateZ(0deg) scale(1);
        }
        25% { 
            transform: translateY(${translateIntensity.medium}) rotateZ(${rotateIntensity.medium}) scale(1.02);
        }
        50% { 
            transform: translateY(${translateIntensity.light}) rotateZ(-${rotateIntensity.light}) scale(0.98);
        }
        75% { 
            transform: translateY(${translateIntensity.heavy}) rotateZ(${rotateIntensity.heavy}) scale(1.01);
        }
    }
`;
document.head.appendChild(style);

// 워터마크 배경 초기화
function initWatermarkBackground() {
    const container = document.getElementById('watermarkContainer');
    if (!container) return;

    // 미디어아트와 관련된 특수문자들
    const specialChars = [
        '◆', '◇', '◈', '◉', '◎', '●', '○', '◐', '◑', '◒', '◓',
        '▲', '▼', '◀', '▶', '▴', '▾', '◂', '▸',
        '■', '□', '▪', '▫', '▬', '▭', '▮', '▯',
        '♦', '♢', '♠', '♣', '♥', '♡',
        '※', '§', '¶', '†', '‡', '•', '‰', '′', '″',
        '∞', '∆', '∇', '∴', '∵', '∈', '∋', '⊂', '⊃',
        '≡', '≠', '≤', '≥', '±', '×', '÷', '√', '∝',
        '∧', '∨', '∩', '∪', '⊕', '⊗', '⊙',
        '↑', '↓', '←', '→', '↖', '↗', '↘', '↙',
        '⌐', '¬', '½', '¼', '¾', '¹', '²', '³',
        '░', '▒', '▓', '█', '▄', '▌', '▐', '▀',
        '☆', '★', '☉', '☽', '☾', '♪', '♫', '♬'
    ];

    // 모바일 환경 감지
    const isMobile = window.innerWidth <= 768;
    const charCount = isMobile ? 30 : 40; // 모바일에서도 충분한 개수
    
    console.log(`워터마크 초기화: isMobile=${isMobile}, charCount=${charCount}, containerExists=${!!container}`);

    // 워터마크 문자들 생성
    for (let i = 0; i < charCount; i++) {
        const char = document.createElement('div');
        char.className = 'watermark-char';
        
        // 랜덤 특수문자 선택
        const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
        char.textContent = randomChar;
        
        // 랜덤 크기 클래스 추가
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        char.classList.add(randomSize);
        
        // 랜덤 위치 설정
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        char.style.left = `${x}%`;
        char.style.top = `${y}%`;
        
        // 랜덤 애니메이션 지연
        const delay = Math.random() * 10;
        char.style.animationDelay = `${delay}s`;
        
        // 랜덤 회전
        const rotation = Math.random() * 360;
        char.style.transform = `rotate(${rotation}deg)`;
        
        // 모바일에서 색상 강제 적용
        if (isMobile) {
            char.style.color = `rgba(25, 28, 20, ${0.2 + Math.random() * 0.15})`;
            char.style.textShadow = `0 0 10px rgba(25, 28, 20, ${0.1 + Math.random() * 0.1})`;
        }
        
        container.appendChild(char);
    }

    // 동적으로 워터마크 위치 업데이트 (선택사항)
    function updateWatermarkPositions() {
        const chars = container.querySelectorAll('.watermark-char');
        chars.forEach((char, index) => {
            // 매우 느린 속도로 위치 변경
            setTimeout(() => {
                const newX = Math.random() * 100;
                const newY = Math.random() * 100;
                char.style.transition = 'all 30s ease-in-out';
                char.style.left = `${newX}%`;
                char.style.top = `${newY}%`;
            }, index * 1000); // 각 문자마다 1초씩 지연
        });
    }

    // 주기적으로 위치 업데이트 (60초마다)
    setInterval(updateWatermarkPositions, 60000);

    // 스크롤에 따른 워터마크 투명도 조절
    function handleWatermarkScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const fadeEnd = windowHeight * 0.5;
        
        let opacity = 1;
        if (scrollTop > 0) {
            opacity = Math.max(0.2, 1 - (scrollTop / fadeEnd));
        }
        
        container.style.opacity = opacity;
    }

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleWatermarkScroll);

    // 워터마크 색상 다양화 - 더 진한 색상
    function diversifyWatermarkColors() {
        const chars = container.querySelectorAll('.watermark-char');
        chars.forEach(char => {
            const hue = Math.random() * 60; // 0-60도 (녹색 계열)
            const saturation = Math.random() * 40 + 20; // 20-60% (더 선명하게)
            const lightness = Math.random() * 25 + 20; // 20-45% (더 밝게)
            const alpha = Math.random() * 0.15 + 0.12; // 0.12-0.27 (훨씬 더 진하게)
            
            char.style.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        });
    }

    // 5초 후 색상 다양화 적용
    setTimeout(diversifyWatermarkColors, 5000);
}

// 비디오 fallback 기능 - 비디오 로드 실패 시 이미지로 대체
function initVideoFallback() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 비디오 로드 실패 시 이미지로 대체
        video.addEventListener('error', function() {
            console.log('비디오 로드 실패, 이미지로 대체:', video.src);
            const img = video.querySelector('img');
            if (img) {
                // 비디오 요소를 이미지로 교체
                const parent = video.parentElement;
                const newImg = document.createElement('img');
                newImg.src = img.src;
                newImg.alt = img.alt;
                newImg.className = video.className;
                parent.replaceChild(newImg, video);
            }
        });
        
        // 비디오 로드 성공 시 로그
        video.addEventListener('loadeddata', function() {
            console.log('비디오 로드 성공:', video.src);
        });
    });
}

// 영상 상태 디버깅 함수
function debugVideoStatus() {
    console.log('=== 영상 상태 디버깅 ===');
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => {
        console.log(`영상 ${index + 1}:`);
        console.log('- src:', video.currentSrc || video.src);
        console.log('- readyState:', video.readyState);
        console.log('- networkState:', video.networkState);
        console.log('- error:', video.error);
        console.log('- paused:', video.paused);
        console.log('- muted:', video.muted);
        console.log('- autoplay:', video.autoplay);
        console.log('---');
    });
}

// DOM 로드 완료 후 비디오 fallback 초기화
document.addEventListener('DOMContentLoaded', function() {
    initVideoFallback();
    
    // 5초 후 영상 상태 디버깅
    setTimeout(debugVideoStatus, 5000);
});

// 동아리 신청 팝업 초기화
function initApplicationPopup() {
    console.log('동아리 신청 팝업 초기화 시작');
    
    const popup = document.getElementById('applicationPopup');
    const closeBtn = document.getElementById('popupClose');
    const overlay = popup.querySelector('.popup-overlay');
    
    if (!popup || !closeBtn || !overlay) {
        console.log('팝업 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 팝업 닫기 함수
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        
        // 로컬 스토리지에 팝업을 본 기록 저장 (24시간 동안 다시 보지 않음)
        const timestamp = new Date().getTime();
        localStorage.setItem('applicationPopupSeen', timestamp.toString());
        
        console.log('팝업이 닫혔습니다.');
    }
    
    // 팝업 열기 함수
    function openPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('팝업이 열렸습니다.');
    }
    
    // 닫기 버튼 이벤트
    closeBtn.addEventListener('click', closePopup);
    
    // 오버레이 클릭 시 닫기
    overlay.addEventListener('click', closePopup);
    
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // 동아리 신청 버튼 클릭 시 팝업 닫기
    const applicationButton = popup.querySelector('.application-button');
    if (applicationButton) {
        applicationButton.addEventListener('click', function() {
            // 구글폼으로 이동하기 전에 팝업 닫기
            setTimeout(closePopup, 500);
        });
    }
    
    // 매번 팝업 표시 (시간 제한 없음)
    setTimeout(() => {
        openPopup();
    }, 2000); // 2초로 단축
    
    console.log('2초 후 팝업이 표시됩니다.');
    
    console.log('동아리 신청 팝업 초기화 완료');
}


