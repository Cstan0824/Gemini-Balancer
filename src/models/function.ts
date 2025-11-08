import { model } from "./model";

export class functionModel extends model {
    id: string;
    functionName: string;

    description?: string;

    inputSchema?: object;

    outputSchema?: object;
}