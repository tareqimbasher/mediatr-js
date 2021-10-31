import {Mediator} from "@lib/mediator";
import {AdditionHandler, AdditionRequest, AdditionResponse} from "./testdata";

it('should return the correct response for a given request', async () => {
    expect.assertions(1);
    const mediator = new Mediator();
    mediator.register(AdditionRequest, AdditionHandler);
    
    const response = await mediator.send<AdditionResponse>(new AdditionRequest(1, 2))
    
    expect(response.sum).toEqual(3);
});
