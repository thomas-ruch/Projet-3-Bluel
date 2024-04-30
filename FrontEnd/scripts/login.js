function envoyerLogin() {
    const formLogin = document.querySelector("#login form")

    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault()

        //Suppression d'un éventuel utilisateur du local storage
        window.localStorage.removeItem("utilisateur")

        const mdp = document.getElementById("mdp")
        const email = document.getElementById("email")

        console.log(email.value, mdp.value)

        const login = {
            email: email.value,
            password: mdp.value,
        }

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login),
            })

            const utilisateur = await reponse.json()

            if (utilisateur.token != undefined) {
                window.localStorage.setItem("utilisateur", JSON.stringify(utilisateur))
                window.location.href = "./index.html"
            } else {
                const erreur = document.createElement("p")
                erreur.textContent = "Erreur lors de l'identification"
                formLogin.appendChild(erreur)
            }

        } catch (erreur) {
            console.log(`Erreur : ${erreur.message}`);
        }
    })
}

envoyerLogin()