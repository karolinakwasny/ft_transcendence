document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // Load initial content
    loadPage('home');

    // Add event listeners to menu links
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            if (page === 'logout') {
                // Handle logout here if needed
                alert('Logout clicked!');
                return;
            }
            loadPage(page);
        });
    });

    // Function to load a page
    function loadPage(page) {
        fetch(`pages/${page}.html`)
            .then(response => {
                if (!response.ok) throw new Error('Page not found');
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                mainContent.innerHTML = `<h1>Error: ${error.message}</h1>`;
            });
    }
});
