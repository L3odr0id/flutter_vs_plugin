import * as vscode from 'vscode';
import { initStatusBarIcon } from "./statusBar";
import { initShowShellCommandMenu } from "./commands/shellCommandMenu";
import { initAddShellCommandMenu } from "./commands/addComandMenu";

export const activate = ({ subscriptions }: vscode.ExtensionContext) => {
	initShowShellCommandMenu(subscriptions);
	initAddShellCommandMenu(subscriptions);
	initStatusBarIcon(subscriptions);
};
