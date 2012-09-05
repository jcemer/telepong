"use strict"

window.requestAnimationFrame = 
    window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || window.oRequestAnimationFrame
 || function (fn) {
        setTimeout(fn, 1000/60)
    }
window.Telepong = {}

;(function (exports) {

    function init(stage) {
        this.game = new Telepong.Game(stage)
        this.game.render()
        this.game.run()
    }

    exports.init = init

})(window.Telepong)
;(function (exports) {

    function Puck(game, settings) {
        
    }

    Puck.prototype.checkBoundsX = function () {
        
    }

    Puck.prototype.checkBoundsY = function () {

    }

    exports.Puck = Puck

})(window.Telepong)

;(function (exports) {

    var KEY = {
        right: 39
      , left: 37
    }

    function Paddle(game) {

    }

    Paddle.prototype.setListeners = function () {
        
    }

    exports.Paddle = Paddle

})(window.Telepong)

;(function (exports) {

    function Game(stage, socket) {
        this.stage = stage
        this.ctx = stage.getContext('2d')
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        console.log('sou um frame')

        if (this.running) {
            requestAnimationFrame(this.step.bind(this))
        }
    }

    Game.prototype.stop = function () {
        this.running = false
    }

    Game.prototype.render = function () {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(10, 10, 10, 10)
    }

    exports.Game = Game

})(window.Telepong)
