##
# To manually convert the .adoc file, do:
#
#   $ gem install asciidoctor pygments.rb
#   $ asciidoctor README.adoc
#
# Then open README.html in your browser.
#
# To update the .adoc file every time it is saved, run these
# commands (you'll need Ruby and `gem`):
#
#   $ gem install bundler
#   $ bundler install
#   $ bundle exec guard
#
# Edit and save the file and then open README.html in your browser.
##

require 'asciidoctor'

guard 'shell' do
  watch(/^README.adoc$/) do |m|
    Asciidoctor.convert_file('./README.adoc', :safe => :unsafe)
    print "\n\nChanged #{m[0]}\n\n"
  end
end

#
# vim: set ft=ruby:
#
