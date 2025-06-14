// Mobile menu toggle for glassmorphic dropdown
const menuBtn = document.querySelector('.mobile-menu-btn');
const menuDropdown = document.getElementById('mobile-menu-dropdown');

if (menuBtn && menuDropdown) {
  menuBtn.addEventListener('click', function () {
    const isActive = menuDropdown.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });
  // Optional: close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
      menuDropdown.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
