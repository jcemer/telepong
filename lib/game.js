;(function (exports) {

    function Game() {
        //this.step = this.step.bind(this)
        this.emitter = {}
        this.on = bean.add.bind(window, this.emitter)
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        if (this.running) {
            requestAnimationFrame(this.step.bind(this))
        }
        bean.fire(this.emitter, 'step')
    }

    Game.prototype.pause = function () {
        this.running = false
    }

    exports.Game = Game

})(window.Telepong)