/**
 * Global Theme Switcher & Persistence Module
 * Connect Platform
 */
(function () {
  const SAVED_THEME = localStorage.getItem('connect_theme') || 'light';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark-theme');
      if (document.body) {
        document.body.classList.add('dark-theme');
        document.body.setAttribute('data-theme', 'dark');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark-theme');
      if (document.body) {
        document.body.classList.remove('dark-theme');
        document.body.removeAttribute('data-theme');
      }
    }
  }

  // Apply immediately before DOM render to prevent flash
  applyTheme(SAVED_THEME);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(SAVED_THEME);
  });

  window.setConnectTheme = function (theme) {
    localStorage.setItem('connect_theme', theme);
    applyTheme(theme);
  };

  window.getConnectTheme = function () {
    return localStorage.getItem('connect_theme') || 'light';
  };
})();
