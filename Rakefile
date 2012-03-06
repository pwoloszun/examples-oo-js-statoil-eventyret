namespace :haml do

  desc "Watch the site's HAML templates and recompile them when they change"
  task :watch do
    require File.join(File.dirname(__FILE__), 'lib', 'haml_watcher')
    HamlWatcher.watch
  end

  def partial filename
    partial_file = Pathname.new("haml/_#{filename}.html.haml")
    Haml::Engine.new(partial_file.read).render if partial_file.exist?
  end

end
