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
