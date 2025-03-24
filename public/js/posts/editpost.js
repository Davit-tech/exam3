document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.querySelector('#post-form');
    const postId = localStorage.getItem("postId");

    if (postForm) {
        postForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(postForm);
            const data = Object.fromEntries(formData.entries());

            try {

                const response = await fetch(`/post/posts/${postId}/data`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {

                    window.location.href = `/post/posts`;
                } else {
                    console.error("Failed to update post", await response.json());
                }
            } catch (e) {
                console.error("Error during request:", e);
            }
        });
    }
});


