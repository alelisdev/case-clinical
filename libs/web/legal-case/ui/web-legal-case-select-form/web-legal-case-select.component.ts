

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import {LegalCase} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
      [routerKeys]="routerKeys"
      (formRouterKeyDidChange)="formRouterKeyDidChange($event)"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-legal-case-form
        class="flex-grow flex flex-col"
        [formName]="'legalCase_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [legalCase]="legalCase"
      >
      >
      </ui-legal-case-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-legal-case-form
        class="flex-grow flex flex-col"
        [formName]="'legalCase_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [legalCase]="{}"
      >
      </ui-legal-case-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-legal-case-select-table-view
        class="w-full h-full bg-white"
        [legalCases]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-legal-case-select-table-view>
    </ng-template>
  `,
    providers: [WebLegalCaseFeatureStore],
})
export class WebLegalCaseSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  legalCase: LegalCase

  routerKeys = [ 'accidentTypeId', 'patientId', 'medLevelId', 'firmId', 'attorneyId', 'caseStatusId', 'caseTypeId', 'patientTreatmentStatusId', 'caseProgressStatusId', 'adverseInsuranceStatusId' ];

  constructor(private store: WebLegalCaseFeatureStore,
    private readonly route: ActivatedRoute,
    ) {
    super()
    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.store.setPatientId(patientId)
    }
    this.store.loadLegalCasesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.legalCases$.pipe(
      switchMap((legalCases) => {
        return of(legalCases)
      }),
    )
  }

  formRouterKeyDidChange(routerKeys) {
    if(routerKeys["accidentTypeId"]) {
      const accidentTypeId = routerKeys["accidentTypeId"]
      this.store.setAccidentTypeId(accidentTypeId)
    }

    if(routerKeys["patientId"]) {
      const patientId = routerKeys["patientId"]
      this.store.setPatientId(patientId)
    }

    if(routerKeys["medLevelId"]) {
      const medLevelId = routerKeys["medLevelId"]
      this.store.setMedLevelId(medLevelId)
    }

    if(routerKeys["firmId"]) {
      const firmId = routerKeys["firmId"]
      this.store.setFirmId(firmId)
    }

    if(routerKeys["attorneyId"]) {
      const attorneyId = routerKeys["attorneyId"]
      this.store.setAttorneyId(attorneyId)
    }

    if(routerKeys["caseStatusId"]) {
      const caseStatusId = routerKeys["caseStatusId"]
      this.store.setCaseStatusId(caseStatusId)
    }

    if(routerKeys["caseTypeId"]) {
      const caseTypeId = routerKeys["caseTypeId"]
      this.store.setCaseTypeId(caseTypeId)
    }

    if(routerKeys["patientTreatmentStatusId"]) {
      const patientTreatmentStatusId = routerKeys["patientTreatmentStatusId"]
      this.store.setPatientTreatmentStatusId(patientTreatmentStatusId)
    }

    if(routerKeys["caseProgressStatusId"]) {
      const caseProgressStatusId = routerKeys["caseProgressStatusId"]
      this.store.setCaseProgressStatusId(caseProgressStatusId)
    }

    if(routerKeys["adverseInsuranceStatusId"]) {
      const adverseInsuranceStatusId = routerKeys["adverseInsuranceStatusId"]
      this.store.setAdverseInsuranceStatusId(adverseInsuranceStatusId)
    }

    this.store.loadLegalCasesEffect();
  }
}

