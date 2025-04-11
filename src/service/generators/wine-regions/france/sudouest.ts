import { IWineRegionData } from "../entities";

export const sudouest_wineregion: IWineRegionData = {
    name:'Südwestfrankreich',
    country:'Frankreich',
    area: 50000,
    specials: [
      { question: 'In welche Bereiche kann die Region eingeteilt werden?',
        correct_answers: ['Bordeaux Kopien', 'Südwestweine'],
        wrong_answers: ['Cognac Grundweine', 'Cremantbereich', 'Südliche Desertweine']
      }
    ]
}