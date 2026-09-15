document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('.btn-submit');
    const successModal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-success-modal');
    const awesomeBtn = document.getElementById('close-success-btn');
    
    const errorModal = document.getElementById('error-modal');
    const closeErrorBtn = document.getElementById('close-error-modal');
    const closeErrorBtnBottom = document.getElementById('close-error-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents the default page redirect
            
            // Change button text to indicate processing
            const originalButtonText = submitButton.innerText;
            submitButton.innerText = 'Sending...';

            const formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success modal instead of alert
                    successModal.style.display = 'flex';
                    successModal.style.alignItems = 'center';
                    successModal.style.justifyContent = 'center';
                    setTimeout(() => successModal.classList.add('active'), 10); // Adds transition smoothly
                    
                    form.reset(); // Automatically clears all form fields
                } else {
                    // Show error modal instead of alert
                    errorModal.style.display = 'flex';
                    errorModal.style.alignItems = 'center';
                    errorModal.style.justifyContent = 'center';
                    setTimeout(() => errorModal.classList.add('active'), 10);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error modal instead of alert
                errorModal.style.display = 'flex';
                errorModal.style.alignItems = 'center';
                errorModal.style.justifyContent = 'center';
                setTimeout(() => errorModal.classList.add('active'), 10);
            })
            .finally(() => {
                // Restore the original button text
                submitButton.innerText = originalButtonText;
            });
        });
    }

    // Close modal functions
    function closeSuccessModal() {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 300); // Matches the CSS transition duration
    }

    if (closeBtn && awesomeBtn) {
        closeBtn.addEventListener('click', closeSuccessModal);
        awesomeBtn.addEventListener('click', closeSuccessModal);
    }
    
    function closeErrorModalFunc() {
        errorModal.classList.remove('active');
        setTimeout(() => {
            errorModal.style.display = 'none';
        }, 300);
    }

    if (closeErrorBtn && closeErrorBtnBottom) {
        closeErrorBtn.addEventListener('click', closeErrorModalFunc);
        closeErrorBtnBottom.addEventListener('click', closeErrorModalFunc);
    }

    // Close when clicking outside of modal content
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeSuccessModal();
        }
        if (e.target === errorModal) {
            closeErrorModalFunc();
        }
    });
});