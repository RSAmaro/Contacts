export interface Contact {
    id: number,
    name: string,
    phone: number,
    typeName: string
}

export function returnCollumns(){
    const obj: Contact = {id: 0, name: "", phone: 0, typeName: ""};
    return Object.keys(obj);
}