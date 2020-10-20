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
  div.style.textAlign = 'right';

  var textarea = document.createElement('textarea');
  textarea.style.resize = 'none';
  textarea.style.width = '100%';
  textarea.style.height = '354px';
  textarea.style.marginBottom = '16px';
  textarea.value = shape.state.cell.value;
  
  div.appendChild(textarea);
  
  var parserStatus = document.createElement('pre');
  parserStatus.style.height = '4em';
  parserStatus.style.width  = '100%';
  parserStatus.style.width  = '100%';
  parserStatus.style.textAlign  = 'left';
  div.appendChild(parserStatus);

  this.init = function () {
    textarea.focus();
  };

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
    editorUi.hideDialog();
  });

  cancelBtn.className = 'geBtn';

  if (editorUi.editor.cancelFirst) {
    div.appendChild(cancelBtn);
  }

  var okBtn = mxUtils.button(mxResources.get('apply'), function (evt) {
    editorUi.hideDialog();
    parse(textarea.value, evt);
  });
  div.appendChild(okBtn);

  okBtn.className = 'geBtn gePrimaryBtn';

  if (!editorUi.editor.cancelFirst) {
    div.appendChild(cancelBtn);
  }

  this.container = div;
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
      ui.showDialog(dlg.container,800,500, true, false);
      dlg.init();
    }
    evt.consume();
  });
});
