function pegarRepositorio() {
    const nomeUsuario = document.getElementById('inputNomeUsuario').value;
    if (nomeUsuario === "") {
        alert("Digite o nome do usuário");
        return;
    }

    const listaRepositorios = document.getElementById('listaRepositorios');
    listaRepositorios.innerText = "";

    const url = `https://api.github.com/users/${nomeUsuario}/repos`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                const li = document.createElement("li");
                li.innerHTML = repo.name;
                listaRepositorios.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error);
            const li = document.createElement("li");
            li.innerHTML = "Erro na Requisição";
            listaRepositorios.appendChild(li);
        });
}

function modifierTheme() {
    const theme = document.body.getAttribute('data-theme');
    const newTheme = theme == 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.body.setAttribute('data-theme', newTheme);
    changeIconTheme(newTheme);
}


function changeIconTheme(theme) {
    const image = document.getElementById('iconLightTheme') || document.getElementById('iconDarkTheme');
    if (theme === 'dark-theme') {
        image.setAttribute("src", "../../src/assets/img/icons/iconDarkMode.png");
        image.setAttribute("id", "iconDarkTheme");
    } else {
        image.setAttribute("src", "../../src/assets/img/icons/iconLightMode.png");
        image.setAttribute("id", "iconLightTheme");
    }
}
