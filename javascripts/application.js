$(document).ready(function() {
  var win = Win(window);
  var debate = Debate($(".debate"));
  var storiesController = initStoriesController(win, debate);
});

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
