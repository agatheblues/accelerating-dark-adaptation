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

const handleStartClick = (callback, mode) => {
  hide('.intro-wrapper');

  if (mode === 'explore') {
    showExploreInstructions();
  } else {
    showStoryInstructions();
  }

  $('#start').on('click', () => {
    hide('#intro-modal');
    if (mode === 'explore') hide('.instruction-container');

    $('#intro').addClass('opacity-off');
    setTimeout(() => {
      hide('#intro');
      $('#intro').removeClass('opacity-off');
    }, 3000);
    callback();
  });
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

const showStoryInstructions = () => {
  show('#intro-modal');
  hide('.instruction-container');
  show('#start');
  hide('#close-modal');
};

const showExploreInstructions = () => {
  show('#intro-modal');
  show('.instruction-container');
  show('#start');
  hide('#close-modal');
};

export { show, hide, easing, hideDropdownMenus, handleStartClick, showMapInstructions, hideMapInstructions };
