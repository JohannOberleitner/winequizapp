import { Injectable } from '@angular/core';
import { IWineRegionData } from './entities';
import { WineColorDistribution } from '../countryData/entities';
import { GrapeColor, IGrapeVarietyData } from '../grapevarieties/entities';
import { bordeaux_wineregion } from './france/bourdeaux';
import { sudouest_wineregion } from './france/sudouest';

@Injectable({
  providedIn: 'root'
})
export class WineRegionsDataProviderService {

  constructor() { }

  public get data(): IWineRegionData[] {
      return this.wineRegionData;
  }

  private grape_aglianico: IGrapeVarietyData = {
    name: 'Aglianico', international: false, color: GrapeColor.Red,
  };

  private grape_fiano: IGrapeVarietyData = 
  { name: 'Fiano', international: false, color: GrapeColor.White };

  private wineRegionData: IWineRegionData[] = [
    bordeaux_wineregion,
    sudouest_wineregion,
  {
    name: 'Wachau',
    country: 'Österreich',
    area: 1300  
  },
  {
    name: 'Kampanien',
    country: 'Italien',
    area: 23900,
    productionAmount: 1.5,
    grapeColorDistribution: { distribution: WineColorDistribution.WhiteMajority },
    geography: {
      description: ['hügelig'],
      height: { lowest: 400, highest: 700 }
    },
    terroir: {
      climate: [
        {
          main: 'Mild und temperiert',
          location: 'Küste',
          effects: ['Trauben können hier voll ausreifen'],
          precipitation: 'Niederschläge fallen hauptsächlich im Herbst und Winter'
        },
        {
          main: 'Kontinental',
          location: 'Landesinneren',
          effects: ['Größere Temperaturschwankungen']
        }
      ],
      soil: [
        {
          type: ['Vulkanischen Ursprung']
        },
        {
          location: 'Vesuvio DOC',
          type: ['Vulkanischer Ursprung','Sand']
        },
        {
          location: 'Campi Flegrei DOC',
          type: ['Vulkanischer Ursprung','Sand']
        }
      ]
    },
      /*
      ALLES -> Abbruzen
      climate: {

      },
      soil: [
        { type: ['Kalk', 'Lehm', 'Moränen'] },
        { location: 'Norden', type: ['Quarzhaltiger Sandstein', 'Vulkanische Gipsböden' ] }
      ]
    },
    importantGrapes: [
      { name: 'Trebbiano', color: GrapeColor.White, international: false, occurencePercentage: 35  },
      { name: 'Montepulciano', color: GrapeColor.Red, international: false, occurencePercentage: 50 },

    ],*/
    specials: [
      { question: 'Wo wird in Kampanien hochwertiger Weinbau betrieben?',
        correct_answers: ['Avellino', 'Benevento'],
        wrong_answers: ['Neapel', 'Salerna']
      }
    ],
    importantGrapes: [
      { name: 'Asprinio', international: false, color: GrapeColor.White },
      { name: 'Biancolella', international: false, color: GrapeColor.White },
      { name: 'Coda di Volpe', international: false, color: GrapeColor.White },
      this.grape_fiano,
      { name: 'Greco', international: false, color: GrapeColor.White },
      { name: 'Malvasia', international: false, color: GrapeColor.White },
      { name: 'Trebbiano', international: false, color: GrapeColor.White },
      this.grape_aglianico,
      { name: 'Aleatico', international: false, color: GrapeColor.Red },
      { name: 'Barbera', international: false, color: GrapeColor.Red },
    ]
  },
  {
    name: 'Taurasi DOCG',
    country: 'Italien',
    parentWineRegion: 'Kampanien',
    area: 400,
    importantGrapes: [this.grape_aglianico]
  },
  {
    name: 'Fiano di Avellino DOCG',
    country: 'Italien',
    parentWineRegion: 'Kampanien',
    importantGrapes: [this.grape_fiano]
  }
  ];
}


