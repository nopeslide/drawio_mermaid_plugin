# Draw.io Desktop Mermaid Plugin

This draw.io plugins integrates the mermaid diagram generator.

Mermaid supports:
* Pie charts
* Sequence diagrams
* Gantt diagrams
* State diagrams
* Flow charts
* Class diagrams

via a simple markup language.

## Overview

* Example diagrams
![](/doc/overview.png)

## Online Demo
[Online Demo](https://nopeslide.github.io/drawio/?p=mermaid)

## Usage

* double click on a shape and edit the mermaid script, the shape will be redrawn after leaving the editor

![](/doc/demo.gif)

## Properties
* All mermaid configuration options are reflected as draw.io shape properties.

![](/doc/properties.gif)

## How to build

1. `git clone --recursive https://github.com/nopeslide/drawio_mermaid_plugin.git ~/drawio_mermaid_plugin`
2. `cd ~/drawio_mermaid_plugin/drawio_desktop`
3. `npm install`
4. `npm run build`

# How to install

5. open draw.io desktop
6. select on the top menu bar `Extras`/`Plugins...`
7. click `Add`
8. click `Select File...` for `External Plugins:`
9. select `~/drawio_mermaid_plugin/drawio_desktop/dist/mermaid-plugin.webpack.js`
10. click `OK`
11. click `Apply`
12. confirm Dialog

__Draw.io copies the plugin into an internal directory, making updates impossible!__

To link the plugin with the repository:

13. run `ln -sfr ~/drawio_mermaid_plugin/drawio_desktop/dist/mermaid-plugin.webpack.js ~/.config/draw.io/plugins/`
