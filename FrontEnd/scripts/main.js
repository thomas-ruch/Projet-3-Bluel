const tabProjets = fetch("http://localhost:5678/api/works")
.then (tabProjets => tabProjets.json())
.then (tabProjets => console.log(tabProjets))

