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
