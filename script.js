// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Simple form validation
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            if (name && email && message) {
                // Here you would typically send the form data to a server
                // For this example, we'll just show a success message
                showNotification('Thank you for contacting us. We will get back to you soon!', 'success');
                this.reset(); // Clear the form
            } else {
                showNotification('Please fill out all fields.', 'error');
            }
        });
    }

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} CyberLink Nairobi. All rights reserved.`;
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: 1000,
            opacity: 0,
            transition: 'opacity 0.3s ease'
        });

        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#f44336';
        }

        // Fade in
        setTimeout(() => {
            notification.style.opacity = 1;
        }, 10);

        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = 0;
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});
