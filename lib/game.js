;(function (exports) {

    function Game(stage, socket) {
        this.socket = socket
        this.stage = stage
        this.ctx = stage.getContext('2d')

        this.newball()
        this.paddle = new Telepong.Paddle(this)

        this.setListeners()
    }

    Game.prototype.setListeners = function () {
        this.socket && this.socket.on('getball', this.getball.bind(this))
    }

    Game.prototype.newball = function () {
        this.puck = new Telepong.Puck(this, {
            x: Math.floor(this.stage.width / 2)
          , y: 10
          , speedX: Math.ceil(Math.random() * 5)
          , speedY: 20
        })
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
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height)

        // Puck
        if (!this.puck.away) {
            this.ctx.fillStyle = 'white'
            this.ctx.fillRect(this.puck.x, this.puck.y, this.puck.width, this.puck.height)
        }

        // Paddle
        this.ctx.fillStyle = this.error ? 'red' : 'white'
        this.ctx.fillRect(this.paddle.x, this.stage.height - 20, this.paddle.width, 20)
    }

    Game.prototype.floorball = function () {
        console.log('floor')
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

    // SOCKET

    Game.prototype.throwball = function () {
        var data = {
            x: this.puck.x / this.stage.width
          , y: this.puck.y / this.stage.height // 0
          , speedX: this.puck.speedX
          , speedY: this.puck.speedY
        }
        console.log('throwball o/', this.puck.speedY)
        this.socket && this.socket.emit('throwball', data)
    }

    Game.prototype.getball = function (data) {
        console.log('getball o/', data.y)

        this.puck = new Telepong.Puck(this, {
            x: (1 - data.x) * this.stage.width
          , y: data.y // 0
          , speedX: -data.speedX
          , speedY: -data.speedY
        })
    }

    exports.Game = Game

})(window.Telepong)
