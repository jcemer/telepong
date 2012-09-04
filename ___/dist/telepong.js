"use strict"

window.requestAnimationFrame = 
    window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || window.oRequestAnimationFrame
 || function (fn) {
        setTimeout(fn, 1000/30)
    }

function dimension(html, property) {
    var Property = property[0].toUpperCase() + property.substr(1)
    
    if (html == window) {
        return window['inner' + Property]
    } 
    if (html == document) {
        return document.documentElement['offset' + Property]
    }
    return html.getBoundingClientRect()[property]
}
window.Telepong = {}

;(function (exports) {

    function init(html) {
        // game loop
        this.game = new Telepong.Game

        // ball
        this.ball = new Telepong.Ball(this.game)

        // board
        this.board = new Telepong.Board(this.game, window )
        this.board.init()

        this.game.run()
    }

    exports.init = init
    exports.namespace = 'Telepong'
})(window.Telepong)
;(function (exports) {

    function Game() {
        this.on = bean.add.bind(this, this)
        this.width = 0
        this.height = 0
        this.addEventListenters()
    }

    Game.prototype.addEventListenters = function () {
        this.on('resize.' + exports.namespace, this.onResize.bind(this))
    }

    Game.prototype.removeEventListenters = function () {
        this.on('*.' + exports.namespace)
    }


    Game.prototype.onResize = function (dimension) {
        this.resize(dimension)
    }

    Game.prototype.resize = function (dimension) {
        if (dimension.width) {
            this.width = dimension.width
        }
        if (dimension.height) {
            this.height = dimension.height
        }
    }


    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        if (this.running) {
            requestAnimationFrame(this.step.bind(this))
        }
        bean.fire(this, 'step')
    }

    Game.prototype.pause = function () {
        this.running = false
    }

    exports.Game = Game

})(window.Telepong)
;(function (exports) {

    function Board(game, html) {
        this.game = game
        this.html = html

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.addEventListenters()
        this.resize()
        this.clear()
    }

    Board.prototype.init = function () {
        if (this.html == window || this.html == document) {
            document.body.appendChild(this.canvas)            
        } else {
            this.html.appendChild(this.canvas)
        }
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.resize = function () {
        this.canvas.width = dimension(this.html, 'width')
        this.canvas.height = dimension(this.html, 'height')

        bean.fire(this.game, 'resize.' + exports.namespace, { 
            width: this.canvas.width
          , height: this.canvas.height 
        })
    }

    Board.prototype.addEventListenters = function () {
        bean.add(window, 'resize.' + exports.namespace, this.onResize.bind(this))
    }

    Board.prototype.removeEventListenters = function () {
        bean.remove(window, '*.' + exports.namespace)
    }

    Board.prototype.onResize = function () {
        this.resize()
        this.clear()
    }

    exports.Board = Board

})(window.Telepong) 
;(function (exports) {

    function Ball(game, settings) {
        var key
        this.game = game

        // adds defaults to ball
        for (key in Ball.defaults) {
            if (!Ball.defaults.hasOwnProperty(key)) {
                continue
            }
            this[key] = Ball.defaults[key]
        }

        // adds settings to ball
        if (settings) {
            for (key in settings) {
                if (!settings.hasOwnProperty(key)) {
                    continue
                }
                this[key] = settings[key]
            }
        }
    }

    Ball.defaults = {
        width: 10
      , height: 10
      , x: 0
      , y: 0
      , speedX: 0
      , speedY: 0
    }

    Ball.prototype.render = function (canvas) {

    }

    exports.Ball = Ball

})(window.Telepong)