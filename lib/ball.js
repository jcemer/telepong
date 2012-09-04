;(function (exports) {

    function Ball(game, canvas, settings) {
        var key
        this.game = game
        this.canvas = canvas

        // adds defaults to ball
        for (key in Ball.defaults) {
            if (!Ball.defaults.hasOwnProperty(key)) {
                continue
            }
            this[key] = Ball.defaults[key]
        }

        // adds settings to ball
        if (settings) {
            for (key in settings) {
                if (!settings.hasOwnProperty(key)) {
                    continue
                }
                this[key] = settings[key]
            }
        }
    }

    Ball.defaults = {
        width: 10
      , height: 10
      , x: 0
      , y: 0
      , speedX: 0
      , speedY: 0
    }

    Ball.prototype.run = function () {

    }

    Ball.prototype.step = function () {

    }

    Ball.prototype.pause = function () {

    }

    exports.Ball = Ball

})(window.Telepong)