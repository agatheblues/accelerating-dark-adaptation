const show = (show) => $(show).removeClass("hidden");
const hide = (hide) => $(hide).addClass("hidden");
const easing = (t) => t * (2 - t);
const hideDropdownMenus = (e) => {
  const $menu = $('.dropdown-container');

  if (!$menu.is(e.target) // if the target of the click isn't the container...
    && $menu.has(e.target).length === 0) // ... nor a descendant of the container
  {
    $('.dropdown-menu').hide(300)
  }
}

const showIntroSlides = () => {
  hide('#intro');
  show('#intro-slide');
}

export { show, hide, easing, hideDropdownMenus, showIntroSlides };