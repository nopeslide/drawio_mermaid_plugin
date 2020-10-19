import classDiagram from '!!raw-loader!./classDiagram.mmd'
import erDiagram from '!!raw-loader!./erDiagram.mmd'
import gantt from '!!raw-loader!./gantt.mmd'
import graph from '!!raw-loader!./graph.mmd'
import journey from '!!raw-loader!./journey.mmd'
import pie from '!!raw-loader!./pie.mmd'
import sequenceDiagram from '!!raw-loader!./sequenceDiagram.mmd'
import stateDiagram from '!!raw-loader!./stateDiagram.mmd'

Sidebar.prototype.addMermaidPalette = function () {
    var style = 'shadow=0;dashed=0;align=left;strokeWidth=1;shape=mxgraph.mermaid.abstract.mermaid;labelBackgroundColor=#ffffff;noLabel=1;';

    this.addPaletteFunctions('mermaid', 'Mermaid', true, [
        this.createVertexTemplateEntry(style, 300, 300, pie,             'Pie Diagram',             null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'pie ').join(' ')),
        this.createVertexTemplateEntry(style, 500, 300, sequenceDiagram, 'Sequence Diagram',        null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'sequence ').join(' ')),
        this.createVertexTemplateEntry(style, 900, 100, gantt,           'Gantt Diagram',           null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'gantt ').join(' ')),
        this.createVertexTemplateEntry(style, 100, 240, stateDiagram,    'State Diagram',           null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'state ').join(' ')),
        this.createVertexTemplateEntry(style, 300, 200, graph,           'Flow Chart',              null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'flow ').join(' ')),
        this.createVertexTemplateEntry(style, 300, 200, classDiagram,    'Class Diagram',           null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'class ').join(' ')),
        this.createVertexTemplateEntry(style, 700, 300, journey,         'User Journey Diagram',    null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'journey', 'user ').join(' ')),
        this.createVertexTemplateEntry(style, 300, 400, erDiagram,       'Entity Relation Diagram', null, null, this.getTagsForStencil('mxgraph.mermaid.abstract', 'mermaid', 'entity', 'relation', 'er ').join(' ')),
    ]);
}