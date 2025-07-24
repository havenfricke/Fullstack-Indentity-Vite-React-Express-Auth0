/**
* @param { Object } target;
* @param { symbol | string | number } prop;
*/

export function propValidator(target, prop)
{
    if (typeof[prop] === 'function') { return; }

    if (!target.hasOwnProperty(prop))
    {
        throw new Error(`Invalid property: ${prop.toString()}.`);
    }
}