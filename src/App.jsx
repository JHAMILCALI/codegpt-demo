import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from "firebase/database";
import './App.css';

function App() {
  // Estado tareas
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Código para cargar el widget codeGPT (tu código original)
  useEffect(() => {
    const script = document.createElement('script');
    script.id = "codeGPTWidgetScript";
    script.type = "module";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-widget-id", "4dcf2feb-cd3d-4334-aae9-cc0f2e928926");
    script.src = "https://widget.codegpt.co/chat-widget.js";
    document.body.appendChild(script);

    const interval = setInterval(() => {
      const button = document.querySelector('button.w-12.h-12');
      const img = document.querySelector('button.w-12.h-12 img#widgetLogo');
      if (button && img) {
        clearInterval(interval);

        // Observador para ocultar logo al abrir chat
        const observer = new MutationObserver(() => {
          const hasSvg = button.querySelector('svg');
          img.style.display = hasSvg ? 'none' : 'block';
        });

        observer.observe(button, { childList: true, subtree: true });
      }
    }, 500);

    const intervalLink = setInterval(() => {
      const chatTitle = document.querySelector('h3#chatTitle');
      if (chatTitle) {
        const link = chatTitle.querySelector('a');
        if (link) {
          link.remove();
          clearInterval(intervalLink);
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(intervalLink);
    };
  }, []);

  // Código para cargar tareas en tiempo real desde RTDB
  useEffect(() => {
    console.log("Escuchando Realtime Database...");
    const tareasRef = ref(db, 'tareas');

    const unsubscribe = onValue(tareasRef, (snapshot) => {
      const data = snapshot.val();
      const lista = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      console.log("Datos RTDB:", lista);
      setTareas(lista);
      setLoading(false);
    });

    return () => {
      // no hay unsubscribe en onValue, pero se puede limpiar con off si se quiere
      // off() no es obligatorio aquí en React
    };
  }, []);

  // Función para agregar tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() === '') return;

    console.log("Agregando a RTDB:", tarea);
    const tareasRef = ref(db, 'tareas');
    push(tareasRef, {
      nombre: tarea,
      creada: new Date().toISOString()
    });
    setTarea('');
  };

  return (
    <div>
      <h1>Lista de Tareas (RTDB)</h1>
      <div  style={{ padding: '2rem' }}>
        <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <p>Cargando tareas desde RTDB...</p>
        ) : tareas.length === 0 ? (
          <p>No hay tareas aún. ¡Agrega una!</p>
        ) : (
          <ul>
            {tareas.map((t) => (
              <li key={t.id}>{t.nombre}</li>
            ))}
          </ul>
        )}
      </div>
      </div>
      
    </div>
  );
}

export default App;
