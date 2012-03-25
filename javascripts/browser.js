var Browser = (function(win) {
  var _win, _userAgent, _iOS, _iPhone, _iPad, _version, _unfixed;
  function init(win) {
    _win = win;
    _userAgent = _win.navigator.userAgent;
    _iPhone = /iPod|iPhone/i.test(_userAgent);
    _iPad = /iPad/i.test(_userAgent);
    _iOS = _iPhone || _iPad;
    _version = _iOS ? _userAgent.match(/OS (\d)/i)[1] : null;
    _unfixed = _iPhone || (_iPad && _version < "5");
  }
  init(win);
  return {
    iOS: function(version) {
      if (arguments.length > 0 && version === "unfixed")
        return _iOS && _unfixed;
      else
        return _iOS;
    },
    iPhone: function() {
      return _iPhone;
    },
    iPad: function(version) {
      if (arguments.length > 0)
        return _iPad && _version === version;
      else
        return _iPad;
    },
    orientation: function(orientation) {
      if (orientation !== "landscape" && orientation !== "portrait")
        throw "unknown orientation, must be landscape or portrait";
      else if (!_iOS)
        return null;
      else {
        var landscapeOrientation = Math.abs(_win.orientation) == 90;
        return ((orientation === "landscape") && landscapeOrientation) || ((orientation === "portrait") && !landscapeOrientation);
      }
    }
  };
})(window);
