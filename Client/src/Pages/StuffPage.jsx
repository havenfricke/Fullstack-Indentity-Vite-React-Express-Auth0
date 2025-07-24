import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { exampleService } from '../Services/ExampleService.js';
import { AppState } from '../AppState.js';
import ExampleComponent from '../Components/ExampleComponent.jsx'




function StuffPage()
{
    async function getExamples() 
    {
        try {
            await exampleService.getAllExamples();
        } catch (e) {
            console.error(e);
        }
    }

    let examples = (AppState.exampleArray.map(ex => {
        return (
            <div key={ex.id}>
                <ExampleComponent examples={ex}/>
            </div>
        )
    }))

    useEffect(() => {
        getExamples();
    }, []) // Variables in array will "React", run useEffect then, update webpage.

    return (
        <section>
            Stuff Page
            {examples}
        </section>
    )
}

export default observer(StuffPage);