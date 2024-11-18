/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');
    const projectContainer = document.querySelector('.project-container');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    let currentIndex = 0;
    let isAnimating = false;

    // Handle collapsible info
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
        
        // Reset any expanded info in the current project
        const currentExpandedInfo = currentProject.querySelector('.expanded-info');
        const currentExpandBtn = currentProject.querySelector('.expand-btn');
        if (currentExpandedInfo && currentExpandedInfo.classList.contains('show')) {
            currentExpandedInfo.classList.remove('show');
            if (currentExpandBtn) {
                currentExpandBtn.textContent = '. . .';
            }
        }

        // Determine slide direction classes
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

        // Set up the next project
        nextProject.classList.add(inClass);
        nextProject.classList.add('active');

        // Start animation in the next frame
        requestAnimationFrame(() => {
            // Trigger sliding animation
            currentProject.classList.add(outClass);
            nextProject.classList.add('sliding');

            // Clean up after animation
            setTimeout(() => {
                currentProject.classList.remove('active', outClass);
                nextProject.classList.remove(inClass, 'sliding');
                isAnimating = false;
            }, 500); // Match this with your CSS transition duration
        });

        currentIndex = index;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === projects.length - 1;
    }

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

    // Initialize all projects
    projects.forEach(project => {
        setupCollapsibleInfo(project);
    });

    // Show the first project initially
    projects[currentIndex].classList.add('active');
});