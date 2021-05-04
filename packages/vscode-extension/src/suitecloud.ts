/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import AddDependencies from './commands/AddDependencies';
import BaseAction from './commands/BaseAction';
import Deploy from './commands/Deploy';
import ImportFile from './commands/ImportFile';
import ImportFiles from './commands/ImportFiles';
import ListFiles from './commands/ListFiles';
import ListObjects from './commands/ListObjects';
import ManageAccounts from './commands/ManageAccounts';
import UploadFile from './commands/UploadFile';
import UpdateObject from './commands/UpdateObject';
import { installIfNeeded } from './core/sdksetup/SdkServices';

const SCLOUD_OUTPUT_CHANNEL_NAME = 'SuiteCloud';

function register<T extends BaseAction>(command: string, action: T) {
	return vscode.commands.registerCommand(command, (uri?: vscode.Uri) => {
		if (uri && uri.fsPath) {
			action.run(uri.fsPath);
		} else {
			action.run();
		}
	});
}

export const output: vscode.OutputChannel = vscode.window.createOutputChannel(SCLOUD_OUTPUT_CHANNEL_NAME);

// this method is called when SuiteCloud extension is activated
// the extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	await installIfNeeded();

	context.subscriptions.push(
		register('suitecloud.adddependencies', new AddDependencies()),
		register('suitecloud.deploy', new Deploy()),
		register('suitecloud.importfile', new ImportFile()),
		register('suitecloud.importfiles', new ImportFiles()),
		register('suitecloud.listfiles', new ListFiles()),
		register('suitecloud.listobjects', new ListObjects()),
		register('suitecloud.setupaccount', new ManageAccounts()),
		register('suitecloud.updateobject', new UpdateObject()),
		register('suitecloud.uploadfile', new UploadFile())
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('SuiteCloud Extension for Visual Studio Code has been activated.');
}

// this method is called when SuiteCloud extension is deactivated
export function deactivate() {}
