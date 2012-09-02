window.Telepong = {}

;(function (exports) {

    function init() {
        // game loop
        this.game = new Telepong.Game

        // board
        this.board = new Telepong.Board
        this.board.init()


        this.game.run()
    }

    exports.init = init
})(window.Telepong)