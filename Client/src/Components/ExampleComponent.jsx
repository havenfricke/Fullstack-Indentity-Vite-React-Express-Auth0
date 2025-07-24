import { AppState } from "../AppState"
import PropTypes from "prop-types";
import { Example } from "../Models/Example";
import { exampleService } from "../Services/ExampleService";

export default function exampleComponent({ example }) {

    function setActiveExample()
    {
        AppState.activeExample = example;
        console.log(AppState.activeExample);
    }

    async function removeExample()
    {
        try {
            await exampleService.removeExample(example.id);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div onClick={setActiveExample}>
            Example Iteration (Click to set active)
            <button onClick={removeExample} title="delete example">Delete Example</button>
        </div>
    )
}

exampleComponent.PropTypes = {
    example: PropTypes.instanceOf(Example)
};