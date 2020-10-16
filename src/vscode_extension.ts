import { ExtensionContext } from 'vscode';
import { DrawioExtensionApi, DocumentContext } from './vscode-drawio/src/DrawioExtensionApi'
import { readFile } from "fs";
import { join } from "path";

export function activate(context: ExtensionContext) {
	let api: DrawioExtensionApi;
	api = {
		drawioExtensionV1: {
			getDrawioPlugins(context: DocumentContext) {
				return new Promise((resolve, reject) => {
					readFile(join(__dirname, "./mermaid-plugin.webpack.js"), "utf-8", (err:any, data:string) => {
						if (err) {
							reject();
						} else {
							resolve([{ jsCode: data}]);
						}
					});
				})
			}
		}
	}
	return api;
};

