// Resume data object
let resumeData = {
    personal: {
        name: "JiaYi Che",
        location: "London, ON",
        phone: "(204) 720-4242",
        email: "jiayiche99@gmail.com",
        linkedin: "www.linkedin.com/in/jiayi-che"
    },
    workExperience: [
        {
            title: "Full Stack Intern | JavaScript, React, Express, Node.js, MongoDB, HTML, CSS",
            period: "Sep 2022 - Dec 2022",
            descriptions: [
                "Led a 6-person Agile team to develop a MERN stack-based survey submission platform, automating processes and managing database storage for thousands of users.",
                "Simplified processes, achieving 98% time savings, and implemented a secure authentication system.",
                "Demonstrated expertise in Agile Scrum, serving as Scrum Master for development and deployment.",
                "Worked on various tasks throughout the Software Development Life Cycle (SDLC).",
                "Managed the website's backend, covering development, deployment, and ongoing maintenance."
            ]
        }
    ],
    education: [
        {
            school: "Western University, London, ON",
            period: "Sep 2024 - Present",
            degree: "Master of Engineering – Electrical and Computer Engineering"
        },
        {
            school: "University of Alberta, Edmonton, AB",
            period: "Sep 2019 – May 2023",
            degree: "Bachelor of Science - Computing Science with Specialization | GPA: 3.5"
        }
    ],
    projects: [
        {
            name: "Distributed Social Networking | JavaScript, MongoDB, Django, Python, Socket",
            period: "Jan 2023 – April 2023",
            descriptions: [
                "Applied Agile software development, achieving a 40% increase in speed for bug fixing and updates, and utilized GIT for version control to ensure streamlined collaboration among team members.",
                "Implemented NoSQL with MongoDB for effective data management, improving data retrieval efficiency by 35% and demonstrating a strong grasp of database management."
            ]
        },
        {
            name: "Shortest Path Planning Application for Edmonton | Python, A*, Dijkstra's Algorithm",
            period: "Jan 2022 – April 2022",
            descriptions: [
                "Developed a shortest path planning application using A* and Dijkstra's Algorithm, reducing route calculation time by 40%.",
                "Implemented and optimized the application to handle over 1,000 route requests per minute with high accuracy and efficiency."
            ]
        },
        {
            name: "Android Lab Record Application | Java, Firebase, Android Studio & SDK",
            period: "Jan 2021 - April 2021",
            descriptions: [
                "Co-designed and developed an innovative Android crowdsourcing app using Firebase for the database, HTML for web components, and Java for functionality, resulting in a 30% increase in user engagement.",
                "Created a user dashboard that streamlined the research process, reducing data retrieval time by 50% and demonstrating strong problem-solving skills and adaptability."
            ]
        }
    ],
    skills: [
        { category: "Programming", description: "Java, Python, JavaScript. Experience with Object-Oriented Programming languages." },
        { category: "Web Development", description: "Solid proficiency in JavaScript. Exposure to Django, HTML, and CSS." },
        { category: "Databases", description: "Proficient with MongoDB, MySQL, Firebase, and PostgreSQL." },
        { category: "Application Design", description: "Experienced in UML, Scrum, and Agile methodologies, ensuring successful web app deployments." },
        { category: "Frameworks & Tools", description: "Experienced with Express, Docker, GitHub, Visual Studio, Ubuntu, and Stack Overflow." },
        { category: "Team Collaboration", description: "Proven experience working in Agile teams throughout the entire SDLC, using GitHub for project management." },
        { category: "Software Development", description: "Knowledgeable in the Software Development Life Cycle (SDLC) and Agile methodologies." }
    ]
};

// User credentials - In a real project, use a more secure method for storing and verifying
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// DOM elements
const adminButton = document.getElementById('adminButton');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const cancelLogin = document.getElementById('cancelLogin');
const adminPanel = document.getElementById('adminPanel');

// Login status
let isLoggedIn = false;

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Admin button click event
    adminButton.addEventListener('click', () => {
        if (isLoggedIn) {
            showAdminPanel();
        } else {
            loginModal.style.display = 'flex';
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === adminCredentials.username && password === adminCredentials.password) {
            isLoggedIn = true;
            loginModal.style.display = 'none';
            showAdminPanel();
        } else {
            alert('Incorrect username or password');
        }
    });

    // Cancel login
    cancelLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});

