 Variables globales
let currentPage = 1;
const totalPages = 3;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    addKeyboardNavigation();
    addTouchNavigation();
    startAnimations();
});

// Initialisation de la navigation
function initializeNavigation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToPage(index + 1);
        });
    });
}

// Navigation vers une page spécifique
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
        return;
    }

    const currentPageElement = document.getElementById(`page${currentPage}`);
    const targetPageElement = document.getElementById(`page${pageNumber}`);
    const currentDot = document.querySelector(`.dot[data-page="${currentPage}"]`);
    const targetDot = document.querySelector(`.dot[data-page="${pageNumber}"]`);

    // Animation de sortie de la page actuelle
    currentPageElement.classList.remove('active');
    if (pageNumber > currentPage) {
        currentPageElement.classList.add('prev');
    } else {
        currentPageElement.classList.remove('prev');
    }

    // Animation d'entrée de la nouvelle page
    setTimeout(() => {
        targetPageElement.classList.add('active');
        if (pageNumber < currentPage) {
            targetPageElement.classList.add('prev');
        } else {
            targetPageElement.classList.remove('prev');
        }
    }, 100);

    // Mise à jour des dots de navigation
    currentDot.classList.remove('active');
    targetDot.classList.add('active');

    // Mise à jour de la page actuelle
    currentPage = pageNumber;

    // Redémarrer les animations de la nouvelle page
    restartPageAnimations(pageNumber);
}

// Page suivante
function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

// Page précédente
function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// Navigation au clavier
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextPage();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevPage();
                break;
            case '1':
                goToPage(1);
                break;
            case '2':
                goToPage(2);
                break;
            case '3':
                goToPage(3);
                break;
        }
    });
}

// Navigation tactile (swipe)
function addTouchNavigation() {
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    document.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe vers la gauche - page suivante
                nextPage();
            } else {
                // Swipe vers la droite - page précédente
                prevPage();
            }
        }
    }
}

// Redémarrer les animations d'une page
function restartPageAnimations(pageNumber) {
    const pageElement = document.getElementById(`page${pageNumber}`);
    const animatedElements = pageElement.querySelectorAll('.message-content p');
    
    // Réinitialiser les animations
    animatedElements.forEach((element, index) => {
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        element.style.animation = `fadeInUp 1s ease-out forwards`;
        element.style.animationDelay = `${0.3 + (index * 0.3)}s`;
    });
}

// Démarrer les animations initiales
function startAnimations() {
    // Animation des cœurs flottants
    createFloatingHearts();
    
    // Animation des pétales
    createFloatingPetals();
    
    // Animation des étincelles
    createSparkles();
}

// Créer des cœurs flottants supplémentaires
function createFloatingHearts() {
    setInterval(() => {
        if (currentPage === 1) {
            const heart = document.createElement('div');
            heart.className = 'heart floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            const heartsContainer = document.querySelector('#page1 .hearts-decoration');
            if (heartsContainer) {
                heartsContainer.appendChild(heart);
                
                // Supprimer le cœur après l'animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 7000);
            }
        }
    }, 3000);
}

// Créer des pétales flottants supplémentaires
function createFloatingPetals() {
    setInterval(() => {
        if (currentPage === 2) {
            const petal = document.createElement('div');
            petal.className = 'petal floating-petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            const petalsContainer = document.querySelector('#page2 .floating-petals');
            if (petalsContainer) {
                petalsContainer.appendChild(petal);
                
                // Supprimer le pétale après l'animation
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 10000);
            }
        }
    }, 2000);
}

// Créer des étincelles supplémentaires
function createSparkles() {
    setInterval(() => {
        if (currentPage === 3) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle floating-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            const sparklesContainer = document.querySelector('#page3 .sparkles');
            if (sparklesContainer) {
                sparklesContainer.appendChild(sparkle);
                
                // Supprimer l'étincelle après l'animation
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 4000);
            }
        }
    }, 1500);
}

// Effet de particules au clic
document.addEventListener('click', function(event) {
    createClickEffect(event.clientX, event.clientY);
});

function createClickEffect(x, y) {
    const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.02;
            posY += vy * 0.02;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Auto-navigation (optionnel - peut être activé)
function startAutoNavigation() {
    setInterval(() => {
        if (currentPage < totalPages) {
            nextPage();
        } else {
            goToPage(1);
        }
    }, 10000); // Change de page toutes les 10 secondes
}

// Décommenter la ligne suivante pour activer la navigation automatique
// startAutoNavigation();
