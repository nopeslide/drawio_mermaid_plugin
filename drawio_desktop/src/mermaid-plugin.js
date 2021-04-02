import { mermaid_plugin_defaults,  mxShapeMermaid } from "./shapes/shapeMermaid";
import "./palettes/mermaid/paletteMermaid";
import mermaid from 'mermaid'

import merge from 'deepmerge'
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff'
import isObject from 'is-object'

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
        // To replace valueChanged in mxShapeMermaid.prototype.paintVertexShape
        shape.updateImage(); 
        shape.redraw();
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
      <p style="margin-block: unset; font-size: 90%"> 
        <br />Download as |
        <a id="plugin_mermaid_button_dl_svg" href="#">SVG</a> |
        <a id="plugin_mermaid_button_dl_png" href="#">PNG</a> | 
        <br />Copy as |
        <span style="display: none;"><a id="plugin_mermaid_button_html" href="#">HTML</a> | </span>
        <span style="display: none;"><a id="plugin_mermaid_button_svg" href="#">SVG</a> |  </span>
        <a id="plugin_mermaid_button_png" href="#">PNG</a> | 
        <br />Help | 
        <a target="_blank" href="https://mermaid-js.github.io/mermaid/#/./n00b-syntaxReference">Syntax</a> |
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

  // Handle copy
  function generateCanvas(callback, background=null) {
    var svg = div.querySelector('#graph-div');

    // https://stackoverflow.com/questions/60551658/saving-offscreencanvas-content-to-disk-as-png-in-electron
    // https://stackoverflow.com/questions/32230894/convert-very-large-svg-to-png-using-canvas
    //var svg_xml = (new XMLSerializer()).serializeToString(svg);
    //var blob = new Blob([svg_xml], {type:'image/svg+xml;charset=utf-8'});
    //var url = window.URL.createObjectURL(blob);
    var url = "data:image/svg+xml;base64," +  btoa(unescape(encodeURIComponent(div.querySelector('#graph-div').outerHTML)));

    var scale = 3;
    var img = new Image();
    img.width = svg.getBBox().width * scale ;
    img.height = svg.getBBox().height * scale ;
    img.onload = () => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = svg.getBBox().width * scale;
        canvas.height = svg.getBBox().height * scale;

        // Add a white background to cope with the transparent image problem getting black on windows...
        if (background) {
          context.fillStyle = background;
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        context.drawImage(img, svg.getBBox().x * scale, svg.getBBox().y * scale, svg.getBBox().width * scale, svg.getBBox().height * scale);
        window.URL.revokeObjectURL(url);

        callback(canvas);
    }
    img.src = url;  
  }

  div.querySelector('#plugin_mermaid_button_dl_svg').onclick = async function() {
    var aDownloadLink = document.createElement('a');
    aDownloadLink.download = 'image.svg';
    aDownloadLink.href = "data:image/svg+xml;base64," +  btoa(unescape(encodeURIComponent(div.querySelector('#graph-div').outerHTML)));
    aDownloadLink.click();
  }
  
  div.querySelector('#plugin_mermaid_button_dl_png').onclick = async function() {
    generateCanvas(function(canvas) {
      var aDownloadLink = document.createElement('a');
      aDownloadLink.download = 'image.png';
      aDownloadLink.href = canvas.toDataURL();
      aDownloadLink.click();
    });
  }
  
  div.querySelector('#plugin_mermaid_button_png').onclick = async function() {
      generateCanvas(function(canvas) {
        canvas.toBlob(function(imgBlob) {
          navigator.clipboard.write( [ new ClipboardItem({[imgBlob.type]: imgBlob }) ] );
        }, 'image/png');
      }, 'white');
  }

  // (hidden) Buggy - Oddly makes the whole electron stop working... 
  div.querySelector('#plugin_mermaid_button_svg').onclick = async function() {
    var svg_xml = (new XMLSerializer()).serializeToString(div.querySelector('#graph-div'));
    var svg_blob = new Blob([svg_xml], {type : 'image/svg+xml;charset=utf-8'});
    var clip_item = new ClipboardItem( {'image/svg+xml': svg_blob } );
    navigator.clipboard.write( [ clip_item  ] );
  }
  
  // (hidden) Tested, but not very usefull as not much destination applications support it... (Libreoffice Writer, with poor SVG render) 
  div.querySelector('#plugin_mermaid_button_html').onclick = async function() {
    navigator.clipboard.write( [ new ClipboardItem(
      { 'text/html' : new Blob(["<img src='" + "data:image/svg+xml;base64," + 
            btoa(unescape(encodeURIComponent(div.querySelector('#graph-div').outerHTML))) + "'>"], {type : 'text/html'}) }) ]
    );
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

  // Build mermaid settings : by least order
  // - mermaid_plugin_defaults : this plugin defaults
  // - EditorUi.defaultMermaidConfig : drawio defaults mermaid
  // - Editor.config.defaultMermaidConfig : drawio config (from PreConfig and local configuration)

  let mermaid_settings = {};
  mermaid_settings = merge(mermaid_settings, mermaid_plugin_defaults);
  try {
    mermaid_settings = merge(mermaid_settings, window.EditorUi.defaultMermaidConfig);
  } catch (e) {
    if (!e instanceof TypeError) {
      throw e;
    }
  }
  try {
    mermaid_settings = merge(mermaid_settings, window.Editor.config.defaultMermaidConfig);
  } catch (e) {
    if (!e instanceof TypeError) {
      throw e;
    }
  }

  // Result is updated back in EditorUi.defaultMermaidConfig to have consistent settings with native mermaid
  // Note that the result will not be consistent if the diagram is updated in native mermaid without the plugin, 
  // but no solution would be perfect until native mermaid allow some configuration...
  // As mermaid version are not the same between native mermaid and the plugin one, render may be different.
  window.EditorUi.defaultMermaidConfig = mermaid_settings;

  // Handle defaults
  Object.assign(mermaid_plugin_defaults, mermaid_settings);
  mxShapeMermaid.prototype.customProperties = mxShapeMermaid.prototype.buildCustomProperties(mermaid_settings);

  // Adds custom sidebar entry
  ui.sidebar.addMermaidPalette();

  function isCellPluginMermaid(cell) {
    if (!cell) {
      return false;
    }
    if (cell.style.indexOf("shape=mxgraph.mermaid.abstract.mermaid") < 0) {
      return false;
    }
    return true;
  }

  function isCellNativeMermaid(cell) {
    if (!cell) { return false; }
    if (mxUtils.isNode(cell.value)) {
      if (cell.getAttribute('mermaidData', '') != '') {
        return true;
      }
    }
    return false;
  }

  ui.editor.graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
    var cell = evt.getProperty("cell");
    if (isCellPluginMermaid(cell)) {
      var shape = ui.editor.graph.view.states["map"][cell.mxObjectId].shape;

      if (shape) {
        var dlg = new DialogMermaid(ui,shape);
      }
      evt.consume();
    }
  });

  // Add convert menus
	mxResources.parse('mermaidconvertfrom=Convert to Mermaid plugin shape...');
	mxResources.parse('mermaidconvertto=Convert to native Mermaid shape...');

  var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		var graph = ui.editor.graph;
    var cell = graph.getSelectionCell();
		
		if (isCellPluginMermaid(cell)) {
			this.addMenuItems(menu, ['-', 'mermaidconvertto'], null, evt);
		}

		if (isCellNativeMermaid(cell)) {
			this.addMenuItems(menu, ['-', 'mermaidconvertfrom'], null, evt);
		}

	};

	ui.actions.addAction('mermaidconvertto', function()
	{
		let graph =ui.editor.graph ;
    let cell = graph.getSelectionCell();
    if (!isCellPluginMermaid(cell)) return;

    graph.getModel().beginUpdate();
    try
    {
      let state = graph.view.getState(cell, true);
      let mermaidData = JSON.stringify({data: graph.convertValueToString(cell), config: state.shape.getRenderOptions() /*getStyleOptions()*/}, null, 2)
      state.shape.redraw();
      let image = state.shape.image.replace(";base64",""); // ;base64 breaks the style
      graph.setCellStyle('shape=image;noLabel=1;verticalAlign=top;imageAspect=1;' + 'image=' + image + ';', [cell]);
      graph.setAttributeForCell(cell, 'mermaidData', mermaidData );
      
      graph.view.getState(cell, true).destroy();
      graph.view.getState(cell, true);
    }
    finally
    {
      graph.getModel().endUpdate();
    }

	});


	ui.actions.addAction('mermaidconvertfrom', function()
	{
    let graph = ui.editor.graph;
		let cell = graph.getSelectionCell();
    if (!isCellNativeMermaid(cell)) return;

		try	{

      graph.getModel().beginUpdate();

      var data = JSON.parse(cell.getAttribute('mermaidData', ''));

      // Default style from paletteMermaid
      let style = 'shadow=0;dashed=0;align=left;strokeWidth=1;shape=mxgraph.mermaid.abstract.mermaid;labelBackgroundColor=#ffffff;noLabel=1;';

      function addToStyle(basestyle, value) {
        if (isObject(value)) {
          for(let key in value) {
            addToStyle( (basestyle == '') ? key : basestyle + "_" + key ,  value[key] );
          }
        } else {
          style += encodeURI(basestyle) + "=" + encodeURI(value) + ";";
        }
      }  

      let configDiff = diff(mermaid_plugin_defaults, data.config);
      addToStyle('', configDiff);

      // cell.value = data.data;
      graph.setAttributeForCell(cell, 'mermaidData', "" );
      graph.labelChanged(cell,data.data);

      graph.setCellStyle(style, [cell]);

      graph.view.getState(cell, true).destroy();
      graph.view.getState(cell, true);

    } 
    catch (error) 
    {
      console.error(error);
    } 
    finally 
    {
      graph.getModel().endUpdate();
    }

	});





});



