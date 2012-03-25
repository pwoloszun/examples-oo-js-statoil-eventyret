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
