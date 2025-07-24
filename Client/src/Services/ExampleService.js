import { AppState } from "../AppState";
import { Example } from "../Models/Example";
import { api } from "./AxiosService";

class ExampleService 
{
    // CREATE
    async createExample(formData)
    {
        const response = await api.post('/examples', formData);
        console.log('create example', response);
        let example = new Example(response.data);
        AppState.exampleArray.push(example);
    }

    // READ
    async getAllExamples()
    {
        AppState.exampleArray = []
        const response = await api.get('/examples');
        console.log('get examples', response.data);
        AppState.exampleArray = response.data.map(example => new Example(example));
    }

    // READ BY ID
    async getExampleByID(id)
    {
        const response = await api.get(`/examples/${id}`);
        console.log('get exmaple by id', response.data);
        AppState.activeExample = response.data;
    }

    // UPDATE
    async editExample(id, formData)
    {
        const response = await api.put(`/examples/${id}`, formData);
        console.log('edit example');
        AppState.activeExample = response.data;
        AppState.exampleArray = AppState.exampleArray.filter(example => example.id != id);
        AppState.exampleArray = [...AppState.exampleArray, response.data];
    }

    // DELETE
    async removeExample(id)
    {
        const response = await api.delete(`/examples/${id}`);
        console.log('remove example', response.data);
        AppState.exampleArray = AppState.exampleArray.filter(example => example.id != id);
        AppState.activeExample = {};
    }
}

export const exampleService = new ExampleService();