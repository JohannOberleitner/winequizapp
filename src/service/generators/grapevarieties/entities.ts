


export enum AcidLevel {
  Low,
  Medium,
  High
}

export enum RipenessLevel {
  Early,
  MiddleEarly,
  MiddleLate,
  Late
}
export enum SugarGradation {
  Higher
}

export enum BodyLevel {
  High
}

export enum TanninLevel {
  Moderate,
  Rich
}

export enum AlcoholLevel {
  Low,
  Medium,
  High
}
export enum YieldLevel {
  Low,
  Medium,
  High
}

export enum AromaCharacteristic {
  Low,
  Good,
}

export enum Stool {
  Early,
  Late
}

export enum ComparedValue {
  Less,
  Larger
}

export enum Durability {
  Young,
  Durable
}

export enum DrinkingAge {
  Young
}

export enum GrapeColor {
  White,
  Red
}

export enum BerrySkin {
  Thin,
  Thick
}

export interface IGrapeVarietyData {
  name: string,
  color: GrapeColor,
  international: boolean,
  primaryCountry?: string[],
  yield?: YieldLevel,
  berryskin?: BerrySkin,
  acid?: AcidLevel,
  sugargradation?: SugarGradation,
  body?: BodyLevel,
  tannin?: TanninLevel,
  durable?: Durability,
  drinkingAge?: DrinkingAge,
  riping?: RipenessLevel,
  stool?: Stool,
  acolhol?: AlcoholLevel,
  aroma?: string[],
  aromaCharacteristic?: AromaCharacteristic,
  typicalInfos?: string[],
  typicalBlendPartners?: string[],
  risks?: string[],
  usedInSweetWines?: boolean,
  occurencePercentage?: number,
  comparedTo?: {
    otherVarietyName: string,
    yield?: ComparedValue,
    ripes?: ComparedValue,
    body?: ComparedValue,
    tannin?: ComparedValue,
    finesse?: ComparedValue,
    properties?: string[]
  }
};