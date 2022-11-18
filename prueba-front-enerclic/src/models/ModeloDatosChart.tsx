export interface IDatosChart {
    labels: string[], 
    datasets : IDataSets[]
}

export interface IDataSets {
    label : string,
    data : number[], 
    backgroundColor : string
}
