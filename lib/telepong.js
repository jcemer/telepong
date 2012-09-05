window.Telepong = {}

;(function (exports) {

    function init(stage) {
        this.game = new Telepong.Game(stage)
        this.game.render()
        this.game.run()
    }

    exports.init = init

})(window.Telepong)