/**
 * Compiler Academy - Interactive Course Website
 * JavaScript functionality for collapsible sections and navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    initCollapsibles();
    initSmoothScrolling();
    initActiveNavigation();
});

/**
 * Initialize collapsible sections
 * Allows users to show/hide solution content
 */
function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible__trigger');
    
    collapsibles.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            const parent = trigger.closest('.collapsible');
            const isOpen = parent.classList.contains('collapsible--open');
            
            // Toggle state
            parent.classList.toggle('collapsible--open');
            trigger.setAttribute('aria-expanded', !isOpen);
            
            // Animate icon rotation is handled by CSS
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, '', targetId);
            }
        });
    });
}

/**
 * Initialize active navigation highlighting
 * Updates sidebar links based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar__link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Create intersection observer
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Update active class
                navLinks.forEach(function(link) {
                    link.classList.remove('sidebar__link--active');
                    
                    if (link.getAttribute('href') === '#' + activeId) {
                        link.classList.add('sidebar__link--active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(function(section) {
        observer.observe(section);
    });
}

/**
 * Utility function to update progress bar
 * @param {number} completed - Number of completed problems
 * @param {number} total - Total number of problems
 */
function updateProgress(completed, total) {
    const progressBar = document.querySelector('.progress-bar__fill');
    const progressText = document.querySelector('.sidebar__section p');
    
    if (progressBar) {
        const percentage = (completed / total) * 100;
        progressBar.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = completed + ' από ' + total + ' θέματα ολοκληρώθηκαν';
    }
}

/**
 * Mark a problem as completed
 * @param {number} problemNumber - The problem number (1-4)
 */
function markProblemCompleted(problemNumber) {
    const link = document.querySelector('.sidebar__link[href="#problem-' + problemNumber + '"]');
    
    if (link) {
        link.classList.add('sidebar__link--completed');
        
        // Update progress
        const completedCount = document.querySelectorAll('.sidebar__link--completed').length;
        updateProgress(completedCount, 4);
    }
}
