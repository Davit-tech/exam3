(async () => {
    let userInfo = document.querySelector("#user-info");
    const userData = JSON.parse(localStorage.getItem("usersList"));

    if (userInfo && userData && Array.isArray(userData.users)) {
        let userHtml = "";
        userData.users.forEach(user => {
            userHtml += `
                <pre class="userdata">
First Name: ${user.first_name}
Last Name: ${user.last_name}
Email: ${user.email}
                </pre>
            `;
        });
        userInfo.innerHTML = userHtml;
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