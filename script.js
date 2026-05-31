function openProject(projectName) {
    if (projectName === 'Publication Designs') {
        window.location.href = 'projects.html';
    } else if (projectName === 'UI Designs for Commissions') {
        window.location.href = 'commission.html';
    } else if (projectName === 'UI/UX Designs') {
        window.location.href = 'schoolprojects.html';
    } else if (projectName === 'Content Works') {
        window.location.href = 'contentproducts.html';
    } else {
        alert(`Case study for "${projectName}" coming soon!`);
    }
}

function showCV() {
    window.open('https://canva.link/s13cyh2yzu8tq8y', '_blank');
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const navbarHeight = 90; 
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-cards .card');
    const moveX = (window.innerWidth / 2 - e.pageX) / 60;
    const moveY = (window.innerHeight / 2 - e.pageY) / 60;

    cards.forEach(card => {
        card.style.setProperty('--parallax-x', `${moveX}px`);
        card.style.setProperty('--parallax-y', `${moveY}px`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroCards = document.querySelectorAll('.floating-cards .card');
    heroCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('is-visible');
        }, 500 + (index * 150));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.partner-card');
    
    const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                }, index * 150);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, .site-footer');
    
    const sectionObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        sectionObserver.observe(section);
    });
});
    
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('#projects .project-card');
    
    const projectObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.remove('is-hidden');
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }, index * 150);
            }
        });
    }, projectObserverOptions);

    projectCards.forEach((card) => {
        card.classList.add('is-hidden');
        projectObserver.observe(card);
        
        card.addEventListener('animationend', () => {
            card.classList.remove('animate-in');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const presContainer = document.querySelector('.about-presentation-container');
    
    if (presContainer) {
        presContainer.style.opacity = '0';
        presContainer.style.transition = 'opacity 1.5s ease-in-out';
        
        const presObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        presObserver.observe(presContainer);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const extProjectItems = document.querySelectorAll('.ext-project-item');
    
    if (extProjectItems.length > 0) {
        const extObserverOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const extObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }, index * 150);
                }
            });
        }, extObserverOptions);

        extProjectItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            extObserver.observe(item);
        });
    }

    const extCtaBtn = document.querySelector('.ext-cta-btn');
    if (extCtaBtn) {
        extCtaBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }

    
    const profileFrame = document.querySelector('.profile-frame');
    const profileVideo = document.querySelector('.profile-back video');
    
    if (profileFrame && profileVideo) {
        profileFrame.addEventListener('mouseenter', () => {
            profileVideo.play().catch(err => console.log("Video playback prevented:", err));
        });
        profileFrame.addEventListener('mouseleave', () => {
            profileVideo.pause();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.horizontal-gallery');
    if (gallery) {
        
        children.forEach(child => {
            const clone = child.cloneNode(true);
            gallery.appendChild(clone);
        });
        
        let isPaused = false;
        let scrollPos = 0;
        const speed = 2;
        
        gallery.addEventListener('mouseenter', () => isPaused = true);
        gallery.addEventListener('mouseleave', () => isPaused = false);
        gallery.addEventListener('touchstart', () => isPaused = true);
        gallery.addEventListener('touchend', () => isPaused = false);
        
        function autoScroll() {
            if (!isPaused) {
                scrollPos += speed;
                if (gallery.scrollWidth > 0 && scrollPos >= gallery.scrollWidth / 2) {
                    scrollPos -= gallery.scrollWidth / 2;
                }
                gallery.scrollLeft = scrollPos;
            }
            requestAnimationFrame(autoScroll);
        }
        
        setTimeout(autoScroll, 500);
    }
});