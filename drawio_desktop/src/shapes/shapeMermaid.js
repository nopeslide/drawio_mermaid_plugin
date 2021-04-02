import mermaid from 'mermaid'
import merge from 'deepmerge'

export const mermaid_plugin_defaults_original = {
    startOnLoad: false,
    themeCSS: "",
    theme: 'default',
    arrowMarkerAbsolute: false,
    flowchart: {
        diagramPadding: 8,
        htmlLabels: true,
        nodeSpacing: 50,
        rankSpacing: 50,
        curve: 'linear',
        padding: 15,
        useMaxWidth: true
    },
    sequence: {
        activationWidth: 10,
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: false,
        showSequenceNumbers: false,
        actorFontSize:  14,
        actorFontFamily:  '"Open-Sans", "sans-serif"',
        actorFontWeight: 400,
        noteFontSize: 14,
        noteFontFamily: '"trebuchet ms", verdana, arial',
        noteFontWeight:  400,
        noteAlign: 'center',
        messageFontSize: 16,
        messageFontFamily: '"trebuchet ms", verdana, arial',
        messageFontWeight: 400,
        wrap: false,
        wrapPadding: 10,
        labelBoxWidth: 50,
        labelBoxHeight: 20,
    },
    gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        fontFamily: '"Open-Sans", "sans-serif"',
        numberSectionStyles: 4,
        axisFormat: "%Y-%m-%d",
        useMaxWidth: true,
    },
    journey: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: false,
    },
    class: {
        arrowMarkerAbsolute: false,
        useMaxWidth: true,
    },
    git: {
        arrowMarkerAbsolute: false,
        useMaxWidth: true,
    },
    state: {
        dividerMargin: 10,
        sizeUnit: 5,
        padding: 8,
        textHeight: 10,
        titleShift: -15,
        noteMargin: 10,
        forkWidth: 70,
        forkHeight: 7,
        miniPadding: 2,
        fontSizeFactor: 5.02,
        fontSize: 24,
        labelHeight: 16,
        edgeLengthFactor: '20',
        compositTitleSize: 35,
        radius: 5,
    },
    er: {
        diagramPadding: 20,
        layoutDirection: 'TB',
        minEntityWidth: 100,
        minEntityHeight: 75,
        entityPadding: 15,
        stroke: 'grey',
        fill: 'honeydew',
        fontSize: 12,
        useMaxWidth: true,

    },
    pie: {
        useMaxWidth: true,
    }
};

export var mermaid_plugin_defaults = merge({}, mermaid_plugin_defaults_original);

/**
* Extends mxShape.
*/
export function mxShapeMermaid(bounds, fill, stroke, strokewidth) {
    mxShape.call(this);
    this.bounds = bounds;
    this.image = '';
    this.error = '';
    this.mermaidOutput = '';
    this.fill = fill;
    this.stroke = stroke;
    this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    this.shadow = false;

    this.defaults = mermaid_plugin_defaults; 
};
/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeMermaid, mxImageShape);

mxShapeMermaid.prototype.cst = {
    SHAPE_MERMAID: 'mxgraph.mermaid.abstract.mermaid'
};

