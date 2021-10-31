import {Constructable} from "@lib/types";
import {IBaseRequest} from "@lib/request";
import {IBaseRequestHandler} from "@lib/request-handler";

export interface IRequestHandlerRegistry {
    register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void;

    resolveHandlerType(requestType: Constructable<IBaseRequest>): Constructable<IBaseRequestHandler> | null;

    resolveHandlerType(request: IBaseRequest): Constructable<IBaseRequestHandler> | null;

    resolveHandler(requestType: Constructable<IBaseRequest>): IBaseRequestHandler;

    resolveHandler(request: IBaseRequest): IBaseRequestHandler;
}

export class RequestHandlerRegistry implements IRequestHandlerRegistry {
    public handlers: Map<Constructable<IBaseRequest>, Constructable<IBaseRequestHandler>>
        = new Map<Constructable<IBaseRequest>, Constructable<IBaseRequestHandler>>();

    public register(requestType: Constructable<IBaseRequest>, handlerType: Constructable<IBaseRequestHandler>): void {
        this.handlers.set(requestType, handlerType);
    }

    public resolveHandlerType(typeOrInstance: Constructable<IBaseRequest> | IBaseRequest): Constructable<IBaseRequestHandler> | null {
        if (typeof typeOrInstance === "object") {
            for (const [key, value] of Array.from(this.handlers.entries())) {
                if (typeOrInstance instanceof key) {
                    return value;
                }
            }
            return null;
        } else {
            return this.handlers.get(typeOrInstance) ?? null;
        }
    }
    
    public resolveHandler(typeOrInstance: Constructable<IBaseRequest> | IBaseRequest): IBaseRequestHandler {
        let handlerType: Constructable<IBaseRequestHandler> | null;
        const argIsInstance = typeof typeOrInstance === "object";
        
        if (argIsInstance) {
            handlerType = this.resolveHandlerType(typeOrInstance);
        } else {
            handlerType = this.resolveHandlerType(typeOrInstance);
        }

        if (!handlerType) {
            throw new Error(`Could not resolve a handler for request ${argIsInstance ? "instance" : "type"}.`);
        }
        return new handlerType();
    }
}