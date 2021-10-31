import {Mediator} from "@lib/mediator";

test('adds 2 numbers', () => {
    const mediator = new Mediator();
    expect(mediator.sum(1, 3)).toBe(4);
})
