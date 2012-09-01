
describe('Game loop', function(){

    var game

    beforeEach(function(){
        game = new Telepong.Game
    })

    it('Should run', function(){
        game.run()
        return game.running
    })

    it('Should call the step function', function(){
        game.run()
        
    })

})