const editProfileForm = document.getElementById("editProfileForm");

if (editProfileForm) {
    editProfileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(editProfileForm);

        const data = Object.fromEntries(formData.entries());

        const res = await fetch("/user/profile/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            alert("Error");
        } else {
            window.location.href = "/user/profile";
        }
    });
}
