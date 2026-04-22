// --- VARIABLES GLOBALES ---
let listaPedidos = [];
const contenedorBarras = document.getElementById('contenedorBarras');
const cuerpoTabla = document.getElementById('cuerpoTabla');

// --- UTILIDADES ---

// Función para pausar la ejecución y permitir la animación
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Resalta la línea de código actual en el panel izquierdo
function resaltarLinea(numero) {
    // Quitamos el resaltado de todas las líneas anteriores
    document.querySelectorAll('#codigoVisual span').forEach(span => {
        span.classList.remove('linea-activa');
    });
    // Aplicamos el resaltado a la línea solicitada
    const linea = document.getElementById(`linea${numero}`);
    if (linea) linea.classList.add('linea-activa');
}

// --- RENDERIZACIÓN (DIBUJAR INTERFAZ) ---

function actualizarInterfaz() {
    // 1. Limpiar contenedores
    contenedorBarras.innerHTML = '';
    cuerpoTabla.innerHTML = '';

    // Obtener el criterio actual para saber qué valor mostrar en la gráfica
    const criterio = document.getElementById('selectCriterio').value;

    listaPedidos.forEach((pedido, index) => {
        // --- Crear Barra para la Gráfica ---
        const barra = document.createElement('div');
        barra.classList.add('barra');
        barra.id = `barra-${index}`;
        
        // Calculamos altura proporcional (multiplicado para que se vea bien)
        let valorCriterio = pedido[criterio];
        barra.style.height = `${valorCriterio * 2}px`; 
        
        // --- CAMBIO AQUÍ: Numeración estática del índice ---
        barra.innerHTML = `
            <span style="margin-bottom: 5px;">${valorCriterio}</span>
            <small style="position: absolute; bottom: -30px; left: 0; width: 100%; text-align: center; color: #666; font-weight: bold;">
                ${index}
            </small>
        `;
        contenedorBarras.appendChild(barra);

        // --- Crear Fila para la Tabla ---
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.produccion} min</td>
            <td>${pedido.entrega} min</td>
            <td>${pedido.prioridad}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// --- MANEJO DE DATOS ---

function generarAleatorios() {
    listaPedidos = [];
    for (let i = 0; i < 8; i++) {
        listaPedidos.push({
            id: i + 1,
            produccion: Math.floor(Math.random() * 80) + 20,
            entrega: Math.floor(Math.random() * 80) + 20,
            prioridad: Math.floor(Math.random() * 5) + 1
        });
    }
    actualizarInterfaz();
}

function guardarPedidoManual() {
    const prod = parseInt(document.getElementById('inputProduccion').value);
    const ent = parseInt(document.getElementById('inputEntrega').value);
    const prio = parseInt(document.getElementById('inputPrioridad').value);

    if (prod && ent && prio) {
        listaPedidos.push({
            id: listaPedidos.length + 1,
            produccion: prod,
            entrega: ent,
            prioridad: prio
        });
        actualizarInterfaz();
        // Limpiar inputs
        document.getElementById('inputProduccion').value = '';
        document.getElementById('inputEntrega').value = '';
        document.getElementById('inputPrioridad').value = '';
    } else {
        alert("Por favor, completa todos los campos con números.");
    }
}

//                         BUBBLE SORT ANIMADO 

async function ejecutarBubbleSort() {
    const n = listaPedidos.length;
    const criterio = document.getElementById('selectCriterio').value;
    const orden = document.getElementById('selectOrden').value;
    let swapped;

    resaltarLinea(0); await sleep(400);
    resaltarLinea(1); await sleep(400);

    for (let i = 0; i < n - 1; i++) {
        resaltarLinea(2);
        swapped = false;
        resaltarLinea(3);
        await sleep(500);

        for (let j = 0; j < n - i - 1; j++) {
            resaltarLinea(4);
            
            // Seleccionamos las barras actuales  en la grafixa
            const barraA = document.getElementById(`barra-${j}`);
            const barraB = document.getElementById(`barra-${j+1}`);
            barraA.classList.add('comparando');
            barraB.classList.add('comparando');

            resaltarLinea(5);
            await sleep(700); // Pausa para ver la comparación

            let valorA = listaPedidos[j][criterio];
            let valorB = listaPedidos[j+1][criterio];
            
            let debeIntercambiar = (orden === 'asc') ? (valorA > valorB) : (valorA < valorB);

            if (debeIntercambiar) {
                resaltarLinea(6);
                barraA.classList.replace('comparando', 'intercambiando');
                barraB.classList.replace('comparando', 'intercambiando');

                // Swap lógico
                [listaPedidos[j], listaPedidos[j+1]] = [listaPedidos[j+1], listaPedidos[j]];
                
                resaltarLinea(7);
                swapped = true;
                
                await sleep(800);
                actualizarInterfaz(); //    TABLA Y GRAFICAS JUNTAS 
            } else {
                barraA.classList.remove('comparando');
                barraB.classList.remove('comparando');
            }
            resaltarLinea(9); // Cierre del for j
        }

        resaltarLinea(10); // Chequeo del break
        await sleep(600);
        if (!swapped) {
            break; 
        }
        resaltarLinea(11); // Cierre del for i
    }
    resaltarLinea(12);
    alert("Ordenamiento finalizado.");
}

//                     CONEXION BOTONES
document.getElementById('btnAleatorio').addEventListener('click', generarAleatorios);
document.getElementById('btnAgregar').addEventListener('click', guardarPedidoManual);
document.getElementById('btnOrdenar').addEventListener('click', ejecutarBubbleSort);
document.getElementById('selectCriterio').addEventListener('change', actualizarInterfaz);
document.getElementById('selectOrden').addEventListener('change', actualizarInterfaz);
// Inicializar con algunos datos
generarAleatorios();