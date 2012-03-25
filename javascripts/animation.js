var Animation = (function() {

  function Animation(params) {
    for (var property in params)
      this[property] = params[property];
    this.video = this.animation.find("video").get(0);
  }

  Animation.prototype.inViewport = function() {
    return this.win.verticalRange().contain(animationBottom.apply(this));
  };

  Animation.prototype.show = function() {
    var video = this.animation.find(".video-js");
    if (video.css("opacity") === "0")
      video.animate({
        opacity: 1
      }, 200, function() {
        if (this.player)
          this.player.ready(function() {
            this.play();
          });
      });
  };

  function animationBottom() {
    if (!this.animationBottom)
      this.animationBottom = this.animation.offset().top + this.animation.height();
    return this.animationBottom;
  }

  return Animation;
})();
