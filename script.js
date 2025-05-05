document.addEventListener('DOMContentLoaded', function() {
    // Hero Carousel JavaScript
    let heroSlideIndex = 0;
    const heroSlide = document.getElementById('heroSlide');
    const heroItems = document.querySelectorAll('.carousel-item');
    if (heroItems.length > 0) {
        const heroItemWidth = heroItems[0].clientWidth;

        function nextSlide() {
            heroSlideIndex = (heroSlideIndex + 1) % heroItems.length;
            heroSlide.style.transform = `translateX(-${heroSlideIndex * heroItemWidth}px)`;
        }

        function prevSlide() {
            heroSlideIndex = (heroSlideIndex - 1 + heroItems.length) % heroItems.length;
            heroSlide.style.transform = `translateX(-${heroSlideIndex * heroItemWidth}px)`;
        }

        // Auto-advance hero carousel
        setInterval(nextSlide, 5000);
    }

    // Space Carousel JavaScript
    let spaceSlideIndex = 0;
    const spaceSlide = document.getElementById('spaceSlide');
    const spaceItems = document.querySelectorAll('.space-item');
    if (spaceItems.length > 0) {
        const spaceItemWidth = spaceItems[0].clientWidth;

        function nextSpaceSlide() {
            spaceSlideIndex = (spaceSlideIndex + 1) % spaceItems.length;
            spaceSlide.style.transform = `translateX(-${spaceSlideIndex * spaceItemWidth}px)`;
        }

        function prevSpaceSlide() {
            spaceSlideIndex = (spaceSlideIndex - 1 + spaceItems.length) % spaceItems.length;
            spaceSlide.style.transform = `translateX(-${spaceSlideIndex * spaceItemWidth}px)`;
        }

        // Auto-advance space carousel
        setInterval(nextSpaceSlide, 5000);
    }

    // Team carousel functionality
    const teamGrid = document.querySelector('.team-grid');
    const teamMembers = document.querySelectorAll('.team-member');

    // Clone first three items and append to end for smooth infinite scroll
    if (teamMembers.length > 0) {
        const firstThreeMembers = Array.from(teamMembers).slice(0, 3);
        firstThreeMembers.forEach(member => {
            const clone = member.cloneNode(true);
            teamGrid.appendChild(clone);
        });
    }

    // Book opening functionality
    const book = document.getElementById('book');
    const tapButton = document.getElementById('tapButton');
    const closeButton = document.getElementById('closeButton');
    const pageSpreads = document.querySelectorAll('.page-spread');
    let currentPage = 1;
    const totalPages = pageSpreads.length;
    let isBookOpen = false;

    // Tap button click handler
    if (tapButton) {
        tapButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Tap button clicked");
            isBookOpen = !isBookOpen;
            book.classList.toggle('open');
            console.log("Book open state:", isBookOpen);
            
            if (isBookOpen) {
                this.innerHTML = '<span class="tap-text">Close</span><i class="fas fa-times"></i>';
                showPage(currentPage);
            } else {
                this.innerHTML = '<span class="tap-text">Tap to Open</span><i class="fas fa-arrow-right"></i>';
            }
        });
    }

    // Close button click handler
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isBookOpen = false;
            book.classList.remove('open');
            tapButton.innerHTML = '<span class="tap-text">Tap to Open</span><i class="fas fa-arrow-right"></i>';
        }, { capture: true });
    }

    // Page display function
    function showPage(pageNum) {
        pageSpreads.forEach(spread => {
            spread.classList.remove('active');
        });
        const targetPage = document.querySelector(`[data-page="${pageNum}"]`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    // Initialize first page
    showPage(currentPage);

    // Navigation functionality
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Function to update active link
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Update active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                // Scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initial check for active link
    updateActiveLink();

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const message = contactForm.message.value;

        // Validate form
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields';
            formMessage.className = 'form-message error';
            return;
        }

        // Create Gmail compose URL with pre-filled information
        const subject = `Contact Form Submission`;
        const body = message;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@cohopers.in&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Redirect to Gmail
        window.location.href = gmailUrl;
    });
});