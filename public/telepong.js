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

if (!Function.prototype.bind) {

    Function.prototype.bind = function (that) {
        var target = this
          , slice = Array.prototype.slice
          , args, bound

        if (typeof target != "function") {
            throw new TypeError()
        }  
        
        args = slice.call(arguments, 1)
        bound = function () {
            var merge = args.concat(slice.call(arguments))
              , F , self, result

            if (this instanceof bound) {
                F = function () {}
                F.prototype = target.prototype
                self = new F
                result = target.apply(self, merge)
                if (Object(result) === result) {
                    return result
                }
                return self;
            } else {
                return target.apply(that, merge)
            }
        }
        return bound
    }

}
window.Telepong = {}

;(function (exports) {

    function init(stage, socket) {
        this.game = new Telepong.Game(stage, socket)
        this.game.run()
    }

    exports.init = init

})(window.Telepong)
;(function (exports) {

    function Puck(game, settings) {
        var key

        this.game = game
        this.width = 20
        this.height = 20

        if (settings) {
            for (key in settings) {
                if (!settings.hasOwnProperty(key)) {
                    continue
                }
                this[key] = settings[key]
            }
        }
    }

    Puck.prototype.step = function () {
        if (this.away) {
            return
        }

        this.x += this.speedX
        this.y += this.speedY

        this.checkBoundsX()
        this.checkBoundsY()
    }

    Puck.prototype.checkBoundsX = function () {
        if (this.x >= this.game.stage.width - this.width) {
            this.x = this.game.stage.width - this.width
            this.speedX *= -1
        }

        if (this.x <= 0) {
            this.x = 0
            this.speedX *= -1
        }
    }

    Puck.prototype.checkBoundsY = function () {
        if (this.y >= this.game.stage.height - this.height) {
            this.y = this.game.stage.height - this.height
            this.speedY *= -1

            this.game.floorball()
        }

        if (this.y <= 0) {
            this.y = 0
            //this.speedY *= -1
            
            this.away = true
            this.game.throwball()
        }
    }

    exports.Puck = Puck

})(window.Telepong)

;(function (exports) {

    var KEY = {
        right: 39
      , left: 37
    }

    function Paddle(game) {
        this.game = game
        this.width = this.game.stage.width / 3
        this.x = this.game.stage.width / 2

        this.setListeners()
    }

    Paddle.prototype.move = function (gap) {
        this.x += gap
    }

    Paddle.prototype.setListeners = function () {
        document.addEventListener('keydown',
            this.onKeydown.bind(this), false)
    }

    Paddle.prototype.onKeydown = function (event) {
        var gap = this.game.stage.width / 30
        if (event.which == KEY.right) {
            //gap *= 1
        } else if (event.which == KEY.left) {
            gap *= -1
        } else {
            return
        }

        this.move(gap)
    }



    exports.Paddle = Paddle

})(window.Telepong)

;(function (exports) {

    function Game(stage, socket) {
        this.socket = socket
        this.stage = stage
        this.ctx = stage.getContext('2d')

        this.newball()

        this.paddle = new Telepong.Paddle(this)

        this.setListeners()
    }

    Game.prototype.newball = function () {
        this.puck = new Telepong.Puck(this, {
            x: parseInt(this.stage.width / 2, 10)
          , y: 10
          , speedX: parseInt(Math.random() * 30, 10)
          , speedY: 30
        })
    }

    Game.prototype.setListeners = function () {
        this.socket.on('getball', this.getball.bind(this))
    }

    Game.prototype.getball = function (data) {
        console.log('getball o/')
        this.puck = new Telepong.Puck(this, {
            x: (1 - data.x) * this.stage.width
          , y: 0
          , speedX: -data.speedX
          , speedY: -data.speedY
        })
    }

    Game.prototype.throwball = function () {
        var data = {
            x: this.puck.x / this.stage.width
          , speedX: this.puck.speedX 
          , speedY: this.puck.speedY
        }
        this.socket.emit('throwball', data)
    }
    Game.prototype.floorball = function () {
        if (
            this.puck.x >= this.paddle.x
         && this.puck.x <= this.paddle.x + this.paddle.width
        ) {
            return
        }
        this.error = true
        this.puck.away = true
        setTimeout(this.reset.bind(this), 1000)
    }

    Game.prototype.reset = function () {
        this.error = false
        this.newball()
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        this.puck.step()
        this.render()

        if (this.running) {
            requestAnimationFrame(this.step.bind(this))
        }
    }

    Game.prototype.stop = function () {
        this.running = false
    }

    Game.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height)

        this.ctx.fillStyle = this.error ? 'red' : 'white'
        this.ctx.fillRect(
            this.paddle.x
          , this.stage.height - 20
          , this.paddle.width
          , 20
        )

        if (!this.puck.away) {
            this.ctx.fillStyle = 'white'
            this.ctx.fillRect(
                this.puck.x
              , this.puck.y
              , this.puck.width
              , this.puck.height
            )
        }
    }

    exports.Game = Game

})(window.Telepong)
