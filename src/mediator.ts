import {Constructable} from "@lib/types";
import {IBaseRequest, IRequest} from "@lib/request";
import {IBaseRequestHandler} from "@lib/request-handler";
import {IRequestHandlerRegistry, RequestHandlerRegistry} from "@lib/request-handler-registry";

export interface IMediator {
    register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void;
    send<TResponse>(request: IRequest<TResponse>): Promise<TResponse>
}

export class Mediator implements IMediator {
    private requestHandlerRegistry: IRequestHandlerRegistry;
    
    constructor(requestHandlerRegistry?: IRequestHandlerRegistry) {
        this.requestHandlerRegistry = requestHandlerRegistry ?? new RequestHandlerRegistry();
    }

    public register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void {
        this.requestHandlerRegistry.register(requestType, handlerType);
    }

    public async send<TResponse>(request: IRequest<TResponse>): Promise<TResponse> {
        const handler = this.requestHandlerRegistry.resolveHandlerByRequestInstance(request);
        return await handler.handle(request) as unknown as TResponse;
    }
}
