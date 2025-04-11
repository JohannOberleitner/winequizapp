
export interface IExportAndConsumption {
  export?: number,
  consumer?: number
}

export interface IProductionWineDistribution {
  white: number,
  red: number,
  rose?: number,
  sparkling?: number,
}

export enum WineColorDistribution {
  WhiteMajority,
  RedMajority
}

export interface IProductionWineDistributionStatement {
  distribution: WineColorDistribution
}

export interface NumberRange {
  lowest: number;
  largest: number;
}

export interface ICountryData {
  name: string,
  article?: string,
  wineArea: number,
  proCapitaConsumption?: number,
  productionAmount?: number,
  productionRange?: NumberRange,
  grapeColorDistriubtion?: IProductionWineDistribution,
  exportAndCnsumption?: IExportAndConsumption
}
