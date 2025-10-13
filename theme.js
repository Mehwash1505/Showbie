// theme.js (Robust Version)
console.log("Theme script has started!");
// We wait for the entire HTML document to be fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // Now we can safely find our elements
    const themeSwitcher = document.getElementById('themeSwitcher');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // If for any reason the button doesn't exist, we stop here.
    if (!themeSwitcher || !sunIcon || !moonIcon) {
        console.error("Theme switcher elements not found!");
        return;
    }

    // Function to apply the selected theme
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

    // Function to toggle the theme and save the preference
    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // Attach the click event listener to the button
    themeSwitcher.addEventListener('click', toggleTheme);

    // Apply the saved theme as soon as the page loads
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});