
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
            console.log(game.step.callCount)
            return game.step.callCount > 3
        }, 'game.step() should have been called', 300)

    })

})