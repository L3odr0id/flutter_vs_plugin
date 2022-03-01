import * as vscode from 'vscode';

export const EXTENSION_NAME: string = "flutter-features";
export const COMMANDS_KEY: string = "flutter-features.commands";

export type Subscriptions = { dispose(): any }[];

export interface Command {
    name: string;
    command: string;
}

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
