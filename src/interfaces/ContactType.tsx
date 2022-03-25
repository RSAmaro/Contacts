export interface ContactType {
    id: number,
    name: string
}

export function returnTypeCollumns(){
    const obj: ContactType = {id: 0, name: ""};
    return Object.keys(obj);
}