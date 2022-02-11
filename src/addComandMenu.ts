import * as vscode from 'vscode';
import {
    EXTENSION_NAME,
    COMMANDS_KEY,
    Subscriptions,
    Command
} from "./util";

export const addShellCommandMenuId: string = `${EXTENSION_NAME}.addShellCommandMenu`;

export const addShellCommandMenu = async () => {
    const name: string = await vscode.window.showInputBox({
        title: "(1/3) Select command alias",
        placeHolder: "Enter command alias here...",
    }) || "";

    if (name === "") {
        return ;
    }
    
    const command: string = await vscode.window.showInputBox({
        title: "(2/3) Select command",
        placeHolder: "Enter command here...",
    }) || "";

    if (command === "") {
        return ;
    }

    // TODO re-write

    const configurationTargets = new Map<string, number>([
        ["Global", 1],
        ["Workspace", 2],
        ["WorkspaceFolder", 3]
    ]);

    const configurationTarget: string = await vscode.window.showQuickPick([...configurationTargets.keys()], {
        title: "(3/3) Select command scope",
    }) || "";

    if (configurationTarget === "") {
        return ;
    }

    const num: number = configurationTargets.get(configurationTarget) || -1;

    if (num === -1) {
        return ;
    }

    let commands: Array<Command> = vscode.workspace.getConfiguration().get(COMMANDS_KEY) || [];
    commands.push({
        name,
        command
    });

    await vscode.workspace.getConfiguration().update(COMMANDS_KEY, commands, num);
};

export const initAddShellComandMenu = (subscriptions: Subscriptions) => {
    subscriptions.push(
        vscode.commands.registerCommand(addShellCommandMenuId, addShellCommandMenu)
    );
};
