#!/usr/bin/env bash

##
# Creates a tmux session with a few tmux windows and panes, running some
# stuff automatically to avoid having to do it manually every time.
#
# Run with:
#
#   $ bash tmux-session.sh
#
# It can be run from other directories as well, and the working
# directories will be correctly set to the directory where this project
# has been cloned:
#
#   $ bash /path/to/this/tmux-session.sh
##

dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ses=TDD-USERS-POSTS-SPEC

tmux new-session -d -s "$ses" -c "$dir" \; \
	rename-window 'vim' \; \
	send-keys 'vim README.md' C-j

tmux new-window -t "${ses}:2" -n 'tests' -c "$dir" \; \
	send-keys 'npm run test -- --watchAll --verbose' C-j

tmux new-window -t "${ses}:3" -n 'other' -c "$dir" \; \
	split-window -h -c "$dir" \; \
	send-keys 'git status' C-j

tmux select-window -t "${ses}:2"
tmux -2 attach-session -t "${ses}"

#
# vim: set textwidth=72 softtabstop=2 shiftwidth=2:
#
