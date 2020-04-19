var count = 0;
$('.like-button-block-form__label').on('change', function(){
  count++;
  $(this).find('.like-button-block-form__custom').addClass('like-button-block-form__custom_click');
  $(this).find(".like-button-block-form__counter").addClass('like-button-block-form__counter_click').text(count);
  $(this).find('.like-button-block-form__icon').addClass('like-button-block-form__icon_click').text('favorite');
});




