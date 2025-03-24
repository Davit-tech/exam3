(async () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/user/login";
    } else {
        const response = await fetch(`/user/profile/data`, {
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
        console.log(response);
  localStorage.setItem("user", JSON.stringify(await response.json()));
    }
})();