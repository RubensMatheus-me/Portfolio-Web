function modifierTheme() {
    const theme = document.body.getAttribute('data-theme');
    const newTheme = theme == 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.body.setAttribute('data-theme', newTheme);
    changeIconTheme(newTheme);
}


function changeIconTheme(theme) {
    const image = document.getElementById('iconLightTheme') || document.getElementById('iconDarkTheme');
    if (theme === 'dark-theme') {
        image.setAttribute("src", "img/icons/iconDarkMode.png");
        image.setAttribute("id", "iconDarkTheme");
    } else {
        image.setAttribute("src", "img/icons/iconLightMode.png");
        image.setAttribute("id", "iconLightTheme");
    }

}

