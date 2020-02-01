var mermaid = require('mermaid');

mermaid.mermaidAPI.initialize({
  startOnLoad:false
});

/**
* Extends mxShape.
*/
function mxShapeMermaid(bounds, fill, stroke, strokewidth) {
	mxShape.call(this);
	this.bounds = bounds;
	this.image = '';
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
];

mxShapeMermaid.prototype.updateImage = function () {
	if (!document.querySelector("#mermaid")) {
		var element = document.createElement("svg");
		element.setAttribute("style","display:none;");
		element.setAttribute("width","100");
		element.setAttribute("height","100");
		element.setAttribute("id","mermaid");
		document.body.appendChild(element);
	}
	mermaid.mermaidAPI.render('mermaid',this.state.cell.value, (svg) => { this.mermaidOutput = svg; });
	this.image = 'data:image/svg+xml;base64,' + btoa(this.mermaidOutput);
}

/**
* Function: paintVertexShape
* Untitled Diagram.drawio
* Paints the vertex shape.
*/
mxShapeMermaid.prototype.paintVertexShape = function (c, x, y, w, h) {
	c.root.setAttribute('id','123');
	if (!this.image) {
		this.updateImage();
	}
	c.image(x, y, w, h, this.image, this.preserveImageAspect, false, false);
	this.state.cell.valueChanged = (value) => { mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); }
}

mxCellRenderer.registerShape(mxShapeMermaid.prototype.cst.SHAPE_MERMAID, mxShapeMermaid);

mxShapeMermaid.prototype.getConstraints = function (style, w, h) {
	var constr = [];
	return constr;
}

Sidebar.prototype.addMermaidPalette = function() {
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

  this.addPaletteFunctions('mermaid','Mermaid', true, [
    this.createVertexTemplateEntry(style, 300, 300, pie,          'Pie Diagram',      null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'pie ').join(' ')),
    this.createVertexTemplateEntry(style, 490, 300, sequence,     'Sequence Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'sequence ').join(' ')),
    this.createVertexTemplateEntry(style, 900, 100, gantt,        'Gantt Diagram',    null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'gantt ').join(' ')),
    this.createVertexTemplateEntry(style, 100, 240, state,        'State Diagram',    null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'state ').join(' ')),
    this.createVertexTemplateEntry(style, 280, 200, graph,        'Flow Chart',       null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'flow ').join(' ')),
    this.createVertexTemplateEntry(style, 340, 200, classDiagram, 'Class Diagram',    null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'class ').join(' ')),
  ]);
}
  
Draw.loadPlugin(function(ui) {
  // Adds custom sidebar entry
  ui.sidebar.addMermaidPalette();
});
