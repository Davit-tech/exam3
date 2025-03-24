(async () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/user/login";
    } else {

        const response = await fetch(`/post/posts/data`, {
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

        localStorage.setItem("posts", JSON.stringify(await response.json()));
    }
})();