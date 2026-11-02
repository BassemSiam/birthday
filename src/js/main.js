document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. VIDEO SLIDESHOW LOGIC (Independent)
  // ==========================================
  const slides = document.querySelectorAll(".video-slide");
  const videos = document.querySelectorAll(".video-slide video");
  const slideshowSection = document.querySelector(".Slideshow");
  const videoPrevBtn = document.getElementById("videoPrevBtn");
  const videoNextBtn = document.getElementById("videoNextBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");

  let videoIndex = 0;
  let isPlaying = false;
  let observer;

  function showVideoSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (videos[i]) {
        videos[i].pause();
        videos[i].currentTime = 0;
      }
    });

    if (isPlaying && videos[index]) {
      const playPromise = videos[index].play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
          isPlaying = false;
          if (playPauseBtn) playPauseBtn.textContent = "Play";
        });
      }
    }
  }

  function nextVideoSlide() {
    if (slides.length === 0) return;
    videoIndex = (videoIndex + 1) % slides.length;
    showVideoSlide(videoIndex);
  }

  function prevVideoSlide() {
    if (slides.length === 0) return;
    videoIndex = (videoIndex - 1 + slides.length) % slides.length;
    showVideoSlide(videoIndex);
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (playPauseBtn) playPauseBtn.textContent = isPlaying ? "Pause" : "Play";

    if (isPlaying && videos[videoIndex]) {
      videos[videoIndex].play().catch((err) => console.log(err));
    } else if (videos[videoIndex]) {
      videos[videoIndex].pause();
    }
  }

  // Add 'ended' event listeners to each video for auto-advance
  videos.forEach((video) => {
    video.addEventListener("ended", () => {
      if (isPlaying) {
        nextVideoSlide();
      }
    });
  });

  // Intersection Observer for Video Section
  if (slideshowSection) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isPlaying) {
              isPlaying = true;
              if (playPauseBtn) playPauseBtn.textContent = "Pause";

              const audioEl = document.querySelector("audio");
              if (audioEl && typeof audioEl.pause === "function") {
                audioEl.pause();
              }
              showVideoSlide(videoIndex);
            }
          } else {
            if (isPlaying) {
              isPlaying = false;
              if (videos[videoIndex]) {
                videos[videoIndex].pause();
              }
              if (playPauseBtn) playPauseBtn.textContent = "Play";
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(slideshowSection);
  }

  // Video Button Event Listeners
  if (videoNextBtn) videoNextBtn.addEventListener("click", nextVideoSlide);
  if (videoPrevBtn) videoPrevBtn.addEventListener("click", prevVideoSlide);
  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);


  // ==========================================
  // 2. PHOTO CARD SLIDER LOGIC (Independent)
  // ==========================================
  const track = document.getElementById("photoTrack");
  const cards = track ? Array.from(track.children) : [];
  const photoPrevBtn = document.getElementById("prevBtn");
  const photoNextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");

  let photoIndex = 0;
  const totalCards = cards.length;
  const dots = [];

  if (track && dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToPhotoSlide(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function updatePhotoSlider() {
    if (!track) return;
    track.style.transform = `translateX(-${photoIndex * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === photoIndex);
    });
  }

  function goToPhotoSlide(index) {
    photoIndex = index;
    updatePhotoSlider();
  }

  function nextPhotoSlide() {
    if (totalCards === 0) return;
    photoIndex = (photoIndex + 1) % totalCards;
    updatePhotoSlider();
  }

  function prevPhotoSlide() {
    if (totalCards === 0) return;
    photoIndex = (photoIndex - 1 + totalCards) % totalCards;
    updatePhotoSlider();
  }

  // Photo Button Event Listeners
  if (photoNextBtn) photoNextBtn.addEventListener("click", nextPhotoSlide);
  if (photoPrevBtn) photoPrevBtn.addEventListener("click", prevPhotoSlide);

  // Touch Swipe Support for Mobile on Photo Track Only
  if (track) {
    let startX = 0;
    let endX = 0;

    track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    track.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const swipeThreshold = 50;

      if (startX - endX > swipeThreshold) {
        nextPhotoSlide();
      } else if (endX - startX > swipeThreshold) {
        prevPhotoSlide();
      }
    });
  }


  // ==========================================
  // 3. DATE GUESS / POPUP LOGIC
  // ==========================================
  const btn = document.querySelector(".btn-guess");
  const inputDate = document.querySelector("#date");
  const overlay = document.querySelector(".overlay");
  const popup = document.querySelector(".pop-up");
  const audio = document.querySelector("audio");

  const createSuccessPopupWindow = function () {
    const mainContainer = document.querySelector(".pop-up");
    if (!mainContainer) return;

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

    mainContainer.insertAdjacentHTML("beforeend", successMarkup);

    const successPopupEl = document.getElementById("order-success-msg");

    setTimeout(() => {
      if (successPopupEl) {
        successPopupEl.remove();
      }
    }, 3000);
  };

  if (btn) {
    btn.addEventListener("click", function () {
      if (!inputDate || inputDate.value != "2025-12-13" || inputDate.value == "") {
        createSuccessPopupWindow();
      } else {
        if (overlay) overlay.classList.add("hidden");
        if (popup) popup.classList.add("hidden");
        if (audio) {
          audio.hidden = false;
          audio.play();
        }
      }
    });
  }

  console.log("done");
});