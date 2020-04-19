
function rating(id, stars, starsActive, starsSelect) {
  var stars = $(id  +  " .rate-button-block-form__label"),
    starsActive,
    starsSelect;

  stars.hover(function() {
    starsActive = $(this).prevAll().addBack();
    stars.text('star_border');
    starsActive.text('star');
  },
    function() {
      starsActive.text('star_border');
      starsSelect.text('star');
    }
  );
    
  stars.click(function() { 
    starsSelect=starsActive.text('star');
    starsSelect.mouseleave(function() {
      starsSelect.text('star');
    });
  });
};

rating("#r1", "starsRating1", "starsActiveRating1", "starsSelectRating1");
rating("#r2", "starsRating2", "starsActiveRating2", "starsSelectRating2");
