export type Subscriptions = { dispose(): any }[];

export interface Command {
    name: string;
    command: string;
}
