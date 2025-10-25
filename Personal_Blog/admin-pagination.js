// Pagination and Search System for Admin Panel

// Pagination variables
let currentPage = {
    comments: 1,
    gallery: 1,
    facts: 1
};
const itemsPerPage = 10;
let filteredData = {
    comments: [],
    gallery: [],
    facts: []
};

// Enhanced Comments Loading with Pagination
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    filteredData.comments = comments;
    renderComments();
}

function renderComments() {
    const comments = filteredData.comments;
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const commentsList = document.getElementById('adminCommentsList');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments found.</p>';
        document.getElementById('commentsPagination').innerHTML = '';
        return;
    }
    
    const startIndex = (currentPage.comments - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageComments = comments.slice(startIndex, endIndex);
    
    commentsList.innerHTML = pageComments.map((comment, pageIndex) => {
        const originalIndex = JSON.parse(localStorage.getItem('blogComments') || '[]').findIndex(c => 
            c.name === comment.name && c.text === comment.text && c.date === comment.date
        );
        const postTitle = posts[comment.postIndex]?.title || 'Unknown Post';
        return `
            <div class="comment-item ${comment.approved ? 'approved' : 'pending'}">
                <div class="comment-info">
                    <h4>${comment.name}</h4>
                    <p class="comment-post">On: ${postTitle}</p>
                    <p class="comment-date">${comment.date}</p>
                    <p class="comment-text">${comment.text}</p>
                    <span class="status ${comment.approved ? 'approved' : 'pending'}">
                        ${comment.approved ? 'Approved' : 'Pending'}
                    </span>
                </div>
                <div class="comment-actions">
                    ${!comment.approved ? `<button onclick="approveComment(${originalIndex})" class="approve-btn"><i class="fas fa-check"></i></button>` : ''}
                    <button onclick="deleteComment(${originalIndex})" class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    renderPagination('comments', comments.length);
}

function filterComments() {
    const searchTerm = document.getElementById('commentSearch').value.toLowerCase();
    const filterType = document.getElementById('commentFilter').value;
    const allComments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    
    let filtered = allComments;
    
    if (filterType !== 'all') {
        filtered = filtered.filter(c => filterType === 'pending' ? !c.approved : c.approved);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.text.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredData.comments = filtered;
    currentPage.comments = 1;
    renderComments();
}

// Enhanced Gallery Loading with Pagination
function loadGalleryAdmin() {
    const images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    
    // Populate category filter
    const categories = [...new Set(images.map(img => img.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>' + 
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    filteredData.gallery = images;
    renderGallery();
}

function renderGallery() {
    const images = filteredData.gallery;
    const galleryList = document.getElementById('galleryList');
    
    if (images.length === 0) {
        galleryList.innerHTML = '<div class="empty-gallery"><i class="fas fa-images"></i><p>No images found.</p></div>';
        document.getElementById('galleryPagination').innerHTML = '';
        return;
    }
    
    const startIndex = (currentPage.gallery - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = images.slice(startIndex, endIndex);
    
    galleryList.innerHTML = `
        <div class="gallery-grid">
            ${pageImages.map((image, pageIndex) => {
                const originalIndex = JSON.parse(localStorage.getItem('galleryImages') || '[]').findIndex(img => 
                    img.src === image.src && img.title === image.title
                );
                return `
                    <div class="gallery-card">
                        <div class="gallery-image">
                            <img src="${image.src}" alt="${image.title}" onclick="viewImage('${image.src}', '${image.title}')">
                            <div class="image-overlay">
                                <button onclick="editGalleryImage(${originalIndex})" class="action-btn edit" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteGalleryImage(${originalIndex})" class="action-btn delete" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="gallery-info">
                            <span class="gallery-category">${image.category}</span>
                            <h4>${image.title}</h4>
                            <p>${image.description}</p>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    renderPagination('gallery', images.length);
}

function filterGallery() {
    const searchTerm = document.getElementById('gallerySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const allImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    
    let filtered = allImages;
    
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(img => img.category === categoryFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(img => 
            img.title.toLowerCase().includes(searchTerm) ||
            img.description.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredData.gallery = filtered;
    currentPage.gallery = 1;
    renderGallery();
}

// Enhanced Fun Facts Loading with Pagination
function loadAdminFunFacts() {
    const facts = JSON.parse(localStorage.getItem('funFacts') || '[]');
    filteredData.facts = facts;
    renderFacts();
}

function renderFacts() {
    const facts = filteredData.facts;
    const factsList = document.getElementById('funFactsList');
    
    if (facts.length === 0) {
        factsList.innerHTML = '<div class="empty-facts"><i class="fas fa-smile"></i><p>No fun facts found.</p></div>';
        document.getElementById('factsPagination').innerHTML = '';
        return;
    }
    
    const startIndex = (currentPage.facts - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageFacts = facts.slice(startIndex, endIndex);
    
    factsList.innerHTML = `
        <div class="facts-admin-grid">
            ${pageFacts.map((fact, pageIndex) => {
                const originalIndex = JSON.parse(localStorage.getItem('funFacts') || '[]').findIndex(f => 
                    f.icon === fact.icon && f.text === fact.text
                );
                return `
                    <div class="fact-admin-item">
                        <div class="fact-preview">
                            <span class="fact-icon">${fact.icon}</span>
                            <span class="fact-text">${fact.text}</span>
                        </div>
                        <button onclick="deleteFunFact(${originalIndex})" class="action-btn delete" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    renderPagination('facts', facts.length);
}

function filterFacts() {
    const searchTerm = document.getElementById('factsSearch').value.toLowerCase();
    const allFacts = JSON.parse(localStorage.getItem('funFacts') || '[]');
    
    let filtered = allFacts;
    
    if (searchTerm) {
        filtered = filtered.filter(fact => 
            fact.text.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredData.facts = filtered;
    currentPage.facts = 1;
    renderFacts();
}

// Pagination function
function renderPagination(type, totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById(`${type}Pagination`);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage[type] > 1) {
        paginationHTML += `<button onclick="changePage('${type}', ${currentPage[type] - 1})" class="page-btn">← Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage[type]) {
            paginationHTML += `<button class="page-btn active">${i}</button>`;
        } else {
            paginationHTML += `<button onclick="changePage('${type}', ${i})" class="page-btn">${i}</button>`;
        }
    }
    
    // Next button
    if (currentPage[type] < totalPages) {
        paginationHTML += `<button onclick="changePage('${type}', ${currentPage[type] + 1})" class="page-btn">Next →</button>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(type, page) {
    currentPage[type] = page;
    
    if (type === 'comments') {
        renderComments();
    } else if (type === 'gallery') {
        renderGallery();
    } else if (type === 'facts') {
        renderFacts();
    }
}