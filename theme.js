(function() {
  // Read current theme immediately to prevent FOUC
  const currentTheme = localStorage.getItem('microconnect-theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    // We apply it to body as well once body exists, but applying to documentElement prevents FOUC best.
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // Apply to body since our CSS targets body.dark-theme
  const currentTheme = localStorage.getItem('microconnect-theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  // Common UI Setup for Settings Dropdown across pages
  const settingsBtn = document.getElementById('sidebar-settings-btn');
  const settingsDropdown = document.getElementById('settings-dropdown');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const themeText = document.getElementById('theme-text');
  const settingsChevron = document.getElementById('settings-chevron');

  // Toggle Dropdown
  if (settingsBtn && settingsDropdown) {
    settingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = settingsDropdown.style.display === 'none';
      settingsDropdown.style.display = isHidden ? 'block' : 'none';
      if (settingsChevron) {
        settingsChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // Initialize Icons
  if (currentTheme === 'dark') {
    if(themeIconSun) themeIconSun.style.display = 'block';
    if(themeIconMoon) themeIconMoon.style.display = 'none';
    if(themeText) themeText.textContent = 'Light Mode';
  } else {
    if(themeIconSun) themeIconSun.style.display = 'none';
    if(themeIconMoon) themeIconMoon.style.display = 'block';
    if(themeText) themeText.textContent = 'Dark Mode';
  }

  // Toggle Theme logic
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      if (isDark) {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('microconnect-theme', 'light');
        if(themeIconSun) themeIconSun.style.display = 'none';
        if(themeIconMoon) themeIconMoon.style.display = 'block';
        if(themeText) themeText.textContent = 'Dark Mode';
      } else {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('microconnect-theme', 'dark');
        if(themeIconSun) themeIconSun.style.display = 'block';
        if(themeIconMoon) themeIconMoon.style.display = 'none';
        if(themeText) themeText.textContent = 'Light Mode';
      }
    });
  }

  // Listen for cross-tab storage changes to sync theme in real-time
  window.addEventListener('storage', (e) => {
    if (e.key === 'microconnect-theme') {
      const isDark = e.newValue === 'dark';
      if (isDark) {
        document.body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
        if(themeIconSun) themeIconSun.style.display = 'block';
        if(themeIconMoon) themeIconMoon.style.display = 'none';
        if(themeText) themeText.textContent = 'Light Mode';
      } else {
        document.body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
        if(themeIconSun) themeIconSun.style.display = 'none';
        if(themeIconMoon) themeIconMoon.style.display = 'block';
        if(themeText) themeText.textContent = 'Dark Mode';
      }
    }
  });
});
