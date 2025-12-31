document.addEventListener('DOMContentLoaded', function() {
    // Generic carousel function
    function createCarousel(containerSelector, prevBtnId, nextBtnId, itemClass) {
        const items = document.querySelectorAll(`${containerSelector} .${itemClass}`);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        let currentIndex = 0;
        let isAnimating = false;

        function setupCollapsibleInfo(item) {
            const expandBtn = item.querySelector('.expand-btn');
            const expandedInfo = item.querySelector('.expanded-info');
            
            if (expandBtn && expandedInfo) {
                expandBtn.addEventListener('click', function() {
                    expandedInfo.classList.toggle('show');
                    expandBtn.textContent = expandedInfo.classList.contains('show') ? '--' : '. . .';
                });
            }
        }

        function showItem(index, direction) {
            if (isAnimating || items.length === 0) return;
            isAnimating = true;

            const currentItem = items[currentIndex];
            const nextItem = items[index];
            
            // Reset expanded info if present
            const currentExpandedInfo = currentItem.querySelector('.expanded-info');
            const currentExpandBtn = currentItem.querySelector('.expand-btn');
            if (currentExpandedInfo && currentExpandedInfo.classList.contains('show')) {
                currentExpandedInfo.classList.remove('show');
                currentExpandBtn.textContent = '. . .';
            }

            // Set initial positions
            const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

            // Clear any existing transition classes
            currentItem.classList.remove('slide-out-left', 'slide-out-right', 'sliding');
            nextItem.classList.remove('slide-in-left', 'slide-in-right', 'sliding');

            // Prepare next item
            nextItem.style.display = 'block';
            nextItem.classList.add(inClass);
            
            // Force browser reflow
            void nextItem.offsetWidth;

            // Start transition
            requestAnimationFrame(() => {
                currentItem.classList.add(outClass);
                nextItem.classList.add('sliding');
                
                setTimeout(() => {
                    // Clean up classes
                    currentItem.classList.remove('active', outClass);
                    currentItem.style.display = 'none';
                    
                    nextItem.classList.remove(inClass, 'sliding');
                    nextItem.classList.add('active');
                    
                    isAnimating = false;
                }, 500);
            });

            currentIndex = index;
            
            // Update button states
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === items.length - 1;
        }

        // Event Listeners
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0 && !isAnimating) {
                showItem(currentIndex - 1, 'prev');
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - 1 && !isAnimating) {
                showItem(currentIndex + 1, 'next');
            }
        });

        // Initialize items
        items.forEach((item, index) => {
            setupCollapsibleInfo(item);
            if (index !== currentIndex) {
                item.style.display = 'none';
            }
        });
        
        if (items.length > 0) {
            items[currentIndex].classList.add('active');
            prevBtn.disabled = true;
        }

        return { showItem, items, currentIndex };
    }

    // Initialize both carousels
    createCarousel('.project-container', 'prevProject', 'nextProject', 'project');
    createCarousel('.experience-container', 'prevExperience', 'nextExperience', 'experience-item');
});