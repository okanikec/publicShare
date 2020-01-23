const calculateSlope = (y2, y1, x2, x1) => {
    const slope = (y2 - y1)/(x2 - x1)
    return slope
}


const calculateAmount = (p, r, n, t) => {
    const amount = p * Math.pow((1+r/n), n*t)
    return amount
}

const calculateKm = (m) => {
    const Km = m /1000
    return Km
}

const add = (a,b) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }
            
            resolve(a + b)
        }, 2000)
    })
}

module.exports = {
    calculateSlope,
    calculateAmount,
    calculateKm,
    add
}

