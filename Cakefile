flour = require 'flour'

task 'build', ->
    bundle [
        'lib/main.js'
        'lib/telepong.js'
        'lib/game.js'
    ], 'dist/telepong.js'

task 'watch', ->

    flour.minifiers['.js'] = (file, cb) -> cb file.buffer

    invoke 'build'
    watch 'lib/*.js', -> invoke 'build'