var mermaid = require('mermaid');

/**
* Extends mxShape.
*/
function mxShapeMermaid(bounds, fill, stroke, strokewidth) {
  mxShape.call(this);
  this.bounds = bounds;
  this.image = '';
  this.error = '';
  this.mermaidOutput = '';
  this.fill = fill;
  this.stroke = stroke;
  this.strokewidth = (strokewidth != null) ? strokewidth : 1;
  this.shadow = false;
};
/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeMermaid, mxImageShape);

mxShapeMermaid.prototype.cst = {
  SHAPE_MERMAID: 'mxgraph.mermaid.abstract.mermaid'
};

mxShapeMermaid.prototype.customProperties = [
  // { name: 'theme_css', dispName: 'theme_css', type: 'string', defVal: "" },
  {
    name: 'theme', dispName: 'theme', type: 'enum', defVal: 'default',
    enumList: [
      { val: 'default', dispName: 'default' },
      { val: 'forest', dispName: 'forest' },
      { val: 'dark', dispName: 'dark' },
      { val: 'neutral', dispName: 'neutral' },
      { val: 'null', dispName: 'null' }
    ]
  },
  { name: 'arrowMarkerAbsolute', dispName: 'arrowMarkerAbsolute', type: 'bool', defVal: false },
  { name: 'flowchart_htmlLabels', dispName: 'flowchart_htmlLabels', type: 'bool', defVal: true },
  {
    name: 'flowchart_curve', dispName: 'flowchart_curve', type: 'enum', defVal: 'linear',
    enumList: [
      { val: 'linear', dispName: 'linear' },
      { val: 'basis', dispName: 'basis' },
      { val: 'cardinal', dispName: 'cardinal' }
    ]
  },
  { name: 'sequence_diagramMarginX', dispName: 'sequence_diagramMarginX', type: 'int', min: 1, max: 1000, defVal: 50 },
  { name: 'sequence_diagramMarginY', dispName: 'sequence_diagramMarginY', type: 'int', min: 1, max: 1000, defVal: 10 },
  { name: 'sequence_actorMargin', dispName: 'sequence_actorMargin', type: 'int', min: 1, max: 1000, defVal: 50 },
  { name: 'sequence_width', dispName: 'sequence_width', type: 'int', min: 1, max: 1000, defVal: 150 },
  { name: 'sequence_height', dispName: 'sequence_height', type: 'int', min: 1, max: 1000, defVal: 65 },
  { name: 'sequence_boxMargin', dispName: 'sequence_boxMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
  { name: 'sequence_boxTextMargin', dispName: 'sequence_boxTextMargin', type: 'int', min: 1, max: 1000, defVal: 5 },
  { name: 'sequence_noteMargin', dispName: 'sequence_noteMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
  { name: 'sequence_messageMargin', dispName: 'sequence_messageMargin', type: 'int', min: 1, max: 1000, defVal: 35 },
  { name: 'sequence_mirrorActors', dispName: 'sequence_mirrorActors', type: 'bool', defVal: true },
  { name: 'sequence_bottomMarginAdj', dispName: 'sequence_bottomMarginAdj', type: 'int', min: 1, max: 1000, defVal: 1 },
  { name: 'sequence_useMaxWidth', dispName: 'sequence_useMaxWidth', type: 'bool', defVal: true },
  { name: 'sequence_rightAngles', dispName: 'sequence_rightAngles', type: 'bool', defVal: false },
  { name: 'sequence_showSequenceNumbers', dispName: 'sequence_showSequenceNumbers', type: 'bool', defVal: false },
  { name: 'gantt_titleTopMargin', dispName: 'gantt_titleTopMargin', type: 'int', min: 1, max: 1000, defVal: 25 },
  { name: 'gantt_barHeight', dispName: 'gantt_barHeight', type: 'int', min: 1, max: 1000, defVal: 20 },
  { name: 'gantt_barGap', dispName: 'gantt_barGap', type: 'int', min: 1, max: 1000, defVal: 4 },
  { name: 'gantt_topPadding', dispName: 'gantt_topPadding', type: 'int', min: 1, max: 1000, defVal: 50 },
  { name: 'gantt_leftPadding', dispName: 'gantt_leftPadding', type: 'int', min: 1, max: 1000, defVal: 75 },
  { name: 'gantt_gridLineStartPadding', dispName: 'gantt_gridLineStartPadding', type: 'int', min: 1, max: 1000, defVal: 35 },
  { name: 'gantt_fontSize', dispName: 'gantt_fontSize', type: 'int', min: 1, max: 1000, defVal: 11 },
  { name: 'gantt_numberSectionStyles', dispName: 'gantt_numberSectionStyles', type: 'int', min: 1, max: 1000, defVal: 4 },
  { name: 'gantt_axisFormat', dispName: 'gantt_axisFormat', type: 'string', defVal: "%Y-%m-%d" },
];

mxShapeMermaid.prototype.getRenderOptions = function () {
  var config = {
    startOnLoad: false,
    theme: mxUtils.getValue(this.style, 'theme', 'default'),
    // themeCSS: mxUtils.getValue(this.style, 'theme_css', ''),
    arrowMarkerAbsolute: mxUtils.getValue(this.style, 'arrowMarkerAbsolute', false),

    flowchart: {
      htmlLabels: mxUtils.getValue(this.style, 'flowchart_htmlLabels', true),
      curve: mxUtils.getValue(this.style, 'flowchart_curve', 'linear'),
    },
    sequence: {
      diagramMarginX: mxUtils.getValue(this.style, 'sequence_diagramMarginX', 50),
      diagramMarginY: mxUtils.getValue(this.style, 'sequence_diagramMarginY', 10),
      actorMargin: mxUtils.getValue(this.style, 'sequence_actorMargin', 50),
      width: mxUtils.getValue(this.style, 'sequence_width', 150),
      height: mxUtils.getValue(this.style, 'sequence_height', 65),
      boxMargin: mxUtils.getValue(this.style, 'sequence_boxMargin', 10),
      boxTextMargin: mxUtils.getValue(this.style, 'sequence_boxTextMargin', 5),
      noteMargin: mxUtils.getValue(this.style, 'sequence_noteMargin', 10),
      messageMargin: mxUtils.getValue(this.style, 'sequence_messageMargin', 35),
      mirrorActors: mxUtils.getValue(this.style, 'sequence_mirrorActors', true),
      bottomMarginAdj: mxUtils.getValue(this.style, 'sequence_bottomMarginAdj', 1),
      useMaxWidth: mxUtils.getValue(this.style, 'sequence_useMaxWidth', true),
      rightAngles: mxUtils.getValue(this.style, 'sequence_rightAngles', false),
      showSequenceNumbers: mxUtils.getValue(this.style, 'sequence_showSequenceNumbers', false),
    },
    gantt: {
      titleTopMargin: mxUtils.getValue(this.style, 'gantt_titleTopMargin', 25),
      barHeight: mxUtils.getValue(this.style, 'gantt_barHeight', 20),
      barGap: mxUtils.getValue(this.style, 'gantt_barGap', 4),
      topPadding: mxUtils.getValue(this.style, 'gantt_topPadding', 50),
      leftPadding: mxUtils.getValue(this.style, 'gantt_leftPadding', 75),
      gridLineStartPadding: mxUtils.getValue(this.style, 'gantt_gridLineStartPadding', 35),
      fontSize: mxUtils.getValue(this.style, 'gantt_fontSize', 11),
      numberSectionStyles: mxUtils.getValue(this.style, 'gantt_numberSectionStyles', 4),
      axisFormat: mxUtils.getValue(this.style, 'gantt_axisFormat', '%Y-%m-%d'),
    }
  };
  return config;
}

mxShapeMermaid.prototype.updateImage = function () {
  try {
    var container = document.querySelector("#cmermaid-" + this.state.cell.id)
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", "cmermaid-" + this.state.cell.id);
      document.body.appendChild(container);
    }
    var element = document.querySelector("#mermaid-" + this.state.cell.id);
    if (!element) {
      element = document.createElement("svg");
      element.setAttribute("style", "display:none;");
      element.setAttribute("width", "100");
      element.setAttribute("height", "100");
      element.setAttribute("id", "mermaid-" + this.state.cell.id);
      container.appendChild(element);
    }

    mermaid.mermaidAPI.initialize(
      this.getRenderOptions()
    );

    mermaid.mermaidAPI.render('mermaid-' + this.state.cell.id, this.state.cell.value, (svg) => { this.mermaidOutput = svg; }, container);
    this.image = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this.mermaidOutput)));
    this.error = '';
  } catch (err) {
    this.error = err.message;
    console.log(err.message);
  }
}

