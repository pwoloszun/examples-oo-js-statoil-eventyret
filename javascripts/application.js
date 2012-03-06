$(document).ready(function() {
  var win = Win(window);
  var debate = Debate($(".debate"));
  var storiesController = initStoriesController(win, debate);
});

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

function initStoriesController(win, debate) {
  var stories = $("#header, .stories .story").map(function() {
    var story = $(this);
    return Story({
      link: $(".story-link[for=" + story.attr("id") + "]"),
      story: story,
      win: win
    });
  });
  var animations = $(".animation").map(function() {
    return Animation({
      animation: $(this),
      win: win
    });
  });
  return StoriesController({
    win: win,
    debate: debate,
    stories: stories,
    animations: animations
  });
}

var StoriesController = function(params) {
  var SCROLL_DURATION = 1200;
  var _params = params || {},
    _win, _debate, _stories, _currentStory, _animations, _navigationDisabled;

  function init() {
    initProperties();
    initWindow();
    initNavigationLinks();
  }

  function initProperties() {
    _win = _params.win;
    _debate = _params.debate;
    _stories = _params.stories;
    _currentStory = storyInViewport();
    _currentStory.activate();
    _animations = _params.animations;
    _navigationDisabled = false;
  }

  function storyInViewport() {
    for (var i = 0; i < _stories.length; i++)
      if (_stories[i].inViewport())
        return _stories[i];
    return _stories[_stories.length - 1];
  }

  function initWindow() {
    _win.scrollStop(function() {
      if (_debate.collapsed()) {
        manageStoriesActivity();
        showAllAnimationsInViewport();
      }
      return false;
    });
  }

  function showAllAnimationsInViewport() {
    for (var i = 0; i < _animations.length; i++) {
      if (_animations[i].inViewport())
        _animations[i].show();
    }
  }

  function manageStoriesActivity() {
    var story = storyInViewport();
    if (!story.equal(_currentStory)) {
      _currentStory.deactivate();
      _currentStory = story;
      _currentStory.activate();
    }
  }

  function initNavigationLinks() {
    _stories.each(function() {
      var story = this;
      story.linkClick(function() {
        if (navigationDisabled())
          return;
        navigationDisabled(true);
        _win.scrollTo(story.top(), SCROLL_DURATION, function() {
          navigationDisabled(false);
          return false;
        });
      });
    });
  }

  function navigationDisabled(value) {
    if (arguments.length > 0)
      return _navigationDisabled = value;
    else
      return _navigationDisabled;
  }

  function currentStoryIndex() {
    return _stories.index(_currentStory);
  }

  init();
  return {
    currentStoryIndex: currentStoryIndex
  };
};

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

var Story = function(params) {
  var ACTIVE_CLASS = "active";
  var _params = params || {},
    _story, _link, _win, _verticalRange;

  function init() {
    _link = _params.link;
    _story = _params.story;
    _win = _params.win;
  }

  function verticalRange() {
    if (!_verticalRange) {
      var from = _story.offset().top;
      _verticalRange = new Range(from, from + _story.height());
    }
    return _verticalRange;
  }

  function inViewport() {
    return _win.verticalRange().nearCenter(verticalRange(), 150);
  }

  function top() {
    var position = _story.offset().top;
    if (position >= 10)
      position -= 10;
    return position;
  }

  function equal(other) {
    return !!other && id() === other.id();
  }

  function id() {
    return _story.attr("id");
  }

  function deactivate() {
    _link.removeClass(ACTIVE_CLASS);
  }

  function activate() {
    _link.addClass(ACTIVE_CLASS);
  }

  function linkClick(handler) {
    _link.click(handler);
  }

  init();
  return {
    inViewport: inViewport,
    linkClick: linkClick,
    deactivate: deactivate,
    activate: activate,
    top: top,
    equal: equal,
    id: id
  };
};

var Range = function(from, to) {
  if (typeof from !== "number")
    throw "from property must be number";
  if (typeof to !== "number")
    throw "to property must be number";
  if (from > to)
    throw "from cant be grater than must be less or equal to";
  this.from = from;
  this.to = to;
  return this;
};

Range.prototype.contain = function(point) {
  return this.from <= point && point <= this.to;
};

Range.prototype.intersect = function(range) {
  return this.contain(range.to) || this.contain(range.from) || range.contain(this.from);
};

Range.prototype.nearCenter = function(range, margin) {
  var center = (this.from + this.to) >> 1;
  return new Range(center - margin, center + margin).intersect(range);
};

var Animation = function(params) {
  var _params = params || {},
    _animation, _win, _animationBottom, _video;

  function init() {
    _animation = _params.animation;
    _video = _animation.find("video").get(0);
    _win = _params.win;
  }

  function animationBottom() {
    if (!_animationBottom)
      _animationBottom = _animation.offset().top + _animation.height();
    return _animationBottom;
  }

  function inViewport() {
    return _win.verticalRange().contain(animationBottom());
  }

  function show() {
    var video = _animation.find("> .video-js");
    if (video.css("opacity") === "0")
      video.animate({
        opacity: 1
      }, 800, function() {
        if (this.player)
          this.player.play();
      });
  }

  init();
  return {
    inViewport: inViewport,
    show: show
  };
};

function iPad() {
  return window.navigator.userAgent.match(/iPad|iPhone.*CPU\sOS\s4/i);
}

function safariOSX() {
  var nav = window.navigator;
  return $.browser["safari"] && nav.appVersion.match(/mac/i) && !nav.userAgent.match(/iPad|iPhone/);
}

var Showable = function(element) {
  this.element = element;
  return this;
};

