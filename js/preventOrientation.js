export const preventCtrl = (function () {
  const alert = document.createElement("div");
  alert.innerHTML = `<h1 style="margin: auto; width: 60vw;">Поверните ваше устройство в вертикальное положение</h1>`;
  alert.className = "prevent-orientation";
  return {
    deviceOrientation() {
      const body = document.body;
      if (window.orientation == 90 || -90 == window.orientation) {
        body.appendChild(alert);
      } else {
        body.lastElementChild.remove();
      }
    },
  };
})();

// window.addEventListener("orientationchange", deviceOrientation);
preventCtrl.deviceOrientation(); // проверяем ориентацию при загрузке страницы
