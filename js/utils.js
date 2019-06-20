const show = (show) => $(show).removeClass('hidden');
const hide = (hide) => $(hide).addClass('hidden');
const easing = (t) => t * (2 - t);
const hideDropdownMenus = (e) => {
  const $menu = $('.dropdown-container');

  if (!$menu.is(e.target) && // if the target of the click isn't the container...
    $menu.has(e.target).length === 0) {
    $('.dropdown-menu').hide(300);
  }
};

const showMapInstructions = () => {
  show('#intro-modal');
  show('.instruction-container');
  hide('#start');
  show('#close-modal');
};

const hideMapInstructions = () => {
  hide('#intro-modal');
  hide('.instruction-container');
  show('#start');
  hide('#close-modal');
}

const showAbout = () => {
  hide('#footer');
  hide('#map');
  show('#about-container');
}

const hideAbout = () => {
  show('#footer');
  show('#map');
  hide('#about-container');
}

export { show, hide, easing, hideDropdownMenus, showMapInstructions, hideMapInstructions, showAbout, hideAbout };
