document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    const resultsContainer = document.getElementById("search-results");

    if (!query) {
        resultsContainer.innerHTML = "";
        return;
    }
    try {
        const res = await fetch(`/post/search?q=${query}`);

        const data = await res.json();

        resultsContainer.innerHTML = "";

        if (data.posts.length === 0) {
            resultsContainer.innerHTML = "<p>No posts found.</p>";
            return;
        }

        data.posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <p>${post.text}</p>
                <small>${new Date(post.date).toLocaleDateString()}</small>
                <hr/>
            `;
            resultsContainer.appendChild(postDiv);
        });

        document.getElementById("user-posts").style.display = "none";
        document.getElementById("pagination").style.display = "none";

    } catch (err) {
        console.error("Search failed:", err);
        resultsContainer.innerHTML = "<p>Something went wrong while searching.</p>";
    }
});