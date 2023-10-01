const $ = window.$;

$(function () {
  function loadQuotes () {
    const carousel = $('#carouselExampleControls');
    const carouselInner = $('#carouselExampleControls .carousel-inner');
    const loadingSpinner = $('#carouselExampleControls .loader');

    carousel.children().hide();
    loadingSpinner.show();

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

  function loadVideos () {
    const carousel = $('#carouselExampleControls2');
    const loadingSpinner = $('#carouselExampleControls2 .loader');

    carousel.children().hide();
    loadingSpinner.show();

    $.get('https://smileschool-api.hbtn.info/popular-tutorials', function (res, status, jqxhr) {
      if (status === 'success' && jqxhr.status === 200) {
        carousel.children().show();
        loadingSpinner.hide();

        let i = 0;
        for (const video of res) {
          let stars = '';

          for (let j = 0; j < video.star; j++) {
            stars += `<img
              src="images/star_on.png"
              alt="star on"
              width="15px"
            />`;
          }

          const carouselCard = `<div class="carousel-item ${i === 0 ? 'active' : ''}">
          <div
            class="col-lg-3 col-md6 col-sm-6 col-12 d-flex justify-content-center"
          >
            <div class="card">
              <img
                src="${video.thumb_url}"
                class="card-img-top"
                alt="Video thumbnail"
              />
              <div class="card-img-overlay text-center">
                <img
                  src="images/play.png"
                  alt="Play"
                  width="64px"
                  class="align-self-center play-overlay"
                />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">
                  ${video.title}
                </h5>
                <p class="card-text text-muted">
                  ${video['sub-title']}
                </p>
                <div class="creator d-flex align-items-center">
                  <img
                    src="${video.author_pic_url}"
                    alt="Creator of
                    Video"
                    width="30px"
                    class="rounded-circle"
                  />
                  <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">${stars}</div>
                  <span class="main-color">${video.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;

          $('#carouselExampleControls2 .carousel-inner .row').append(carouselCard);
          i++;
        }

        $('#carouselExampleControls2 .carousel-item').each(function () {
          const minPerSlide = 4;
          let next = $(this).next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }
          next.children(':first-child').clone().appendTo($(this));

          for (let i = 0; i < minPerSlide; i++) {
            next = next.next();
            if (!next.length) {
              next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
          }
        });
      }
    });
  }

  loadQuotes();
  loadVideos();
});
