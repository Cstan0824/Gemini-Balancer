import { model } from "./model";

export class projectModel extends model {
    id: string;

    projectName: string;

    secretKey: string;

    keyGroupId: string;

    createdAt: Date;

    updatedAt: Date;
}