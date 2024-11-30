const registro = document.getElementById('registro');
const estudiantesTabla = document.querySelector("#Estudiantes tbody");
const modal = document.getElementById('modal');
const msg2 = document.createElement('div');
msg2.classList.add('msg2');
document.body.appendChild(msg2);

let estudianteAEliminar = null;
const estudiantes = [];

function mostrarMensaje(mensaje, esError = false) {
    msg2.textContent = mensaje;
    msg2.style.color = esError ? 'red' : 'black';
    msg2.style.display = 'block';
    
    setTimeout(() => {
        msg2.style.display = 'none';
    }, 3000);
}

function calcularDefinitiva(nota1, nota2, nota3, nota4) {
    return ((nota1 * 0.2) + (nota2 * 0.2) + (nota3 * 0.2) + (nota4 * 0.4)).toFixed(2);
}

registro.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const codigo = registro.codigo.value.trim();
    const nombre = registro.nombre.value.trim();
    const nota1 = parseFloat(registro.nota1.value);
    const nota2 = parseFloat(registro.nota2.value);
    const nota3 = parseFloat(registro.nota3.value);
    const nota4 = parseFloat(registro.nota4.value);

    if ([nota1, nota2, nota3, nota4].some(nota => nota < 0 || nota > 5)) {
        mostrarMensaje("Las notas deben estar entre 0 y 5.", true);
        return;
    }
    const definitiva = calcularDefinitiva(nota1, nota2, nota3, nota4);
    const estado = definitiva >= 3 ? 'Si Aprueba' : 'No Aprueba';
    
    const estudiante = {
        codigo, nombre, nota1, nota2, nota3, nota4, definitiva, estado
    };
    
    estudiantes.push(estudiante);
    agregarEstudianteATabla(estudiante);
    registro.reset();
});
function agregarEstudianteATabla(estudiante) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${estudiante.codigo}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.nota1}</td>
        <td>${estudiante.nota2}</td>
        <td>${estudiante.nota3}</td>
        <td>${estudiante.nota4}</td>
        <td>${estudiante.definitiva}</td>
        <td>${estudiante.estado}</td>

    `;
    estudiantesTabla.appendChild(row);
}



