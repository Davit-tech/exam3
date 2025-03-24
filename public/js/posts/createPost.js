const createPostForm = document.querySelector("#createPost-form");
if (createPostForm) {
    createPostForm.onsubmit = async function (event) {
        event.preventDefault();
        const postDate = document.getElementById("post-date").value;
        const currentDate = new Date().toISOString().split('T')[0];

        if (postDate < currentDate) {
            alert('The post date cannot be in the past.');
            return;
        }
        if (postDate > currentDate) {
            alert('The post date cannot be in the future.');
            return;
        }
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/post/posts/create/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token"),
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.success) {

                window.location.href = "/post/posts";

            } else {
                if (result.fields) {
                    for (const [field, message] of Object.entries(result.fields)) {
                        const inputElement = document.querySelector(`[name="${field}"]`);
                        if (inputElement) {
                            const errorSpan = document.createElement("span");
                            errorSpan.classList.add("error-text");
                            errorSpan.textContent = message;
                            inputElement.parentNode.appendChild(errorSpan);
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }

    };

}
const authorName = document.querySelector("#author-input");
const userName = JSON.parse(localStorage.getItem("user"));
authorName.value = userName.user.first_name;


let logout = document.querySelector(".logout");
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        window.location.reload();
    });
}