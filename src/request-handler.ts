import {IBaseRequest, IRequest} from "@lib/request";

export interface IBaseRequestHandler<TRequest = IBaseRequest> {
    handle(request: TRequest): Promise<any>;
}

export interface IRequestHandler<TRequest extends IRequest<TResponse>, TResponse> extends IBaseRequestHandler {
    handle(request: TRequest): Promise<TResponse>;
}

export function requestHandler<T extends { new(...args: any[]): {} }>(requestType: any) {
    return function (constructor: any) {
        return class extends constructor {
            handlesResultType = requestType;
        };
    }
}
