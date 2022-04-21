export interface Recepie {
    name: string,
    amount?:string,
    unit?: string,
}

export interface Ingridients {
    id: number,
    name:string,
    liczba:string
}
export interface Nazwa{
    name: string,
    category: string
}

export interface WeekDay{
    day: string,
    breakfast: string,
    work: string,
    lunch: string,
    dinner:string
}
export interface shoplist{
    name : string,
    number: number
}
 