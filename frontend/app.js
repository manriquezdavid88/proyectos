async function loadProyectos() {
    try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();

        const div = document.getElementById("listaProyectos");
        div.innerHTML = "";

        data.forEach(p => {
            const el = document.createElement("div");
            el.innerHTML = `
                <h3>${p.nombre}</h3>
                <p>${p.descripcion || ""}</p>
                <button onclick="verProyecto(${p.id})">Abrir</button>
            `;
            div.appendChild(el);
        });
    } catch (err) {
        console.error(err);
    }
}

function verProyecto(id) {
    localStorage.setItem("proyectoId", id);
    location.href = "tarea.html";
}
