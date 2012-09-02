;(function (exports) {

    function Game() {
        this.step = this.step.bind(this)
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        if (this.running) {
            requestAnimationFrame(this.step)
        }
    }

    Game.prototype.pause = function () {
        this.running = false
    }

    exports.Game = Game

})(window.Telepong)