import { IProductionWineDistribution, IProductionWineDistributionStatement } from "../countryData/entities"
import { IGrapeVarietyData } from "../grapevarieties/entities"



export interface IWineRegionData {
  name: string,
  country: string,
  parentWineRegion?: string,
  area?: number,
  productionAmount?: number,
  harvesttime?: IHarvestTime,
  grapeColorDistribution?: IProductionWineDistribution|IProductionWineDistributionStatement,
  importantGrapes?: IGrapeVarietyData[],
  geography?: IGeographyData
  terroir?: ITerroirData,
  specials?: ISpecialQuestion[]
}

export interface IHarvestTime {
  start?: string,
  end?: string
}

export interface ITerroirData {

  climate?: IClimate[],
  soil?: ISoil[],
  
}

export interface IClimate {

  main?: string,
  location?: string,
  reason?: string,
  sunhours_vegationperiod?: number,
  precipitation_amount?: number,
  autumn?: string,
  precipitation?: string,
  risks?: IRisk[],
  effects?: string[],
  specials?: ISpecialQuestion[]
}

export interface ISpecialQuestion {
  question: string,
  correct_answers: string[],
  wrong_answers: string[]
}

export interface ISoil {
  location?: string,
  type?: string[],
  underground?: string[],
  origin?: string,
  effect?: string,
  subsoils?: ISoil[],
  specials?:  ISpecialQuestion[]
}

export interface IRisk {
  name: string,
  risk_factor?: string,
  origin?: string,
  prevention?: string,
  effect?: string
}

export interface IGeographyData {
  description?: [string],
  height?: number | INumberRange
}

export interface INumberRange {
  lowest: number,
  highest: number
}

