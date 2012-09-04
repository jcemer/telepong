
describe('Game loop', function(){

    var game

    beforeEach(function(){
        game = new Telepong.Game
    })

    it('should run', function(){
        game.run()
        expect(game.running).toBe(true)
    })

    it('should call the step function', function(){

        runs(function(){
            game.run()
        })

        spyOn(game, 'step')

        waitsFor(function(){
            return game.step.wasCalled
        }, 'game.step() should have been called', 100)

    })

})