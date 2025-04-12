import { IProductionWineDistribution, IProductionWineDistributionStatement } from "../countryData/entities"
import { GrapeColor, IGrapeVarietyData } from "../grapevarieties/entities"



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
  specials?: ISpecialQuestion[],
  appellations?: IAppellationData[]
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

export interface IAppellationData {
  name: string,
  category?: string,
  area?: number,
  terroir?: ITerroirData,
  grapeVarieties?: string[],
  legal?: IAppellationLaws
  suggarWine?: ISuggarWineData,
  comments?: string[]
}

export enum WineColor {
  White,
  LieblichWhite,
  SweetWhite,
  Red,
  Rose
}

export interface IAppellationLaws {
  allowedColors?: WineColor[],
  specialRule?: string[],
  grapeVarities?: string[],
  specials?: ISpecialQuestion[],
  minimumAlcohol_white?: number,
  minimumAlcohol_red?: number,
  maximumVield?: number,
  maximumVield_white?: number,
  maximumVield_red?: number,
  manualHarvest?: boolean
}

export interface ISuggarWineData {
  botrytisOnly?: boolean,
  botrytisInfluencedBy?: string,
  remainingSuggar?: number,
  maxRemainingSuggar?: number,
  alcohol?: number,
  maxAlcohol?: number
}