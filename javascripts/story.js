var Story = (function() {
  var ACTIVE_CLASS = "active";

  function Story(params) {
    for (var property in params)
      this[property] = params[property];
  }

  Story.prototype.inViewport = function() {
    return this.win.verticalRange().nearCenter(verticalRange.apply(this), 150);
  };

  Story.prototype.top = function() {
    var position = this.story.offset().top;
    if (position >= 10)
      position -= 10;
    return position;
  };

  Story.prototype.equal = function(other) {
    return !!other && this.id() === other.id();
  };

  Story.prototype.id = function() {
    return this.story.attr("id");
  };

  Story.prototype.deactivate = function() {
    this.link.removeClass(ACTIVE_CLASS);
  };

  Story.prototype.activate = function() {
    this.link.addClass(ACTIVE_CLASS);
  };

  Story.prototype.linkClick = function(handler) {
    this.link.click(function(event) {
      event.preventDefault();
      handler.apply(this, arguments);
    });
  };

  function verticalRange() {
    if (!this.verticalRange) {
      var from = this.story.offset().top;
      this.verticalRange = new Range(from, from + this.story.height());
    }
    return this.verticalRange;
  }

  return Story;
})();
