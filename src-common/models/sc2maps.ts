export enum SC2Map {
  TritonLE,
  EphemeronLE,
  WorldofSleepersLE,
  ZenLE,
  SimulacrumLE,
  NightshadeLE,
  EternalEmpireLE
}

export interface SC2LadderDescriptor {
  id: SC2Map;
  map: string;
  image?: string;
  active?: boolean;
}

export const SC2_MAPS: SC2LadderDescriptor [] = [{
    id: SC2Map.TritonLE,
    map: 'Triton LE'
  }, {
    id: SC2Map.EphemeronLE,
    map: 'Ephemeron LE'
  }, {
    id: SC2Map.WorldofSleepersLE,
    map: 'World of Sleepers LE'
  }, {
    id: SC2Map.ZenLE,
    map: 'Zen LE'
  }, {
    id: SC2Map.SimulacrumLE,
    map: 'Simulacrum LE'
  }, {
    id: SC2Map.NightshadeLE,
    map: 'Nightshade LE'
  }, {
    id: SC2Map.EternalEmpireLE,
    map: 'Eternal Empire LE'
  }
];