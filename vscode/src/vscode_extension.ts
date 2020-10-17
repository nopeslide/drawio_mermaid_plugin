import { ExtensionContext } from 'vscode';
import { DrawioExtensionApi, DocumentContext } from './vscode-drawio/src/DrawioExtensionApi'
import drawio_plugin from 'raw-loader!./../../drawio_desktop/dist/mermaid-plugin.webpack.js';

export function activate(context: ExtensionContext) {
	let api: DrawioExtensionApi;
	api = {
		drawioExtensionV1: {
			getDrawioPlugins(context: DocumentContext) {
				return new Promise((resolve, reject) => {
					resolve([{ jsCode: drawio_plugin}]);
				})
			}
		}
	}
	return api;
};

