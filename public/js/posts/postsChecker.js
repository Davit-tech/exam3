(async () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/user/login";
    } else {
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
        }

        const postsData = await response.json();

        localStorage.setItem("posts", JSON.stringify(postsData.posts));
        localStorage.setItem("pagination", JSON.stringify({
            currentPage: postsData.currentPage,
            totalPages: postsData.totalPages
        }));
    }
})();
