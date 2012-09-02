;(function (exports) {

    function Board() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
    }

    Board.prototype.init = function () {
        document.body.appendChild(this.canvas)
        this.resize()
        this.clear()
    }

    Board.prototype.clear = function () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Board.prototype.resize = function () {
        this.canvas.width = document.width
        this.canvas.height = document.height
    }

    exports.Board = Board

})(window.Telepong)