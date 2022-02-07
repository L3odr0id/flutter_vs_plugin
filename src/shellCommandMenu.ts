import * as vscode from 'vscode';
import {
    EXTENSION_NAME,
    Subscriptions
} from "./util";

export const showShellCommandMenuId: string = `${EXTENSION_NAME}.showShellCommandMenu`;

export const showShellCommandMenu = async () => {

    interface Option {
        name: string;
        command: string;
    }

    const options: Array<Option> = vscode.workspace.getConfiguration().get("extension.commands") || [];

    const items = options.map(option => option.name);

    const onSelect = (label: string) => {
        const option = options.find(option => option.name === label);

        if (!option) {
            return ;
        }

        const command = option.command;

        const terminal = vscode.window.activeTerminal 
            || vscode.window.terminals.find(t => t.name === EXTENSION_NAME)
            || vscode.window.createTerminal(EXTENSION_NAME);
        
        // TODO make optional by settings
        terminal.show(); 
        terminal.sendText(command);
    };

    onSelect(
        await vscode.window.showQuickPick(items, {
            title: "Select command",
            placeHolder: "Select command",
        }) 
        || ""
    );
};

export const initShowShellComandMenu = (subscriptions: Subscriptions) => {
    subscriptions.push(
        vscode.commands.registerCommand(showShellCommandMenuId, showShellCommandMenu)
    );
};
