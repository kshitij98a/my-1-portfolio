/**
 * Interactive Script for Kshitij Agarwal's Portfolio (1st Year B.Tech Beginner)
 * Features:
 * - Dark/Light Theme Switching with localStorage
 * - Dynamic Hero Typing Effect
 * - 10 Starter Projects Pagination & Filtering
 * - Modal Details for Beginner Projects & Lab Tasks
 * - Milestones & Goals Filter
 * - Friendly In-Browser AI Assistant Chatbot
 * - Contact Form Handler with Validation
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'dark');

  htmlElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Dynamic Typing Text in Hero
  // -------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    'a 1st Year B.Tech CSE Student',
    'learning C programming',
    'building my first websites',
    'exploring computer science',
    'a college fresher & curious learner'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 45;
  const newPhraseDelay = 1800;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, newPhraseDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 350);
    } else {
      setTimeout(typeEffect, isDeleting ? erasingDelay : typingDelay);
    }
  }

  setTimeout(typeEffect, 500);

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawerMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawerMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawerMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeDrawerMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawerMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawerMenu);
  });

  // -------------------------------------------------------------------------
  // 4. Scroll Active Link Highlighting & Back to Top
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
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

    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', updateActiveNavLink);

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 5. 10 Starter Projects Pagination & Category Filtering
  // -------------------------------------------------------------------------
  const projectCards = document.querySelectorAll('.project-card');
  const pageNavButtons = document.querySelectorAll('.page-nav-btn');
  const categoryFilterButtons = document.querySelectorAll('.filter-btn');
  const pageIndicator = document.getElementById('page-indicator');

  let currentPage = '1';
  let currentCategory = 'all';

  function applyProjectFilters() {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category').split(' ');
      const isPage1 = card.classList.contains('page-1');
      const isPage2 = card.classList.contains('page-2');

      const categoryMatch = (currentCategory === 'all' || cardCategory.includes(currentCategory));

      let pageMatch = false;
      if (currentPage === 'all') {
        pageMatch = true;
      } else if (currentPage === '1' && isPage1) {
        pageMatch = true;
      } else if (currentPage === '2' && isPage2) {
        pageMatch = true;
      }

      if (categoryMatch && pageMatch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    if (pageIndicator) {
      if (currentPage === '1') {
        pageIndicator.textContent = `Showing Page 1 of 2 (Starter Projects 1 to 5)`;
      } else if (currentPage === '2') {
        pageIndicator.textContent = `Showing Page 2 of 2 (Starter Projects 6 to 10)`;
      } else {
        pageIndicator.textContent = `Showing All 10 Starter Projects`;
      }
    }
  }

  pageNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pageNavButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPage = btn.getAttribute('data-page');
      applyProjectFilters();
    });
  });

  categoryFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      applyProjectFilters();
    });
  });

  applyProjectFilters();

  // -------------------------------------------------------------------------
  // 6. Beginner Project Details Modal Database
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const detailButtons = document.querySelectorAll('.project-detail-btn');

  const beginnerProjectsDetails = {
    '1': {
      title: '1. Personal Developer Portfolio Website',
      category: 'Web Development (HTML5, CSS3, JavaScript)',
      whyBuilt: 'I built this website right after entering college to have a permanent place on the web where I can document my four-year engineering journey, publish my starter code, and share my profile with professors.',
      whatLearned: [
        'How semantic HTML tags (header, nav, section, footer) organize web content cleanly',
        'How CSS variables and media queries make a website look great on both phones and laptops',
        'How to write a simple dark/light mode toggle with JavaScript'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
    },
    '2': {
      title: '2. Simple Menu-Driven Calculator in C',
      category: 'C Programming Console Exercise',
      whyBuilt: 'One of the first programming exercises in our first-year computer lab. It takes two numbers from the user and allows them to choose an operation (+, -, *, /).',
      whatLearned: [
        'Taking user input with scanf() and formatting outputs with printf()',
        'Using switch-case statements for menu navigation instead of messy if-else chains',
        'Preventing division by zero with simple condition checks'
      ],
      tech: ['C Language', 'Switch-Case', 'Arithmetic Operators', 'Functions']
    },
    '3': {
      title: '3. Number Guessing Game in C',
      category: 'Console Game & Loop Practice',
      whyBuilt: 'I wanted to make a fun interactive mini-game to understand how loops work in real situations.',
      whatLearned: [
        'Using rand() and srand(time(0)) to generate a random number between 1 and 100',
        'Using a while loop to keep prompting the user until they guess correctly',
        'Giving friendly "Too High!" or "Too Low!" feedback on every attempt'
      ],
      tech: ['C Language', 'While Loops', 'Random Numbers', 'Conditional Logic']
    },
    '4': {
      title: '4. Student Marks & Grade Calculator',
      category: 'Academic C Lab Exercise',
      whyBuilt: 'A classic 1st-year practical assignment program to calculate student grades based on marks obtained in 5 subjects.',
      whatLearned: [
        'Storing multiple subject marks using a simple 1D array in C',
        'Calculating total marks and percentage using float arithmetic',
        'Assigning grades (A+, A, B, C, F) using structured else-if ladders'
      ],
      tech: ['C Language', 'Arrays', 'Else-If Ladder', 'Math Calculations']
    },
    '5': {
      title: '5. Digital Student Bio Card',
      category: 'CSS Styling & Design Practice',
      whyBuilt: 'Built while learning CSS to practice card layouts, rounded borders, shadows, and flexbox centering.',
      whatLearned: [
        'How CSS flexbox aligns avatar images and social buttons perfectly in the center',
        'Creating smooth button hover animations using CSS transitions',
        'Using border-radius and box-shadow for a clean, modern card feel'
      ],
      tech: ['HTML5', 'CSS3', 'Flexbox', 'UI Styling']
    },
    '6': {
      title: '6. Temperature Unit Converter in C',
      category: 'C Formula Program',
      whyBuilt: 'Created to practice mathematical formulas and understand data type conversion between integers and floating-point decimals.',
      whatLearned: [
        'Formula implementation: (C * 9/5) + 32 for Fahrenheit and C + 273.15 for Kelvin',
        'Why dividing two integers (9/5) can cause truncation in C unless written as (9.0/5.0)',
        'Formatting float decimals using printf("%.2f")'
      ],
      tech: ['C Language', 'Mathematical Formulas', 'Float Precision', 'Data Types']
    },
    '7': {
      title: '7. Prime Number & Even/Odd Checker',
      category: 'Algorithmic Thinking Practice',
      whyBuilt: 'Practiced to strengthen mathematical logic and understand how to check divisibility in programming.',
      whatLearned: [
        'Using the modulus operator (%) to check remainders',
        'Optimizing a loop up to sqrt(n) or n/2 to test for factors of prime numbers',
        'Using a boolean flag variable to track whether a factor was found'
      ],
      tech: ['C Language', 'For Loops', 'Modulus Operator', 'Logic Building']
    },
    '8': {
      title: '8. Daily Study Task Checklist',
      category: 'Beginner Web App (HTML/CSS/JS)',
      whyBuilt: 'I made this small webpage to keep track of my daily college homework and topics to study.',
      whatLearned: [
        'Using document.getElementById() and addEventListener() in JavaScript',
        'Dynamically creating <li> elements and appending them to a list',
        'Toggling a strikethrough line when a task is completed'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript DOM', 'Event Listeners']
    },
    '9': {
      title: '9. Computer Fundamentals Quiz Page',
      category: 'Interactive Web Page',
      whyBuilt: 'A 5-question multiple choice quiz testing fundamental computer concepts like CPU, RAM, and Operating Systems.',
      whatLearned: [
        'Creating interactive radio buttons with HTML <input type="radio"> groups',
        'Writing a JavaScript function to compare selected choices with correct answers',
        'Displaying the final score on the screen with a single click'
      ],
      tech: ['HTML Forms', 'Radio Inputs', 'JavaScript', 'Score Computation']
    },
    '10': {
      title: '10. Portfolio AI Assistant Bot',
      category: 'Interactive Portfolio Widget',
      whyBuilt: 'Added to this website as an interactive feature to help visitors and teachers quickly learn about my beginner journey.',
      whatLearned: [
        'Creating a floating pop-up chat window using CSS fixed positioning',
        'Matching user queries (like "projects", "hobbies", "skills") to provide helpful answers',
        'Making a website feel interactive and fun to explore'
      ],
      tech: ['JavaScript', 'DOM Manipulation', 'Keyword Search', 'CSS Transitions']
    }
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = beginnerProjectsDetails[projId];

      if (data && modalContent && projectModal) {
        modalContent.innerHTML = `
          <span class="project-category">${data.category}</span>
          <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 0.85rem; color: var(--text-primary);">${data.title}</h2>
          <p style="color: var(--text-secondary); margin-bottom: 1.15rem; font-size: 0.95rem; line-height: 1.55;">
            <strong>Why I Created This:</strong> ${data.whyBuilt}
          </p>
          <div style="margin-bottom: 1.25rem;">
            <strong style="color: var(--text-primary); font-size: 0.95rem; display: block; margin-bottom: 0.5rem;">What I Learned From It:</strong>
            <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
              ${data.whatLearned.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <strong style="color: var(--text-primary); font-size: 0.9rem; display: block; margin-bottom: 0.5rem;">Concepts / Tools:</strong>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              ${data.tech.map(t => `<span class="tag" style="background: var(--bg-tertiary); padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.775rem;">${t}</span>`).join('')}
            </div>
          </div>
        `;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // -------------------------------------------------------------------------
  // 7. Milestones & Goals Filter
  // -------------------------------------------------------------------------
  const achieveFilterBtns = document.querySelectorAll('.achieve-filter-btn');
  const achieveCards = document.querySelectorAll('.achieve-card');

  achieveFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      achieveFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterType = btn.getAttribute('data-type');

      achieveCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (filterType === 'all' || cardType === filterType) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 8. Beginner-Friendly AI Assistant Chatbot
  // -------------------------------------------------------------------------
  const chatbotWrapper = document.querySelector('.chatbot-wrapper');
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeChatbotBtn = document.getElementById('close-chatbot-btn');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const openBotTriggers = document.querySelectorAll('.open-bot-trigger');

  function openChatbot() {
    if (chatbotWrapper) {
      chatbotWrapper.classList.add('open');
      if (chatbotInput) chatbotInput.focus();
    }
  }

  if (chatbotToggleBtn && chatbotWrapper) {
    chatbotToggleBtn.addEventListener('click', () => {
      chatbotWrapper.classList.toggle('open');
      if (chatbotWrapper.classList.contains('open') && chatbotInput) {
        chatbotInput.focus();
      }
    });
  }

  if (closeChatbotBtn && chatbotWrapper) {
    closeChatbotBtn.addEventListener('click', () => {
      chatbotWrapper.classList.remove('open');
    });
  }

  openBotTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openChatbot();
    });
  });

  function appendChatMessage(text, sender = 'bot', quickChips = []) {
    if (!chatbotMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `<p>${text}</p>`;

    if (quickChips.length > 0) {
      const chipContainer = document.createElement('div');
      chipContainer.className = 'chat-quick-actions';
      quickChips.forEach(chip => {
        const chipBtn = document.createElement('button');
        chipBtn.className = 'quick-chip';
        chipBtn.textContent = chip.label;
        chipBtn.setAttribute('data-query', chip.query);
        chipBtn.addEventListener('click', () => {
          handleChatQuery(chip.query);
        });
        chipContainer.appendChild(chipBtn);
      });
      msgDiv.appendChild(chipContainer);
    }

    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleChatQuery(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    appendChatMessage(query, 'user');

    setTimeout(() => {
      if (cleanQuery.includes('project') || cleanQuery === 'projects') {
        appendChatMessage(
          `📁 <strong>Kshitij's 10 Starter Projects & Lab Exercises:</strong><br><br>
          1. <strong>Personal Developer Portfolio:</strong> This website built with HTML, CSS, JS.<br>
          2. <strong>Simple Calculator in C:</strong> Menu-driven console arithmetic tool.<br>
          3. <strong>Number Guessing Game:</strong> Fun game with loops and random numbers in C.<br>
          4. <strong>Student Marksheet Calculator:</strong> Computes marks, percentages & grades.<br>
          5. <strong>Digital Student Bio Card:</strong> CSS card styling practice.<br>
          6. <strong>Temperature Converter:</strong> Celsius to Fahrenheit & Kelvin in C.<br>
          7. <strong>Prime Number Checker:</strong> Practicing logic & for-loops.<br>
          8. <strong>Daily Study Task Checklist:</strong> Beginner DOM todo list.<br>
          9. <strong>Computer Basics Quiz:</strong> Multiple choice hardware/OS quiz.<br>
          10. <strong>Portfolio AI Bot:</strong> This helper widget!<br><br>
          Click "How I Built It" on any card to see what he learned!`,
          'bot',
          [{ label: 'What is he learning?', query: 'skills' }, { label: 'Milestones & Goals', query: 'milestones' }]
        );
      } else if (cleanQuery.includes('skill') || cleanQuery.includes('learn')) {
        appendChatMessage(
          `🌱 <strong>What Kshitij is Currently Learning:</strong><br><br>
          • <strong>Programming:</strong> C Language (variables, if-else, loops, functions).<br>
          • <strong>Web Basics:</strong> HTML5 tags and CSS3 styling (colors, layout, flexbox).<br>
          • <strong>Tools:</strong> VS Code editor, basic Git commands, GitHub, and terminal.<br>
          • <strong>Focus:</strong> Building strong problem-solving logic from day one!`,
          'bot',
          [{ label: '10 Starter Projects', query: 'projects' }, { label: 'Hobbies', query: 'hobbies' }]
        );
      } else if (cleanQuery.includes('milestone') || cleanQuery.includes('goal') || cleanQuery.includes('achieve')) {
        appendChatMessage(
          `🎯 <strong>Milestones & 1st-Year Goals:</strong><br><br>
          • <strong>Completed Steps:</strong> Enrolled in B.Tech CSE, created his first complete website, and wrote his first C programs.<br>
          • <strong>Upcoming Goals:</strong> Master basic Data Structures in Semester 2, join a college coding club, and enter his first 24-hour hackathon!`,
          'bot',
          [{ label: 'Hobbies', query: 'hobbies' }, { label: 'Contact Details', query: 'contact' }]
        );
      } else if (cleanQuery.includes('hobby') || cleanQuery.includes('hobbies')) {
        appendChatMessage(
          `🎮 <strong>Kshitij's Hobbies & Interests:</strong><br><br>
          • Casual PC & mobile gaming with college batchmates.<br>
          • Watching tech videos and teardowns on YouTube.<br>
          • Playing cricket and badminton on campus.<br>
          • Listening to focus music while studying.<br>
          • Casual chess matches to practice thinking ahead.`,
          'bot',
          [{ label: '10 Starter Projects', query: 'projects' }, { label: 'Contact Kshitij', query: 'contact' }]
        );
      } else if (cleanQuery.includes('contact') || cleanQuery.includes('email')) {
        appendChatMessage(
          `📬 <strong>Get in Touch with Kshitij:</strong><br><br>
          • <strong>Email:</strong> <a href="mailto:kshitij.agarwal.student@example.com" style="color: var(--accent-cyan);">kshitij.agarwal.student@example.com</a><br>
          • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/kshitij-agarwal" target="_blank" style="color: var(--accent-cyan);">linkedin.com/in/kshitij-agarwal</a><br>
          • <strong>GitHub:</strong> <a href="https://github.com/kshitij-agarwal" target="_blank" style="color: var(--accent-cyan);">github.com/kshitij-agarwal</a><br>
          • Or send advice through the form on the Contact section!`,
          'bot',
          [{ label: '10 Starter Projects', query: 'projects' }]
        );
      } else {
        appendChatMessage(
          `Hello! I can tell you about Kshitij's <strong>10 Starter Projects</strong>, <strong>What he is learning</strong>, <strong>Milestones & Goals</strong>, <strong>Hobbies</strong>, or <strong>Contact Information</strong>. What would you like to explore?`,
          'bot',
          [
            { label: '10 Starter Projects', query: 'projects' },
            { label: 'What is he learning?', query: 'skills' },
            { label: 'Milestones & Goals', query: 'milestones' },
            { label: 'Hobbies', query: 'hobbies' }
          ]
        );
      }
    }, 250);
  }

  if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatbotInput.value.trim();
      if (!query) return;
      chatbotInput.value = '';
      handleChatQuery(query);
    });
  }

  const initialChips = document.querySelectorAll('.chat-quick-actions .quick-chip');
  initialChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      handleChatQuery(q);
    });
  });

  // -------------------------------------------------------------------------
  // 9. Contact Form Handler with Validation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name').value.trim();
      const emailInput = document.getElementById('email').value.trim();
      const subjectInput = document.getElementById('subject').value.trim();
      const messageInput = document.getElementById('message').value.trim();

      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        showFeedback('Please fill out all fields.', 'error');
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showFeedback(
          `🎉 Thank you, ${nameInput}! Your message has been prepared for Kshitij Agarwal.`,
          'success'
        );
      }, 700);
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 6000);
  }
});
