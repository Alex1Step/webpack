import * as $ from "jquery";

function createAnalitycs() {
  let counter = 0;
  let destoyed = false;

  const listener = () => counter++;

  $(document).on("click", listener);

  return {
    destroy() {
      $(document).off("click", listener);
      destoyed = true;
    },
    getClicks() {
      if (destoyed) {
        return "Analitycs is destroyed";
      }
      return counter;
    },
  };
}

window.analitycs = createAnalitycs();
