const { calculateSlope, calculateAmount , calculateKm, add  } = require('../src/math')

test( 'should calculate slope', () => {
    const slope = calculateSlope(5, 2, 4, 3)
    expect(slope).toBe(3)

   
})

test ('should calculate amount', () => {
    const amount = calculateAmount(5000, 0.05, 12, 10)
    expect(amount).toBe(8235.04748845143) 
})

test ('should calculate kilometers from meters', () => {
    const Km = calculateKm(1000)
    expect(Km).toBe(1)
})

test ('Should add two numbers', (done) => {
    add(2, 3).then((sum) => { 
        expect(sum).toBe(5)
        done()
    })

})

test('Should add two numbers async/await', async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32)
})

