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