import * as vscode from 'vscode';
import { Command, Subscriptions } from '@/types';
import { COMMANDS_KEY } from '@/constants';

export const initCommand = (
    subscriptions: Subscriptions, 
    commandId: string, 
    command: (...args: any[]) => any
) => {
    subscriptions.push(
        vscode.commands.registerCommand(commandId, command)
    );
};

export const getConfigurationInScope = <T> (
    section: string, 
    scope: vscode.ConfigurationTarget,
    defaultValue: T
): T => {
    const allConfig = vscode.workspace.getConfiguration().inspect<T>(section);
    switch(scope) {
        case vscode.ConfigurationTarget.Global:
            return allConfig?.globalValue ?? defaultValue;
        case vscode.ConfigurationTarget.Workspace:
            return allConfig?.workspaceValue ?? defaultValue;
        case vscode.ConfigurationTarget.WorkspaceFolder:
            return allConfig?.workspaceFolderValue ?? defaultValue;
        default:
            return defaultValue;
    }
};

export const getMergedConfiguration = (): Array<Command> => {
    let result: Array<Command> = [];
    const config = vscode.workspace.getConfiguration().inspect<Array<Command>>(COMMANDS_KEY);

    if (config === undefined) {
        return [];
    }

    result = result.concat(config?.defaultValue ?? []);

    if (config.globalValue !== undefined) {
        const temp = config.globalValue;
        result = result.filter(
            a => temp.every(b => b.name !== a.name)
        ).concat(temp);
    }

    if (config.workspaceValue !== undefined) {
        const temp = config.workspaceValue;
        result = result.filter(
            a => temp.every(b => b.name !== a.name)
        ).concat(temp);
    }

    if (config.workspaceFolderValue !== undefined) {
        const temp = config.workspaceFolderValue;
        result = result.filter(
            a => temp.every(b => b.name !== a.name)
        ).concat(temp);
    }

    return result;
};
