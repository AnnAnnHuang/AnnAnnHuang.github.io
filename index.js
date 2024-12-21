document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let currentIndex = 0;
    let isAnimating = false;

    function setupCollapsibleInfo(project) {
        const expandBtn = project.querySelector('.expand-btn');
        const expandedInfo = project.querySelector('.expanded-info');
        
        if (expandBtn && expandedInfo) {
            expandBtn.addEventListener('click', function() {
                expandedInfo.classList.toggle('show');
                expandBtn.textContent = expandedInfo.classList.contains('show') ? '--' : '. . .';
            });
        }
    }

    function showProject(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentProject = projects[currentIndex];
        const nextProject = projects[index];
        
        // Reset expanded info
        const currentExpandedInfo = currentProject.querySelector('.expanded-info');
        const currentExpandBtn = currentProject.querySelector('.expand-btn');
        if (currentExpandedInfo && currentExpandedInfo.classList.contains('show')) {
            currentExpandedInfo.classList.remove('show');
            currentExpandBtn.textContent = '. . .';
        }

        // Set initial positions
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

        // Clear any existing transition classes
        currentProject.classList.remove('slide-out-left', 'slide-out-right', 'sliding');
        nextProject.classList.remove('slide-in-left', 'slide-in-right', 'sliding');

        // Prepare next project
        nextProject.style.display = 'block';
        nextProject.classList.add(inClass);
        
        // Force browser reflow
        void nextProject.offsetWidth;

        // Start transition
        requestAnimationFrame(() => {
            currentProject.classList.add(outClass);
            nextProject.classList.add('sliding');
            
            setTimeout(() => {
                // Clean up classes
                currentProject.classList.remove('active', outClass);
                currentProject.style.display = 'none';
                
                nextProject.classList.remove(inClass, 'sliding');
                nextProject.classList.add('active');
                
                isAnimating = false;
            }, 500); // Match your CSS transition duration
        });

        currentIndex = index;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === projects.length - 1;
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0 && !isAnimating) {
            showProject(currentIndex - 1, 'prev');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < projects.length - 1 && !isAnimating) {
            showProject(currentIndex + 1, 'next');
        }
    });

    // Initialize projects
    projects.forEach((project, index) => {
        setupCollapsibleInfo(project);
        if (index !== currentIndex) {
            project.style.display = 'none';
        }
    });
    
    // Show first project
    projects[currentIndex].classList.add('active');
    prevBtn.disabled = true;
});
