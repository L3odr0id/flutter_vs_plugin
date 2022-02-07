import * as vscode from 'vscode';
import { initStatusBarIcon } from "./statusBar";
import { initShowShellComandMenu } from "./shellCommandMenu";

export const activate = ({ subscriptions }: vscode.ExtensionContext) => {
	initShowShellComandMenu(subscriptions);
	initStatusBarIcon(subscriptions);
};
