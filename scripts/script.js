function modifierTheme() {
    const theme = document.body.getAttribute('data-theme');
    const newTheme = theme == 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.body.setAttribute('data-theme', newTheme);
    changeIconTheme(newTheme);
}


function changeIconTheme(theme) {
    const image = document.getElementById('iconLightTheme') || document.getElementById('iconDarkTheme');
    if(theme === 'dark-theme') {
        image.setAttribute("src", "img/icons/iconDarkMode.png");
        image.setAttribute("id", "iconDarkTheme");
    } else {
        image.setAttribute("src", "img/icons/iconLightMode.png");
        image.setAttribute("id", "iconLightTheme");
    }
}

function copyContact(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Copiado!');
    },function(error) {
        console.error('erro');  
    });
    
}
//
function gerarCurriculo() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const localizacao = document.getElementById("localizacao").value;
    const experiencia = document.getElementById("experiencia").value;
    const habilidades = document.getElementById("habilidades").value;

    const curriculo = { 
        nome,
        email,
        telefone,
        localizacao,
        experiencia,
        habilidades,
    };
    console.log(curriculo);
    localStorage.setItem('curriculo', JSON.stringify(curriculo));
    apresentarCurriculo(curriculo);
    vibrar();
}

function apresentarCurriculo(data) {
    const template = document.getElementById('templateCurriculo').content.cloneNode(true);
    template.querySelector(".nome").textContent = data.nome;
    template.querySelector(".email").textContent = data.email;
    template.querySelector(".telefone").textContent = data.telefone;
    template.querySelector(".localizacao").textContent = data.localizacao;
    template.querySelector(".experiencia").textContent = data.experiencia;
    template.querySelector(".habilidades").textContent = data.habilidades;
    const mostrarCurriculo = document.getElementById("mostrarCurriculo");
    mostrarCurriculo.innerHTML = '';
    mostrarCurriculo.appendChild(template);
}

function lerCurriculo() {
    const curriculo = JSON.parse(localStorage.getItem('curriculo'));
    if(curriculo) {
        apresentarCurriculo(curriculo);
    }
}

function vibrar() {
    if (navigator.vibrate) {
        navigator.vibrate(500);
    }
}

function copiar(){
    const curriculo = document.getElementById('mostrarCurriculo').textContent;
    navigator.clipboard.writeText(curriculo).then(()=>{
        alert('Curriculo copiado com sucesso!');
    });
}
