import mermaid from 'mermaid'

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

    { name: 'flowchart_diagramPadding', dispName: 'flowchart_diagramPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: 8 },
    { name: 'flowchart_htmlLabels', dispName: 'flowchart_htmlLabels', type: 'bool', defVal: true },
    { name: 'flowchart_nodeSpacing', dispName: 'flowchart_nodeSpacing', type: 'int', minVal: 1, maxVal: 1000, defVal: 50 },
    { name: 'flowchart_rankSpacing', dispName: 'flowchart_rankSpacing', type: 'int', minVal: 1, maxVal: 1000, defVal: 50 },
    {
        name: 'flowchart_curve', dispName: 'flowchart_curve', type: 'enum', defVal: 'linear',
        enumList: [
            { val: 'linear', dispName: 'linear' },
            { val: 'basis', dispName: 'basis' },
            { val: 'cardinal', dispName: 'cardinal' }
        ]
    },
    { name: 'flowchart_padding', dispName: 'flowchart_padding', type: 'int', minVal: 1, maxVal: 1000, defVal: 15 },
    { name: 'flowchart_useMaxWidth', dispName: 'flowchart_useMaxWidth', type: 'bool', defVal: true },

    { name: 'sequence_activationWidth', dispName: 'sequence_activationWidth', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'sequence_diagramMarginX', dispName: 'sequence_diagramMarginX', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'sequence_diagramMarginY', dispName: 'sequence_diagramMarginY', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'sequence_actorMargin', dispName: 'sequence_actorMargin', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'sequence_width', dispName: 'sequence_width', type: 'int', min: 1, max: 1000, defVal: 150 },
    { name: 'sequence_height', dispName: 'sequence_height', type: 'int', min: 1, max: 1000, defVal: 65 },
    { name: 'sequence_boxMargin', dispName: 'sequence_boxMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'sequence_boxTextMargin', dispName: 'sequence_boxTextMargin', type: 'int', min: 1, max: 1000, defVal: 5 },
    { name: 'sequence_noteMargin', dispName: 'sequence_noteMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'sequence_messageMargin', dispName: 'sequence_messageMargin', type: 'int', min: 1, max: 1000, defVal: 35 },
    {
        name: 'sequence_messageAlign', dispName: 'sequence_messageAlign', type: 'enum', defVal: 'center',
        enumList: [
            { val: 'center', dispName: 'center' },
            { val: 'left', dispName: 'left' },
            { val: 'right', dispName: 'right' }
        ]
    },
    { name: 'sequence_mirrorActors', dispName: 'sequence_mirrorActors', type: 'bool', defVal: true },
    { name: 'sequence_bottomMarginAdj', dispName: 'sequence_bottomMarginAdj', type: 'int', min: 1, max: 1000, defVal: 1 },
    { name: 'sequence_useMaxWidth', dispName: 'sequence_useMaxWidth', type: 'bool', defVal: true },
    { name: 'sequence_rightAngles', dispName: 'sequence_rightAngles', type: 'bool', defVal: false },
    { name: 'sequence_showSequenceNumbers', dispName: 'sequence_showSequenceNumbers', type: 'bool', defVal: false },
    { name: 'sequence_actorFontSize', dispName: 'sequence_actorFontSize', type: 'int', min: 1, max: 1000, defVal: 14 },
    { name: 'sequence_actorFontFamily', dispName: 'sequence_actorFontFamily', type: 'string', defVal: '"Open-Sans", "sans-serif"' },
    { name: 'sequence_actorFontWeight', dispName: 'sequence_actorFontWeight', type: 'int', min: 1, max: 1000, defVal: 400 },
    { name: 'sequence_noteFontSize', dispName: 'sequence_noteFontSize', type: 'int', min: 1, max: 1000, defVal: 14 },
    { name: 'sequence_noteFontFamily', dispName: 'sequence_noteFontFamily', type: 'string', defVal: '"trebuchet ms", verdana, arial' },
    { name: 'sequence_noteFontWeight', dispName: 'sequence_noteFontWeight', type: 'int', min: 1, max: 1000, defVal: 400 },
    {
        name: 'sequence_noteAlign', dispName: 'sequence_noteAlign', type: 'enum', defVal: 'center',
        enumList: [
            { val: 'center', dispName: 'center' },
            { val: 'left', dispName: 'left' },
            { val: 'right', dispName: 'right' }
        ]
    },
    { name: 'sequence_messageFontSize', dispName: 'sequence_messageFontSize', type: 'int', min: 1, max: 1000, defVal: 16 },
    { name: 'sequence_messageFontFamily', dispName: 'sequence_messageFontFamily', type: 'string', defVal: '"trebuchet ms", verdana, arial' },
    { name: 'sequence_messageFontWeight', dispName: 'sequence_messageFontWeight', type: 'int', min: 1, max: 1000, defVal: 400 },
    { name: 'sequence_wrap', dispName: 'sequence_wrap', type: 'bool', defVal: false },
    { name: 'sequence_wrapPadding', dispName: 'sequence_wrapPadding', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'sequence_labelBoxWidth', dispName: 'sequence_labelBoxWidth', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'sequence_labelBoxHeight', dispName: 'sequence_labelBoxHeight', type: 'int', min: 1, max: 1000, defVal: 20 },

    { name: 'gantt_titleTopMargin', dispName: 'gantt_titleTopMargin', type: 'int', min: 1, max: 1000, defVal: 25 },
    { name: 'gantt_barHeight', dispName: 'gantt_barHeight', type: 'int', min: 1, max: 1000, defVal: 20 },
    { name: 'gantt_barGap', dispName: 'gantt_barGap', type: 'int', min: 1, max: 1000, defVal: 4 },
    { name: 'gantt_topPadding', dispName: 'gantt_topPadding', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'gantt_leftPadding', dispName: 'gantt_leftPadding', type: 'int', min: 1, max: 1000, defVal: 75 },
    { name: 'gantt_gridLineStartPadding', dispName: 'gantt_gridLineStartPadding', type: 'int', min: 1, max: 1000, defVal: 35 },
    { name: 'gantt_fontSize', dispName: 'gantt_fontSize', type: 'int', min: 1, max: 1000, defVal: 11 },
    { name: 'gantt_fontFamily', dispName: 'gantt_fontFamily', type: 'string', defVal: '"Open-Sans", "sans-serif"' },
    { name: 'gantt_numberSectionStyles', dispName: 'gantt_numberSectionStyles', type: 'int', min: 1, max: 1000, defVal: 4 },
    { name: 'gantt_axisFormat', dispName: 'gantt_axisFormat', type: 'string', defVal: "%Y-%m-%d" },
    { name: 'gantt_useMaxWidth', dispName: 'gantt_useMaxWidth', type: 'bool', defVal: true },

    { name: 'journey_diagramMarginX', dispName: 'journey_diagramMarginX', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'journey_diagramMarginY', dispName: 'journey_diagramMarginY', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'journey_actorMargin', dispName: 'journey_actorMargin', type: 'int', min: 1, max: 1000, defVal: 50 },
    { name: 'journey_width', dispName: 'journey_width', type: 'int', min: 1, max: 1000, defVal: 150 },
    { name: 'journey_height', dispName: 'journey_height', type: 'int', min: 1, max: 1000, defVal: 65 },
    { name: 'journey_boxMargin', dispName: 'journey_boxMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'journey_boxTextMargin', dispName: 'journey_boxTextMargin', type: 'int', min: 1, max: 1000, defVal: 5 },
    { name: 'journey_noteMargin', dispName: 'journey_noteMargin', type: 'int', min: 1, max: 1000, defVal: 10 },
    { name: 'journey_messageMargin', dispName: 'journey_messageMargin', type: 'int', min: 1, max: 1000, defVal: 35 },
    {
        name: 'journey_messageAlign', dispName: 'journey_messageAlign', type: 'enum', defVal: 'center',
        enumList: [
            { val: 'center', dispName: 'center' },
            { val: 'left', dispName: 'left' },
            { val: 'right', dispName: 'right' }
        ]
    },
    { name: 'journey_bottomMarginAdj', dispName: 'journey_bottomMarginAdj', type: 'int', minVal: 1, maxVal: 1000, defVal: 1 },
    { name: 'journey_useMaxWidth', dispName: 'journey_useMaxWidth', type: 'bool', defVal: true },
    { name: 'journey_rightAngles', dispName: 'journey_rightAngles', type: 'bool', defVal: false },

    { name: 'class_arrowMarkerAbsolute', dispName: 'class_arrowMarkerAbsolute', type: 'boolean', defVal: false },
    { name: 'class_useMaxWidth', dispName: 'class_useMaxWidth', type: 'boolean', defVal: true },

    { name: 'git_arrowMarkerAbsolute', dispName: 'git_arrowMarkerAbsolute', type: 'boolean', defVal: false },
    { name: 'git_useMaxWidth', dispName: 'git_useMaxWidth', type: 'boolean', defVal: true },

    { name: 'state_dividerMargin', dispName: 'state_dividerMargin', type: 'int', minVal: 1, maxVal: 1000, defVal: 10 },
    { name: 'state_sizeUnit', dispName: 'state_sizeUnit', type: 'int', minVal: 1, maxVal: 1000, defVal: 5 },
    { name: 'state_padding', dispName: 'state_padding', type: 'int', minVal: 1, maxVal: 1000, defVal: 8 },
    { name: 'state_textHeight', dispName: 'state_textHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: 10 },
    { name: 'state_titleShift', dispName: 'state_titleShift', type: 'int', minVal: -1000, maxVal: 1000, defVal: -15 },
    { name: 'state_noteMargin', dispName: 'state_noteMargin', type: 'int', minVal: 1, maxVal: 1000, defVal: 10 },
    { name: 'state_forkWidth', dispName: 'state_forkWidth', type: 'int', minVal: 1, maxVal: 1000, defVal: 70 },
    { name: 'state_forkHeight', dispName: 'state_forkHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: 7 },
    { name: 'state_miniPadding', dispName: 'state_miniPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: 2 },
    { name: 'state_fontSizeFactor', dispName: 'state_fontSizeFactor', type: 'float', minVal: 1, maxVal: 1000, defVal: 5.02 },
    { name: 'state_fontSize', dispName: 'state_fontSize', type: 'int', minVal: 1, maxVal: 1000, defVal: 24 },
    { name: 'state_labelHeight', dispName: 'state_labelHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: 16 },
    { name: 'state_edgeLengthFactor', dispName: 'state_edgeLengthFactor', type: 'string', defVal: '20' },
    { name: 'state_compositTitleSize', dispName: 'state_compositTitleSize', type: 'int', minVal: 1, maxVal: 1000, defVal: 35 },
    { name: 'state_radius', dispName: 'state_radius', type: 'int', minVal: 1, maxVal: 1000, defVal: 5 },

    { name: 'er_diagramPadding', dispName: 'er_diagramPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: 20 },
    {
        name: 'er_layoutDirection', dispName: 'er_layoutDirection', type: 'enum', defVal: 'TB',
        enumList: [
            { val: 'TB', dispName: 'top to bottom' },
            { val: 'BT', dispName: 'bottom to top' },
            { val: 'RL', dispName: 'right to left' },
            { val: 'LR', dispName: 'left to right' }
        ]
    },
    { name: 'er_minEntityWidth', dispName: 'er_minEntityWidth', type: 'int', minVal: 1, maxVal: 1000, defVal: 100 },
    { name: 'er_minEntityHeight', dispName: 'er_minEntityHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: 75 },
    { name: 'er_entityPadding', dispName: 'er_entityPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: 15 },
    { name: 'er_stroke', dispName: 'er_stroke', type: 'string', defVal: 'gray' },
    { name: 'er_fill', dispName: 'er_fill', type: 'string', defVal: 'honeydew' },
    { name: 'er_fontSize', dispName: 'er_fontSize', type: 'int', minVal: 1, maxVal: 1000, defVal: 12 },
    { name: 'er_useMaxWidth', dispName: 'er_useMaxWidth', type: 'bool', defVal: true },

    { name: 'pie_useMaxWidth', dispName: 'pie_useMaxWidth', type: 'bool', defVal: true },
];

mxShapeMermaid.prototype.getRenderOptions = function () {
    var config = {
        startOnLoad: false,
        themeCSS: mxUtils.getValue(this.style, 'theme_css', ""),
        theme: mxUtils.getValue(this.style, 'theme', 'default'),
        arrowMarkerAbsolute: mxUtils.getValue(this.style, 'arrowMarkerAbsolute', false),
        flowchart: {
            diagramPadding: mxUtils.getValue(this.style, 'flowchart_diagramPadding', 8),
            htmlLabels: mxUtils.getValue(this.style, 'flowchart_htmlLabels', true),
            nodeSpacing: mxUtils.getValue(this.style, 'flowchart_nodeSpacing', 50),
            rankSpacing: mxUtils.getValue(this.style, 'flowchart_rankSpacing', 50),
            curve: mxUtils.getValue(this.style, 'flowchart_curve', 'linear'),
            padding: mxUtils.getValue(this.style, 'flowchart_padding', 15),
            useMaxWidth: mxUtils.getValue(this.style, 'flowchart_useMaxWidth', true)
        },
        sequence: {
            activationWidth: mxUtils.getValue(this.style, 'sequence_activationWidth', 10),
            diagramMarginX: mxUtils.getValue(this.style, 'sequence_diagramMarginX', 50),
            diagramMarginY: mxUtils.getValue(this.style, 'sequence_diagramMarginY', 10),
            actorMargin: mxUtils.getValue(this.style, 'sequence_actorMargin', 50),
            width: mxUtils.getValue(this.style, 'sequence_width', 150),
            height: mxUtils.getValue(this.style, 'sequence_height', 65),
            boxMargin: mxUtils.getValue(this.style, 'sequence_boxMargin', 10),
            boxTextMargin: mxUtils.getValue(this.style, 'sequence_boxTextMargin', 5),
            noteMargin: mxUtils.getValue(this.style, 'sequence_noteMargin', 10),
            messageMargin: mxUtils.getValue(this.style, 'sequence_messageMargin', 35),
            messageAlign: mxUtils.getValue(this.style, 'sequence_messageAlign', 'center'),
            mirrorActors: mxUtils.getValue(this.style, 'sequence_mirrorActors', true),
            bottomMarginAdj: mxUtils.getValue(this.style, 'sequence_bottomMarginAdj', 1),
            useMaxWidth: mxUtils.getValue(this.style, 'sequence_useMaxWidth', true),
            rightAngles: mxUtils.getValue(this.style, 'sequence_rightAngles', false),
            showSequenceNumbers: mxUtils.getValue(this.style, 'sequence_showSequenceNumbers', false),
            actorFontSize: mxUtils.getValue(this.style, 'sequence_actorFontSize', 14),
            actorFontFamily: mxUtils.getValue(this.style, 'sequence_actorFontFamily', '"Open-Sans", "sans-serif"'),
            actorFontWeight: mxUtils.getValue(this.style, 'sequence_actorFontWeight', 400),
            noteFontSize: mxUtils.getValue(this.style, 'sequence_noteFontSize', 14),
            noteFontFamily: mxUtils.getValue(this.style, 'sequence_noteFontFamily', '"trebuchet ms", verdana, arial'),
            noteFontWeight: mxUtils.getValue(this.style, 'sequence_noteFontWeight', 400),
            noteAlign: mxUtils.getValue(this.style, 'sequence_noteAlign', 'center'),
            messageFontSize: mxUtils.getValue(this.style, 'sequence_messageFontSize', 16),
            messageFontFamily: mxUtils.getValue(this.style, 'sequence_messageFontFamily', '"trebuchet ms", verdana, arial'),
            messageFontWeight: mxUtils.getValue(this.style, 'sequence_messageFontWeight', 400),
            wrap: mxUtils.getValue(this.style, 'sequence_wrap', false),
            wrapPadding: mxUtils.getValue(this.style, 'sequence_wrapPadding', 10),
            labelBoxWidth: mxUtils.getValue(this.style, 'sequence_labelBoxWidth', 50),
            labelBoxHeight: mxUtils.getValue(this.style, 'sequence_labelBoxHeight', 20),
        },
        gantt: {
            titleTopMargin: mxUtils.getValue(this.style, 'gantt_titleTopMargin', 25),
            barHeight: mxUtils.getValue(this.style, 'gantt_barHeight', 20),
            barGap: mxUtils.getValue(this.style, 'gantt_barGap', 4),
            topPadding: mxUtils.getValue(this.style, 'gantt_topPadding', 50),
            leftPadding: mxUtils.getValue(this.style, 'gantt_leftPadding', 75),
            gridLineStartPadding: mxUtils.getValue(this.style, 'gantt_gridLineStartPadding', 35),
            fontSize: mxUtils.getValue(this.style, 'gantt_fontSize', 11),
            fontFamily: mxUtils.getValue(this.style, 'gantt_fontFamily', '"Open-Sans", "sans-serif"'),
            numberSectionStyles: mxUtils.getValue(this.style, 'gantt_numberSectionStyles', 4),
            axisFormat: mxUtils.getValue(this.style, 'gantt_axisFormat', "%Y-%m-%d"),
            useMaxWidth: mxUtils.getValue(this.style, 'gantt_useMaxWidth', true),
        },
        journey: {
            diagramMarginX: mxUtils.getValue(this.style, 'journey_diagramMarginX', 50),
            diagramMarginY: mxUtils.getValue(this.style, 'journey_diagramMarginY', 10),
            actorMargin: mxUtils.getValue(this.style, 'journey_actorMargin', 50),
            width: mxUtils.getValue(this.style, 'journey_width', 150),
            height: mxUtils.getValue(this.style, 'journey_height', 65),
            boxMargin: mxUtils.getValue(this.style, 'journey_boxMargin', 10),
            boxTextMargin: mxUtils.getValue(this.style, 'journey_boxTextMargin', 5),
            noteMargin: mxUtils.getValue(this.style, 'journey_noteMargin', 10),
            messageMargin: mxUtils.getValue(this.style, 'journey_messageMargin', 35),
            messageAlign: mxUtils.getValue(this.style, 'journey_messageAlign', 'center'),
            bottomMarginAdj: mxUtils.getValue(this.style, 'journey_bottomMarginAdj', 1),
            useMaxWidth: mxUtils.getValue(this.style, 'journey_useMaxWidth', true),
            rightAngles: mxUtils.getValue(this.style, 'journey_rightAngles', false),
        },
        class: {
            arrowMarkerAbsolute: mxUtils.getValue(this.style, 'class_arrowMarkerAbsolute', false),
            useMaxWidth: mxUtils.getValue(this.style, 'class_useMaxWidth', true),
        },
        git: {
            arrowMarkerAbsolute: mxUtils.getValue(this.style, 'git_arrowMarkerAbsolute', false),
            useMaxWidth: mxUtils.getValue(this.style, 'git_useMaxWidth', true),
        },
        state: {
            dividerMargin: mxUtils.getValue(this.style, 'state_dividerMargin', 10),
            sizeUnit: mxUtils.getValue(this.style, 'state_sizeUnit', 5),
            padding: mxUtils.getValue(this.style, 'state_padding', 8),
            textHeight: mxUtils.getValue(this.style, 'state_textHeight', 10),
            titleShift: mxUtils.getValue(this.style, 'state_titleShift', -15),
            noteMargin: mxUtils.getValue(this.style, 'state_noteMargin', 10),
            forkWidth: mxUtils.getValue(this.style, 'state_forkWidth', 70),
            forkHeight: mxUtils.getValue(this.style, 'state_forkHeight', 7),
            miniPadding: mxUtils.getValue(this.style, 'state_miniPadding', 2),
            fontSizeFactor: mxUtils.getValue(this.style, 'state_fontSizeFactor', 5.02),
            fontSize: mxUtils.getValue(this.style, 'state_fontSize', 24),
            labelHeight: mxUtils.getValue(this.style, 'state_labelHeight', 16),
            edgeLengthFactor: mxUtils.getValue(this.style, 'state_edgeLengthFactor', '20'),
            compositTitleSize: mxUtils.getValue(this.style, 'state_compositTitleSize', 35),
            radius: mxUtils.getValue(this.style, 'state_radius', 5),
        },
        er: {
            diagramPadding: mxUtils.getValue(this.style, 'er_diagramPadding', 20),
            layoutDirection: mxUtils.getValue(this.style, 'er_layoutDirection', 'TB'),
            minEntityWidth: mxUtils.getValue(this.style, 'er_minEntityWidth', 100),
            minEntityHeight: mxUtils.getValue(this.style, 'er_minEntityHeight', 75),
            entityPadding: mxUtils.getValue(this.style, 'er_entityPadding', 15),
            stroke: mxUtils.getValue(this.style, 'er_stroke', 'grey'),
            fill: mxUtils.getValue(this.style, 'er_fill', 'honeydew'),
            fontSize: mxUtils.getValue(this.style, 'er_fontSize', 12),
            useMaxWidth: mxUtils.getValue(this.style, 'er_useMaxWidth', true),

        },
        pie: {
            useMaxWidth: mxUtils.getValue(this.style, 'pie_useMaxWidth', true),
        }
    };
    return config;
}

mxShapeMermaid.prototype.updateImage = function (w, h) {
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
            element.setAttribute("id", "mermaid-" + this.state.cell.id);
            container.appendChild(element);
        }

        mermaid.mermaidAPI.initialize(
            this.getRenderOptions()
        );

        mermaid.mermaidAPI.render('mermaid-' + this.state.cell.id, 
            this.state.view.graph.convertValueToString(this.state.cell), 
            (svg) => { this.mermaidOutput = svg; }, container);
        this.image = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(this.mermaidOutput)));
        this.error = '';
    } catch (err) {
        this.error = err.str;
    }
}

/**
* Function: paintVertexShape
* Untitled Diagram.drawio
* Paints the vertex shape.
*/
mxShapeMermaid.prototype.paintVertexShape = function (c, x, y, w, h) {
    if (!this.image) {
        this.updateImage(w, h);
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
        c.text(x, y + h / 2, 0, 0, '<pre>' + this.error + '</pre>', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, false, 'html', 0, 0, 0);
        c.stroke();
    }
    this.state.cell.valueChanged = (value) => { var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); return lastValue; }
}

mxCellRenderer.registerShape(mxShapeMermaid.prototype.cst.SHAPE_MERMAID, mxShapeMermaid);

mxShapeMermaid.prototype.getConstraints = function (style, w, h) {
    var constr = [];
    return constr;
}