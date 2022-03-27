import * as vscode from 'vscode';
import { Command, Subscriptions } from '@/types';
import { EXTENSION_NAME, COMMANDS_KEY } from '@/constants';
import { initCommand, getConfigurationInScope } from "@/util";

export const addShellCommandMenuId: string = `${EXTENSION_NAME}.addShellCommandMenu`;

export const addShellCommandMenu = async () => {
    const name: string = await vscode.window.showInputBox({
        title: "(1/3) Select command alias",
        placeHolder: "Enter command alias here...",
    }) ?? "";

    if (name === "") {
        return ;
    }
    
    const command: string = await vscode.window.showInputBox({
        title: "(2/3) Select command",
        placeHolder: "Enter command here...",
    }) ?? "";

    if (command === "") {
        return ;
    }

    // TODO re-write

    const configurationTargets = new Map<string, vscode.ConfigurationTarget>([
        ["Global", vscode.ConfigurationTarget.Global],
        ["Workspace", vscode.ConfigurationTarget.Workspace],
        ["WorkspaceFolder", vscode.ConfigurationTarget.WorkspaceFolder]
    ]);

    const configurationTargetName: string = await vscode.window.showQuickPick([...(configurationTargets.keys())], {
        title: "(3/3) Select command scope",
    }) ?? "";

    if (configurationTargetName === "") {
        return ;
    }

    const configurationTarget: vscode.ConfigurationTarget 
        = configurationTargets.get(configurationTargetName) 
        ?? vscode.ConfigurationTarget.Global;

    const commands = getConfigurationInScope<Array<Command>>(COMMANDS_KEY, configurationTarget, []);

    const existingCommand = commands.find(command => command.name === name);

    if (existingCommand !== undefined) {
        const answer = await vscode.window.showInformationMessage(
            `Command with name "${name}" already exists, do you want to override it?`,
            "Yes",
            "No"
        ) ?? "No";
        
        if (answer === "Yes") {
            existingCommand.command = command;
        }
        
    } else {
        commands.push({
            name,
            command
        });
    }

    await vscode.workspace.getConfiguration().update(COMMANDS_KEY, commands, configurationTarget);
};

export const initAddShellCommandMenu = (subscriptions: Subscriptions) => {
    initCommand(subscriptions, addShellCommandMenuId, addShellCommandMenu);
};
