document.addEventListener('DOMContentLoaded', () => {
  // Load the saved theme from local storage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.getElementById('theme-stylesheet').disabled = true;
    document.getElementById('theme-stylesheet-dark').disabled = false;
  } else {
    document.getElementById('theme-stylesheet').disabled = false;
    document.getElementById('theme-stylesheet-dark').disabled = true;
  }
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = document.getElementById('theme-stylesheet-dark').disabled;
  if (isDark) {
    localStorage.setItem('theme', 'dark');
    document.getElementById('theme-stylesheet').disabled = true;
    document.getElementById('theme-stylesheet-dark').disabled = false;
  } else {
    localStorage.setItem('theme', 'light');
    document.getElementById('theme-stylesheet').disabled = false;
    document.getElementById('theme-stylesheet-dark').disabled = true;
  }
});