mxShapeMermaid.prototype.buildCustomProperties = function (defaults) {
    return [
        // { name: 'theme_css', dispName: 'theme_css', type: 'string', defVal: "" },
        {
            name: 'theme', dispName: 'theme', type: 'enum', defVal: defaults.theme,
            enumList: [
                { val: 'default', dispName: 'default' },
                { val: 'forest', dispName: 'forest' },
                { val: 'dark', dispName: 'dark' },
                { val: 'neutral', dispName: 'neutral' },
                { val: 'null', dispName: 'null' }
            ]
        },
        { name: 'arrowMarkerAbsolute', dispName: 'arrowMarkerAbsolute', type: 'bool', defVal: defaults.arrowMarkerAbsolute },
    
        { name: 'flowchart_diagramPadding', dispName: 'flowchart_diagramPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.flowchart.diagramPadding },
        { name: 'flowchart_htmlLabels', dispName: 'flowchart_htmlLabels', type: 'bool', defVal: defaults.flowchart.htmlLabels },
        { name: 'flowchart_nodeSpacing', dispName: 'flowchart_nodeSpacing', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.flowchart.nodeSpacing },
        { name: 'flowchart_rankSpacing', dispName: 'flowchart_rankSpacing', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.flowchart.rankSpacing },
        {
            name: 'flowchart_curve', dispName: 'flowchart_curve', type: 'enum', defVal: defaults.flowchart.curve,
            enumList: [
                { val: 'linear', dispName: 'linear' },
                { val: 'basis', dispName: 'basis' },
                { val: 'cardinal', dispName: 'cardinal' }
            ]
        },
        { name: 'flowchart_padding', dispName: 'flowchart_padding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.flowchart.padding },
        { name: 'flowchart_useMaxWidth', dispName: 'flowchart_useMaxWidth', type: 'bool', defVal: defaults.flowchart.useMaxWidth },
    
        { name: 'sequence_activationWidth', dispName: 'sequence_activationWidth', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.activationWidth },
        { name: 'sequence_diagramMarginX', dispName: 'sequence_diagramMarginX', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.diagramMarginX },
        { name: 'sequence_diagramMarginY', dispName: 'sequence_diagramMarginY', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.diagramMarginY },
        { name: 'sequence_actorMargin', dispName: 'sequence_actorMargin', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.actorMargin },
        { name: 'sequence_width', dispName: 'sequence_width', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.width },
        { name: 'sequence_height', dispName: 'sequence_height', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.height },
        { name: 'sequence_boxMargin', dispName: 'sequence_boxMargin', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.boxMargin },
        { name: 'sequence_boxTextMargin', dispName: 'sequence_boxTextMargin', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.boxTextMargin },
        { name: 'sequence_noteMargin', dispName: 'sequence_noteMargin', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.noteMargin },
        { name: 'sequence_messageMargin', dispName: 'sequence_messageMargin', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.messageMargin },
        {
            name: 'sequence_messageAlign', dispName: 'sequence_messageAlign', type: 'enum', defVal: defaults.sequence.messageAlign,
            enumList: [
                { val: 'center', dispName: 'center' },
                { val: 'left', dispName: 'left' },
                { val: 'right', dispName: 'right' }
            ]
        },
        { name: 'sequence_mirrorActors', dispName: 'sequence_mirrorActors', type: 'bool', defVal: defaults.sequence.mirrorActors },
        { name: 'sequence_bottomMarginAdj', dispName: 'sequence_bottomMarginAdj', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.bottomMarginAdj },
        { name: 'sequence_useMaxWidth', dispName: 'sequence_useMaxWidth', type: 'bool', defVal: defaults.sequence.useMaxWidth },
        { name: 'sequence_rightAngles', dispName: 'sequence_rightAngles', type: 'bool', defVal: defaults.sequence.rightAngles },
        { name: 'sequence_showSequenceNumbers', dispName: 'sequence_showSequenceNumbers', type: 'bool', defVal: defaults.sequence.showSequenceNumbers },
        { name: 'sequence_actorFontSize', dispName: 'sequence_actorFontSize', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.actorFontSize },
        { name: 'sequence_actorFontFamily', dispName: 'sequence_actorFontFamily', type: 'string', defVal: defaults.sequence.actorFontFamily },
        { name: 'sequence_actorFontWeight', dispName: 'sequence_actorFontWeight', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.actorFontWeight },
        { name: 'sequence_noteFontSize', dispName: 'sequence_noteFontSize', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.actorFontSize },
        { name: 'sequence_noteFontFamily', dispName: 'sequence_noteFontFamily', type: 'string', defVal: defaults.sequence.noteFontFamily },
        { name: 'sequence_noteFontWeight', dispName: 'sequence_noteFontWeight', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.noteFontWeight },
        {
            name: 'sequence_noteAlign', dispName: 'sequence_noteAlign', type: 'enum', defVal: defaults.sequence.noteAlign,
            enumList: [
                { val: 'center', dispName: 'center' },
                { val: 'left', dispName: 'left' },
                { val: 'right', dispName: 'right' }
            ]
        },
        { name: 'sequence_messageFontSize', dispName: 'sequence_messageFontSize', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.messageFontSize },
        { name: 'sequence_messageFontFamily', dispName: 'sequence_messageFontFamily', type: 'string', defVal: defaults.sequence.messageFontFamily },
        { name: 'sequence_messageFontWeight', dispName: 'sequence_messageFontWeight', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.messageFontWeight },
        { name: 'sequence_wrap', dispName: 'sequence_wrap', type: 'bool', defVal: defaults.sequence.wrap },
        { name: 'sequence_wrapPadding', dispName: 'sequence_wrapPadding', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.wrapPadding },
        { name: 'sequence_labelBoxWidth', dispName: 'sequence_labelBoxWidth', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.labelBoxWidth },
        { name: 'sequence_labelBoxHeight', dispName: 'sequence_labelBoxHeight', type: 'int', min: 1, max: 1000, defVal: defaults.sequence.labelBoxHeight },
    
        { name: 'gantt_titleTopMargin', dispName: 'gantt_titleTopMargin', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.titleTopMargin },
        { name: 'gantt_barHeight', dispName: 'gantt_barHeight', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.barHeight },
        { name: 'gantt_barGap', dispName: 'gantt_barGap', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.barGap },
        { name: 'gantt_topPadding', dispName: 'gantt_topPadding', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.topPadding },
        { name: 'gantt_leftPadding', dispName: 'gantt_leftPadding', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.leftPadding },
        { name: 'gantt_gridLineStartPadding', dispName: 'gantt_gridLineStartPadding', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.gridLineStartPadding },
        { name: 'gantt_fontSize', dispName: 'gantt_fontSize', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.fontSize },
        { name: 'gantt_fontFamily', dispName: 'gantt_fontFamily', type: 'string', defVal: defaults.gantt.fontFamily },
        { name: 'gantt_numberSectionStyles', dispName: 'gantt_numberSectionStyles', type: 'int', min: 1, max: 1000, defVal: defaults.gantt.numberSectionStyles },
        { name: 'gantt_axisFormat', dispName: 'gantt_axisFormat', type: 'string', defVal: defaults.gantt.axisFormat },
        { name: 'gantt_useMaxWidth', dispName: 'gantt_useMaxWidth', type: 'bool', defVal: defaults.gantt.useMaxWidth },
    
        { name: 'journey_diagramMarginX', dispName: 'journey_diagramMarginX', type: 'int', min: 1, max: 1000, defVal: defaults.journey.diagramMarginX },
        { name: 'journey_diagramMarginY', dispName: 'journey_diagramMarginY', type: 'int', min: 1, max: 1000, defVal: defaults.journey.diagramMarginY },
        { name: 'journey_actorMargin', dispName: 'journey_actorMargin', type: 'int', min: 1, max: 1000, defVal: defaults.journey.actorMargin },
        { name: 'journey_width', dispName: 'journey_width', type: 'int', min: 1, max: 1000, defVal: defaults.journey.width },
        { name: 'journey_height', dispName: 'journey_height', type: 'int', min: 1, max: 1000, defVal: defaults.journey.height },
        { name: 'journey_boxMargin', dispName: 'journey_boxMargin', type: 'int', min: 1, max: 1000, defVal: defaults.journey.boxMargin },
        { name: 'journey_boxTextMargin', dispName: 'journey_boxTextMargin', type: 'int', min: 1, max: 1000, defVal: defaults.journey.boxTextMargin },
        { name: 'journey_noteMargin', dispName: 'journey_noteMargin', type: 'int', min: 1, max: 1000, defVal: defaults.journey.noteMargin },
        { name: 'journey_messageMargin', dispName: 'journey_messageMargin', type: 'int', min: 1, max: 1000, defVal: defaults.journey.messageMargin },
        {
            name: 'journey_messageAlign', dispName: 'journey_messageAlign', type: 'enum', defVal: defaults.journey.messageAlign,
            enumList: [
                { val: 'center', dispName: 'center' },
                { val: 'left', dispName: 'left' },
                { val: 'right', dispName: 'right' }
            ]
        },
        { name: 'journey_bottomMarginAdj', dispName: 'journey_bottomMarginAdj', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.journey.bottomMarginAdj },
        { name: 'journey_useMaxWidth', dispName: 'journey_useMaxWidth', type: 'bool', defVal: defaults.journey.useMaxWidth },
        { name: 'journey_rightAngles', dispName: 'journey_rightAngles', type: 'bool', defVal: defaults.journey.rightAngles },
    
        { name: 'class_arrowMarkerAbsolute', dispName: 'class_arrowMarkerAbsolute', type: 'boolean', defVal: defaults.class.arrowMarkerAbsolute },
        { name: 'class_useMaxWidth', dispName: 'class_useMaxWidth', type: 'boolean', defVal: defaults.class.useMaxWidth },
    
        { name: 'git_arrowMarkerAbsolute', dispName: 'git_arrowMarkerAbsolute', type: 'boolean', defVal: defaults.git.arrowMarkerAbsolute },
        { name: 'git_useMaxWidth', dispName: 'git_useMaxWidth', type: 'boolean', defVal: defaults.git.useMaxWidth },
    
        { name: 'state_dividerMargin', dispName: 'state_dividerMargin', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.dividerMargin },
        { name: 'state_sizeUnit', dispName: 'state_sizeUnit', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.sizeUnit },
        { name: 'state_padding', dispName: 'state_padding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.padding },
        { name: 'state_textHeight', dispName: 'state_textHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.textHeight },
        { name: 'state_titleShift', dispName: 'state_titleShift', type: 'int', minVal: -1000, maxVal: 1000, defVal: defaults.state.titleShift },
        { name: 'state_noteMargin', dispName: 'state_noteMargin', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.noteMargin },
        { name: 'state_forkWidth', dispName: 'state_forkWidth', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.fontFamily },
        { name: 'state_forkHeight', dispName: 'state_forkHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.forkHeight },
        { name: 'state_miniPadding', dispName: 'state_miniPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.miniPadding },
        { name: 'state_fontSizeFactor', dispName: 'state_fontSizeFactor', type: 'float', minVal: 1, maxVal: 1000, defVal: defaults.state.fontSizeFactor },
        { name: 'state_fontSize', dispName: 'state_fontSize', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.fontSize },
        { name: 'state_labelHeight', dispName: 'state_labelHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.labelHeight },
        { name: 'state_edgeLengthFactor', dispName: 'state_edgeLengthFactor', type: 'string', defVal: defaults.state.edgeLengthFactor },
        { name: 'state_compositTitleSize', dispName: 'state_compositTitleSize', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.compositTitleSize },
        { name: 'state_radius', dispName: 'state_radius', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.state.radius },
    
        { name: 'er_diagramPadding', dispName: 'er_diagramPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.er.diagramPadding },
        {
            name: 'er_layoutDirection', dispName: 'er_layoutDirection', type: 'enum', defVal: defaults.er.layoutDirection,
            enumList: [
                { val: 'TB', dispName: 'top to bottom' },
                { val: 'BT', dispName: 'bottom to top' },
                { val: 'RL', dispName: 'right to left' },
                { val: 'LR', dispName: 'left to right' }
            ]
        },
        { name: 'er_minEntityWidth', dispName: 'er_minEntityWidth', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.er.minEntityWidth },
        { name: 'er_minEntityHeight', dispName: 'er_minEntityHeight', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.er.minEntityHeight },
        { name: 'er_entityPadding', dispName: 'er_entityPadding', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.er.entityPadding },
        { name: 'er_stroke', dispName: 'er_stroke', type: 'string', defVal: defaults.er.stroke },
        { name: 'er_fill', dispName: 'er_fill', type: 'string', defVal: defaults.er.fill },
        { name: 'er_fontSize', dispName: 'er_fontSize', type: 'int', minVal: 1, maxVal: 1000, defVal: defaults.er.fontSize },
        { name: 'er_useMaxWidth', dispName: 'er_useMaxWidth', type: 'bool', defVal: defaults.er.useMaxWidth },
    
        { name: 'pie_useMaxWidth', dispName: 'pie_useMaxWidth', type: 'bool', defVal: defaults.pie.useMaxWidth },
    ];
}

mxShapeMermaid.prototype.customProperties = mxShapeMermaid.prototype.buildCustomProperties(mermaid_plugin_defaults);

mxShapeMermaid.prototype.getStyleOptions = function () {
    let config = {};
    // Iterate through Mermaid custom properties
    for(let prop of this.buildCustomProperties(mermaid_plugin_defaults)) {
        // Test if we have it in the style
        if (prop.name in this.style) {
            // If yes, we build the config structure
            if (prop.name == "theme_css") { config["theme_css"] = mxUtils.getValue(this.style, 'theme_css', this.defaults.themeCSS); }
            else {
                let prop_items = prop.name.split('_');
                if (prop_items.length == 1) {
                    config[prop_items[0]] = mxUtils.getValue(this.style, prop.name, this.defaults[prop_items[0]]);
                } else if (prop_items.length == 2) {
                    if (! (config[prop_items[0]])) { config[prop_items[0]] = {}; }
                    config[prop_items[0]][prop_items[1]] = mxUtils.getValue(this.style, prop.name, this.defaults[prop_items[0]][prop_items[1]]);
                }
            }
        }
    }
    return config;
}

mxShapeMermaid.prototype.getRenderOptions = function () {
    return merge(this.defaults, this.getStyleOptions());
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
    // Changing cell valueChanged will be kept even after changing shape -> moving the update to parse function (not seen any use case we miss)
    //this.state.cell.valueChanged = (value) => { var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value); this.updateImage(); this.redraw(); return lastValue; }
}

mxCellRenderer.registerShape(mxShapeMermaid.prototype.cst.SHAPE_MERMAID, mxShapeMermaid);

mxShapeMermaid.prototype.getConstraints = function (style, w, h) {
    var constr = [];
    return constr;
}