// Show admin panel
function showAdminPanel() {
    // Hide main content
    const mainContent = document.querySelector('main');
    mainContent.style.display = 'none';
    
    // Show admin panel
    adminPanel.style.display = 'block';
    
    // Create admin panel content
    adminPanel.innerHTML = `
        <div class="container admin-panel">
            <h1>Admin Panel</h1>
            <button id="logoutBtn" class="btn">Logout</button>
            <div class="admin-section">
                <h2>Personal Information</h2>
                <div class="edit-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" value="${resumeData.personal.name}">
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <input type="text" id="location" value="${resumeData.personal.location}">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone:</label>
                        <input type="text" id="phone" value="${resumeData.personal.phone}">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" value="${resumeData.personal.email}">
                    </div>
                    <div class="form-group">
                        <label for="linkedin">LinkedIn:</label>
                        <input type="text" id="linkedin" value="${resumeData.personal.linkedin}">
                    </div>
                    <button class="btn save-personal">Save</button>
                </div>
            </div>

            <div class="admin-section">
                <h2>Work Experience</h2>
                <div id="workExperienceList">
                    ${generateWorkExperienceHTML()}
                </div>
                <button class="btn" id="addWorkExperience">Add Work Experience</button>
            </div>

            <div class="admin-section">
                <h2>Education</h2>
                <div id="educationList">
                    ${generateEducationHTML()}
                </div>
                <button class="btn" id="addEducation">Add Education</button>
            </div>

            <div class="admin-section">
                <h2>Projects</h2>
                <div id="projectsList">
                    ${generateProjectsHTML()}
                </div>
                <button class="btn" id="addProject">Add Project</button>
            </div>

            <div class="admin-section">
                <h2>Skills</h2>
                <div id="skillsList">
                    ${generateSkillsHTML()}
                </div>
                <button class="btn" id="addSkill">Add Skill</button>
            </div>

            <button class="btn" id="saveAllChanges">Save All Changes</button>
        </div>
    `;

    // Add event listeners for admin panel
    setupAdminPanelEvents();
}

