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

    Paddle.prototype.setListeners = function () {
        document.addEventListener('keydown', this.onKeydown.bind(this), false)
        document.addEventListener('keyup', this.onKeyup.bind(this), false)

        document.addEventListener('touchstart', this.onTouchstart.bind(this), false)
        document.addEventListener('touchmove', this.onTouchmove.bind(this), false)
    }

    Paddle.prototype.onKeydown = function (event) {
        var gap = this.game.stage.width / 30
        clearInterval(this.keysInterval)

        if (event.which == KEY.right) {
            gap *= 1
        } else if (event.which == KEY.left) {
            gap *= -1
        } else {
            return
        }
        
        this.move(gap)
        this.keysInterval = setInterval(this.move.bind(this, gap), 100)
    }

    Paddle.prototype.onKeyup = function (event) {
        clearInterval(this.keysInterval)
    }

    Paddle.prototype.onTouchstart = function (event) {
        this.touchX = event.touches[0].pageX
    }

    Paddle.prototype.onTouchmove = function (event) {
        var x = event.touches[0].pageX
        event.preventDefault()
        this.move(x - this.touchX)
        this.touchX = x
    }

    Paddle.prototype.move = function (gap) {
        this.x += gap
        this.boundsX()
    }

    Paddle.prototype.boundsX = function () {
        this.x = Math.min(this.x, this.game.stage.width - this.width)
        this.x = Math.max(this.x, 0)
    }

    exports.Paddle = Paddle

})(window.Telepong)
