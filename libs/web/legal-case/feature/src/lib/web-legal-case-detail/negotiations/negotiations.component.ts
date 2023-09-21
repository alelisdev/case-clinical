import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { NegotiationsStore } from './negotiations.component.store';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      {{log(vm.legalCase)}}
      <ui-formly-json-form
        formName="legalCase_negotiations"
        [showSubmitButton]="false"
        [componentStore]="store"
        [formData]="formData"
        [model]="vm.legalCase"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [
    WebLegalCaseFeatureStore,
    NegotiationsStore,
    WebCaseStatusFeatureStore,
    {
      provide: 'lastFiveLegalCaseStore',
      useClass: WebLegalCaseFeatureStore,
    }
  ],
})
export class WebLegalCaseNegotiationsComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  log(data: any) {
    console.log(data)
  }

  formData = {
    lastLegalCases: this.store.lastLegalCases$,
    caseStatuses: this.store.caseStatuses$,
    "chips": [
      {
        "title": "CHIRO",
        "days": 23
      },
      {
        "title": "PAIN MANAGEMENT",
        "days": 36
      },
      {
        "title": "CHIRO1",
        "days": 32
      },
      {
        "title": "CHIRO2",
        "days": 35
      },
      {
        "title": "CHIRO3",
        "days": 39
      },
      {
        "title": "TBI",
        "days": 12
      }
    ],
    "messages": [
      {
        "date": "2023-12-11",
        "content": "This is message from John Doe at 2023/12/11",
        "sender": "John Doe"
      },
      {
        "date": "2023-12-15",
        "content": "This is message from Felix at 2023/12/15",
        "sender": "Felix"
      },
      {
        "date": "2023-12-19",
        "content": "This is message from Michael at 2023/12/19",
        "sender": "Michael"
      }
    ],
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

  constructor(
    private readonly store: NegotiationsStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}

