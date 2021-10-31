import {AdditionHandler, AdditionRequest} from "./testdata";
import {RequestHandlerRegistry} from "@lib/request-handler-registry";

it('should register a request type and its handler', function () {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    expect(registry.handlers.has(AdditionRequest)).toBeTruthy();
});

it('should register only once for a given request type', function () {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    registry.register(AdditionRequest, AdditionHandler);
    expect(registry.handlers.size).toBe(1);
});

it('should resolve the correct handler type when given request type', () => {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    expect(registry.resolveHandlerTypeByRequestType(AdditionRequest)).toEqual(AdditionHandler);
});

it('should resolve the correct handler type when given request instance', () => {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    expect(registry.resolveHandlerTypeByRequestInstance(new AdditionRequest(1, 2))).toEqual(AdditionHandler);
});

it('should resolve a null handler type when given request type when no registration exists', () => {
    const registry = new RequestHandlerRegistry();
    expect(registry.resolveHandlerTypeByRequestType(AdditionRequest)).toBeNull();
});

it('should resolve a null handler type when given request instance when no registration exists', () => {
    const registry = new RequestHandlerRegistry();
    expect(registry.resolveHandlerTypeByRequestInstance(AdditionRequest)).toBeNull();
});

it('should resolve a handler instance by request type', () => {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    const handler = registry.resolveHandlerByRequestType(AdditionRequest);
    expect(handler).toBeInstanceOf(AdditionHandler);
});

it('should resolve a handler instance by request instance', () => {
    const registry = new RequestHandlerRegistry();
    registry.register(AdditionRequest, AdditionHandler);
    const handler = registry.resolveHandlerByRequestInstance(new AdditionRequest(1, 2));
    expect(handler).toBeInstanceOf(AdditionHandler);
});
