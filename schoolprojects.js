
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "perspective(1000px) rotateX(0deg) translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .cat-item, .bento-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "perspective(1000px) rotateX(-90deg) translateY(40px)";
    el.style.transition = "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
});