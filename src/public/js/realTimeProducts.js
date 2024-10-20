const socket = io()

socket.on('productsList', products=>{
    const productsList = document.getElementById('productsList')
    let prods = ''
    products.forEach(prod => {
        prods += `
                <div class="product">
                    <h3>${prod.title}</h3>
                    <p>${prod.description}</p>
                    <p>Code: ${prod.code}</p>
                    <p>Price: $${prod.price}</p>
                    <p>Stock: ${prod.stock}</p>
                    <p>Category: ${prod.category}</p>
                    <button class="btn-delete" id="${prod.id} ">Delete</button>
                </div>
                `
    });
    productsList.innerHTML = prods

    const btnDeleteProduct = document.querySelectorAll(".btn-delete")

    btnDeleteProduct.forEach(e=>{
        e.addEventListener("click", (evt)=>{
            const idProduct = parseInt(evt.target.id)
            socket.emit('deleting-product', idProduct)
        })
    })
})

const btnForm = document.getElementById("btnForm");
const inputs = document.querySelectorAll(".input");

let newProduct = {};

inputs.forEach(input => {
    input.addEventListener("change", (e) => {
        newProduct[e.target.name] = e.target.value;
    });
});

btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    const hidden = document.querySelector('.hidden');
    
    if (!Object.keys(newProduct).length) {
        hidden.classList.remove('hidden');
    } else {
        newProduct.stock = parseInt(newProduct.stock);
        newProduct.price = parseFloat(newProduct.price);
        
        hidden.classList.add('hidden');
        socket.emit('new-product', newProduct);
        newProduct = {};
        inputs.forEach(input => {
            input.value = "";
        });
    }
});

socket.on('error-agregar-producto', error => {
    console.error('Error al agregar producto:', error);
    alert('Error al agregar producto: ' + error);
});

socket.on('new-product-added', product => {
    console.log('Nuevo producto agregado:', product);
    // Aquí puedes actualizar tu lista localmente si lo deseas
});