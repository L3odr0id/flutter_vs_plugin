// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const disposables = []

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	createStatusBarItem(context) ;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-l3odr0id-features" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('flutter-l3odr0id-features.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from flutter_l3odr0id_features!');
	});

	// const runButton = vscode.window.createStatusBarItem(1, 0)
	// runButton.text = 'ok'
	// runButton.color = '#FFAABBCC'
	// runButton.tooltip = 'ok boomer'

	// runButton.command = 'echo ok'
	// runButton.show()
	// runButton.dispose()
	// disposables.push(runButton)

	// disposables.forEach(d => d.dispose());

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function createStatusBarItem(context: vscode.ExtensionContext)
{
    // register a command that is invoked when the status bar
    // item is clicked.
    const myCommandId = 'flutter-l3odr0id-features.statusBarClick';
    context.subscriptions.push(vscode.commands.registerCommand(myCommandId, async () => 
    {
        const pageType = await vscode.window.showQuickPick(
            ['shell', 'fetch rows, list in table'],
            { placeHolder: 'select type of web page to make' });

    }));

    // create a new status bar item that we can now manage
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    item.command = myCommandId;

    context.subscriptions.push(item);

    item.text = `my command`;
    item.tooltip = `status bar item tooltip`;
    item.show();
}