/**
* Function: paintVertexShape
* Untitled Diagram.drawio
* Paints the vertex shape.
*/
mxShapeMermaid.prototype.paintVertexShape = function (c, x, y, w, h) {
  if (!this.image) {
    this.updateImage();
  }
  try {
    if (!this.error) {
      c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false);
    }
  } catch (err) {
    this.error = err.message;
  }
  if (this.error) {
    c.setFontFamily('monospace');
    c.text(x, y+h/2, 0, 0, '<pre>' + this.error + '</pre>', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, false, 'html', 0, 0, 0);
    c.stroke();
  }
  this.state.cell.valueChanged = (value) => { var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); return lastValue; }
}

mxCellRenderer.registerShape(mxShapeMermaid.prototype.cst.SHAPE_MERMAID, mxShapeMermaid);

mxShapeMermaid.prototype.getConstraints = function (style, w, h) {
  var constr = [];
  return constr;
}

Sidebar.prototype.addMermaidPalette = function () {
  var style = 'shadow=0;dashed=0;align=left;strokeWidth=1;shape=mxgraph.mermaid.abstract.mermaid;labelBackgroundColor=#ffffff;noLabel=1;';
  var pie = `pie title What Voldemort doesn't have?
         "FRIENDS" : 2
         "FAMILY" : 3
         "NOSE" : 45`;
  var sequence = `sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?`;
  var gantt = `gantt
apple :a, 2017-07-20, 1w
banana :crit, b, 2017-07-23, 1d
cherry :active, c, after b a, 1d
`;
  var state = `stateDiagram
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`;
  var graph = `graph LR
   a --> b & c--> d
`;
  var classDiagram = `classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal <|-- Zebra
      Animal : +int age
      Animal : +String gender
      Animal: +isMammal()
      Animal: +mate()
      class Duck{
          +String beakColor
          +swim()
          +quack()
      }
      class Fish{
          -int sizeInFeet
          -canEat()
      }
      class Zebra{
          +bool is_wild
          +run()
      }
`;

  this.addPaletteFunctions('mermaid', 'Mermaid', true, [
    this.createVertexTemplateEntry(style, 300, 300, pie, 'Pie Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'pie ').join(' ')),
    this.createVertexTemplateEntry(style, 490, 300, sequence, 'Sequence Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'sequence ').join(' ')),
    this.createVertexTemplateEntry(style, 900, 100, gantt, 'Gantt Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'gantt ').join(' ')),
    this.createVertexTemplateEntry(style, 100, 240, state, 'State Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'state ').join(' ')),
    this.createVertexTemplateEntry(style, 280, 200, graph, 'Flow Chart', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'flow ').join(' ')),
    // this.createVertexTemplateEntry(style, 340, 200, classDiagram, 'Class Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'class ').join(' ')),
  ]);
}

Draw.loadPlugin(function (ui) {
  // Adds custom sidebar entry
  ui.sidebar.addMermaidPalette();
});
