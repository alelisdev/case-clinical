import { Component, OnInit } from '@angular/core';
import { WebTemplatesStore } from './web-templates.store';

@Component({
  selector: 'app-web-templates',
  templateUrl: './web-templates.component.html',
  styleUrls: ['./web-templates.component.scss']
})
export class WebTemplatesComponent implements OnInit {

  constructor(public store: WebTemplatesStore) { }

  formData = {
    "cases": [
      {
        "patientName": "Beyonce Knowles",
        "dateOfLoss": "2016-01-16",
        "dateSettled": "2019-12-12",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      },
      {
        "patientName": "Mark Hamill",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      },
      {
        "patientName": "Judy Garland",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      },
      {
        "patientName": "Taylor Swift",
        "dateOfLoss": "2019-05-06",
        "dateSettled": "2019-11-15",
        "dateReceived": "2016-01-01",
        "billedCharge": 10000,
        "siteCost": 1000,
        "settledPayment": 100000,
        "discountedRate": 20,
        "siteCostReturn": 100000
      }
    ],
    "bills": [
      {
        "providerName": "David Eldringhoff",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      },
      {
        "providerName": "Bay City Surgery Center",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      },
      {
        "providerName": "Total Outside Meds",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      },
      {
        "providerName": "Lien Total",
        "billAmount": 500,
        "promiseToPay": 250,
        "percentOfBilledCharges": 50
      }
    ],
    "microDecompressions": [
      {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      },
      {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }
    ],
    "visit": [
      {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      },
      {
        "invoiceTotal": 200,
        "siteCost": 50,
        "offerAmount": 150,
        "percentOfBilledCharges": 75,
        "percentOfSiteCosts": 300,
        "roi": 100,
        "proRata": 208.33,
        "xOne": 50,
        "xTwo": 100,
        "xThree": 150,
        "xFour": 200,
        "offerDate": "2023-05-09",
        "mode": "Locked"
      }
    ],
    "filterItems": [
      {
        "id": "Written Off",
        "title": "Written Off"
      },
      {
        "id": "All",
        "title": "All"
      }
    ],
    "settlementValues": {},
    "invoices": [
      {
        "name": "Overview.pdf",
        "size": 135
      },
      {
        "name": "Details.pdf",
        "size": 165
      },
      {
        "name": "Conclusion.pdf",
        "size": 535
      }
    ]
  }
  defaultLatitude = 36.98500309285596;
  defaultLongitude = -79.189453125;
  data = [
    {
      lat: 37.985003092856,
      lng: -80.189453125,
    },
    {
      lat: 38.985003092856,
      lng: -81.189453125,
    },
    {
      lat: 35.985003092856,
      lng: -82.189453125
    },
    {
      lat: 33.985003092856,
      lng: -80.389453125
    },
  ]

  ngOnInit() {
  }

  remove() {
    this.data.pop();
  }

  refresh() {
    this.data.at(0).lat = 0;
    // this.data = [
    //   {
    //     lat: 37.985003092856,
    //     lng: -80.189453125,
    //   },
    //   {
    //     lat: 38.985003092856,
    //     lng: -81.189453125,
    //   },
    // ]
  }
}
