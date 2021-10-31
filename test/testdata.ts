import {IMediator, Mediator} from "@lib/mediator";
import {IRequest} from "@lib/request";
import {IRequestHandler} from "@lib/request-handler";

class Test {
    async test() {
        const mediator: IMediator = new Mediator();
        // const mediator = new Mediator();
        const result = await mediator.send<AdditionResponse>(new AdditionRequest(1, 2));
        console.log(result.sum);
    }
}


export class AdditionRequest implements IRequest<AdditionResponse> {
    constructor(public num1: number, public num2: number) {
    }
}

export class AdditionResponse {
    constructor(public sum: number) {
    }
}

export class AdditionHandler implements IRequestHandler<AdditionRequest, AdditionResponse>{
    async handle(request: AdditionRequest): Promise<AdditionResponse> {
        return new AdditionResponse(request.num1 + request.num2);
    }
}