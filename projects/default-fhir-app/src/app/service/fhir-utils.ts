export class FhirUtils {

  static humanNameToString(humanNames: fhir.r4.HumanName[]): string {
    if (!humanNames || humanNames.length === 0) {
      return '-';
    }
    let name = '';
    for (const humanN of humanNames) {
      name = name + FhirUtils.givenToString(humanN.given) + ' ' + humanN.family;
    }

    return name;
  }


  static givenToString(givens: string[]): string {
    if (!givens) {
      return '';
    }
    let givenToReturn = '';
    for (const given of givens) {
      givenToReturn = givenToReturn + given + ' ';
    }

    return givenToReturn;
  }



  static findSeriesInObservations(observations: fhir.r4.Observation[]): Serie[] {
    const seriesMap: Map<string, Serie> = new Map<string, Serie>();
    for (const observation of observations) {
      FhirUtils.findSeriesInObservation(observation, seriesMap);
    }
    console.log(seriesMap);
    return seriesMap.values() as any;
  }
  private static findSeriesInObservation(observation: fhir.r4.Observation, seriesMap: Map<string, Serie>) {

    // first we look in the main part of the observation to a Valuequantity
    if (observation.valueQuantity) {
      const idObs = observation.code.coding[0].system + '|' + observation.code.coding[0].code;
      let serie: Serie = seriesMap.get(idObs);
      if (!serie) {
        serie = new Serie();
        serie.id = observation.code.coding[0].system + '|' + observation.code.coding[0].code;
        serie.system = observation.code.coding[0].system;
        serie.code = observation.code.coding[0].code;
        serie.name = observation.code.coding[0].display;
        serie.points = [];
        seriesMap.set(idObs, serie);
      }
      const point = new Point();
      point.name = new Date(observation.effectiveDateTime);
      point.value = +observation.valueQuantity.value;
      serie.points.push(point);
    }
    // then we look for components:
    if (observation.component) {
      for (const component of observation.component) {
        const idObs = component.code.coding[0].system + '|' + component.code.coding[0].code;
        let serie: Serie = seriesMap.get(idObs);
        if (!serie) {
          serie = new Serie();
          serie.id = component.code.coding[0].system + '|' + component.code.coding[0].code;
          serie.system = component.code.coding[0].system;
          serie.code = component.code.coding[0].code;
          serie.name = component.code.coding[0].display;
          serie.points = [];
          seriesMap.set(idObs, serie);
        }
        const point = new Point();
        point.name = new Date(observation.effectiveDateTime);
        point.value = +component.valueQuantity.value;
        serie.points.push(point);
      }
    }
  }

}



export class Serie {
  id: string;
  name: string;
  system: string;
  code: string;
  points: Point[];
}
export class Point {
  name: any;
  value: number;
}
