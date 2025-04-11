import { Injectable } from '@angular/core';
import { AcidLevel, AlcoholLevel, AromaCharacteristic, BerrySkin, BodyLevel, ComparedValue, DrinkingAge, Durability, GrapeColor, IGrapeVarietyData, RipenessLevel, Stool, SugarGradation, TanninLevel, YieldLevel } from './entities';

@Injectable({
  providedIn: 'root'
})
export class GrapeVarietyDataProviderService {

  constructor() { }

  public get data(): IGrapeVarietyData[] {
    return this.grapeVaritiesData;
  }
  
  private grapeVaritiesData: IGrapeVarietyData[] = [
    {
      name: 'Merlot',
      color: GrapeColor.Red,
      international: true,
      yield: YieldLevel.Medium,
      sugargradation: SugarGradation.Higher,
      body: BodyLevel.High,
      tannin: TanninLevel.Moderate,
      typicalInfos: ['Im Bordeaux Verschnitt trägt Merlot bei Weichheit, Fülle, Geschmeidigkeit'],
      stool: Stool.Early,
      risks: ['Verrieseln', 'Trockenstress bei Hitze', 'Graufäule bei zuviel Niederschlag']
    },
    {
      name: 'Cabernet Sauvignon',
      color: GrapeColor.Red,
      yield: YieldLevel.Low,
      international: true,
      typicalInfos: ['Benötigt warme Böden mit guter Drainage',
          'Sollte auf Böden wie Kies oder Schotter stehen, um gut auszureifen',
          'Mit Einsatz von Barrique kommen Aromen von Zedernholz und Röstaromen hinzu',
          'Bei zu hohen Erträgen und bei der Lese von unreifen Trauben entsehen dünne Wine mit unreifen, grünen TAnninen'
      ],
      stool: Stool.Late, //verglichen mit Merlot
      riping: RipenessLevel.Late,
      risks: ['Pilzkrankheiten', 'Stiellähme'],
      tannin: TanninLevel.Rich,
      acid: AcidLevel.High,
      durable: Durability.Durable,
      aroma: ['Cassis', 'dunkle Kirschen'],
      acolhol: AlcoholLevel.Medium,
      typicalBlendPartners: ['Merlot']
    },
    {
      name: 'Cabernet Franc',
      color: GrapeColor.Red,
      international: true,
      typicalInfos: ['Bevorzugt warme Böden mit guter Drainage',
        'Bei unreifen Trauben finden sich Aromen von Kräutern und grünen Stielen/Kämmen'
      ],
      acid: AcidLevel.High,
      aroma: ['Volle Duftigkeit', 'Dunkle Beeren'],
      comparedTo: {
        otherVarietyName: 'Cabernet Sauvignon',
        yield: ComparedValue.Larger,
        ripes: ComparedValue.Less,
        body: ComparedValue.Less,
        tannin: ComparedValue.Less,
        finesse: ComparedValue.Less,
        properties: ['Kräftige Säure (für den Vergleich)']
      }
    },
    {
      name: 'Petit Verdot',
      color: GrapeColor.Red,
      international: false,
      stool: Stool.Early,
      riping: RipenessLevel.Late,
      durable: Durability.Durable,
      typicalInfos: ['Reift nur in sehr heißen Jahren voll aus'],
      tannin: TanninLevel.Rich,
      aroma: ['würzig'] 
    },
    {
      name: 'Malbec',
      color: GrapeColor.Red,
      international: true,
      drinkingAge: DrinkingAge.Young,
      risks: ['Verrieseln während der Blüte']
    },
    {
      name: 'Semillon',
      color: GrapeColor.White,
      international: true,
      yield: YieldLevel.High,
      berryskin: BerrySkin.Thin,
      typicalBlendPartners: ['Sauvignon Blanc', 'Muscadelle'],
      body: BodyLevel.High,
      aromaCharacteristic: AromaCharacteristic.Low,
      aroma: ['mit zunehmender Reife Wachsnoten'],
      usedInSweetWines: true,
      typicalInfos: [
        'Top-Weine werden oft im Barrique ausgebaut. Die Rebsorte hat natürliche Affinität zu französischer Eiche'
      ]
    },
    {
      name: 'Sauvignon Blanc',
      international: true,
      color: GrapeColor.White,
      acid: AcidLevel.High,
      usedInSweetWines: true,
      aroma: ['Vegetabile Noten', 'Gras', 'Kräutern', 'Holunderblüten'],
        typicalInfos: ['Für Top-Weine im Holzfass ausgebaut' ]
      },
      {
        name: 'Muscadelle',
        international: false,
        color: GrapeColor.White,
        risks: ['Graufäule'],
        usedInSweetWines: true,
        typicalInfos: ['Sehr anfällig für Botrytis', 'Gehört nicht zur  Muscat-Familie'
        ]
        
      },
  {
      name: 'Assyrtiko',
      color: GrapeColor.White,
      international: false,
      primaryCountry: ['Griechenland'],
      yield: YieldLevel.Low,
      aromaCharacteristic: AromaCharacteristic.Good,
      acid: AcidLevel.High,
      typicalInfos: ['Gute Qualitäten können im Barique ausgeabut werden'],
      typicalBlendPartners: ['Malagousia', 'Sauvignon Blanc', 'Semillon']
  }];
}
