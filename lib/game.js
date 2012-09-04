;(function(exports){

    function Game(stage, socket) {
        exports.game = this
        this.socket = socket
        this.stage = stage
        this.ctx = stage.getContext('2d')

        this.puck = new Telepong.Puck

        this.setListeners()
    }

    Game.prototype.setListeners = function () {
        var self = this
        this.socket.on('getBall', function(data){
            self.getBall(data)
        })
    }

    Game.prototype.run = function () {
        this.running = true
        this.step()
    }

    Game.prototype.step = function () {
        this.puck.step()
        this.render()
        var self = this
        requestAnimationFrame(function () {
            self.step()
        })
    }

    Game.prototype.stop = function () {
        this.running = false
    }

    Game.prototype.render = function () {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height)

        // ## Puck
        this.ctx.fillStyle = '#EEE'
        this.ctx.fillRect(this.puck.x, this.puck.y, this.puck.width, this.puck.height)
    }

    Game.prototype.passBall = function (puckData) {
        this.socket.emit('passBall', puckData)
    }

    Game.prototype.getBall = function (puckData) {
        this.puck.mirror(puckData)
    }

    exports.Game = Game

})(window.Telepong)
