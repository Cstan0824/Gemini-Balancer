import { model } from "./model";

class LogggingModel extends model{
    id: string;
    status: 'FAILURE' | 'SUCCESS';

    message?: string;

    keyId?: string;

    createdAt: Date;
}