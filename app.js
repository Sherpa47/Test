// app.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('evento.json')
        .then(response => response.json())
        .then(data => {
            const eventosContainer = document.getElementById('eventos-container');
            eventosContainer.innerHTML = ''; // Limpiar el loader

            data.forEach(deporte => {
                const deporteSection = document.createElement('section');
                deporteSection.classList.add('deporte');

                const title = document.createElement('h2');
                title.textContent = deporte.deporte;

                // Contenedor para los eventos, inicialmente oculto
                const eventosList = document.createElement('div');
                eventosList.classList.add('eventos-list');
                eventosList.style.display = 'none';

                deporte.eventos.forEach(evento => {
                    const eventoCard = document.createElement('div');
                    eventoCard.classList.add('evento');

                    const hora = document.createElement('p');
                    hora.classList.add('hora');
                    hora.textContent = `Hora: ${evento.hora}`;

                    const descripcion = document.createElement('p');
                    descripcion.classList.add('descripcion');
                    descripcion.textContent = evento.evento;

                    const acestreamLinks = document.createElement('div');
                    acestreamLinks.classList.add('acestream-links');
                    evento.acestream_ids.forEach((id, index) => {
                        const link = document.createElement('a');
                        link.href = `acestream://${id}`;
                        link.target = '_blank';
                        link.textContent = `CANAL ${index + 1}`;
                        acestreamLinks.appendChild(link);
                    });

                    eventoCard.appendChild(hora);
                    eventoCard.appendChild(descripcion);
                    eventoCard.appendChild(acestreamLinks);

                    eventosList.appendChild(eventoCard);
                });

                // AÃ±adir evento para mostrar/ocultar eventos
                title.addEventListener('click', () => {
                    eventosList.style.display = eventosList.style.display === 'none' ? 'block' : 'none';
                });

                deporteSection.appendChild(title);
                deporteSection.appendChild(eventosList);
                eventosContainer.appendChild(deporteSection);
            });
        })
        .catch(error => {
            console.error('Error al cargar los eventos:', error);
        });
});
