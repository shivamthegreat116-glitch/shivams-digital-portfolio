/**
 * Digital Portfolio & Universal Resume Platform Logic
 * Built with Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- APPLICATION STATE ---
  let resumeData = loadSavedResumeData();
  let typewriterTimeout = null;
  let typewriterIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // --- INITIALIZE APPLICATION ---
  initTheme();
  renderResume(resumeData);
  setupEventListeners();
  setupScrollEffects();

  /* ===================================================================
     DATA STORAGE & LOADERS
     =================================================================== */
  function loadSavedResumeData() {
    try {
      const saved = localStorage.getItem('universal_resume_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved resume data, falling back to default:', e);
    }
    // Deep clone DEFAULT_RESUME_DATA
    return JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA));
  }

  function saveResumeData(newData) {
    resumeData = newData;
    localStorage.setItem('universal_resume_data', JSON.stringify(resumeData));
    renderResume(resumeData);
    showToast('Resume data saved successfully!', 'success');
  }

  function resetToDefault() {
    resumeData = JSON.parse(JSON.stringify(DEFAULT_RESUME_DATA));
    localStorage.removeItem('universal_resume_data');
    renderResume(resumeData);
    populateCustomizerForm(resumeData);
    showToast("Reset to Shivam Pandey's default resume!", 'info');
  }

  function loadSampleTemplate() {
    const sampleData = {
      personal: {
        name: "Your Full Name",
        titles: ["Software Engineer", "Web Developer", "Tech Enthusiast"],
        statusBadge: "Available for Hire",
        email: "your.email@example.com",
        phone: "+1 (555) 000-0000",
        location: "City, Country",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        avatar: "assets/avatar.svg",
        bioSnippet: "A concise summary introducing who you are, what you build, and what drives you."
      },
      about: {
        summary: "Detailed overview of your background, technical aspirations, and current engineering goals.",
        stats: [
          { label: "Years Exp", value: "2+" },
          { label: "Completed Projects", value: "8+" },
          { label: "Happy Clients/Teams", value: "100%" },
          { label: "Availability", value: "Now" }
        ],
        highlights: [
          {
            icon: "fas fa-code",
            title: "Frontend Engineering",
            description: "Building responsive, modern, and accessible user interfaces."
          },
          {
            icon: "fas fa-server",
            title: "Backend & Systems",
            description: "Designing reliable logic, clean APIs, and robust architectures."
          }
        ]
      },
      skills: [
        {
          category: "Languages & Frameworks",
          icon: "fas fa-code",
          items: ["JavaScript", "HTML5", "CSS3", "Python", "React", "Node.js"]
        },
        {
          category: "Tools & Methodologies",
          icon: "fas fa-toolbox",
          items: ["Git", "GitHub", "VS Code", "Agile", "REST APIs"]
        }
      ],
      projects: [
        {
          title: "My Showcase Web Project",
          category: "Web Development",
          badge: "Featured",
          description: "An impressive project demonstrating core technical skills, clean architecture, and responsive UI.",
          tags: ["HTML", "CSS", "JavaScript"],
          features: [
            "Responsive layout across all devices",
            "Intuitive user experience and modern animations",
            "Optimized for performance and search engines"
          ],
          github: "https://github.com",
          demo: "#"
        }
      ],
      experience: [
        {
          role: "Software Developer Intern",
          organization: "Tech Solutions Inc.",
          duration: "2024 - Present",
          location: "Remote / Hybrid",
          points: [
            "Developed modular and maintainable frontend components.",
            "Collaborated with cross-functional team members to deliver sprint goals.",
            "Improved web performance and resolved cross-browser compatibility issues."
          ]
        }
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "University of Technology",
          duration: "2021 - 2025",
          score: "Major in CS",
          description: "Covered foundational computer systems, algorithms, database design, and software engineering."
        }
      ],
      certifications: [
        {
          title: "Certified Full-Stack Developer",
          issuer: "Tech Certification Body",
          date: "2024",
          description: "Credential recognizing mastery in modern frontend and backend development."
        }
      ],
      achievements: [
        {
          title: "Hackathon Finalist",
          year: "2024",
          description: "Built a functional prototype within 24 hours under team competition."
        }
      ]
    };
    saveResumeData(sampleData);
    populateCustomizerForm(sampleData);
    showToast("Loaded clean template! Edit and make it yours.", "info");
  }

  /* ===================================================================
     RENDER FUNCTIONS
     =================================================================== */
  function renderResume(data) {
    // 1. Personal & Hero
    const p = data.personal || {};
    const initials = (p.name || 'SP')
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    // Brand and logo
    document.querySelectorAll('.brand-badge').forEach(el => el.textContent = initials);
    const navName = document.getElementById('nav-brand-name');
    if (navName) navName.textContent = p.name ? `${p.name}'s Digital Portfolio` : "Shivam's Digital Portfolio";
    
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = p.name ? `${p.name}'s Digital Portfolio` : "Shivam's Digital Portfolio";
    
    const footerCopy = document.getElementById('footer-copy-name');
    if (footerCopy) footerCopy.textContent = p.name || 'Shivam Pandey';

    // Page title
    document.title = p.name ? `${p.name}'s Digital Portfolio` : "Shivam's Digital Portfolio";

    // Hero elements
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = p.name || 'Shivam Pandey';

    const heroStatus = document.getElementById('hero-status-text');
    if (heroStatus) heroStatus.textContent = p.statusBadge || 'Available for Projects';

    const heroBio = document.getElementById('hero-bio');
    if (heroBio) heroBio.textContent = p.bioSnippet || '';

    // Hero Contacts
    const emailLink = document.getElementById('hero-email-link');
    const emailText = document.getElementById('hero-email-text');
    if (emailLink && emailText) {
      emailLink.href = `mailto:${p.email || ''}`;
      emailText.textContent = p.email || 'Email not provided';
    }

    const phoneLink = document.getElementById('hero-phone-link');
    const phoneText = document.getElementById('hero-phone-text');
    if (phoneLink && phoneText) {
      phoneLink.href = `tel:${p.phone || ''}`;
      phoneText.textContent = p.phone || 'Phone not provided';
    }

    const locText = document.getElementById('hero-location-text');
    if (locText) locText.textContent = p.location || 'Location';

    // Social Links
    const ghLink = document.getElementById('hero-github-link');
    if (ghLink) ghLink.href = p.github || 'https://github.com';

    const liLink = document.getElementById('hero-linkedin-link');
    if (liLink) liLink.href = p.linkedin || 'https://linkedin.com';

    const mailIcon = document.getElementById('hero-mail-icon');
    if (mailIcon) mailIcon.href = `mailto:${p.email || ''}`;

    // Contact Section
    const contactEmail = document.getElementById('contact-email-link');
    if (contactEmail) {
      contactEmail.href = `mailto:${p.email || ''}`;
      contactEmail.textContent = p.email || '';
    }

    const contactPhone = document.getElementById('contact-phone-link');
    if (contactPhone) {
      contactPhone.href = `tel:${p.phone || ''}`;
      contactPhone.textContent = p.phone || '';
    }

    const contactLoc = document.getElementById('contact-location-text');
    if (contactLoc) contactLoc.textContent = p.location || '';

    const contactLi = document.getElementById('contact-linkedin-link');
    if (contactLi) contactLi.href = p.linkedin || 'https://linkedin.com';

    // Typewriter
    initTypewriter(p.titles || ["Developer", "Engineer"]);

    // 2. About Section
    const a = data.about || {};
    const aboutSummary = document.getElementById('about-summary-text');
    if (aboutSummary) aboutSummary.textContent = a.summary || '';

    // Stats
    const statsContainer = document.getElementById('about-stats-container');
    if (statsContainer && a.stats) {
      statsContainer.innerHTML = a.stats.map(s => `
        <div class="stat-item">
          <span class="stat-number">${escapeHtml(s.value)}</span>
          <span class="stat-label">${escapeHtml(s.label)}</span>
        </div>
      `).join('');
    }

    // Highlights
    const highlightsContainer = document.getElementById('about-highlights-container');
    if (highlightsContainer && a.highlights) {
      highlightsContainer.innerHTML = a.highlights.map(h => `
        <div class="highlight-box">
          <div class="highlight-icon">
            <i class="${escapeHtml(h.icon || 'fas fa-star')}"></i>
          </div>
          <div class="highlight-info">
            <h4>${escapeHtml(h.title)}</h4>
            <p>${escapeHtml(h.description)}</p>
          </div>
        </div>
      `).join('');
    }

    // 3. Skills Section
    renderSkills(data.skills || []);

    // 4. Projects Section
    renderProjects(data.projects || []);

    // 5. Experience Section
    renderExperience(data.experience || []);

    // 6. Education Section
    renderEducation(data.education || []);

    // 7. Certifications & Achievements
    renderCertifications(data.certifications || []);
    renderAchievements(data.achievements || []);
  }

  function renderSkills(skillsList) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    if (!skillsList || skillsList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No skills added yet.</p>';
      return;
    }

    container.innerHTML = skillsList.map(cat => {
      const items = Array.isArray(cat.items) ? cat.items : (cat.items || '').split(',').map(s => s.trim());
      return `
        <div class="skill-category-card">
          <div class="skill-category-header">
            <i class="${escapeHtml(cat.icon || 'fas fa-code')}"></i>
            <h3>${escapeHtml(cat.category)}</h3>
          </div>
          <div class="skill-badges-flow">
            ${items.map(item => `<span class="skill-badge">${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderProjects(projectsList) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    if (!projectsList || projectsList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No projects added yet.</p>';
      return;
    }

    container.innerHTML = projectsList.map(proj => {
      const tags = Array.isArray(proj.tags) ? proj.tags : (proj.tags || '').split(',').map(t => t.trim());
      const features = Array.isArray(proj.features) ? proj.features : (proj.features || '').split('\n').filter(Boolean);

      return `
        <div class="project-card">
          <div>
            <div class="project-header-top">
              <span class="project-category-tag">${escapeHtml(proj.category || 'Project')}</span>
              ${proj.badge ? `<span class="project-badge-pill">${escapeHtml(proj.badge)}</span>` : ''}
            </div>
            <h3 class="project-title">${escapeHtml(proj.title)}</h3>
            <p class="project-description">${escapeHtml(proj.description)}</p>
            
            ${features.length > 0 ? `
              <ul class="project-features-list">
                ${features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>

          <div>
            <div class="project-tags-row">
              ${tags.map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>

            <div class="project-links">
              ${proj.github ? `
                <a href="${escapeHtml(proj.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                  <i class="fab fa-github"></i> Repository
                </a>
              ` : ''}
              ${proj.demo && proj.demo !== '#' ? `
                <a href="${escapeHtml(proj.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderExperience(expList) {
    const container = document.getElementById('experience-container');
    if (!container) return;

    if (!expList || expList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No experience entries listed yet.</p>';
      return;
    }

    container.innerHTML = expList.map(item => {
      const points = Array.isArray(item.points) ? item.points : (item.points || '').split('\n').filter(Boolean);

      return `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-role">${escapeHtml(item.role)}</h3>
                <span class="timeline-org">${escapeHtml(item.organization)}</span>
                ${item.location ? ` <span class="text-muted">• ${escapeHtml(item.location)}</span>` : ''}
              </div>
              <span class="timeline-duration">${escapeHtml(item.duration)}</span>
            </div>
            
            ${points.length > 0 ? `
              <ul class="timeline-bullets">
                ${points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderEducation(eduList) {
    const container = document.getElementById('education-container');
    if (!container) return;

    if (!eduList || eduList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No education recorded.</p>';
      return;
    }

    container.innerHTML = eduList.map(edu => `
      <div class="edu-card">
        <h4 class="edu-degree">${escapeHtml(edu.degree)}</h4>
        <div class="edu-institution">${escapeHtml(edu.institution)}</div>
        <div class="edu-meta">
          <span><i class="far fa-calendar-alt"></i> ${escapeHtml(edu.duration || '')}</span>
          ${edu.score ? `<span><i class="fas fa-chart-line"></i> ${escapeHtml(edu.score)}</span>` : ''}
        </div>
        ${edu.description ? `<p class="edu-desc">${escapeHtml(edu.description)}</p>` : ''}
      </div>
    `).join('');
  }

  function renderCertifications(certList) {
    const container = document.getElementById('certifications-container');
    if (!container) return;

    if (!certList || certList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No certifications listed.</p>';
      return;
    }

    container.innerHTML = certList.map(c => `
      <div class="cert-card">
        <div class="cert-icon"><i class="fas fa-certificate"></i></div>
        <div>
          <h4 class="cert-title">${escapeHtml(c.title)}</h4>
          <div class="cert-issuer">${escapeHtml(c.issuer || '')} ${c.date ? `• ${escapeHtml(c.date)}` : ''}</div>
          ${c.description ? `<p class="cert-desc">${escapeHtml(c.description)}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderAchievements(achList) {
    const container = document.getElementById('achievements-container');
    if (!container) return;

    if (!achList || achList.length === 0) {
      container.innerHTML = '<p class="text-secondary">No achievements listed.</p>';
      return;
    }

    container.innerHTML = achList.map(a => `
      <div class="cert-card">
        <div class="cert-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;"><i class="fas fa-trophy"></i></div>
        <div>
          <h4 class="cert-title">${escapeHtml(a.title)}</h4>
          ${a.subtitle ? `<div class="cert-issuer">${escapeHtml(a.subtitle)} ${a.year ? `• ${escapeHtml(a.year)}` : ''}</div>` : ''}
          ${a.description ? `<p class="cert-desc">${escapeHtml(a.description)}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  /* ===================================================================
     TYPEWRITER ANIMATION
     =================================================================== */
  function initTypewriter(titles) {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    const target = document.getElementById('hero-typing-target');
    if (!target || !titles || titles.length === 0) return;

    typewriterIndex = 0;
    charIndex = 0;
    isDeleting = false;

    function type() {
      const currentTitle = titles[typewriterIndex % titles.length];
      
      if (isDeleting) {
        charIndex--;
        target.textContent = currentTitle.substring(0, charIndex);
      } else {
        charIndex++;
        target.textContent = currentTitle.substring(0, charIndex);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typewriterIndex++;
        speed = 400; // Pause before typing new word
      }

      typewriterTimeout = setTimeout(type, speed);
    }

    type();
  }

  /* ===================================================================
     THEME TOGGLE
     =================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode!`, 'info');
  }

  function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
      icon.parentElement.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      icon.parentElement.title = 'Switch to Dark Mode';
    }
  }

  /* ===================================================================
     SKILLS SEARCH & FILTER
     =================================================================== */
  const skillSearchInput = document.getElementById('skills-search-input');
  const skillClearBtn = document.getElementById('skills-clear-search');

  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (skillClearBtn) {
        skillClearBtn.style.display = query ? 'block' : 'none';
      }

      const allBadges = document.querySelectorAll('.skill-badge');
      allBadges.forEach(badge => {
        const text = badge.textContent.toLowerCase();
        if (query && text.includes(query)) {
          badge.classList.add('highlighted');
        } else {
          badge.classList.remove('highlighted');
        }
      });
    });
  }

  if (skillClearBtn) {
    skillClearBtn.addEventListener('click', () => {
      if (skillSearchInput) {
        skillSearchInput.value = '';
        skillSearchInput.dispatchEvent(new Event('input'));
        skillSearchInput.focus();
      }
    });
  }

  /* ===================================================================
     RESUME CUSTOMIZER (LIVE DRAWER/MODAL)
     =================================================================== */
  const customizerModal = document.getElementById('customizer-modal');
  const btnOpenCustomizer = document.getElementById('btn-open-customizer');
  const heroBtnCustomize = document.getElementById('hero-btn-customize');
  const bannerCustomizeBtn = document.getElementById('banner-customize-btn');
  const customizerClose = document.getElementById('customizer-close');
  const customizerCancel = document.getElementById('customizer-btn-cancel');
  const customizerApply = document.getElementById('customizer-btn-apply');

  function openCustomizer() {
    populateCustomizerForm(resumeData);
    if (customizerModal) customizerModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCustomizer() {
    if (customizerModal) customizerModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (btnOpenCustomizer) btnOpenCustomizer.addEventListener('click', openCustomizer);
  if (heroBtnCustomize) heroBtnCustomize.addEventListener('click', openCustomizer);
  if (bannerCustomizeBtn) bannerCustomizeBtn.addEventListener('click', openCustomizer);
  if (customizerClose) customizerClose.addEventListener('click', closeCustomizer);
  if (customizerCancel) customizerCancel.addEventListener('click', closeCustomizer);

  // Close customizer on backdrop click
  if (customizerModal) {
    customizerModal.addEventListener('click', (e) => {
      if (e.target === customizerModal) closeCustomizer();
    });
  }

  // Customizer Tabs
  const customizerTabs = document.querySelectorAll('.customizer-tab');
  customizerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      customizerTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.customizer-tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Populate Customizer Form Inputs
  function populateCustomizerForm(data) {
    const p = data.personal || {};
    setVal('edit-name', p.name || '');
    setVal('edit-status', p.statusBadge || '');
    setVal('edit-email', p.email || '');
    setVal('edit-phone', p.phone || '');
    setVal('edit-location', p.location || '');
    setVal('edit-linkedin', p.linkedin || '');
    setVal('edit-github', p.github || '');
    setVal('edit-titles', (p.titles || []).join(', '));
    setVal('edit-bio', p.bioSnippet || '');

    const a = data.about || {};
    setVal('edit-summary', a.summary || '');

    populateSkillsEditor(data.skills || []);
    populateProjectsEditor(data.projects || []);
    populateExperienceEditor(data.experience || []);
    populateEducationEditor(data.education || []);
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // Skills Editor
  function populateSkillsEditor(skills) {
    const container = document.getElementById('edit-skills-list-container');
    if (!container) return;
    container.innerHTML = '';

    skills.forEach((cat, index) => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      const itemsStr = Array.isArray(cat.items) ? cat.items.join(', ') : cat.items;
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove category" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Category Title</label>
          <input type="text" class="skill-cat-title" value="${escapeHtml(cat.category)}">
        </div>
        <div class="form-group">
          <label>Skills (comma separated)</label>
          <input type="text" class="skill-cat-items" value="${escapeHtml(itemsStr)}">
        </div>
      `;
      container.appendChild(card);
    });
  }

  const btnAddSkillCat = document.getElementById('btn-add-skill-category');
  if (btnAddSkillCat) {
    btnAddSkillCat.addEventListener('click', () => {
      const container = document.getElementById('edit-skills-list-container');
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove category" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Category Title</label>
          <input type="text" class="skill-cat-title" placeholder="e.g., Cloud & DevOps">
        </div>
        <div class="form-group">
          <label>Skills (comma separated)</label>
          <input type="text" class="skill-cat-items" placeholder="AWS, Docker, Kubernetes">
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Projects Editor
  function populateProjectsEditor(projects) {
    const container = document.getElementById('edit-projects-list-container');
    if (!container) return;
    container.innerHTML = '';

    projects.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      const tagsStr = Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags;
      const featStr = Array.isArray(proj.features) ? proj.features.join('\n') : proj.features;

      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove project" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="proj-title" value="${escapeHtml(proj.title)}">
          </div>
          <div class="form-group">
            <label>Category / Domain</label>
            <input type="text" class="proj-category" value="${escapeHtml(proj.category || '')}">
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Description</label>
          <textarea rows="2" class="proj-desc">${escapeHtml(proj.description || '')}</textarea>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Key Features (one per line)</label>
          <textarea rows="2" class="proj-features">${escapeHtml(featStr || '')}</textarea>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Tags (comma separated)</label>
          <input type="text" class="proj-tags" value="${escapeHtml(tagsStr || '')}">
        </div>
        <div class="input-grid">
          <div class="form-group">
            <label>GitHub Link</label>
            <input type="url" class="proj-github" value="${escapeHtml(proj.github || '')}">
          </div>
          <div class="form-group">
            <label>Demo Link</label>
            <input type="url" class="proj-demo" value="${escapeHtml(proj.demo || '')}">
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const btnAddProj = document.getElementById('btn-add-project');
  if (btnAddProj) {
    btnAddProj.addEventListener('click', () => {
      const container = document.getElementById('edit-projects-list-container');
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove project" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="proj-title" placeholder="e.g. AI Vision Assistant">
          </div>
          <div class="form-group">
            <label>Category / Domain</label>
            <input type="text" class="proj-category" placeholder="Artificial Intelligence">
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Description</label>
          <textarea rows="2" class="proj-desc" placeholder="What does this project do?"></textarea>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Key Features (one per line)</label>
          <textarea rows="2" class="proj-features" placeholder="Feature 1\nFeature 2"></textarea>
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Tags (comma separated)</label>
          <input type="text" class="proj-tags" placeholder="Python, OpenCV, Web">
        </div>
        <div class="input-grid">
          <div class="form-group">
            <label>GitHub Link</label>
            <input type="url" class="proj-github" placeholder="https://github.com/...">
          </div>
          <div class="form-group">
            <label>Demo Link</label>
            <input type="url" class="proj-demo" placeholder="#">
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Experience Editor
  function populateExperienceEditor(experience) {
    const container = document.getElementById('edit-experience-list-container');
    if (!container) return;
    container.innerHTML = '';

    experience.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      const pts = Array.isArray(exp.points) ? exp.points.join('\n') : exp.points;

      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove experience" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Role / Position</label>
            <input type="text" class="exp-role" value="${escapeHtml(exp.role)}">
          </div>
          <div class="form-group">
            <label>Organization / Company</label>
            <input type="text" class="exp-org" value="${escapeHtml(exp.organization)}">
          </div>
        </div>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-duration" value="${escapeHtml(exp.duration)}">
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" class="exp-location" value="${escapeHtml(exp.location || '')}">
          </div>
        </div>
        <div class="form-group">
          <label>Key Responsibilities / Bullet Points (one per line)</label>
          <textarea rows="3" class="exp-points">${escapeHtml(pts || '')}</textarea>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const btnAddExp = document.getElementById('btn-add-experience');
  if (btnAddExp) {
    btnAddExp.addEventListener('click', () => {
      const container = document.getElementById('edit-experience-list-container');
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove experience" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Role / Position</label>
            <input type="text" class="exp-role" placeholder="e.g. Frontend Developer Intern">
          </div>
          <div class="form-group">
            <label>Organization / Company</label>
            <input type="text" class="exp-org" placeholder="e.g. Startup Co.">
          </div>
        </div>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-duration" placeholder="2024 - Present">
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" class="exp-location" placeholder="City / Remote">
          </div>
        </div>
        <div class="form-group">
          <label>Bullet Points (one per line)</label>
          <textarea rows="3" class="exp-points" placeholder="Built features...\nOptimized code..."></textarea>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Education Editor
  function populateEducationEditor(education) {
    const container = document.getElementById('edit-education-list-container');
    if (!container) return;
    container.innerHTML = '';

    education.forEach(edu => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove education" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Degree / Qualification</label>
          <input type="text" class="edu-degree" value="${escapeHtml(edu.degree)}">
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Institution / College / School</label>
          <input type="text" class="edu-inst" value="${escapeHtml(edu.institution)}">
        </div>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Duration</label>
            <input type="text" class="edu-dur" value="${escapeHtml(edu.duration || '')}">
          </div>
          <div class="form-group">
            <label>Score / Grade</label>
            <input type="text" class="edu-score" value="${escapeHtml(edu.score || '')}">
          </div>
        </div>
        <div class="form-group">
          <label>Details / Major Coursework</label>
          <textarea rows="2" class="edu-desc">${escapeHtml(edu.description || '')}</textarea>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const btnAddEdu = document.getElementById('btn-add-education');
  if (btnAddEdu) {
    btnAddEdu.addEventListener('click', () => {
      const container = document.getElementById('edit-education-list-container');
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <button type="button" class="item-delete-btn" title="Remove education" onclick="this.closest('.customizer-item-card').remove()">&times;</button>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Degree / Qualification</label>
          <input type="text" class="edu-degree" placeholder="B.Tech in Computer Science">
        </div>
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label>Institution</label>
          <input type="text" class="edu-inst" placeholder="University / Institute Name">
        </div>
        <div class="input-grid" style="margin-bottom: 0.75rem;">
          <div class="form-group">
            <label>Duration</label>
            <input type="text" class="edu-dur" placeholder="2023 - 2027">
          </div>
          <div class="form-group">
            <label>Score / Grade</label>
            <input type="text" class="edu-score" placeholder="CGPA / Grade">
          </div>
        </div>
        <div class="form-group">
          <label>Details</label>
          <textarea rows="2" class="edu-desc" placeholder="Specialization details..."></textarea>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // APPLY & SAVE RESUME CUSTOMIZATION
  if (customizerApply) {
    customizerApply.addEventListener('click', () => {
      // Gather Personal
      const updatedTitles = getVal('edit-titles')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const updatedPersonal = {
        name: getVal('edit-name') || resumeData.personal.name,
        titles: updatedTitles.length > 0 ? updatedTitles : resumeData.personal.titles,
        statusBadge: getVal('edit-status') || resumeData.personal.statusBadge,
        email: getVal('edit-email'),
        phone: getVal('edit-phone'),
        location: getVal('edit-location'),
        linkedin: getVal('edit-linkedin'),
        github: getVal('edit-github'),
        avatar: resumeData.personal.avatar,
        bioSnippet: getVal('edit-bio')
      };

      // Gather About
      const updatedAbout = {
        ...resumeData.about,
        summary: getVal('edit-summary')
      };

      // Gather Skills
      const skillCards = document.querySelectorAll('#edit-skills-list-container .customizer-item-card');
      const updatedSkills = [];
      skillCards.forEach(c => {
        const title = c.querySelector('.skill-cat-title')?.value.trim();
        const items = c.querySelector('.skill-cat-items')?.value.split(',').map(s => s.trim()).filter(Boolean);
        if (title && items) {
          updatedSkills.push({
            category: title,
            icon: 'fas fa-check-circle',
            items: items
          });
        }
      });

      // Gather Projects
      const projCards = document.querySelectorAll('#edit-projects-list-container .customizer-item-card');
      const updatedProjects = [];
      projCards.forEach(c => {
        const title = c.querySelector('.proj-title')?.value.trim();
        if (title) {
          updatedProjects.push({
            title: title,
            category: c.querySelector('.proj-category')?.value.trim() || 'Project',
            badge: 'Custom Project',
            description: c.querySelector('.proj-desc')?.value.trim() || '',
            features: (c.querySelector('.proj-features')?.value || '').split('\n').map(s => s.trim()).filter(Boolean),
            tags: (c.querySelector('.proj-tags')?.value || '').split(',').map(s => s.trim()).filter(Boolean),
            github: c.querySelector('.proj-github')?.value.trim() || '',
            demo: c.querySelector('.proj-demo')?.value.trim() || '#'
          });
        }
      });

      // Gather Experience
      const expCards = document.querySelectorAll('#edit-experience-list-container .customizer-item-card');
      const updatedExperience = [];
      expCards.forEach(c => {
        const role = c.querySelector('.exp-role')?.value.trim();
        if (role) {
          updatedExperience.push({
            role: role,
            organization: c.querySelector('.exp-org')?.value.trim() || '',
            duration: c.querySelector('.exp-duration')?.value.trim() || '',
            location: c.querySelector('.exp-location')?.value.trim() || '',
            points: (c.querySelector('.exp-points')?.value || '').split('\n').map(s => s.trim()).filter(Boolean)
          });
        }
      });

      // Gather Education
      const eduCards = document.querySelectorAll('#edit-education-list-container .customizer-item-card');
      const updatedEducation = [];
      eduCards.forEach(c => {
        const degree = c.querySelector('.edu-degree')?.value.trim();
        if (degree) {
          updatedEducation.push({
            degree: degree,
            institution: c.querySelector('.edu-inst')?.value.trim() || '',
            duration: c.querySelector('.edu-dur')?.value.trim() || '',
            score: c.querySelector('.edu-score')?.value.trim() || '',
            description: c.querySelector('.edu-desc')?.value.trim() || ''
          });
        }
      });

      // Commit changes
      const newResumeData = {
        ...resumeData,
        personal: updatedPersonal,
        about: updatedAbout,
        skills: updatedSkills.length > 0 ? updatedSkills : resumeData.skills,
        projects: updatedProjects.length > 0 ? updatedProjects : resumeData.projects,
        experience: updatedExperience.length > 0 ? updatedExperience : resumeData.experience,
        education: updatedEducation.length > 0 ? updatedEducation : resumeData.education
      };

      saveResumeData(newResumeData);
      closeCustomizer();
    });
  }

  // Quick Action: Load Default
  const btnLoadDefault = document.getElementById('customizer-load-default');
  if (btnLoadDefault) btnLoadDefault.addEventListener('click', resetToDefault);

  // Quick Action: Load Sample
  const btnLoadSample = document.getElementById('customizer-load-sample');
  if (btnLoadSample) btnLoadSample.addEventListener('click', loadSampleTemplate);

  // Quick Action: Export JSON
  const btnExportJson = document.getElementById('customizer-export-json');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${(resumeData.personal.name || 'resume').toLowerCase().replace(/\s+/g, '_')}_data.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Exported resume JSON!', 'success');
    });
  }

  // Quick Action: Import JSON
  const importInput = document.getElementById('customizer-import-json');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && (parsed.personal || parsed.skills)) {
            saveResumeData(parsed);
            populateCustomizerForm(parsed);
            showToast('Custom resume loaded from JSON!', 'success');
          } else {
            showToast('Invalid resume format in file.', 'error');
          }
        } catch (err) {
          showToast('Could not parse JSON file.', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  /* ===================================================================
     PRINT / PDF EXPORT
     =================================================================== */
  function printResume() {
    window.print();
  }

  const btnPrintNav = document.getElementById('btn-print-resume');
  const btnPrintHero = document.getElementById('hero-btn-print');
  if (btnPrintNav) btnPrintNav.addEventListener('click', printResume);
  if (btnPrintHero) btnPrintHero.addEventListener('click', printResume);

  /* ===================================================================
     INTERACTIVE CONTACT FORM
     =================================================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const senderName = document.getElementById('contact-name')?.value.trim();
      const senderEmail = document.getElementById('contact-sender-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();
      const feedback = document.getElementById('form-feedback');

      const recipient = resumeData.personal.email || 'shivamthegreat116@email.com';
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject + ' - from ' + senderName)}&body=${encodeURIComponent(
        `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
      )}`;

      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = '<i class="fas fa-check-circle"></i> Opening your email client to send message...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  /* ===================================================================
     SHARE BUTTON
     =================================================================== */
  const btnShare = document.getElementById('btn-share-resume');
  if (btnShare) {
    btnShare.addEventListener('click', async () => {
      const shareData = {
        title: `${resumeData.personal.name} — Digital Resume`,
        text: `Check out ${resumeData.personal.name}'s digital resume and portfolio!`,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share dismissed');
        }
      } else {
        copyToClipboard(window.location.href);
      }
    });
  }

  /* ===================================================================
     BANNER CLOSE
     =================================================================== */
  const bannerCloseBtn = document.getElementById('banner-close-btn');
  const universalBanner = document.getElementById('universal-banner');
  if (bannerCloseBtn && universalBanner) {
    bannerCloseBtn.addEventListener('click', () => {
      universalBanner.style.display = 'none';
    });
  }

  /* ===================================================================
     MOBILE NAVIGATION TOGGLE
     =================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  /* ===================================================================
     SCROLL EFFECTS & SCROLL TO TOP
     =================================================================== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      // Scroll to Top visibility
      if (scrollTopBtn) {
        if (scrollY > 350) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }

      // Active Section Highlighter
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ===================================================================
     EVENT LISTENERS & UTILITIES
     =================================================================== */
  function setupEventListeners() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.copyToClipboard = function(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
      if (btnElement) {
        const icon = btnElement.querySelector('i');
        if (icon) {
          const oldClass = icon.className;
          icon.className = 'fas fa-check';
          setTimeout(() => { icon.className = oldClass; }, 1800);
        }
      }
    }).catch(() => {
      showToast('Could not copy to clipboard', 'error');
    });
  };

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';

    toast.innerHTML = `<i class="${iconClass}"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
});
