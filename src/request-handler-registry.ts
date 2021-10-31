import {Constructable} from "@lib/types";
import {IBaseRequest} from "@lib/request";
import {IBaseRequestHandler} from "@lib/request-handler";

export interface IRequestHandlerRegistry {
    register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void;
    resolveHandlerTypeByRequestType(requestType: Constructable<IBaseRequest>): Constructable<IBaseRequestHandler> | null;
    resolveHandlerTypeByRequestInstance(request: IBaseRequest): Constructable<IBaseRequestHandler> | null;
    resolveHandlerByRequestType(requestType: Constructable<IBaseRequest>): IBaseRequestHandler;
    resolveHandlerByRequestInstance(request: IBaseRequest): IBaseRequestHandler;
}

export class RequestHandlerRegistry implements IRequestHandlerRegistry {
    public handlers: Map<Constructable<IBaseRequest>, Constructable<IBaseRequestHandler>>
        = new Map<Constructable<IBaseRequest>, Constructable<IBaseRequestHandler>>();

    public register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void {
        this.handlers.set(requestType, handlerType);
    }

    public resolveHandlerTypeByRequestType(requestType: Constructable<IBaseRequest>): Constructable<IBaseRequestHandler> | null {
        return this.handlers.get(requestType) ?? null;
    }

    public resolveHandlerTypeByRequestInstance(request: IBaseRequest): Constructable<IBaseRequestHandler> | null {
        for (const [key, value] of Array.from(this.handlers.entries())) {
            if (request instanceof key) {
                return value;
            }
        }
        return null;
    }

    public resolveHandlerByRequestType(requestType: Constructable<IBaseRequest>): IBaseRequestHandler {
        const handlerType = this.resolveHandlerTypeByRequestType(requestType);
        if (!handlerType) {
            throw new Error("Could not resolve a handler for request type.");
        }
        return new handlerType();
    }

    public resolveHandlerByRequestInstance(request: IBaseRequest): IBaseRequestHandler {
        const handlerType = this.resolveHandlerTypeByRequestInstance(request);
        if (!handlerType) {
            throw new Error("Could not resolve a handler for request instance.");
        }
        return new handlerType();
    }
}