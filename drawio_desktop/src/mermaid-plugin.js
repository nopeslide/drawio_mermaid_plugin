import "./shapes/shapeMermaid";
import "./palettes/mermaid/paletteMermaid";


Draw.loadPlugin(function (ui) {
  // Adds custom sidebar entry
  ui.sidebar.addMermaidPalette();
});
