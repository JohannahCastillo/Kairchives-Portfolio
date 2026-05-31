document.addEventListener('DOMContentLoaded', function() {
    let projectCards = document.querySelectorAll('.project-card');
    
    let observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    let cardObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }, index * 150);
            }
        });
    }, observerOptions);

    projectCards.forEach(function(card) {
        card.classList.add('fade-in-card');
        cardObserver.observe(card);
    });

    // Modal functionality for project cards
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('project-modal-img');
    const modalTitle = document.getElementById('project-modal-title');
    const modalDesc = document.getElementById('project-modal-desc');
    const closeBtn = document.querySelector('.close-project-modal');

    if (modal) {
        projectCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const imgSrc = card.querySelector('img').src;
                const title = card.querySelector('.project-title').innerText;
                const desc = card.querySelector('.project-description').innerText;
                
                const scope = card.querySelector('.detail-scope').innerText;
                const functionalitiesHTML = card.querySelector('.detail-functionalities').innerHTML;
                const tech = card.querySelector('.detail-tech').innerText;

                modalImg.src = imgSrc;
                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                
                document.getElementById('project-modal-scope').innerText = scope;
                document.getElementById('project-modal-functionalities').innerHTML = functionalitiesHTML;
                document.getElementById('project-modal-tech').innerText = tech;
                
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                // Trigger reflow to ensure CSS transitions play properly
                void modal.offsetWidth; 
                modal.classList.add('active');
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for the transition to finish
        };

        closeBtn.addEventListener('click', closeModal);

        // Close when clicking outside of modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close with Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});