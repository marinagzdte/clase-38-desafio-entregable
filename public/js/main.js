const socket = io.connect();

function addProduct(e) {
    const product = {
        title: document.getElementById('product-title').value,
        price: document.getElementById('product-price').value,
        thumbnail: document.getElementById('product-thumbnail').value
    };
    socket.emit('new-product', product);
};

function sendChatMessage(e) {
    const chatMessage = {
        author: {
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value,
        timestamp: new Date()
    }
    socket.emit('new-chat-message', chatMessage);

}

function resetForm() {
    document.getElementById('product-title').value = "";
    document.getElementById('product-price').value = "";
    document.getElementById('product-thumbnail').value = "";
}

function resetChatBox() {
    document.getElementById('message').value = "";
}

socket.on('products', data => {
    console.log(data)
    fetch('../views/products.hbs')
        .then(res => res.text())
        .then(text => Handlebars.compile(text))
        .then(del => {
            var html = del(data)
            document.getElementById('product-div').innerHTML = html;
        });
})

socket.on('messages', data => {
    fetch('../views/messages.hbs')
        .then(res => res.text())
        .then(text => Handlebars.compile(text))
        .then(del => {
            data.messages = data.messages.sort(function (x, y) {
                return new Date(x.timestamp) - new Date(y.timestamp)
            })
            var html = del(data)
            document.getElementById('chat-div').innerHTML = html;
        });
})

if (document.readyState === 'complete') {
    document.onkeyup = (e) => {
        if (e.target.tagName === 'INPUT') {
            const canSubmit = [...document.forms.form.querySelectorAll('input[type="text"],input[type="url"],input[type="number"]')]
                .every(i => {
                    return i.value
                })
            document.forms.form.querySelector('button[type="submit"]').disabled = !canSubmit
        }
    }
}