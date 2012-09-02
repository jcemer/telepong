;(function (exports) {

    function Board() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    Board.prototype.init = function () {
        this.size()
        this.clear()
        document.body.appendChild(this.canvas)
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.size = function () {
        this.canvas.width = document.width
        this.canvas.height = document.height
    }

    exports.Board = Board

})(window.Telepong)