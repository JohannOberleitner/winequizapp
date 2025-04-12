import { GrapeColor } from "../../grapevarieties/entities";
import { IWineRegionData, WineColor } from "../entities";

export const sudouest_wineregion: IWineRegionData = {
  name:'Südwestfrankreich',
  country:'Frankreich',
  area: 50000,
  specials: [
    { question: 'In welche Bereiche kann die Region eingeteilt werden?',
        correct_answers: ['Bordeaux Kopien', 'Südwestweine'],
        wrong_answers: ['Cognac Grundweine', 'Cremantbereich', 'Südliche Desertweine']
    }
  ],
  appellations: [
    {
      category: 'Bordeaux-Kopien',
      name: 'Bergerac AOC',
      area: 7000,
      terroir: {
        climate: [
          { main:'Ozeanisch', 
            effects: ['Ausgeprägte Temperaturspitzen Sommer und Winter'],
            precipitation_amount: 750
          }
        ],
        soil: [
          { type: ['Anschwemmböden', 'Kies', 'Sand'],
            subsoils: [
              {
                location: 'Höher gelgene Terassen',
                type: ['Kalkstein']
              }
            ]
          }
        ],
      },
      legal: {
        allowedColors: [WineColor.Red, WineColor.Rose],
        specialRule: ['Verschnitt aus mindestens 2 Rebsorten'],
        specials: [
          {
            question: 'Wieviele Rebsorten müssen mindestens verschnitten werden?',
            correct_answers: ['2'],
            wrong_answers: ['1', '3', '4']
          }
        ],
        grapeVarities: ['Cabernet Sauvignon', 'Cabernet Franc', 'Merlot', 'Malbec', 'Fer Servadou', 'Mérille'],
        maximumVield: 55
      }
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Bergerac Sec AOC',
      legal: {
        allowedColors: [WineColor.White],
        specials: [
          {
            question: 'Wieviele Rebsorten müssen mindestens verschnitten werden?',
            correct_answers: ['2'],
            wrong_answers: ['1', '3', '4']
          }
        ],
        grapeVarities: ['Sémillon', 'Sauvignon Blanc', 'Muscadelle', 'Chenin Blanc', 'Ondenc', 'Ugni Blanc'],
        specialRule: ['Verschnitt aus mindestens 2 Rebsorten - Ugni Blanc nur bis zu 25%'],
        maximumVield: 60
      }
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Côtes de Bergerac AOC',
      legal: { specialRule: ['Weniger Erträge', 'Deckt Bergerac AOC und Bergerac Sec AOC ab', 'auf Bordeaux-Rebsorten beschränkt', 'Für Weine im Holzausbau']}
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Monbazillac AOC',
      area: 2200,
      legal: {
        grapeVarities: ['Sémillon', 'Sauvignon Blanc', 'Muscadelle'],
        maximumVield: 40,
        manualHarvest: true
      },
      suggarWine: {
        botrytisOnly: true,
        botrytisInfluencedBy: 'Fluss Gardonette',
        remainingSuggar: 45,
        alcohol: 12.5
      },
      comments: ['Muscadelle gedeiht besonders gut', 'Exportrate gering', 'Trockener Weißwein als Bergerac Sec verkauft']
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Saussignac AOC',
      area: 50,
      legal: {
        maximumVield: 50,
        manualHarvest: true,
        grapeVarities: ['Sémillon', 'Sauvignon Blanc', 'Muscadelle'],
      },
      suggarWine: {
        remainingSuggar: 18,
        maxAlcohol: 15
      },
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Rosette AOC',
      area: 23,
      legal: {
        maximumVield: 40,
        manualHarvest: true,
        grapeVarities: ['Sémillon', 'Sauvignon Blanc', 'Muscadelle'],
      },
      suggarWine: {
        remainingSuggar: 8,
        maxRemainingSuggar: 54,
        alcohol: 11
      },
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Montravel AOC',
      area: 250,
      legal: {
        allowedColors: [WineColor.White, WineColor.Red],
        maximumVield_white: 58,
        maximumVield_red: 50,
        specialRule: ['Rotweine müssen aus mind 50% Merlot neben CS, CF bzw Côt bsetehen']
      },
      comments: ['Einen der besten Weißweine aus mind 25% Sémillon und 25% Sauvignon Blanc sowie Muscadelle',
        'Einige der besten Weißweine werden im Holzfass vergoren',
        'Subappellation: Côtes de Montravel AOC für halbsüße Weine (50ha)',
        'Subappellation: Haut-Montravel AOC für Botrytis Weine (50ha)',
      ]
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Pécharmant AOC',
      area: 400,
      legal: {
        allowedColors: [WineColor.Red],
        grapeVarities: ['Cabernet Franc', 'Cabernet Sauvignon', 'Merlot', 'Malbec'],
        maximumVield: 45,
        specials: [
          {
            question: 'Wieviele Rebsorten müssen mindestens verschnitten werden?',
            correct_answers: ['3'],
            wrong_answers: ['1', '2', '4']
          }
        ],
        specialRule: ['Verschnitt aus mindestens 3 Rebsorten'],
      },
      terroir: {
        soil: [ {type: ['Kies']}]
      },
      comments: ['Weinberge nach Süden ausgerichtet', 'Rosette AOC befindet sich innerhalb von Pécharmant']
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Buzet AOC',
      area: 2100,
      legal: {
        allowedColors: [WineColor.White, WineColor.Rose, WineColor.Red],
        grapeVarities: [
          'Sémillon', 'Sauvignon Blanc', 'Muscadelle', 
          'Cabernet Franc', 'Cabernet Sauvignon', 'Merlot', 'Côt'],
        maximumVield: 55,
        minimumAlcohol_white: 9.5,
        minimumAlcohol_red: 10
      },
      terroir: {
        soil: [ {type: ['Ton', 'Kies', 'kalkigem Lehm', 'sauren Ton']}]
      },
      comments: [
        'Lokale Genossenschaft Les Vignerons de Buzet',
        'Eigenen Fassbinder', 'Weine werden nach Lagen vinifiziert und dann jeweils gesondert in Fässern ausgebaut'
      ]
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Côtes de Duras AOC',
      area: 1500,
      legal: {
        allowedColors: [WineColor.White, WineColor.LieblichWhite, WineColor.Rose, WineColor.Red],
        grapeVarities: [
          'Sauvignon Blanc', 'Ondenc', 'Sémillon', 'Muscadelle', 'Mauzac', 'Chenin Blanc', 'Ugni Blanc',
          'Cabernet Sauvignon', 'Cabernet Franc', 'Merlot', 'Côt'
        ],
        maximumVield_white: 60,
        maximumVield_red: 55,
        /* maximumYiel_whiteLieblich: 50 */
      },
      terroir: {
        soil: [ {type: ['Kalkstein', 'Molasse', 'sandigem Kalk']}]
      },
      comments: ['Hauptsächlich leichte Rotweine im Bordeaux-Stil', 'aber uach lokale Rebsorten'] 
    },
    {
      category: 'Bordeaux-Kopien',
      name: 'Côtes de Marmandais AOC',
      area: 1400,
      legal: {
        allowedColors: [WineColor.White, WineColor.Rose, WineColor.Red],
        grapeVarities: [
          'Sauvignon Blanc', 'Sémillon', 'Muscadelle', 'Ugni Blanc',
          'Cabernet Sauvignon', 'Cabernet Franc', 'Merlot', 'Abouriou', 'Côt', 'Fer', 'Gamay', 'Syrah'
        ],
        specials: [
          {
            question: 'Wieviel Prozent dürfen Cabernet Sauvignon, Cabernet Franc und Merlot im Verschnitt ausmachen',
            correct_answers: ['75%'],
            wrong_answers: ['30%', '60%', '85%']
          }, 
          {
            question: 'Welche Rebsorten müssen Teil des Verschnitts sein?',
            correct_answers: ['Abouriou', 'Fer', 'Syrah'],
            wrong_answers: ['Cabernet Sauvignon', 'Merlot']
          }
        ],
        specialRule:['Alte und lokale Rebsorten müssen Teil des Verschnitts beim Rotwein sein '],
        maximumVield_white: 60,
        maximumVield_red: 55
      },
      comments: ['Weißwein bis zu 30% Muscadelle, Semillon, Ugni Blanc',

        'Klima etwas kühler, daher Weine leichter',
        'Genossenschaften spielen eine wichige sRolle'
      ]
    }
  ]
}