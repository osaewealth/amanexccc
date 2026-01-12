import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("main.tsx loaded");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
        const errorDiv = document.createElement('div');
      errorDiv.innerHTML = "<h1>Error: Root element not found</h1>";
      document.body.appendChild(errorDiv);
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error rendering app:", error);
          const errorDiv = document.createElement('div');
      errorDiv.style.padding = '20px';
      errorDiv.style.fontFamily = 'Arial, sans-serif';
      
      const errorTitle = document.createElement('h1');
      errorTitle.textContent = 'Error Loading App';
      errorDiv.appendChild(errorTitle);
      
      const errorMessage = document.createElement('p');
      errorMessage.textContent = error instanceof Error ? error.message : 'Unknown error';
      errorDiv.appendChild(errorMessage);
      
      const reloadButton = document.createElement('button');
      reloadButton.textContent = 'Reload Page';
      reloadButton.addEventListener('click', () => window.location.reload());
      errorDiv.appendChild(reloadButton);
      
      rootElement.appendChild(errorDiv);
  }
}
