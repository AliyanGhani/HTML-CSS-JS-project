var swiper = new Swiper(".mySwiper", {
    loop:"true",
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });

  document.addEventListener('DOMContentLoaded', () => {
    const tickerElement = document.getElementById('date-time-location');

    function updateDateTimeLocation(position) {
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();
        const locationString = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`;

        tickerElement.textContent = `Date: ${dateString} | Time: ${timeString} | Location: ${locationString}`;
    }

    function handleError(error) {
        console.error('Geolocation error:', error);
        tickerElement.textContent = 'Unable to retrieve location.';
    }

    // Request location access and update ticker
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateDateTimeLocation, handleError);
    } else {
        tickerElement.textContent = 'Geolocation is not supported by this browser.';
    }

    // Update date and time every second
    setInterval(() => {
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();
        const currentText = tickerElement.textContent;

        // Update time in the ticker content, maintaining date and location
        tickerElement.textContent = currentText.replace(/Time: [^|]+/, `Time: ${timeString}`);
    }, 1000);
});