// Generate work experience HTML
function generateWorkExperienceHTML() {
    return resumeData.workExperience.map((job, index) => `
        <div class="edit-item" data-index="${index}">
            <div class="form-group">
                <label>Title:</label>
                <input type="text" class="job-title" value="${job.title}">
            </div>
            <div class="form-group">
                <label>Period:</label>
                <input type="text" class="job-period" value="${job.period}">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <div class="descriptions-list">
                    ${job.descriptions.map((desc, descIndex) => `
                        <div class="description-item">
                            <textarea class="job-description">${desc}</textarea>
                            <button class="btn btn-danger remove-description" data-index="${descIndex}">Remove</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn add-description">Add Description</button>
            </div>
            <button class="btn btn-danger remove-work" data-index="${index}">Remove Work Experience</button>
        </div>
    `).join('');
}

// Generate education HTML
function generateEducationHTML() {
    return resumeData.education.map((edu, index) => `
        <div class="edit-item" data-index="${index}">
            <div class="form-group">
                <label>School:</label>
                <input type="text" class="edu-school" value="${edu.school}">
            </div>
            <div class="form-group">
                <label>Period:</label>
                <input type="text" class="edu-period" value="${edu.period}">
            </div>
            <div class="form-group">
                <label>Degree:</label>
                <input type="text" class="edu-degree" value="${edu.degree}">
            </div>
            <button class="btn btn-danger remove-education" data-index="${index}">Remove Education</button>
        </div>
    `).join('');
}

// Generate projects HTML
function generateProjectsHTML() {
    return resumeData.projects.map((project, index) => `
        <div class="edit-item" data-index="${index}">
            <div class="form-group">
                <label>Project Name:</label>
                <input type="text" class="project-name" value="${project.name}">
            </div>
            <div class="form-group">
                <label>Period:</label>
                <input type="text" class="project-period" value="${project.period}">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <div class="descriptions-list">
                    ${project.descriptions.map((desc, descIndex) => `
                        <div class="description-item">
                            <textarea class="project-description">${desc}</textarea>
                            <button class="btn btn-danger remove-project-description" data-index="${descIndex}">Remove</button>
                        </div>
                    `).join('')}
                </div>
                <button class="btn add-project-description">Add Description</button>
            </div>
            <button class="btn btn-danger remove-project" data-index="${index}">Remove Project</button>
        </div>
    `).join('');
}

// Generate skills HTML
function generateSkillsHTML() {
    return resumeData.skills.map((skill, index) => `
        <div class="edit-item" data-index="${index}">
            <div class="form-group">
                <label>Category:</label>
                <input type="text" class="skill-category" value="${skill.category}">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <input type="text" class="skill-description" value="${skill.description}">
            </div>
            <button class="btn btn-danger remove-skill" data-index="${index}">Remove Skill</button>
        </div>
    `).join('');
}

// Setup admin panel events
function setupAdminPanelEvents() {
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        isLoggedIn = false;
        adminPanel.style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });

    // Save personal information
    document.querySelector('.save-personal').addEventListener('click', () => {
        resumeData.personal.name = document.getElementById('name').value;
        resumeData.personal.location = document.getElementById('location').value;
        resumeData.personal.phone = document.getElementById('phone').value;
        resumeData.personal.email = document.getElementById('email').value;
        resumeData.personal.linkedin = document.getElementById('linkedin').value;
        
        alert('Personal information saved');
    });

    // Add work experience
    document.getElementById('addWorkExperience').addEventListener('click', () => {
        resumeData.workExperience.push({
            title: "New Position",
            period: "Start - End",
            descriptions: ["Description..."]
        });
        document.getElementById('workExperienceList').innerHTML = generateWorkExperienceHTML();
        setupWorkExperienceEvents();
    });

    // Add education
    document.getElementById('addEducation').addEventListener('click', () => {
        resumeData.education.push({
            school: "School Name",
            period: "Start - End",
            degree: "Degree"
        });
        document.getElementById('educationList').innerHTML = generateEducationHTML();
        setupEducationEvents();
    });

    // Add project
    document.getElementById('addProject').addEventListener('click', () => {
        resumeData.projects.push({
            name: "Project Name",
            period: "Start - End",
            descriptions: ["Description..."]
        });
        document.getElementById('projectsList').innerHTML = generateProjectsHTML();
        setupProjectsEvents();
    });

    // Add skill
    document.getElementById('addSkill').addEventListener('click', () => {
        resumeData.skills.push({
            category: "New Skill Category",
            description: "Skill Description"
        });
        document.getElementById('skillsList').innerHTML = generateSkillsHTML();
        setupSkillsEvents();
    });

    // Save all changes
    document.getElementById('saveAllChanges').addEventListener('click', () => {
        updateResumeDOM();
        isLoggedIn = false;
        adminPanel.style.display = 'none';
        document.querySelector('main').style.display = 'block';
        alert('All changes saved and updated');
    });

    // Setup events for each section
    setupWorkExperienceEvents();
    setupEducationEvents();
    setupProjectsEvents();
    setupSkillsEvents();
}

// Setup work experience events
function setupWorkExperienceEvents() {
    // Remove work experience
    document.querySelectorAll('.remove-work').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            resumeData.workExperience.splice(index, 1);
            document.getElementById('workExperienceList').innerHTML = generateWorkExperienceHTML();
            setupWorkExperienceEvents();
        });
    });

    // Add work description
    document.querySelectorAll('.add-description').forEach((button, jobIndex) => {
        button.addEventListener('click', (e) => {
            const jobItem = e.target.closest('.edit-item');
            const index = jobItem.getAttribute('data-index');
            resumeData.workExperience[index].descriptions.push("New Description...");
            document.getElementById('workExperienceList').innerHTML = generateWorkExperienceHTML();
            setupWorkExperienceEvents();
        });
    });

    // Remove work description
    document.querySelectorAll('.remove-description').forEach(button => {
        button.addEventListener('click', (e) => {
            const jobItem = e.target.closest('.edit-item');
            const jobIndex = jobItem.getAttribute('data-index');
            const descIndex = e.target.getAttribute('data-index');
            resumeData.workExperience[jobIndex].descriptions.splice(descIndex, 1);
            document.getElementById('workExperienceList').innerHTML = generateWorkExperienceHTML();
            setupWorkExperienceEvents();
        });
    });

    // Update work information
    document.querySelectorAll('.job-title').forEach((input, index) => {
        input.addEventListener('change', (e) => {
            const jobItem = e.target.closest('.edit-item');
            const jobIndex = jobItem.getAttribute('data-index');
            resumeData.workExperience[jobIndex].title = e.target.value;
        });
    });

    document.querySelectorAll('.job-period').forEach((input, index) => {
        input.addEventListener('change', (e) => {
            const jobItem = e.target.closest('.edit-item');
            const jobIndex = jobItem.getAttribute('data-index');
            resumeData.workExperience[jobIndex].period = e.target.value;
        });
    });

    document.querySelectorAll('.job-description').forEach((textarea) => {
        textarea.addEventListener('change', (e) => {
            const jobItem = e.target.closest('.edit-item');
            const jobIndex = jobItem.getAttribute('data-index');
            const descItem = e.target.closest('.description-item');
            const descIndex = descItem.querySelector('.remove-description').getAttribute('data-index');
            resumeData.workExperience[jobIndex].descriptions[descIndex] = e.target.value;
        });
    });
}

// Setup education events
function setupEducationEvents() {
    // Remove education
    document.querySelectorAll('.remove-education').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            resumeData.education.splice(index, 1);
            document.getElementById('educationList').innerHTML = generateEducationHTML();
            setupEducationEvents();
        });
    });

    // Update education information
    document.querySelectorAll('.edu-school').forEach((input) => {
        input.addEventListener('change', (e) => {
            const eduItem = e.target.closest('.edit-item');
            const eduIndex = eduItem.getAttribute('data-index');
            resumeData.education[eduIndex].school = e.target.value;
        });
    });

    document.querySelectorAll('.edu-period').forEach((input) => {
        input.addEventListener('change', (e) => {
            const eduItem = e.target.closest('.edit-item');
            const eduIndex = eduItem.getAttribute('data-index');
            resumeData.education[eduIndex].period = e.target.value;
        });
    });

    document.querySelectorAll('.edu-degree').forEach((input) => {
        input.addEventListener('change', (e) => {
            const eduItem = e.target.closest('.edit-item');
            const eduIndex = eduItem.getAttribute('data-index');
            resumeData.education[eduIndex].degree = e.target.value;
        });
    });
}

// Setup projects events
function setupProjectsEvents() {
    // Remove project
    document.querySelectorAll('.remove-project').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            resumeData.projects.splice(index, 1);
            document.getElementById('projectsList').innerHTML = generateProjectsHTML();
            setupProjectsEvents();
        });
    });

    // Add project description
    document.querySelectorAll('.add-project-description').forEach((button) => {
        button.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.edit-item');
            const index = projectItem.getAttribute('data-index');
            resumeData.projects[index].descriptions.push("New Description...");
            document.getElementById('projectsList').innerHTML = generateProjectsHTML();
            setupProjectsEvents();
        });
    });

    // Remove project description
    document.querySelectorAll('.remove-project-description').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.edit-item');
            const projectIndex = projectItem.getAttribute('data-index');
            const descIndex = e.target.getAttribute('data-index');
            resumeData.projects[projectIndex].descriptions.splice(descIndex, 1);
            document.getElementById('projectsList').innerHTML = generateProjectsHTML();
            setupProjectsEvents();
        });
    });

    // Update project information
    document.querySelectorAll('.project-name').forEach((input) => {
        input.addEventListener('change', (e) => {
            const projectItem = e.target.closest('.edit-item');
            const projectIndex = projectItem.getAttribute('data-index');
            resumeData.projects[projectIndex].name = e.target.value;
        });
    });

    document.querySelectorAll('.project-period').forEach((input) => {
        input.addEventListener('change', (e) => {
            const projectItem = e.target.closest('.edit-item');
            const projectIndex = projectItem.getAttribute('data-index');
            resumeData.projects[projectIndex].period = e.target.value;
        });
    });

    document.querySelectorAll('.project-description').forEach((textarea) => {
        textarea.addEventListener('change', (e) => {
            const projectItem = e.target.closest('.edit-item');
            const projectIndex = projectItem.getAttribute('data-index');
            const descItem = e.target.closest('.description-item');
            const descIndex = descItem.querySelector('.remove-project-description').getAttribute('data-index');
            resumeData.projects[projectIndex].descriptions[descIndex] = e.target.value;
        });
    });
}

// Setup skills events
function setupSkillsEvents() {
    // Remove skill
    document.querySelectorAll('.remove-skill').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            resumeData.skills.splice(index, 1);
            document.getElementById('skillsList').innerHTML = generateSkillsHTML();
            setupSkillsEvents();
        });
    });

    // Update skill information
    document.querySelectorAll('.skill-category').forEach((input) => {
        input.addEventListener('change', (e) => {
            const skillItem = e.target.closest('.edit-item');
            const skillIndex = skillItem.getAttribute('data-index');
            resumeData.skills[skillIndex].category = e.target.value;
        });
    });

    document.querySelectorAll('.skill-description').forEach((input) => {
        input.addEventListener('change', (e) => {
            const skillItem = e.target.closest('.edit-item');
            const skillIndex = skillItem.getAttribute('data-index');
            resumeData.skills[skillIndex].description = e.target.value;
        });
    });
}

// Update resume DOM content
function updateResumeDOM() {
    // Update personal information
    document.querySelector('.resume-header h1').textContent = resumeData.personal.name;
    
    // Update contact info in sidebar
    const contactInfo = document.querySelector('.contact-info');
    const contactItems = contactInfo.querySelectorAll('p');
    contactItems[0].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${resumeData.personal.location}`;
    contactItems[1].innerHTML = `<i class="fas fa-phone"></i> ${resumeData.personal.phone}`;
    contactItems[2].innerHTML = `<i class="fas fa-envelope"></i> ${resumeData.personal.email}`;
    contactItems[3].innerHTML = `<i class="fab fa-linkedin"></i> ${resumeData.personal.linkedin}`;
    
    // Update work experience
    const experienceSection = document.getElementById('experience');
    let experienceHTML = `<h2 class="section-title">Work Experience</h2>`;
    
    resumeData.workExperience.forEach(job => {
        experienceHTML += `
            <div class="work-item">
                <div class="work-title">${job.title}</div>
                <div class="work-period">${job.period}</div>
                <div class="work-description">
                    <ul>
                        ${job.descriptions.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    experienceSection.innerHTML = experienceHTML;
    
    // Update education
    const educationSection = document.getElementById('education');
    let educationHTML = `<h2 class="section-title">Education</h2>`;
    
    resumeData.education.forEach(edu => {
        educationHTML += `
            <div class="education-item">
                <div class="education-title">${edu.school}</div>
                <div class="education-period">${edu.period}</div>
                <p>${edu.degree}</p>
            </div>
        `;
    });
    
    educationSection.innerHTML = educationHTML;
    
    // Update projects
    const projectsSection = document.getElementById('projects');
    let projectsHTML = `<h2 class="section-title">Projects</h2>`;
    
    resumeData.projects.forEach(project => {
        projectsHTML += `
            <div class="project-item">
                <div class="project-title">${project.name}</div>
                <div class="project-period">${project.period}</div>
                <div class="project-description">
                    <ul>
                        ${project.descriptions.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    projectsSection.innerHTML = projectsHTML;
    
    // Update skills
    const skillsSection = document.getElementById('skills');
    let skillsHTML = `<h2 class="section-title">Skills</h2><ul class="skills-list">`;
    
    resumeData.skills.forEach(skill => {
        skillsHTML += `<li><strong>${skill.category}</strong> ${skill.description}</li>`;
    });
    
    skillsHTML += `</ul>`;
    skillsSection.innerHTML = skillsHTML;
}

// Save and restore data in local storage
function saveDataToLocalStorage() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        resumeData = JSON.parse(savedData);
        updateResumeDOM();
    }
}

// Restore data on page load
window.addEventListener('load', loadDataFromLocalStorage);

// Periodically save data
setInterval(saveDataToLocalStorage, 30000); // Save every 30 seconds 