/*Requerimiento #1: Configuración Inicial

Crea un directorio donde alojarás tu proyecto e incluye un archivo index.js como punto de entrada.
Inicia Node.js y configura npm usando el comando npm init -y.
Agrega la propiedad "type": "module" en el archivo package.json para habilitar ESModules.
Configura un script llamado start para ejecutar el programa con el comando npm run start.
*/

/* Requerimiento #2: Lógica de Gestión de Productos

Con la base del proyecto lista, ahora necesitamos implementar las funcionalidades principales usando la API FakeStore. 
El sistema debe ser capaz de interpretar comandos ingresados en la terminal y ejecutar las siguientes acciones:

Consultar Todos los Productos:

Si ejecutas npm run start GET products, el programa debe realizar una petición asíncrona a la API y devolver la lista 
completa de productos en la consola.

Ejemplo: npm run start GET products

Consultar un Producto Específico:Si ejecutas npm run start GET products/<productId>, el programa debe obtener y 
mostrar el producto correspondiente al productId indicado.Ejemplo: npm run start GET products/15
*/


/*Crear un Producto Nuevo:

Si ejecutas npm run start POST products <title> <price> <category>, el programa debe enviar una petición POST a
la API para agregar un nuevo producto con los datos proporcionados (title, price, category) y devolver el resultado
 en la consola.

Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras


Eliminar un Producto:

Si ejecutas npm run start DELETE products/<productId>, el programa debe enviar una petición DELETE para 
eliminar el producto correspondiente al productId y devolver la respuesta en la consola.

Ejemplo: npm run start DELETE products/7

*/



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
        console.log("Comando incorrecto. Por favor, utiliza GET, POST o DELETE seguido de los parámetros correspondientes.");
        break;
}   

