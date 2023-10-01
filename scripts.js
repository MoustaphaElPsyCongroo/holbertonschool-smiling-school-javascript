const $ = window.$;

$(function () {
  function loadCarousel () {
    const carousel = $('#carouselExampleControls');
    const carouselInner = $('.carousel-inner');
    const loadingSpinner = $('.loader');

    carousel.children().hide();
    carousel.append(loadingSpinner);

    $.get('https://smileschool-api.hbtn.info/quotes', function (res, status, jqxhr) {
      if (status === 'success' && jqxhr.status === 200) {
        carousel.children().show();
        loadingSpinner.hide();

        let i = 1;
        for (const quote of res) {
          const quoteImage = `<img src=${quote.pic_url}
          class="d-block align-self-center"
          alt="Carousel Pic ${i}"
          />`;
          const quoteText = `<p class="text-white">${quote.text}</p>`;
          const quotePersonName = `<h4 class="text-white font-weight-bold">${quote.name}</h4>`;
          const quotePersonTitle = `<span class="text-white">${quote.title}</span>`;

          const carouselItem = `<div class="carousel-item ${i === 1 ? 'active' : ''}">
          <div class="row mx-auto align-items-center">
            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
              ${quoteImage}
            </div>
            <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
              <div class="quote-text">
                ${quoteText}
                ${quotePersonName}
                ${quotePersonTitle}
              </div>
            </div>
          </div>`;

          carouselInner.append(carouselItem);
          i++;
        }
      }
    });
  }

  loadCarousel();
});
