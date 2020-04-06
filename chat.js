

const socket = io()



socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#yans').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.info.value

    socket.emit('sendMessage', message)


})