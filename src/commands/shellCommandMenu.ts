import * as vscode from 'vscode';
import { Command, Subscriptions } from '@/types';
import { EXTENSION_NAME } from '@/constants';
import { initCommand, getMergedConfiguration } from "@/util";
import { addShellCommandMenuId } from "@/commands/addComandMenu";

export const showShellCommandMenuId: string = `${EXTENSION_NAME}.showShellCommandMenu`;

export const showShellCommandMenu = async () => {

    const ADD_COMMAND_LABEL: string = "Add new command";

    const options: Array<Command> = getMergedConfiguration();
    const items: Array<string> = options.map(option => option.name).concat(ADD_COMMAND_LABEL);

    const selectedCommand: string = await vscode.window.showQuickPick(items, {
        title: "Select command",
        placeHolder: "Select command",
    }) ?? "";

    if (selectedCommand === ADD_COMMAND_LABEL) {
        vscode.commands.executeCommand(addShellCommandMenuId);
        return ;
    }

    const option = options.find(option => option.name === selectedCommand);

    if (!option) {
        return ;
    }

    const command: string = option.command;

    const terminal = vscode.window.activeTerminal 
        ?? vscode.window.terminals.find(t => t.name === EXTENSION_NAME)
        ?? vscode.window.createTerminal(EXTENSION_NAME);
    
    // TODO make optional by settings
    terminal.show(); 
    terminal.sendText(command);
};

export const initShowShellCommandMenu = (subscriptions: Subscriptions) => {
    initCommand(subscriptions, showShellCommandMenuId, showShellCommandMenu);
};
