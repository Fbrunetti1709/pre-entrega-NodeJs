/* prueba de consumo de API con nodejs */


console.log("Inicio del programa");

console.log(process.argv);
const args = process.argv.slice(2);

async function obtenerProductos(url) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${url}`);
        const data = await response.json();
        return data;
    }catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}
  

async function crearProducto(producto) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("ID del Producto creado:", data.id);
        }
        
    }catch (error) {
        console.error("Error al crear el producto:", error);
    }
}


async function eliminarProducto(producto) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${producto}`, {
            method: 'DELETE'
        });
        
            const data = await response.json();
            return data;
          
    }catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

switch (args[0]) {
    case "GET":
        console.log(args[0]);
        if (args[1] && args[1] .startsWith("products")) {
            const productos = await obtenerProductos(args[1]);
            console.log(productos)


        }else{
            console.log("Comando no reconocido");
        }
        break;
    case "POST":
        console.log(args[0]);
        if (args[1] && args[2] && args[3] && args[4] && args[1] == "products") {

            await crearProducto({
                title: args[2],
                price: args[3],
                category: args[4]
            });
            console.log("Producto creado exitosamente");

        }else{
            console.log("Comando no reconocido");
            
        }
        break;  
    case "DELETE":
        console.log(args[0]);
        if (args[1].startsWith("products/") &&args[1].length > 9) {
            const id = args[1].split("/")[1];
            const response = await eliminarProducto(id);
            console.log("Producto eliminado exitosamente", response);
        }else {
            console.log("Comando no reconocido"); 
        }
        break;
    default:
        console.log("Comando incorrecto. Por favor, utiliza GET, POST o DELETE seguido de los parámetros correspondientes. Gracias");
        break;
}   

