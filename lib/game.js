;(function (exports) {

    function Game() {
        this.step = this.step.bind(this)
        this.emitter = new EventEmitter2
        this.on = this.emitter.on.bind(this.emitter)
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        if (this.running) {
            requestAnimationFrame(this.step)
        }
        this.emitter.emit('step')
    }

    Game.prototype.pause = function () {
        this.running = false
    }

    exports.Game = Game

})(window.Telepong)