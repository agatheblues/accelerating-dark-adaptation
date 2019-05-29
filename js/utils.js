const show = (show) => $(show).removeClass("hidden");
const hide = (hide) => $(hide).addClass("hidden");
const easing = (t) => t * (2 - t);
export { show, hide, easing };