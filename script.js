// Main JavaScript for Catalyst Club Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // Theme toggle button click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tab functionality for About section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Academic year selector functionality
    const yearSelector = document.getElementById('academic-year');
    if (yearSelector) {
        yearSelector.addEventListener('change', function() {
            loadMembers(this.value);
        });
        
        // Initialize with current year
        loadMembers(yearSelector.value);
    }

    // Function to load members based on selected year
    function loadMembers(year) {
        const membersList = document.getElementById('members-list');
        if (!membersList) return;

        // Sample member data (replace with API call in production)
        const sampleMembers = {
            '2025': [
                { name: 'Anish Kumar', position: 'President', joinDate: '2024-07-15' },
                { name: 'Priya Singh', position: 'Vice President', joinDate: '2024-07-20' },
                { name: 'Rahul Sharma', position: 'Secretary', joinDate: '2024-07-25' },
                { name: 'Neha Patel', position: 'Treasurer', joinDate: '2024-07-30' }
            ],
            '2024': [
                { name: 'Vikram Mehta', position: 'President', joinDate: '2023-08-10' },
                { name: 'Anjali Desai', position: 'Vice President', joinDate: '2023-08-15' },
                { name: 'Arjun Reddy', position: 'Secretary', joinDate: '2023-08-20' },
                { name: 'Meera Iyer', position: 'Treasurer', joinDate: '2023-08-25' }
            ],
            '2023': [
                { name: 'Aditya Chopra', position: 'President', joinDate: '2022-09-05' },
                { name: 'Kavita Sharma', position: 'Vice President', joinDate: '2022-09-10' },
                { name: 'Rohan Kapoor', position: 'Secretary', joinDate: '2022-09-15' },
                { name: 'Shreya Gupta', position: 'Treasurer', joinDate: '2022-09-20' }
            ]
        };

        const members = sampleMembers[year] || [];
        
        // Clear current members and add new ones
        membersList.innerHTML = '';
        
        if (members.length === 0) {
            membersList.innerHTML = '<p class="no-members">No members found for this academic year.</p>';
            return;
        }

        members.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.style.setProperty('--card-index', index);
            
            const initials = member.name.split(' ')
                .map(name => name[0])
                .join('');
                
            const joinDate = new Date(member.joinDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            memberCard.innerHTML = `
                <div class="member-avatar">${initials}</div>
                <h4>${member.name}</h4>
                <p>${member.position}</p>
                <span class="join-date">Joined: ${joinDate}</span>
            `;
            
            membersList.appendChild(memberCard);
        });
    }

    // Login and Forgot Password Toggle
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginBtn = document.querySelector('.back-to-login');

    if (forgotPasswordLink && forgotPasswordForm && loginForm) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            forgotPasswordForm.classList.remove('hidden');
        });
        
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', function() {
                forgotPasswordForm.classList.add('hidden');
                loginForm.style.display = 'block';
            });
        }
    }

    // Enhanced Feedback Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const subject = document.getElementById('subject'); // New subject field
            const statusText = document.getElementById('statusText');
            const loader = document.getElementById('loader');
            const submitButton = document.getElementById('submitButton');
            const successMessage = document.getElementById('successMessage');
            
            // Enhanced validation with detailed messages
            let isValid = true;
            
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your full name';
                isValid = false;
                name.classList.add('error-field');
            } else if (name.value.trim().length < 3) {
                document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
                isValid = false;
                name.classList.add('error-field');
            } else {
                name.classList.remove('error-field');
            }
            
            if (!email.value.trim()) {
                document.getElementById('emailError').textContent = 'Please enter your email address';
                isValid = false;
                email.classList.add('error-field');
            } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
                email.classList.add('error-field');
            } else {
                email.classList.remove('error-field');
            }
            
            // Subject field validation (if it exists)
            if (subject && !subject.value.trim()) {
                document.getElementById('subjectError').textContent = 'Please enter a subject for your message';
                isValid = false;
                subject.classList.add('error-field');
            } else if (subject) {
                subject.classList.remove('error-field');
            }
            
            if (!message.value.trim()) {
                document.getElementById('messageError').textContent = 'Please enter your message';
                isValid = false;
                message.classList.add('error-field');
            } else if (message.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Please provide more details in your message';
                isValid = false;
                message.classList.add('error-field');
            } else {
                message.classList.remove('error-field');
            }
            
            if (isValid) {
                // Show loading state with enhanced animation
                submitButton.disabled = true;
                loader.style.display = 'inline-block';
                statusText.textContent = 'Sending your message...';
                
                // Prepare form data
                const formData = new FormData(contactForm);
                
                // Use the Google Script URL from the form's action attribute
                const scriptURL = contactForm.action;
                
                // Submit the form
                fetch(scriptURL, { method: 'POST', body: formData })
                    .then(response => {
                        if (response.ok) {
                            // Enhanced success experience
                            contactForm.reset();
                            contactForm.style.display = 'none';
                            successMessage.style.display = 'flex'; // Using flex for better centering
                            
                            // Back button in success message to send another message
                            const backButton = document.querySelector('.back-button');
                            if (backButton) {
                                backButton.addEventListener('click', function() {
                                    successMessage.style.display = 'none';
                                    contactForm.style.display = 'block';
                                });
                            }
                        } else {
                            throw new Error('Something went wrong with the submission');
                        }
                    })
                    .catch(error => {
                        statusText.textContent = 'Failed to send message. Please try again or contact us directly.';
                        statusText.style.color = '#e53935';
                    })
                    .finally(() => {
                        // Reset button and hide loader
                        submitButton.disabled = false;
                        loader.style.display = 'none';
                    });
            }
        });
        
        // Real-time validation for better user experience
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error-field');
                    const errorElement = document.getElementById(`${this.id}Error`);
                    if (errorElement) errorElement.textContent = '';
                }
            });
        });
    }

    // Membership form validation
    const membershipForm = document.getElementById('membershipForm');
    
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add validation and submission logic here
            alert('Application submitted! We will contact you soon.');
            membershipForm.reset();
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.post-card, .vision-card, .member-card');
    
    // Use Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // CTA button interaction
    // Smooth scroll for the simplified primary button
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // allow normal link if target is external
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const rect = target.getBoundingClientRect();
                const top = rect.top + window.pageYOffset - headerOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});