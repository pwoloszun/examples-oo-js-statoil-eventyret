var Navigation = (function() {

  var DEFAULT_TOP;
  var CLONE = null;

  function Navigation(navigation) {
    this.navigation = navigation;
    this.hidden = this.navigation.is(":hidden");
    initClone.apply(this);
  }

  Navigation.prototype.show = function() {
    if (this.hidden)
      return;
    this.navigation.fadeIn();
  };

  Navigation.prototype.fadeOut = function() {
    if (this.hidden)
      return;
    this.navigation.fadeOut(300);
  };

  Navigation.prototype.hide = function(value) {
    this.hidden = value;
    if (this.hidden)
      this.navigation.hide();
    else
      this.navigation.show();
    if (CLONE) {
      if (this.hidden)
        CLONE.hide();
      else
        CLONE.show();
    }
  };

  Navigation.prototype.top = function(value) {
    if (this.hidden)
      return;
    DEFAULT_TOP = value;
    this.navigation.css("top", DEFAULT_TOP);
    if (CLONE)
      CLONE.css("top", DEFAULT_TOP);
  };

  Navigation.prototype.afterDebateCollapsed = function(value) {
    this.navigation.css("left", value);
    if (this.hidden)
      return;
    if (CLONE) {
      this.navigation.addClass("ios-5");
      CLONE.show();
    }
  };

  Navigation.prototype.beforeDebateExpand = function() {
    if (this.hidden)
      return;
    if (CLONE) {
      CLONE.hide();
      this.navigation.removeClass("ios-5");
    }
  };

  Navigation.prototype.height = function(value) {
    return this.navigation.height(value);
  };

  Navigation.prototype.fixPosition = function() {
    if (!Browser.iPad("5"))
      return;
    this.navigation.hide();
    this.navigation.css({
      position: "fixed",
      top: DEFAULT_TOP
    });
    this.navigation.show();
  };

  Navigation.prototype.unfixPosition = function(viewportTop) {
    if (!Browser.iPad("5"))
      return;
    this.navigation.hide();
    this.navigation.css({
      position: "absolute",
      top: DEFAULT_TOP + viewportTop
    });
    this.navigation.show();
  };

  function initClone() {
    if (CLONE || !Browser.iPad("5"))
      return;
    CLONE = this.navigation.clone();
    CLONE.attr("id", CLONE.attr("id") + "-clone");
    CLONE.find("*[id]").each(function() {
      var el = $(this);
      el.attr("id", el.attr("id") + "-clone");
    });
    $(".site").append(CLONE);
    CLONE.css("z-index", "-=1");
    this.navigation.addClass("ios-5");
  }

  return Navigation;
})();
