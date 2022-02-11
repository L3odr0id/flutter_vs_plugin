
export const EXTENSION_NAME: string = "flutter-features";
export const COMMANDS_KEY: string = "flutter-features.commands";

export type Subscriptions = { dispose(): any }[];

export interface Command {
    name: string;
    command: string;
}
