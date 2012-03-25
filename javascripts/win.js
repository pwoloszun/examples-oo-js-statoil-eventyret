var Win = function(win) {
  var _win, _doc, _body;

  function scrollStart(handler) {
    bindScrollEvent("scrollstart", handler);
  }

  function scrollStop(handler) {
    bindScrollEvent("scrollstop", handler);
  }

  function bindScrollEvent(eventName, handler) {
    _win.bind(eventName, function() {
      handler();
    });
  }

  function scroll(handler) {
    _win.scroll(handler);
  }

  function top(value) {
    return _win.scrollTop(value);
  }

  function verticalRange() {
    var from = _win.scrollTop();
    return new Range(from, from + _win.height());
  }

  function height() {
    return _win.height();
  }

  function init(win) {
    _win = $(win);
    _doc = $(win.document);
    _body = _doc.find($.browser['webkit'] === true ? "body" : "html");
  }

  function scrollTo(position, duration, callback) {
    _body.animate({
      scrollTop: position
    }, duration, 'easeInOutExpo', callback);
  }

  init(win);
  return {
    height: height,
    scroll: scroll,
    scrollStart: scrollStart,
    scrollStop: scrollStop,
    scrollTo: scrollTo,
    top: top,
    verticalRange: verticalRange
  };
};
