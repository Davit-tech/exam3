(async () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/user/login";
        return;
    }

    const response = await fetch("/post/posts/data", {
        method: "GET",
        headers: {
            "token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        localStorage.removeItem("token");
        location.href = "/user/login";
        return;
    }

    const postsData = await response.json();
    localStorage.setItem("posts", JSON.stringify(postsData.posts));
    localStorage.setItem("pagination", JSON.stringify({
        currentPage: postsData.currentPage,
        totalPages: postsData.totalPages
    }));

    const userInfo = document.querySelector("#user-posts");
    const userData = postsData.posts;
    const userName = JSON.parse(localStorage.getItem("user"));

    const renderPosts = (posts, userId) => {
        let postsHtml = "";
        posts.forEach((post) => {
            postsHtml += `
                <pre class="userdata">
                    Post Author: ${post.author}
                    Date: ${post.date}
                    Description: ${post.text}
                    Title: ${post.title}
                    post id: ${post.id}
                    user id: ${post.user_id}
                </pre>
                ${post.user_id === userId ? `
                    <input type="submit" value="delete" class="btn-delete" data-id="${post.id}">
                    <a href="/post/posts/${post.id}/edit" class="btn-edit" data-id="${post.id}">Edit post</a>
                ` : ""}
            `;
        });
        return postsHtml;
    };

    const renderPagination = (totalPages) => {
        let paginationHtml = "";
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<button class="page-btn" data-page="${i}">${i}</button>`;
        }
        return paginationHtml;
    };

    if (userInfo && Array.isArray(userData)) {
        userInfo.innerHTML = renderPosts(userData, userName.user.id);

        const paginationData = JSON.parse(localStorage.getItem("pagination"));
        if (paginationData) {
            document.querySelector("#pagination").innerHTML = renderPagination(paginationData.totalPages);
        }
    }

    document.body.addEventListener("click", async (event) => {
        const token = localStorage.getItem("token");

        if (event.target.classList.contains("btn-delete")) {
            const postId = event.target.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this post?")) {
                try {
                    const response = await fetch(`/post/posts/${postId}/data`, {
                        method: "DELETE",
                        headers: {token},
                    });

                    if (response.status === 204) {
                        location.reload();
                    } else {
                        alert("Error deleting post.");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error deleting post.");
                }
            }
        }

        if (event.target.classList.contains("btn-edit")) {
            const postId = event.target.getAttribute("data-id");
            localStorage.setItem("postId", postId);
        }

        if (event.target.classList.contains("page-btn")) {
            const page = event.target.getAttribute("data-page");
            try {
                const response = await fetch(`/post/posts/data?page=${page}`, {
                    method: "GET",
                    headers: {
                        token,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    localStorage.removeItem("token");
                    location.href = "/user/login";
                }

                const data = await response.json();
                userInfo.innerHTML = renderPosts(data.posts, userName.user.id);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

    const logout = document.querySelector(".logout");
    if (logout) {
        logout.addEventListener("click", () => {
            localStorage.removeItem("token");
            location.href = "/user/login";
        });
    }
})();
