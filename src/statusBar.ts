import * as vscode from 'vscode';
import { Subscriptions } from "./util";
import { showShellCommandMenuId } from "./shellCommandMenu";

export const statusBarIcon = (): vscode.StatusBarItem => {
    const itemAligment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Left;
    const priority: number = 1; 

    const item = vscode.window.createStatusBarItem(itemAligment, priority);
    item.text = `$(three-bars)Shell`;
    item.command = showShellCommandMenuId;

    return item;
};

export const initStatusBarIcon = (subscriptions: Subscriptions) => {
    const icon = statusBarIcon();
    subscriptions.push(icon);

    console.log(icon);
    icon.show();
};
