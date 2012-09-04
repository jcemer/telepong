describe('Ball', function () {
    var ball

    beforeEach(function () {
        ball = new Telepong.Ball()
    })

    /* TESTS */

    it('saves defaults', function () {
        var defaults = Telepong.Ball.defaults
          , key

        ball = new Telepong.Ball(null)
        for (key in defaults) {
            if (!defaults.hasOwnProperty(key)) {
                continue
            }
            expect(ball[key]).toBe(defaults[key])
        }
    })

    it('saves settings', function () {
        var settings = {
                dummy: 'test'
              , width: 999
            }

        ball = new Telepong.Ball(null, settings)
        expect(ball.dummy).toBe('test')
        expect(ball.width).toBe(999)
    })

})