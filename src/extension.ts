import * as vscode from 'vscode';
import { initStatusBarIcon } from "./statusBar";
import { initShowShellComandMenu } from "./shellCommandMenu";
import { initAddShellComandMenu } from "./addComandMenu";

export const activate = ({ subscriptions }: vscode.ExtensionContext) => {
	initShowShellComandMenu(subscriptions);
	initStatusBarIcon(subscriptions);
	initAddShellComandMenu(subscriptions);
};
