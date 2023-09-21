import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'GoogleMap_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="GoogleMap_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class GoogleMapComponent implements OnInit {

  formData = {
    locations: [
      {
        "id": "clfm38bvi0002ob01qvzhsm5z",
        "createdAt": "2023-03-24",
        "updatedAt": "2023-04-01",
        "name": "New York ",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "New York",
        "state": "New Your",
        "postalCode": "335",
        "latitude": 37.98500309285596,
        "longitude": -80.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      },
      {
        "id": "clfuxl1j50002v0rc8dgm33jb",
        "createdAt": "2023-03-30",
        "updatedAt": "2023-03-30",
        "name": "Cicago",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Cicago",
        "state": "Kansas",
        "postalCode": "335",
        "latitude": 38.985003092856,
        "longitude": -81.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      },
      {
        "id": "clg0woxoc000yv0ywaemxje1d",
        "createdAt": "2023-04-03",
        "updatedAt": "2023-04-03",
        "name": "Texas",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Texas",
        "state": "Virginia",
        "postalCode": "223",
        "latitude": 35.985003092856,
        "longitude": -82.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      },
      {
        "id": "clg0x25r30012v0ywj54joyx8",
        "createdAt": "2023-04-03",
        "updatedAt": "2023-04-03",
        "name": "Houston",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Houston",
        "state": "Texas",
        "postalCode": "675",
        "latitude": 33.985003092856,
        "longitude": -80.389453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      },
      {
        "id": "clg29fpjl0000o6016gxv5q4e",
        "createdAt": "2023-04-04",
        "updatedAt": "2023-04-04",
        "name": "NewMexico",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "NewMexico",
        "state": "NewMexico",
        "postalCode": "424",
        "latitude": 39.985003092856,
        "longitude": -83.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      },
      {
        "id": "clg29gmoy0002o601rimfig24",
        "createdAt": "2023-04-04",
        "updatedAt": "2023-04-04",
        "name": "Wellington",
        "locationName": null,
        "line1": null,
        "line2": null,
        "city": "Wellington",
        "state": "Mashchusesu",
        "postalCode": "234",
        "latitude": 37.385003092856,
        "longitude": -80.189453125,
        "abbrev": null,
        "division": null,
        "country": "USA",
        "officePhone": null,
        "fax": null,
        "attentionTo": null,
        "providerLocations": null,
        "caseAccounts": null,
        "caseProcedures": null,
        "appointments": null
      }
    ]
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
