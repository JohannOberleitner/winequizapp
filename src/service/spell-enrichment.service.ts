import { Injectable } from '@angular/core';

export interface ISpellEnrichmentService {
  enrichCountryName(countryName: string): string;
  enrichWineRegionName(countryName: string, preposition: string): string;
}

@Injectable({
  providedIn: 'root'
})
export class SpellEnrichmentService implements ISpellEnrichmentService {

  constructor() { }

  public enrichCountryName(countryName: string): string {
    // console.log('Country:'+countryName+'!');
    return this.enrichWineRegionName(countryName, 'country');
  }

  public enrichWineRegionName(wineRegionName: string, kind: string): string {
    // console.log('Country:'+countryName+'!');
    if (kind == 'country' || kind == 'wineRegion') {
      let gender = this.getGenderFor(wineRegionName);
      switch (gender) {
        // Genetiv
        case Gender.Male: return `des ${wineRegionName}`;
        case Gender.Female: return `der ${wineRegionName}`;
        case Gender.Neutral: return `${wineRegionName}`
      }
    }
    return wineRegionName; 
  }

  dictionary: Record<string, Gender> = {
    'Schweiz': Gender.Female,
    'Wachau':Gender.Female
  }; 

  private getGenderFor(element: string): Gender {
    if (element in this.dictionary)
      return this.dictionary[element];
    return Gender.Unknown;
  }
}

enum Gender {
  Unknown,
  Male,
  Female,
  Neutral
} 
