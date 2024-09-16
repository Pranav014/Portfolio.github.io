async function fetchMarkdown(file) {
    // Use the Google Apps Script endpoint to fetch the Markdown file
    const url = `https://script.google.com/macros/s/AKfycbyPNPiXuR3-0A8NshLyUohsE1vI-GxbmN8qkfZIGjWlwLkfUZ-V78d6FwBgjKmRpFJ0/exec?file=${file}&action=getFile`;
    const response = await fetch(url);
    const markdown = await response.text();
    return markdown;
}

async function fetchAllFilesMetadata(){
    const url = `https://script.google.com/macros/s/AKfycbyPNPiXuR3-0A8NshLyUohsE1vI-GxbmN8qkfZIGjWlwLkfUZ-V78d6FwBgjKmRpFJ0/exec?action=getFiles`;
    const response = await fetch(url);
    const metadata = await response.json();
    return metadata;
}

// Function to render an article inside the modal
async function renderArticle(file) {
    const markdown = await fetchMarkdown(file);
    if (markdown) {
        const html = marked.parse(markdown);
        document.getElementById('article-content').innerHTML = html;
        document.getElementById('article-modal').style.display = 'block';
    }
}

// Function to display article titles in cards
async function loadArticles() {
    // const files = ['adventureGame.md', 'physicsInGameDev.md']; // Add more article files here
    const metadata = await fetchAllFilesMetadata();
    const articlesContainer = document.getElementById('articles-container');

    metadata.forEach((file, index) => {
        const card = document.createElement('div');
        card.classList.add('article-card');
    
        // Insert the ID as a data attribute
        card.setAttribute('data-id', file.id);
    
        // Build the card's inner HTML, including the title and index
        card.innerHTML = `<h2>${file.title}</h2><p>Article ${index + 1}</p>`;
        
        // Add click event to load the full article, passing the document ID
        card.addEventListener('click', () => renderArticle(file.title));  // Pass the ID instead of the title
        
        articlesContainer.appendChild(card);
    });

    
    
}

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('article-modal');
    const closeModal = document.querySelector('.close');

    // Load articles when the page is loaded
    loadArticles();

    // Close modal when 'x' is clicked
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
