'use strict';

// Landing page functions
function createHeartExplosion(e) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.color = '#ff6b6b';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = `heartExplode 1s ease-out forwards`;
        heart.style.animationDelay = i * 0.1 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

function secretAdminLogin() {
    const heart = document.querySelector('.secret-login');
    if (heart) {
        heart.style.animation = 'heartPulse 0.6s ease';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300);
    }
}

function secretLogin() {
    const hearts = document.querySelector('.logo-hearts');
    hearts.style.animation = 'heartPulse 0.6s ease';
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 300);
}

// Blog posts data
const posts = {
    post1: {
        title: "My Creative Journey",
        date: "June 15, 2023",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
        content: [
            "When I first began exploring the world of design, I didn't realize how much creativity would influence my outlook on life. From sketching simple ideas to bringing full projects to life, I learned that creativity is about problem-solving, storytelling, and connecting with people. It started with a simple drawing pad and colored pencils that my mom bought me when I was seven. I would spend hours creating imaginary worlds, characters, and stories through my drawings.",
            "Over time, I've discovered that every creative challenge shapes how I see and express the world around me. Each project taught me something new about myself and my capabilities. I started with simple drawings and gradually moved to digital design. Learning Photoshop was like discovering a new language - one that spoke directly to my soul. I remember staying up late into the night, experimenting with different brushes, filters, and techniques.",
            "The journey wasn't always smooth. There were moments of doubt, creative blocks, and times when I questioned my abilities. But each obstacle became a stepping stone, teaching me resilience and pushing me to explore new techniques. I remember one particular project where I spent weeks trying to perfect a logo design, only to realize that my first sketch was actually the best version.",
            "Today, I continue to grow and evolve as a creative person. This journey has taught me that creativity isn't just about the final product—it's about the process, the learning, and the joy of bringing ideas to life. Every day brings new challenges and opportunities to push my boundaries. I've learned to embrace failure as part of the creative process, to seek feedback from others, and to never stop learning."
        ],
        excerpt: "When I first began exploring the world of design, I didn't realize how much creativity would influence..."
    },
    post2: {
        title: "Finding Inspiration",
        date: "July 3, 2023",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        content: "Inspiration can be found everywhere — in nature, art, or even daily life. I love exploring photography, listening to music, and watching how others express themselves creatively. These help me refocus and push my imagination. Sometimes the best ideas come when I'm not actively looking for them — during a walk in the park, while reading a book, or even in conversations with friends. I've learned to keep a creative journal where I capture these moments of inspiration, no matter how small they might seem.",
        excerpt: "Inspiration can be found everywhere — in nature, art, or even daily life. I love exploring..."
    },
    post3: {
        title: "Self-Care Routine",
        date: "August 22, 2023",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
        content: "Balancing creativity and rest is essential. I've learned to take short breaks, meditate, and go for walks when I feel overwhelmed. It keeps my mind fresh and helps me come back to projects with renewed energy. Self-care isn't selfish — it's necessary for sustainable creativity. I've developed a routine that includes morning meditation, regular exercise, and setting boundaries between work and personal time. This balance has made me not only more productive but also happier and more fulfilled in my creative work.",
        excerpt: "Balancing creativity and rest is essential. I've learned to take short breaks, meditate, and go..."
    }
};

