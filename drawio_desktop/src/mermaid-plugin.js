import "./shapes/shapeMermaid";
import "./palettes/mermaid/paletteMermaid";
import mermaid from 'mermaid'

/**
 * Constructs a new parse dialog.
 */
var DialogMermaid = function (editorUi, shape) {

  var insertPoint = editorUi.editor.graph.getFreeInsertPoint();

  function parse(text, type, evt) {
      if (editorUi.spinner.spin(document.body, mxResources.get('inserting'))) {
        var graph = editorUi.editor.graph;
        graph.getModel().beginUpdate();
        graph.labelChanged(shape.state.cell,text);
        graph.getModel().endUpdate();
        editorUi.spinner.stop();
  
        if (shape.state.cell != null) {
          graph.setSelectionCell(shape.state.cell);
          graph.scrollCellToVisible(shape.state.cell);
        }
      }
  };


  var div = document.createElement('div');
  div.style = "display: flex; flex-direction: column; padding: 16px; height: inherit;";
  div.innerHTML = `
     <div style="flex: 1; display: flex; flex-direction: row; overflow-y: auto">
      <textarea id="plugin_mermaid_textarea" style="width: 40%; resize: horizontal;"></textarea>
      <div id="plugin_mermaid_preview" style="flex: 1; text-align: center; overflow-y: auto"></div>
     </div>
     <div style="flex: 0 0 4em; display: flex; flex-direction: row; align-items: end">
      <pre id="plugin_mermaid_parserstatus" style="flex: 1; text-align: left;  overflow-x: auto"></pre>
      <div id="plugin_mermaid_buttons" style="flex: initial; text-align: right; align-self: flex-end;">
      <p style="margin-block: unset;">
        <a target="_blank" href="https://mermaid-js.github.io/mermaid/#/./n00b-syntaxReference">[ Syntax ]</a>
      </p><br /></div>
     </div>
     <div style="flex: 0 0 32px;"></div>
    `;

  var textarea = div.querySelector('#plugin_mermaid_textarea');
  // textarea.value = shape.state.cell.value;
  textarea.value = editorUi.editor.graph.convertValueToString(shape.state.cell); // Compatble with cell properties

  
  var parserStatus = div.querySelector('#plugin_mermaid_parserstatus');
  var preview = div.querySelector('#plugin_mermaid_preview');
  var buttons = div.querySelector('#plugin_mermaid_buttons');

  var win_width = 800;
  var win_height = 640;
  if (editorUi.diagramContainer.clientWidth < win_width) win_width = editorUi.diagramContainer.clientWidth - 20;
  if (editorUi.diagramContainer.clientHeight < win_height) win_height = editorUi.diagramContainer.clientHeight - 20;

  var win = new mxWindow("Mermaid", div, 
    (editorUi.diagramContainer.clientWidth - win_width) / 2 + editorUi.diagramContainer.offsetLeft, 
    (editorUi.diagramContainer.clientHeight - win_height) / 2 + editorUi.diagramContainer.offsetTop, 
    win_width, 
    win_height, 
    true, true);
  win.setResizable(true);
  win.setMaximizable(true);
  win.setClosable(true);

  // Enables dropping files
  if (Graph.fileSupport) {
    function handleDrop(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      if (evt.dataTransfer.files.length > 0) {
        var file = evt.dataTransfer.files[0];

        var reader = new FileReader();
        reader.onload = function (e) { textarea.value = e.target.result; };
        reader.readAsText(file);
      }
    };

    function handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    };

    function checkMermaidScript() {
      try {
        mermaid.parse(textarea.value);
        parserStatus.innerHTML = 'no error detected';

        // Display preview
        let insertSvg = function (svgCode, bindFunctions) { 
          preview.innerHTML = svgCode;   /* bindFunctions(preview); */ 
          preview.querySelector('#graph-div').style.height = 'inherit';
        };
        var code = textarea.value;
        preview.innerHTML  = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        mermaid.init(shape.getRenderOptions() , preview);
        if (code) mermaid.render('graph-div', code, insertSvg);

      } catch (e) {
        parserStatus.innerHTML = e.str;
      }
    }
    
    function handleInput(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      checkMermaidScript();
    }
    
    checkMermaidScript();
    // Setup the dnd listeners.
    textarea.addEventListener('dragover', handleDragOver, false);
    textarea.addEventListener('drop', handleDrop, false);
    textarea.addEventListener('input', handleInput, false);
  }

  var cancelBtn = mxUtils.button(mxResources.get('close'), function () {
    win.destroy();
  });

  cancelBtn.className = 'geBtn';

  if (editorUi.editor.cancelFirst) {
    buttons.appendChild(cancelBtn);
  }

  var okBtn = mxUtils.button(mxResources.get('apply'), function (evt) {
    parse(textarea.value, evt);
    win.destroy();
  });
  buttons.appendChild(okBtn);

  okBtn.className = 'geBtn gePrimaryBtn';

  if (!editorUi.editor.cancelFirst) {
    buttons.appendChild(cancelBtn);
  }

  win.show();
  textarea.focus();

};

Draw.loadPlugin(function (ui) {
  // Adds custom sidebar entry
  ui.sidebar.addMermaidPalette();

  ui.editor.graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
    var cell = evt.getProperty("cell");
    if (!cell) {
      return;
    }
    if (cell.style.indexOf("shape=mxgraph.mermaid.abstract.mermaid") < 0) {
      return;
    }

    var shape = ui.editor.graph.view.states["map"][cell.mxObjectId].shape;

    if (shape) {
      var dlg = new DialogMermaid(ui,shape);
    }
    evt.consume();
  });
});
