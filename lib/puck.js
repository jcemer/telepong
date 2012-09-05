;(function (exports) {

    function Puck(game, settings) {
        var key

        this.game = game
        this.width = 10
        this.height = 10

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

    Puck.prototype.checkBoundsX = function () {
        if (this.x >= this.game.stage.width - this.width) {
            this.x = this.game.stage.width - this.width
            this.speedX *= -1
        }

        if (this.x <= 0) {
            this.x = this.x
            this.speedX *= -1
        }
    }

    Puck.prototype.checkBoundsY = function () {
        if (this.y >= this.game.stage.height - this.height){
            this.y = this.game.stage.height - this.height
            this.speedY *= -1

            this.game.floorball()
        }

        if (this.y <= 0) {
            this.y = this.y
            this.speedY *= -1

            this.game.throwball()
            this.away = true
        }
    }

    Puck.prototype.step = function () {
        if (this.away) {
            return
        }

        this.x += this.speedX
        this.y += this.speedY

        this.checkBoundsX()
        this.checkBoundsY()
    }

    exports.Puck = Puck

})(window.Telepong)
