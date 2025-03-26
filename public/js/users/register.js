const registerForm = document.querySelector("#registerForm");
if (registerForm) {
    registerForm.onsubmit = async function (event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (!response.ok) {
                document.querySelectorAll(".error-text").forEach(el => el.remove());
                if (responseData.fields) {
                    for (const [field, message] of Object.entries(responseData.fields)) {
                        const inputElement = document.querySelector(`[name="${field}"]`);
                        if (inputElement) {
                            const errorSpan = document.createElement("span");
                            errorSpan.classList.add("error-text");
                            errorSpan.style.color = "red";
                            errorSpan.textContent = message;
                            inputElement.parentNode.appendChild(errorSpan);
                        }
                    }
                }
            } else {
                window.location.href = "/user/login";

            }


        } catch (error) {
            console.log(error);
        }
    }
}






