;(function(exports){

    function Game(stage, socket) {
        this.socket = socket
        this.stage = stage
        this.ctx = stage.getContext('2d')

        this.puck = new Telepong.Puck(this, {
            x: Math.floor(this.stage.width / 2)
          , y: 10
          , speedX: Math.ceil(Math.random() * 5)
          , speedY: 20
        })

        this.setListeners()
    }

    Game.prototype.setListeners = function () {
        this.socket && this.socket.on('getball', this.getball.bind(this))
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
    }

    Game.prototype.throwball = function () {
        var data = {
            x: this.puck.x / this.stage.width
          , y: this.puck.y / this.stage.height
          , speedX: this.puck.speedX
          , speedY: this.puck.speedY
        }
        console.log('throwball o/')
        this.socket && this.socket.emit('throwball', data)
    }

    Game.prototype.getball = function (data) {
        console.log('getball o/')
        
        this.puck = new Telepong.Puck(this, {
            x: (1 - data.x) * this.stage.width
          , y: data.y * this.stage.height
          , speedX: -data.speedX
          , speedY: -data.speedY
        })
    }

    exports.Game = Game

})(window.Telepong)
