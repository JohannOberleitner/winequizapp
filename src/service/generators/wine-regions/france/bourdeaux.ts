import { IWineRegionData } from "../entities";


export const bordeaux_wineregion: IWineRegionData = {
    name:'Bordeaux',
    country:'Frankreich',
    area: 110000,
    harvesttime: { start: 'Mitte September', end:'Weit im Oktober' },
    grapeColorDistribution: { red: 85, white: 10, rose: 4 },
    terroir: {
      climate: [
        { 
          main: 'Gemäßigt maritimes Klima',
          reason: 'Nähe zum Atlantik',
          sunhours_vegationperiod: 2000,
          precipitation_amount: 950,
          precipitation: 'Ausreichend in der Vegetationsperiode, dass kein Trockenstress entsteht',
          autumn: 'Warmer, trokcener Herbst',
          risks: [
            {
             name: 'Graufäule', origin: 'Feuchtigung vom Atlantik und den Flüssen'
            },
            {
              name: 'Winterfrost', risk_factor: 'seltem', prevention:'Maritimes Klima'
            },
            {
             name: 'Frühlingsfrost', risk_factor: 'seltem', prevention:'Maritimes Klima'
            },
            {
              name: 'Regen', effect:'Zuviel während der Blüte gibt Schlechter Fruchtansatz',
            },
            {
              name: 'Hagel'
            }
          ],
          specials: [
            {
              question:'Was (in der Nähe der Küste) schützt die Trauben vor den Winden des Atlantik?',
              correct_answers: ['Pinienwälder', 'Sanddünen'],
              wrong_answers: ['Bordeaux Gebirge', 'Gironde', 'Sumpfgebiet']
            }
          ]
        }
      ],
      soil: [
        {
          location: 'Böden in Flussnähe',
          type: ['Schwemmsandablagerungen'],
          effect: 'Es wachsen vorwiegend Trauben für einfache Weine'
        },
        {
          location: 'Linkes Ufer und Graves',
          type: ['Schotter', 'Quarzkiesel'],
          underground: ['Mergel', 'Sand', 'Kalk'],
          origin: 'Von FLüssen aus Pyrenäen und Zentralmassiv',
          effect: 'Gute Drainage',
          subsoils: [
            {
              location: 'Saint-Estephe',
              type: ['Lehm']
            }
          ],
          specials: [
            {
              question: 'Auf was liegen die Toplagen der bekkanten Chateas?',
              correct_answers: ['Kieshügel', 'Kuppen aus Schotter und/oder Kies'],
              wrong_answers: ['Schwemmlandablagerungen', 'Granitböden']
            },
            {
              question: 'Welche positiven Effekte haben croupés?',
              correct_answers: ['Regen kann gut abfließen', 'Schotter und Kies heizen sich durch Sonneneinstrahlung auf'],
              wrong_answers: ['Regln sammelt sich in den Mulden', 'Schotter und Kies kühlen die Rebstöcke im Sommer']
            }
          ]
        },
        {
          location: 'Rechtes Ufer in Saint-Emilion',
          type: ['Kies', 'Sand'],
          underground: ['Kalkstein']
        },
        {
          location: 'Pommerol',
          type: ['kalkreicher Lehm'],
          effect: 'Anbau von Merlot'
        }
      ]
    }
  };
