flour = require 'flour'

task 'build', ->
    bundle [
        'vendor/eventemitter2.js'
        'lib/main.js'
        'lib/telepong.js'
        'lib/telepong.game.js'
        'lib/telepong.board.js'
    ], 'dist/telepong.js'

task 'watch', ->

    flour.minifiers['.js'] = (file, cb) -> cb file.buffer

    invoke 'build'
    watch 'lib/*.js', -> invoke 'build'