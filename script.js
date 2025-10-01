// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : 'auto';
    });

    document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('nav-active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Looping Typewriter Effect (Fixed)
const typewriterText = document.getElementById('typewriter');
if (typewriterText) {
    const messages = [
        "Building the future, one line of code at a time.",
        "Turning ideas into interactive experiences.",
        "Passionate about innovation and technology."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = messages[messageIndex];

        if (!isDeleting && charIndex === 0) {
            typewriterText.classList.remove("fadeIn");
            void typewriterText.offsetWidth; // restart animation
            typewriterText.classList.add("fadeIn");
        }

        typewriterText.textContent = isDeleting
            ? current.substring(0, charIndex - 1)
            : current.substring(0, charIndex + 1);

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            speed = 500;
        }

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setTimeout(typeEffect, speed);
    }

    typewriterText.textContent = "";
    typeEffect();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (navLinks && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Skill Progress Bars
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (isInViewport(bar)) {
            bar.style.width = `${percent}%`;
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
}

window.addEventListener('scroll', animateSkills);
animateSkills();

// Contact Form Handling with Custom Popup + Auto Hide + Spinner
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('contact-submit');
const btnText = submitBtn.querySelector('.btn-text');
const btnSpinner = submitBtn.querySelector('.btn-spinner');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formMessage.classList.add('hidden'); // hide old message
        toggleButtonLoading(true);

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            toggleButtonLoading(false);
            if (response.ok) {
                showFormMessage('✅ Message sent successfully! I’ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('❌ Oops! Something went wrong. Please try again.', 'error');
            }
        })
        .catch(() => {
            toggleButtonLoading(false);
            showFormMessage('⚠️ Network error — please check your connection.', 'error');
        });
    });
}

function toggleButtonLoading(isLoading) {
    if (isLoading) {
        btnText.textContent = 'Sending...';
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        btnText.textContent = 'Send Message';
        btnSpinner.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type; // success or error
    formMessage.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Smooth hover effects for contact links
const contactLinks = document.querySelectorAll('.contact-links a');
contactLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0)';
    });
});

// Virtual Mentor Hub
const mentorForm = document.getElementById('mentor-form');
const pairsList = document.getElementById('pairs-list');

if (mentorForm && pairsList) {
    let pairs = JSON.parse(localStorage.getItem('mentorPairs')) || [];

    function renderPairs() {
        pairsList.innerHTML = '';
        pairs.forEach((pair, index) => {
            const item = document.createElement('div');
            item.className = 'pair-item';
            item.innerHTML = `${pair.mentor} → ${pair.student} (ID: ${index}) <button class="delete-pair" data-index="${index}">Delete</button>`;
            pairsList.appendChild(item);
        });
        document.querySelectorAll('.delete-pair').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                pairs.splice(index, 1);
                localStorage.setItem('mentorPairs', JSON.stringify(pairs));
                renderPairs();
            });
        });
    }

    mentorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(mentorForm);
        const mentor = formData.get('mentor');
        const student = formData.get('student');
        pairs.push({ mentor, student });
        localStorage.setItem('mentorPairs', JSON.stringify(pairs));
        renderPairs();
        mentorForm.reset();
    });

    renderPairs();
}

// EcoWater Tracker
const waterForm = document.getElementById('water-form');
const waterUsage = document.getElementById('water-usage');

if (waterForm && waterUsage) {
    let totalUsage = parseInt(localStorage.getItem('waterUsage')) || 0;

    function updateUsage() {
        waterUsage.textContent = `Total Usage: ${totalUsage} Liters`;
        localStorage.setItem('waterUsage', totalUsage);
    }

    waterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(waterForm);
        const liters = parseInt(formData.get('liters'));
        if (!isNaN(liters) && liters > 0) {
            totalUsage += liters;
            updateUsage();
            waterForm.reset();
        } else {
            alert('Please enter a valid number of liters!');
        }
    });

    updateUsage();
}

// Emotion-Based Music Player
const musicForm = document.getElementById('music-form');
const musicPlaylist = document.getElementById('music-playlist');

if (musicForm && musicPlaylist) {
    const playlists = {
        happy: ['Song 1 - Happy Tune', 'Song 2 - Joyful Beat'],
        sad: ['Song 3 - Melancholy', 'Song 4 - Slow Vibes'],
        neutral: ['Song 5 - Chill', 'Song 6 - Relax']
    };

    function updatePlaylist(mood) {
        const playlist = playlists[mood.toLowerCase()] || playlists.neutral;
        musicPlaylist.textContent = `Current Playlist: ${playlist.join(', ')}`;
    }

    musicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(musicForm);
        const mood = formData.get('mood');
        if (mood) {
            updatePlaylist(mood);
            musicForm.reset();
        } else {
            alert('Please enter a mood!');
        }
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.dataset.theme;
        document.body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
        themeIcon.className = document.body.dataset.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        console.log('Theme switched to:', document.body.dataset.theme);
    });
}

const customCursor = document.getElementById('custom-cursor');

if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            customCursor.style.background = 'var(--accent-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursor.style.background = 'transparent';
        });
    });
}