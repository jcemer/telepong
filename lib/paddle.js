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
