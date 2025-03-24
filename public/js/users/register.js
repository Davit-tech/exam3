const registerForm = document.querySelector("#registerForm");
if (registerForm) {
    registerForm.onsubmit = async function (event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        try {
            const response = await fetch("/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.log("error", response.status);
            } else {
                window.location.href = "/user/login";
            }
            const responseData = await response.json();
            console.log(responseData);

        } catch (error) {
            console.log(error);
        }
    }
}






