var Debate = function(debate) {
  var FIXED_COLLAPSED_CLASS = "fixed-collapsed",
    VERTICAL_MARGIN = 80;
  var _debate = debate, _overlay, _isCollapsed, _hasFixedPosition, _wrapper;

  function init() {
    _overlay = _debate.find("#debate-overlay");
    _wrapper = _debate.find(".debate-wrapper");
    _isCollapsed = true;
    _hasFixedPosition = false;
  }

  function fixCollapsed() {
    _debate.addClass(FIXED_COLLAPSED_CLASS);
    _hasFixedPosition = true;
  }

  function unfixCollapsed() {
    _debate.removeClass(FIXED_COLLAPSED_CLASS);
    _hasFixedPosition = false;
  }

  function hasFixedPosition() {
    return _hasFixedPosition;
  }

  function paddingTop(value) {
    _debate.css("paddingTop", value);
  }

  function collapsed(value) {
    if (arguments.length > 0)
      return _isCollapsed = value;
    else
      return _isCollapsed;
  }

  function outerHeight(includeMargin) {
    return _debate.outerHeight(includeMargin);
  }

  function hideOverlay() {
    _overlay.hide();
  }

  function showOverlay() {
    _overlay.show();
  }

  function resize(callback) {
    _debate.height(_wrapper.outerHeight(true) + VERTICAL_MARGIN);
    callback();
  }

  function click(handler) {
    _debate.click(function() {
      handler();
      return false;
    });
  }

  function height(value) {
    _wrapper.height(value);
    _debate.height(value);
  }

  init();
  return {
    click: click,
    collapsed: collapsed,
    fixCollapsed: fixCollapsed,
    hasFixedPosition: hasFixedPosition,
    height: height,
    hideOverlay: hideOverlay,
    outerHeight: outerHeight,
    paddingTop: paddingTop,
    resize: resize,
    showOverlay: showOverlay,
    unfixCollapsed: unfixCollapsed
  };
};
