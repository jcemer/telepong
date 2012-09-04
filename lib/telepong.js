window.Telepong = {}

;(function (exports) {

    function init(stage, socket) {
        this.game = new Telepong.Game(stage, socket)
        this.game.run()
    }

    exports.init = init
    exports.namespace = 'Telepong'
})(window.Telepong)