// Load posts
function loadPosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return;
    
    Object.keys(posts).forEach((postId, index) => {
        const post = posts[postId];
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <span class="post-date">📅 ${post.date}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <button class="read-more-btn" onclick="openModal('${postId}')">Read More</button>
            </div>
            <div class="like-button" onclick="toggleHeart(this, ${index + 1})">
                <i class="far fa-heart"></i>
                <span class="like-count">${24 - index * 6}</span>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
}

let currentPageNum = 1;
let totalPagesCount = 3;

// Open modal
function openModal(postId) {
    const modal = document.getElementById('postModal');
    const journalPages = document.getElementById('journalPages');
    const navigation = document.querySelector('.page-navigation');
    const post = posts[postId];
    
    if (!modal || !journalPages) return;
    
    journalPages.innerHTML = '';
    
    if (postId === 'post1' && Array.isArray(post.content)) {
        // Multi-page for Creative Journey
        totalPagesCount = post.content.length;
        
        post.content.forEach((pageContent, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = `page ${index === 0 ? 'active' : ''}`;
            pageDiv.id = `page${index + 1}`;
            pageDiv.innerHTML = `
                ${index === 0 ? `<div class="modal-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>` : ''}
                <div class="modal-text">
                    ${index === 0 ? `<h2>${post.title}</h2>
                    <div class="modal-date">${post.date}</div>` : `<h3>Chapter ${index + 1}</h3>`}
                    <div class="modal-content">${pageContent}</div>
                </div>
            `;
            journalPages.appendChild(pageDiv);
        });
        
        if (navigation) {
            navigation.style.display = 'flex';
            const totalPagesSpan = document.getElementById('totalPages');
            if (totalPagesSpan) totalPagesSpan.textContent = totalPagesCount;
            currentPageNum = 1;
            showPage(1);
        }
    } else {
        // Single page for other posts
        totalPagesCount = 1;
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page active';
        pageDiv.innerHTML = `
            <div class="modal-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="modal-text">
                <h2>${post.title}</h2>
                <div class="modal-date">${post.date}</div>
                <div class="modal-content">${post.content}</div>
            </div>
        `;
        journalPages.appendChild(pageDiv);
        if (navigation) navigation.style.display = 'none';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Show specific page
function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page${pageNum}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    const currentPageSpan = document.getElementById('currentPage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentPageSpan) currentPageSpan.textContent = pageNum;
    if (prevBtn) prevBtn.disabled = pageNum === 1;
    if (nextBtn) nextBtn.disabled = pageNum === totalPagesCount;
}

// Navigation functions
function nextPage() {
    if (currentPageNum < totalPagesCount) {
        currentPageNum++;
        showPage(currentPageNum);
    }
}

function previousPage() {
    if (currentPageNum > 1) {
        currentPageNum--;
        showPage(currentPageNum);
    }
}

// Toggle heart
function toggleHeart(element, postId) {
    const heart = element.querySelector('i');
    const count = element.querySelector('.like-count');
    let currentCount = parseInt(count.textContent);
    
    if (heart.classList.contains('far')) {
        heart.classList.remove('far');
        heart.classList.add('fas');
        count.textContent = currentCount + 1;
        element.style.animation = 'heartBounce 0.5s ease';
    } else {
        heart.classList.remove('fas');
        heart.classList.add('far');
        count.textContent = currentCount - 1;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('postModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Reset to first page when closing
function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            currentPageNum = 1;
        }, 300);
    }
}

// Mobile navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
    });
}

// Logo hearts animation
const logoHearts = document.querySelector('.logo-hearts');
if (logoHearts) {
    logoHearts.addEventListener('mouseenter', () => {
        const hearts = logoHearts.querySelectorAll('i');
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.style.opacity = '1';
            }, index * 100);
        });
    });
    
    logoHearts.addEventListener('mouseleave', () => {
        const hearts = logoHearts.querySelectorAll('i');
        hearts.forEach(heart => {
            heart.style.opacity = '0';
        });
    });
}

// Custom cursor (for desktop only)
if (window.innerWidth > 768) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('expand');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('expand');
        });
    }
}

// Password visibility toggle function
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = field.nextElementSibling;
    
    if (field.type === 'password') {
        field.type = 'text';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    } else {
        field.type = 'password';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    }
}

// Load posts when page loads
window.addEventListener('load', () => {
    loadPosts();
});

// Login button functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Check for URL parameters and show messages
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.get('error') === 'invalid') {
                alert('Invalid username or password!');
            }
            if (urlParams.get('success') === 'registered') {
                alert('Registration successful! Please login.');
            }
            if (urlParams.get('success') === 'password_reset') {
                alert('Password reset successful! Please login with your new password.');
            }

            // Frontend-only login logic
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Find user
            const user = users.find(user => user.full_name === username && user.user_password === password);

            if (user) {
                // Store current user session
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('userLoggedIn', 'true');
                alert('Login successful! Welcome back ♥');
                window.location.href = 'admin.html'; // Redirect to admin page
            } else {
                alert('Invalid username or password!');
            }
        });
    }
});

// Add heart explosion animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes heartExplode {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(360deg) translateY(-100px);
            opacity: 0;
        }
    }
    @keyframes heartPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    @keyframes heartBounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    .secret-login:hover {
        transform: scale(1.2) !important;
        color: #ff4785 !important;
    }
    .post-card {
        position: relative;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .post-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px rgba(255, 107, 157, 0.25);
    }
    .post-img {
        height: 200px;
        overflow: hidden;
    }
    .post-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    .post-card:hover .post-img img {
        transform: scale(1.05);
    }
    .like-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 15;
    }
    .like-button:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(255, 107, 157, 0.4);
    }
    .like-button i {
        font-size: 1.3rem;
        color: #ff6699;
        line-height: 1;
    }
    .like-button .like-count {
        font-size: 0.8rem;
        font-weight: 700;
        color: #333;
        margin-top: 1px;
    }
    .read-more-btn {
        background: linear-gradient(45deg, #ff6b9d, #ff8e8e);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 15px;
    }
    .read-more-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 107, 157, 0.4);
    }
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.4));
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .modal.show {
        opacity: 1;
    }
    .modal-content {
        background: #fff5f8;
        border: none;
        border-radius: 15px;
        max-width: 600px;
        width: 85%;
        max-height: 85vh;
        position: relative;
        transform: translateY(-20px) scale(0.95);
        transition: all 0.4s ease;
        box-shadow: 0 20px 40px rgba(255, 105, 180, 0.2), 0 0 0 1px rgba(255, 182, 193, 0.3);
        overflow: hidden;
        padding-bottom: 60px;
    }
    .modal.show .modal-content {
        transform: translateY(0) scale(1);
    }
    .close {
        position: absolute;
        top: 15px;
        right: 20px;
        color: #ff69b4;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.9);
        width: 35px;
        height: 35px;
        border: 2px solid #ffb6c1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 10px rgba(255, 105, 180, 0.2);
    }
    .close:hover {
        background: #ff69b4;
        color: white;
        transform: scale(1.1) rotate(90deg);
        border-color: #ff1493;
    }
    .page {
        display: none;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
        padding: 40px 30px 30px 30px;
        overflow-y: auto;
        max-height: calc(85vh - 120px);
        background: linear-gradient(to right, #fff5f8 0%, #fff5f8 40px, transparent 40px, transparent 42px, #fff5f8 42px);
        background-size: 42px 100%;
        position: relative;
    }
    .page.active {
        display: block;
        opacity: 1;
        transform: translateX(0);
    }
    .modal-image {
        width: calc(100% - 20px);
        height: 180px;
        margin: 0 10px 25px 10px;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(255, 105, 180, 0.15);
        border: 3px solid #ffb6c1;
        position: relative;
    }
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .modal-text {
        margin-left: 50px;
    }
    .modal-text h2 {
        color: #ff1493;
        margin-bottom: 12px;
        font-size: 1.6rem;
        font-weight: 600;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.2);
        position: relative;
    }
    .modal-date {
        color: #ff69b4;
        font-size: 0.9rem;
        margin-bottom: 20px;
        font-weight: 500;
        font-style: italic;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .modal-content {
        line-height: 1.7;
        font-size: 0.95rem;
        color: #444;
        text-align: left;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        letter-spacing: 0.5px;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 182, 193, 0.1) 50%, transparent 100%);
        padding: 15px;
        border-radius: 8px;
        border-left: 3px solid #ffb6c1;
        margin-right: 20px;
    }
    .page-navigation {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0 0 15px 15px;
    }
    .nav-btn {
        background: rgba(255, 255, 255, 0.9);
        color: #ff1493;
        border: 2px solid #ffb6c1;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 600;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        transition: all 0.3s ease;
        box-shadow: 0 3px 8px rgba(255, 20, 147, 0.2);
    }
    .nav-btn:hover {
        background: white;
        transform: scale(1.05);
        box-shadow: 0 5px 12px rgba(255, 20, 147, 0.3);
    }
    .nav-btn:disabled {
        background: rgba(255, 255, 255, 0.5);
        color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    .page-indicator {
        color: white;
        font-size: 0.9rem;
        font-weight: 600;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);