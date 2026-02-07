// theme.js
console.log("Theme script has started!");
document.addEventListener('DOMContentLoaded', () => {

    const themeSwitcher = document.getElementById('themeSwitcher');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    if (!themeSwitcher || !sunIcon || !moonIcon) {
        console.error("Theme switcher elements not found!");
        return;
    }

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            document.body.classList.remove('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    themeSwitcher.addEventListener('click', toggleTheme);

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});
