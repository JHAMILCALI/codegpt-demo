import './App.css';
import { useEffect } from 'react';

function App() {

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

        // Observador del botón para ocultar logo al abrir chat
        const observer = new MutationObserver(() => {
          const hasSvg = button.querySelector('svg');
          if (hasSvg) {
            img.style.display = 'none';
          } else {
            img.style.display = 'block';
          }
        });

        observer.observe(button, { childList: true, subtree: true });
      }
    }, 500);

    // ➡ Observador para quitar el link <a> del chat title
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

  return (
    <>
      <h1>CAMBIO DE ICONO DE CODE GPT</h1>
    </>
  );
}

export default App;
