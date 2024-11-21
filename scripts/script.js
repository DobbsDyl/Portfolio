
// JavaScript to detect scrollspy section activation and add 'active' class
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
      const projectCards = document.getElementById('project-cards');

      data.forEach(item => {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('project-card', 'w-75', 'shadow-sm');

        // Add content to the card
        card.innerHTML = `
          <div class="row g-0">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <img src="${item.image}" class="project-img img-fluid rounded-start" alt="${item.title}">
            </div>
            <div class="col-8 d-flex flex-column justify-content-center p-2">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-text">${item.description}</p>
              <div class="technologies mt-2">
                ${item.technologies.map(tech => `<span class="badge me-1">${tech}</span>`).join('')}
              </div>
            </div>
          </div>
        `;

        // Append the card to the container
        projectCards.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});


// Select the indicator element
const aboutLink = document.getElementById('About');
const skillLink = document.getElementById('Skills');
const educationLink = document.getElementById('Education');
const projectLink = document.getElementById('Projects');
const contactLink = document.getElementById('Contact');

const faboutLink = document.getElementById('fabout');
const fskillLink = document.getElementById('fskill');
const feducationLink = document.getElementById('feducation');
const fprojectLink = document.getElementById('fprojects');
const fcontactLink = document.getElementById('fcontact');


function changeStyle(section1, section2) {
  // Set to default colors
  aboutLink.style.borderColor = '#1f2226';
  aboutLink.style.fontWeight = "500";

  skillLink.style.borderColor = '#1f2226';
  skillLink.style.fontWeight = "500";

  educationLink.style.borderColor = '#1f2226';
  educationLink.style.fontWeight = "500";

  projectLink.style.borderColor = '#1f2226';
  projectLink.style.fontWeight = "500";

  contactLink.style.borderColor = '#1f2226';
  contactLink.style.fontWeight = "500";

  //Fixed nav
  faboutLink.style.borderColor = '#1f2226';
  faboutLink.style.fontWeight = "500";

  fskillLink.style.borderColor = '#1f2226';
  fskillLink.style.fontWeight = "500";

  feducationLink.style.borderColor = '#1f2226';
  feducationLink.style.fontWeight = "500";

  fprojectLink.style.borderColor = '#1f2226';
  fprojectLink.style.fontWeight = "500";

  fcontactLink.style.borderColor = '#1f2226';
  fcontactLink.style.fontWeight = "500";

  // Change the selected section
  section1.style.borderColor = '#b3b4bd';
  section1.style.fontWeight = "700";

  section2.style.borderColor = '#b3b4bd';
  section2.style.fontWeight = "700";
}

// Function to update the indicator text
function updateIndicator(sectionName) {
  
  if (sectionName === 'about') {
    changeStyle(aboutLink , faboutLink);
  }

  if (sectionName === 'skills') {
    changeStyle(skillLink, fskillLink);
  }

  if (sectionName === 'education') {
    changeStyle(educationLink, feducationLink);
  }


  if (sectionName === 'projects') {
    changeStyle(projectLink, fprojectLink);
  }

  if (sectionName === 'contact') {
    changeStyle(contactLink, fcontactLink);
  }
}


// Create an IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Update indicator with the currently visible section
      updateIndicator(entry.target.id);
    }
  });
}, {
  threshold: 0.7 // Trigger when 50% of the section is visible
});

// Observe each section
document.querySelectorAll('.page-section').forEach(section => {
  observer.observe(section);
});


function showEducation(school) {
  if (school === 'guelph') {
    const content = document.getElementById('guelph-content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  } 
  if (school === 'sheridan') {
    const content = document.getElementById('sheridan-content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }
    
  
}