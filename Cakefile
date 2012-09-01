require 'flour'

task 'build', ->
    bundle 'lib/*.js', 'dist/telepong.js'

task 'watch', ->
    watch 'lib/*.js', -> invoke 'build'