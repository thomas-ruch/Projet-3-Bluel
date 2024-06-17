function envoyerLogin() {
    const formLogin = document.querySelector("#login form")

    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault()

        const mdp = document.getElementById("mdp")
        const email = document.getElementById("email")
        
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
                window.localStorage.setItem("token", utilisateur.token)
                window.location.href = "./index.html"
            } else {
                const erreur = document.querySelector(".erreur")
                erreur.classList.remove("masque")
            }

        } catch (erreur) {
            console.error("Erreur lors de l'identification.");
        }
    })
}

envoyerLogin()