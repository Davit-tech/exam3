(async () => {
    let userInfo = document.querySelector("#user-info");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userData) {
        const {id, first_name, last_name, email} = userData.user;
        userInfo.innerHTML = `
            <pre class="userdata">
First Name: ${first_name}
id : ${id}
Last Name: ${last_name}
Email: ${email}
            </pre>
        `;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Profile";
        editButton.classList.add("edit-profile-button");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Profile";
        deleteButton.classList.add("delete-profile-button");

        userInfo.appendChild(editButton);
        userInfo.appendChild(deleteButton);

        editButton.addEventListener("click", () => {
            window.location.href = `/user/profile/edit`;
        });

        deleteButton.addEventListener("click", async () => {
            const res = await fetch("/user/profile/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token"),
                },
            });


            if (res.ok) {
                alert("user successfully deleted!");
                localStorage.removeItem("token");
                window.location.href = "/user/login";
            } else {
                alert("Error deleting user");
            }
        });
    } else {
        console.log("No user data");
    }
})();

let logout = document.querySelector(".logout");
if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/user/login";
        window.location.reload();
    });
}
