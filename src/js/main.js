
const btn = document.querySelector(".btn-guess");
const inputDate = document.querySelector("#date");
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".pop-up");
const audio = document.querySelector("audio");

const createSuccessPopupWindow = function () {
  const mainContainer = document.querySelector(".pop-up");

  const existingSuccessEl = document.getElementById("order-success-msg");
  if (existingSuccessEl) {
    existingSuccessEl.remove();
  }

  const successMarkup = `
      <div class="success-popup" id="order-success-msg">
        <span class="success-icon">&times;</span>
        <p>WTF Try Again ! 😜</p>
      </div>
    `;

  // Insert the pop-up at the end of the main body/container
  mainContainer.insertAdjacentHTML("beforeend", successMarkup);
  //

  const successPopupEl = document.getElementById("order-success-msg");

  // 3. Set a Timeout to REMOVE the Success Message
  setTimeout(() => {
    // Check if the element still exists before trying to remove it
    if (successPopupEl) {
      successPopupEl.remove();
    }
  }, 3000);
};

btn.addEventListener("click", function () {
  if (inputDate.value != "2021-09-14" || inputDate.value == "")
    createSuccessPopupWindow();
  else {
    overlay.classList.add("hidden");
    popup.classList.add("hidden");
    audio.hidden = false;
    audio.play();
  }
});
console.log('done');
