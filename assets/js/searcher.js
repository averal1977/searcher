//Funcion para armar plantilla que se va inyectar al HTML
let plantilla = (src, name, type, price) => `
<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
    <div class="card card-blog card-plain">
    <div class="card-header p-0 mt-n4 mx-3">
        <a class="d-block shadow-xl border-radius-xl">
        <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
        </a>
    </div>
    <div class="card-body p-3">
        <p class="mb-0 text-sm">${type}</p>
        <a href="javascript:;">
        <h5>
            ${name}
        </h5>
        </a>
        <p class="mb-4 text-sm">
        <b>Price: </b> $ ${price}
        </p>
    </div>
    </div>
</div>`;


//Cargar todos los productos
let loadProducts = () => {
    document.getElementById("salida").innerHTML = ``;
    fetch("https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json")
    .then(response => response.json())
    .then(productsJson => {
        productsJson.forEach(productJson => {
            let {src, name, type, price} = productJson;
            document.getElementById("salida").innerHTML += plantilla(src, name, type, price);
        });
    })

    fetch("https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml")
    .then(response => response.text())
    .then(productsXml => {
        let prodXml = (new DOMParser()).parseFromString(productsXml, 'application/xml');

        let arrayProd = prodXml.getElementsByTagName("product")

        for(let product of arrayProd)  {
            let name = product.getElementsByTagName("name")[0].innerHTML;
            let price = product.getElementsByTagName("price")[0].innerHTML;
            let src = product.getElementsByTagName("src")[0].innerHTML;
            let type = product.getElementsByTagName("type")[0].innerHTML;
            document.getElementById("salida").innerHTML += plantilla(src, name, type, price);
        };
    })

}

loadProducts()


//Buscar un producto por su nombre o tipo
let loadProductsEspecif = (textSearch) => {
    //console.log(textSearch)
    document.getElementById("salida").innerHTML = ``;
    
    fetch("https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json")
    .then(response => response.json())
    .then(productsJson => {
        let searchProduct= productsJson.filter( e => e.name.includes(textSearch) || e.type.includes(textSearch));
        console.log (searchProduct);

        searchProduct.forEach ((object) => {
            let {src, name, type, price} = object;
            document.getElementById("salida").innerHTML += plantilla(src, name, type, price);                
        });
                 
    })  
    
    fetch("https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml")
    .then(response => response.text())
    .then(productsXml => {
        let prodXml = (new DOMParser()).parseFromString(productsXml, 'application/xml');

        let arrayProd = prodXml.getElementsByTagName("product")

        //console.log(arrayProd);

        for(let product of arrayProd)  {
            let name = product.getElementsByTagName("name")[0].innerHTML
            let type = product.getElementsByTagName("type")[0].innerHTML

            if (name.includes(textSearch) || name.includes(textSearch)) {
                let price = product.getElementsByTagName("price")[0].innerHTML
                let src = product.getElementsByTagName("src")[0].innerHTML            
                document.getElementById("salida").innerHTML += plantilla(src, name, type, price);          
            }            
        }  
              
    })
}


let botonCargar = document.getElementById("filter");
botonCargar.addEventListener('click', (event) => {
    let textSearch = document.getElementById("text").value;
    if (textSearch.trim().length === 0) {
        alert("Debe ingresar el texto a buscar...");
    }
    else {
        loadProductsEspecif(textSearch.trim());    
    } 
});
