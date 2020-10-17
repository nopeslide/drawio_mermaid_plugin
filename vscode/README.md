# Drawio.io Integration: Mermaid Plugin

This is an extension for
[Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
or
[Draw.io Integration - Insider Build](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
that adds full markdown support of [Mermaid.js](https://mermaid-js.github.io/mermaid/).

Mermaid supports:
* Pie charts
* Sequence diagrams
* Gantt diagrams
* State diagrams
* Flow charts
* Class diagrams

via a simple markup language

## Overview

* Example diagrams
![](/doc/overview.png)

## Usage

* double click on a shape and edit the mermaid script, the shape will be redrawn after leaving the editor

![](/doc/demo.gif)

## Properties
* All mermaid configuration options are reflected as draw.io shape properties.

![](/doc/properties.gif)

## How to build

1. `git clone --recursive https://github.com/nopeslide/drawio_mermaid_plugin.git`
2. `cd drawio_mermaid_plugin/vscode`
3. `npm install`
4. `npm run vscode:package`

## Draw.io desktop
See
[github](https://github.com/nopeslide/drawio_mermaid_plugin/drawio_desktop)
for the desktop variant of this plugin.