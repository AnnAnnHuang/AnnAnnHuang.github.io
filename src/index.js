/* Detect If Looking */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el)); //Observe all hidden elements

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*Collapsible/Expandable Info*/
document.addEventListener('DOMContentLoaded', function() {
    const expandBtn = document.querySelector('.expand-btn');
    const expandedInfo = document.querySelector('.expanded-info');

    expandBtn.addEventListener('click', function() {
        expandedInfo.classList.toggle('show');
        expandBtn.textContent = expandedInfo.classList.contains('show') ? '--' : '. . .';
    });
});
