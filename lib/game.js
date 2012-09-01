;(function(exports){

    function Game(){
        this.step = this.step.bind(this)
    }

    Game.prototype.run = function(){
        this.step()
        this.running = true
    }

    Game.prototype.step = function(){
        requestAnimationFrame(this.step)
    }

    Game.prototype.stop = function(){
        this.running = false
    }

    exports.Game = Game

})(window.Telepong)