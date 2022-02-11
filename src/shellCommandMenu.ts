import * as vscode from 'vscode';
import {
    EXTENSION_NAME,
    COMMANDS_KEY,
    Subscriptions,
    Command
} from "./util";

import {
    addShellCommandMenuId
} from "./addComandMenu";

export const showShellCommandMenuId: string = `${EXTENSION_NAME}.showShellCommandMenu`;

export const showShellCommandMenu = async () => {

    const ADD_COMMAND_LABEL = "Add new command";

    const options: Array<Command> = vscode.workspace.getConfiguration().get(COMMANDS_KEY) || [];
    const items = options.map(option => option.name).concat(ADD_COMMAND_LABEL);

    const onSelect = (label: string) => {
        if (label === ADD_COMMAND_LABEL) {
            vscode.commands.executeCommand(addShellCommandMenuId);
            return ;
        }

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
