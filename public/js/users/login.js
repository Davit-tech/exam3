const loginForm = document.querySelector("#loginForm");
if (loginForm) {
    loginForm.onsubmit = async function (event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        try {
            const response = await fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                window.location.href = "/user/profile";
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
}






