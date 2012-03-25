var Toggler = function(params) {
  var EASING = "easeInOutCirc",
    DURATION = 1200,
    FIXED_CLASS = "fixed-expanded",
    LEFT_SHIFTED_CLASS = "left-shifted";
  var _params = params, _toggler, _sliders, _stories, _isDisabled, _hasFixedPosition, _debateTop, _slider;

  function init() {
    _toggler = _params.toggler;
    _sliders = _params.sliders;
    _stories = _params.stories;
    _isDisabled = false;
    _hasFixedPosition = false;
    _debateTop = _params.debateTop;
    _slider = _params.slider;
  }

  function shiftRight(callback) {
    unfixOnLeft();
    shiftSliders(0, function() {
      unfixOnRight();
      _toggler.removeClass(LEFT_SHIFTED_CLASS);
      callback();
    });
  }

  function shift() {
    return _stories.width() - _toggler.width();
  }

  function shiftLeft(callback) {
    shiftSliders(-shift(), function() {
      fixPosition();
      _toggler.addClass(LEFT_SHIFTED_CLASS);
      callback();
    });
  }

  function shiftSliders(shift, callback) {
    _sliders.animate({
      left: shift
    }, DURATION, EASING, function() {
      if (this.id != "slider")
        return;
      callback();
      disabled(false);
    });
  }

  function fixPosition() {
    _hasFixedPosition = true;
    _toggler.addClass(FIXED_CLASS);
  }

  function unfixOnLeft() {
    var top = _toggler.offset().top - _debateTop;
    _hasFixedPosition = false;
    _toggler.removeClass(FIXED_CLASS);
    _toggler.css("top", top);
  }

  function unfixOnRight() {
    _toggler.removeAttr("style");
  }

  function click(handler) {
    _toggler.click(function() {
      if (disabled())
        return false;
      disabled(true);
      handler.apply(this, arguments);
      return false;
    });
  }

  function disabled(value) {
    if (arguments.length > 0)
      return _isDisabled = value;
    else
      return _isDisabled;
  }

  function hasFixedPosition() {
    return _hasFixedPosition;
  }

  function fixExpanded() {
    _hasFixedPosition = true;
    fixPosition();
  }

  function unfixExpanded() {
    _hasFixedPosition = false;
    unfixOnLeft();
    unfixOnRight();
  }

  function show() {
    _toggler.fadeIn();
  }

  function hide() {
    _toggler.fadeOut(300);
  }

  function top(value) {
    _toggler.css("top", value);
  }

  function updatePosition() {
    _slider.css("left", -shift());
  }

  init();
  return {
    click: click,
    fixExpanded: fixExpanded,
    hasFixedPosition: hasFixedPosition,
    hide: hide,
    shiftLeft: shiftLeft,
    shiftRight: shiftRight,
    show: show,
    top: top,
    unfixExpanded: unfixExpanded,
    updatePosition: updatePosition
  };
};
