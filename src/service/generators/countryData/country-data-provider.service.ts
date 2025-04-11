import { Injectable } from '@angular/core';
import { ICountryData } from './entities';

@Injectable({
  providedIn: 'root'
})
export class CountryDataProviderService {

  constructor() { }

  public get data(): ICountryData[] {
    return this.countryData;
  }

  private countryData: ICountryData[] = [
    {
      name: 'Frankreich', wineArea: 790000, proCapitaConsumption: 42,
      productionAmount: 44
    },
    {
      name: 'Deutschland', wineArea: 103000, proCapitaConsumption: 20,
      productionAmount: 9.0,
      grapeColorDistriubtion: { white: 64, red: 36 }
    },
    {
      name: 'Schweiz', article: 'der ', wineArea: 14800, proCapitaConsumption: 33,
      productionAmount: 1.1,
      grapeColorDistriubtion: { white: 48, red: 52 }
    },
    {
      name: 'Österreich', wineArea: 45000, proCapitaConsumption: 27,
      grapeColorDistriubtion: { white: 70, red: 3 }
    },
    {
      name: 'Ungarn', wineArea: 68000,proCapitaConsumption: 28,
      productionAmount: 2.5,
      grapeColorDistriubtion: { white: 72, red: 2, rose: 8 }
    },
    {
      name: 'Bulgarien', wineArea: 68000, 
      productionAmount: 1.3,
      grapeColorDistriubtion: { red: 67, white: 33 }
    },
    { name:'Rumänien', wineArea: 98000, proCapitaConsumption: 24,
      productionRange: { lowest: 3.5, largest: 5.5 },
      grapeColorDistriubtion: { white: 60, red: 40 },
      exportAndCnsumption: { consumer: 90 }
    },
    { name:'Kroatien', wineArea: 21000, productionAmount: 1
    },
    {
      name:'Slowenien', wineArea: 21200, productionAmount: 0.8,
      proCapitaConsumption: 40,
      grapeColorDistriubtion: { white: 70, red: 30 } 
    }
  ];
}
