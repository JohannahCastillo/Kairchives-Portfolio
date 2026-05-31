document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.unique-title');

    if (title) {
        const text = title.textContent.trim();
        const words = text.split(' ');
        title.innerHTML = '';

        let letterIndex = 0;

        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement('div');
            wordWrapper.style.display = 'inline-block';
            wordWrapper.style.whiteSpace = 'nowrap';

            word.split('').forEach((letter) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.transitionDelay = `${letterIndex * 0.05}s`;
                wordWrapper.appendChild(span);
                letterIndex++;
            });

            title.appendChild(wordWrapper);

            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.style.transitionDelay = `${letterIndex * 0.05}s`;
                title.appendChild(spaceSpan);
                letterIndex++;
            }
        });

        setTimeout(() => {
            title.classList.add('is-visible');
        }, 100);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-lightbox');
    const nextBtn = document.querySelector('.next-lightbox');
    const galleryImages = document.querySelectorAll('.publication-grid img');

    let currentIndex = 0;
    let transitionTimeout;

    if (lightbox && lightboxImg && galleryImages) {
        const gridObserverOptions = { threshold: 0.1 };
        const gridObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }, index * 120);
                }
            });
        }, gridObserverOptions);

        galleryImages.forEach((img, index) => {
            gridObserver.observe(img);
            
            img.addEventListener('click', () => {
                currentIndex = index;
                updateLightboxImage(true);
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };
        
        const updateLightboxImage = (isInitial = false) => {
            if (isInitial) {
                lightboxImg.src = galleryImages[currentIndex].src;
                lightboxImg.style.opacity = '1';
            } else {
                clearTimeout(transitionTimeout);
                lightboxImg.style.opacity = '0';
                transitionTimeout = setTimeout(() => {
                    lightboxImg.src = galleryImages[currentIndex].src;
                    lightboxImg.style.opacity = '1';
                }, 200);
            }
        };

        const showNext = () => {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateLightboxImage();
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeLightbox();
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});