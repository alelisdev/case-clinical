import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { EventEmitter, Injectable } from '@angular/core'
import { LegalCaseService } from './legal-case.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreateLegalCaseInput,
  UserUpdateLegalCaseInput,
  CorePaging,
  LegalCase,
  AccidentType,
  Patient,
  MedLevel,
  Firm,
  Attorney,
  CaseStatus,
  CaseType,
  PatientTreatmentStatus,
  CaseProgressStatus,
  AdverseInsuranceStatus,
  UserCreateDocumentInput,
  WebCoreDataAccessService,
  UserUpdateProcedureVendorInput,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface LegalCaseFeatureState {
  errors?: any
  loading?: boolean
  item?: LegalCase
  done: boolean
  formName?: string
  accidentTypeId?: string
  patientId?: string
  medLevelId?: string
  firmId?: string
  attorneyId?: string
  caseStatusId?: string
  caseTypeId?: string
  patientTreatmentStatusId?: string
  caseProgressStatusId?: string
  adverseInsuranceStatusId?: string
  legalCases: LegalCase[]
  legalCaseUpdates: LegalCase[]
  accidentTypes?: AccidentType[]
  patients?: Patient[]
  medLevels?: MedLevel[]
  firms?: Firm[]
  attorneys?: Attorney[]
  caseStatuses?: CaseStatus[]
  caseTypes?: CaseType[]
  patientTreatmentStatuses?: PatientTreatmentStatus[]
  caseProgressStatuses?: CaseProgressStatus[]
  adverseInsuranceStatuses?: AdverseInsuranceStatus[]
  mrnNumber?: string
  searchQuery?: string
  paging?: CorePaging
  currentLegalCaseId?:string | undefined
  summary?: any
}

export interface IMRNNumberParts {
  dateOfBirth: string
  dateOfLoss: string
  accidentKind: string
  legalCaseId: string
}
@Injectable()
export class WebLegalCaseFeatureStore extends ComponentStore<LegalCaseFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly legalCaseService: LegalCaseService
  ) {
    super({
      loading: false,
      legalCases: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      accidentTypeId: undefined,
      patientId: undefined,
      medLevelId: undefined,
      firmId: undefined,
      attorneyId: undefined,
      caseStatusId: undefined,
      caseTypeId: undefined,
      patientTreatmentStatusId: undefined,
      caseProgressStatusId: undefined,
      adverseInsuranceStatusId: undefined,
      legalCaseUpdates: [],
      mrnNumber: undefined,
      currentLegalCaseId:undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
      summary: [
        {
          month: 'Jan',
          settlement: 45,
          prorata: 78
        },
        {
          month: 'Feb',
          settlement: 50,
          prorata: 82
        },
        {
          month: 'Mar',
          settlement: 70,
          prorata: 110
        },
        {
          month: 'Apr',
          settlement: 76,
          prorata: 90
        },
      ]
    })

    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      const legalCaseId = this.route.snapshot.paramMap.get('legalCaseId')
      this.setFormName('legalCase_edit')
    } else {
      this.setFormName('legalCase_create')
    }

    if (this.route.snapshot.paramMap.has('accidentTypeId')) {
      const accidentTypeId = this.route.snapshot.paramMap.get('accidentTypeId')
      this.setAccidentTypeId(accidentTypeId)
    }

    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId')
      this.setPatientId(patientId)
    }

    if (this.route.snapshot.paramMap.has('medLevelId')) {
      const medLevelId = this.route.snapshot.paramMap.get('medLevelId')
      this.setMedLevelId(medLevelId)
    }

    if (this.route.snapshot.paramMap.has('firmId')) {
      const firmId = this.route.snapshot.paramMap.get('firmId')
      this.setFirmId(firmId)
    }

    if (this.route.snapshot.paramMap.has('attorneyId')) {
      const attorneyId = this.route.snapshot.paramMap.get('attorneyId')
      this.setAttorneyId(attorneyId)
    }

    if (this.route.snapshot.paramMap.has('caseStatusId')) {
      const caseStatusId = this.route.snapshot.paramMap.get('caseStatusId')
      this.setCaseStatusId(caseStatusId)
    }

    if (this.route.snapshot.paramMap.has('caseTypeId')) {
      const caseTypeId = this.route.snapshot.paramMap.get('caseTypeId')
      this.setCaseTypeId(caseTypeId)
    }

    if (this.route.snapshot.paramMap.has('patientTreatmentStatusId')) {
      const patientTreatmentStatusId = this.route.snapshot.paramMap.get('patientTreatmentStatusId')
      this.setPatientTreatmentStatusId(patientTreatmentStatusId)
    }

    if (this.route.snapshot.paramMap.has('caseProgressStatusId')) {
      const caseProgressStatusId = this.route.snapshot.paramMap.get('caseProgressStatusId')
      this.setCaseProgressStatusId(caseProgressStatusId)
    }

    if (this.route.snapshot.paramMap.has('adverseInsuranceStatusId')) {
      const adverseInsuranceStatusId = this.route.snapshot.paramMap.get('adverseInsuranceStatusId')
      this.setAdverseInsuranceStatusId(adverseInsuranceStatusId)
    }

    //this.getMrnNumberEffect({dateOfBirth: "1984-01-01", dateOfLoss: "2021-01-01", accidentKind: "Motor Vehicle Accident"})
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly summary$ = this.select((s) => s.summary)
  readonly done$ = this.select((s) => s.done)
  readonly currentLegalCaseId$ = this.select((s)=>s.currentLegalCaseId)
  readonly item$ = this.select((s) => {
    if (s.item) {
      let sumOfMinAmount = 0;
      let sumOfPriorMedsToDateAmount = 0;
      s.item?.insurances?.map((insurance) => {
        insurance.minimumCoverageAmount = insurance.minimumCoverageAmount ?? 0;
        insurance.maximumCoverageAmount = insurance.maximumCoverageAmount ?? 0;
        sumOfMinAmount += insurance.minimumCoverageAmount;
      });

      s.item?.priorMedsToDates?.map((priorMTD) => {
        priorMTD.amount = priorMTD.amount ?? 0;
        sumOfPriorMedsToDateAmount += priorMTD.amount;
      })
      const totalPendingRequestEstimate = s.item?.caseProcedures?.map((x:any) => x.estimate)?.reduce((a, b) => a + b, 0)

      const totalCaseAccountsSiteCost = s.item?.caseAccounts?.map(x => x.contractedAmount)?.reduce((a, b) => a + b, 0)
      return {
        ...s.item,
        sumOfMinAmount: sumOfMinAmount.toFixed(2),
        totalPendingRequestEstimate: totalPendingRequestEstimate.toFixed(2),
        sumOfPriorMedsToDateAmount: sumOfPriorMedsToDateAmount.toFixed(2),
        totalCaseAccountsSiteCost: totalCaseAccountsSiteCost.toFixed(2),
        totalMedsToDates: (totalPendingRequestEstimate + sumOfPriorMedsToDateAmount + totalCaseAccountsSiteCost)?.toFixed(2),
      };
    } else {
      return undefined;
    }
  })
  readonly legalCases$ = this.select((s) => s.legalCases)
  readonly legalCaseUpdates$ = this.select((s) => s.legalCaseUpdates)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly medLevels$ = this.select((s) => s.medLevels || [])
  readonly firms$ = this.select((s) => s.firms || [])
  readonly attorneys$ = this.select((s) => s.attorneys || [])
  readonly caseStatuses$ = this.select((s) => s.caseStatuses || [])
  readonly caseTypes$ = this.select((s) => s.caseTypes || [])
  readonly mrnNumber$ = this.select((s) => s.mrnNumber || '')

  readonly patientTreatmentStatuses$ = this.select((s) => s.patientTreatmentStatuses || [])
  readonly caseProgressStatuses$ = this.select((s) => s.caseProgressStatuses || [])
  readonly adverseInsuranceStatuses$ = this.select((s) => s.adverseInsuranceStatuses || [])

  readonly accidentTypeId$ = this.select((s) => s.accidentTypeId)

  readonly patientId$ = this.select((s) => s.patientId)

  readonly medLevelId$ = this.select((s) => s.medLevelId)

  readonly firmId$ = this.select((s) => s.firmId)

  readonly attorneyId$ = this.select((s) => s.attorneyId)

  readonly caseStatusId$ = this.select((s) => s.caseStatusId)

  readonly caseTypeId$ = this.select((s) => s.caseTypeId)

  readonly patientTreatmentStatusId$ = this.select((s) => s.patientTreatmentStatusId)

  readonly caseProgressStatusId$ = this.select((s) => s.caseProgressStatusId)

  readonly adverseInsuranceStatusId$ = this.select((s) => s.adverseInsuranceStatusId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.legalCases$,
    this.accidentTypes$,
    this.patients$,
    this.medLevels$,
    this.firms$,
    this.attorneys$,
    this.caseStatuses$,
    this.caseTypes$,
    this.patientTreatmentStatuses$,
    this.caseProgressStatuses$,
    this.adverseInsuranceStatuses$,
    this.mrnNumber$,
    (
      errors,
      loading,
      item,
      formName,
      legalCases,
      accidentTypes,
      patients,
      medLevels,
      firms,
      attorneys,
      caseStatuses,
      caseTypes,
      patientTreatmentStatuses,
      caseProgressStatuses,
      adverseInsuranceStatuses,
      mrnNumber,
    ) => ({
      errors,
      loading,
      item,
      formName,
      legalCases,

      accidentTypes,
      patients,
      medLevels,
      firms,
      attorneys,
      caseStatuses,
      caseTypes,
      patientTreatmentStatuses,
      caseProgressStatuses,
      adverseInsuranceStatuses,
      mrnNumber,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.accidentTypeId$,
    this.patientId$,
    this.medLevelId$,
    this.firmId$,
    this.attorneyId$,
    this.caseStatusId$,
    this.caseTypeId$,
    this.patientTreatmentStatusId$,
    this.caseProgressStatusId$,
    this.adverseInsuranceStatusId$,
    this.searchQuery$,
    (
      paging,
      accidentTypeId,
      patientId,
      medLevelId,
      firmId,
      attorneyId,
      caseStatusId,
      caseTypeId,
      patientTreatmentStatusId,
      caseProgressStatusId,
      adverseInsuranceStatusId,
      searchQuery,
    ) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accidentTypeId: accidentTypeId,
      patientId: patientId,
      medLevelId: medLevelId,
      firmId: firmId,
      attorneyId: attorneyId,
      caseStatusId: caseStatusId,
      caseTypeId: caseTypeId,
      patientTreatmentStatusId: patientTreatmentStatusId,
      caseProgressStatusId: caseProgressStatusId,
      adverseInsuranceStatusId: adverseInsuranceStatusId,
      total: paging.total,
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setAccidentTypeId = this.updater((state, accidentTypeId: string) => ({
    ...state,
    accidentTypeId,
  }))

  readonly setPatientId = this.updater((state, patientId: string) => ({
    ...state,
    patientId,
  }))

  readonly setMedLevelId = this.updater((state, medLevelId: string) => ({
    ...state,
    medLevelId,
  }))

  readonly setFirmId = this.updater((state, firmId: string | undefined) => ({
    ...state,
    firmId,
  }))

  readonly setAttorneyId = this.updater((state, attorneyId: string | undefined) => ({
    ...state,
    attorneyId,
  }))

  readonly setCaseStatusId = this.updater((state, caseStatusId: string) => ({
    ...state,
    caseStatusId,
  }))

  readonly setCurrentLegalCaseId = this.updater((state, currentLegalCaseId: string) => ({
    ...state,
    currentLegalCaseId,
  }))

  readonly setCaseTypeId = this.updater((state, caseTypeId: string) => ({
    ...state,
    caseTypeId,
  }))

  readonly setPatientTreatmentStatusId = this.updater((state, patientTreatmentStatusId: string) => ({
    ...state,
    patientTreatmentStatusId,
  }))

  readonly setCaseProgressStatusId = this.updater((state, caseProgressStatusId: string) => ({
    ...state,
    caseProgressStatusId,
  }))

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }))

  readonly setAdverseInsuranceStatusId = this.updater((state, adverseInsuranceStatusId: string) => ({
    ...state,
    adverseInsuranceStatusId,
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit,
    },
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip,
    },
  }))

  readonly filterAccidentTypes = (term) =>
    this.data.userSelectAccidentTypes({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const accidentTypes = res.data.items
          this.patchState({ accidentTypes })
          return accidentTypes
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterPatients = (term) =>
    this.data.userSelectPatients({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const patients = res.data.items
          this.patchState({ patients })
          return patients
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterMedLevels = (term) =>
    this.data.userSelectMedLevels({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const medLevels = res.data.items
          this.patchState({ medLevels })
          return medLevels
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterFirms = (term) =>
    this.data.userSelectFirms({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const firms = res.data.items
          this.patchState({ firms })
          return firms
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterAttorneys = (term) =>
    this.data.userSelectAttorneys({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const attorneys = res.data.items
          this.patchState({ attorneys })
          return attorneys
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterCaseStatuses = (term) =>
    this.data.userSelectCaseStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const caseStatuses = res.data.items
          this.patchState({ caseStatuses })
          return caseStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterCaseTypes = (term) =>
    this.data.userSelectCaseTypes({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const caseTypes = res.data.items
          this.patchState({ caseTypes })
          return caseTypes
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterPatientTreatmentStatuses = (term) =>
    this.data.userSelectPatientTreatmentStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const patientTreatmentStatuses = res.data.items
          this.patchState({ patientTreatmentStatuses })
          return patientTreatmentStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterCaseProgressStatuses = (term) =>
    this.data.userSelectCaseProgressStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const caseProgressStatuses = res.data.items
          this.patchState({ caseProgressStatuses })
          return caseProgressStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterAdverseInsuranceStatuses = (term) =>
    this.data.userSelectAdverseInsuranceStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const adverseInsuranceStatuses = res.data.items
          this.patchState({ adverseInsuranceStatuses })
          return adverseInsuranceStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state,
    accidentTypes: state.accidentTypes.concat(accidentType),
  }))

  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state,
    patients: state.patients.concat(patient),
  }))

  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state,
    medLevels: state.medLevels.concat(medLevel),
  }))

  readonly addFirm = this.updater((state, firm: Firm) => ({
    ...state,
    firms: state.firms.concat(firm),
  }))

  readonly addAttorney = this.updater((state, attorney: Attorney) => ({
    ...state,
    attorneys: state.attorneys.concat(attorney),
  }))

  readonly addCaseStatus = this.updater((state, caseStatus: CaseStatus) => ({
    ...state,
    caseStatuses: state.caseStatuses.concat(caseStatus),
  }))

  readonly addCaseType = this.updater((state, caseType: CaseType) => ({
    ...state,
    caseTypes: state.caseTypes.concat(caseType),
  }))

  readonly addPatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => ({
    ...state,
    patientTreatmentStatuses: state.patientTreatmentStatuses.concat(patientTreatmentStatus),
  }))

  readonly addCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => ({
    ...state,
    caseProgressStatuses: state.caseProgressStatuses.concat(caseProgressStatus),
  }))

  readonly addAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => ({
    ...state,
    adverseInsuranceStatuses: state.adverseInsuranceStatuses.concat(adverseInsuranceStatus),
  }))

  readonly setItem = this.updater((state, item: LegalCase) => ({ ...state, item }))

  addNewLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state,
    legalCases: [...state.legalCases, legalCase],
  }))

  updateLegalCase = this.updater((state, legalCase: LegalCase) => {
    return {
      ...state,
      legalCases: state.legalCases.map((el) => {
        if (el.id === legalCase.id) {
          return legalCase
        } else {
          return el
        }
      }),
    }
  })

  addLegalCases = this.updater((state, newLegalCases: any[]) => ({
    ...state,
    legalCases: state.legalCases.concat(newLegalCases),
  }))
  updateLegalCases = this.updater((state, updatedLegalCases: any[]) => {
    return {
      ...state,
      legalCases: state.legalCases.map((legalCase) => {
        const updated = updatedLegalCases.find((el) => el.id === legalCase.id)
        return updated ? updated : legalCase
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.legalCaseService.validateLegalCaseExcelData(
          excelData,
          vm.accidentTypes,
          vm.patients,
          vm.medLevels,
          vm.firms,
          vm.attorneys,
          vm.caseStatuses,
          vm.caseTypes,
          vm.patientTreatmentStatuses,
          vm.caseProgressStatuses,
          vm.adverseInsuranceStatuses,
        )
      }),
    )
  }

  //(contextData) => {console.log('clicked, contextData = ', contextData); this.store.updateFundingApproved(contextData,false)}


  readonly loadLegalCaseEffect = this.effect<string>((legalCaseId$) =>
    legalCaseId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((legalCaseId) =>{
        this.setCurrentLegalCaseId(legalCaseId)
        return this.data.userLegalCase({ legalCaseId }).pipe(
          tapResponse(
            (res) => {
              const estimateForCaseProcedure = res.data.item?.caseProcedures?.map((caseProcedure)=>{
                return {
                  ...caseProcedure,
                  estimate:caseProcedure.procedureVendors?.map(x => x.estimate).reduce((a, b) => a + b)
                }
              });
              console.log("caseAccounts:",res.data.item.caseAccounts)
              return this.patchState({
                item: {
                  ...res.data.item,
                  caseProcedures: res.data.item?.caseProcedures?.map((caseProcedure)=>{
                    return {
                      ...caseProcedure,
                      estimate:caseProcedure.procedureVendors?.map(x => x.estimate).reduce((a, b) => a + b)
                    }
                  })
                },
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        );
      }
      ),
    ),
  )

  readonly loadLegalCasesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLegalCases({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                legalCases: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly loadLegalCasesUpdatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.data.userLegalCaseUpdates().pipe(
          tapResponse(
            (res) =>
              this.patchState({
                legalCaseUpdates: res.data.legalCases,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly createLegalCaseEffect = this.effect<UserCreateLegalCaseInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.legalCaseService.createLegalCase({ ...input }).pipe(
          tapResponse(
            (legalCase: LegalCase) => {
              this.addNewLegalCase(legalCase)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: legalCase, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly createPatientDocumentEffect = this.effect<UserCreateDocumentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) => {
        input.patientId = this.get().item.patientId
        console.log(input.patientId)

        return this.data.userCreateDocument({ input: input }).pipe(map((res) => console.log(res.data.created)))
      }),
    ),
  )

  readonly getMrnNumberEffect = this.effect<IMRNNumberParts>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) => {
        console.log(input)

        return this.data
          .getPatientMrnNumber({
            dateOfBirth: input.dateOfBirth,
            dateOfLoss: input.dateOfLoss,
            accidentKind: input.accidentKind,
            legalCaseId: input.legalCaseId,
          })
          .pipe(map((res) => console.log('Mrn Output', res.data.patientMrn)))
      }),
    ),
  )

  readonly updateLegalCaseEffect = this.effect<UserUpdateLegalCaseInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.legalCaseService.updateLegalCase(input, input.id).pipe(
          tapResponse(
            (legalCase) => {
              this.updateLegalCase(legalCase)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: legalCase, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly deleteLegalCaseEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, legalCase]) => {
        return this.data.userDeleteLegalCase({ legalCaseId: legalCase.id }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Deleted successfully!', { duration: 3000 })
              setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        )
      }),
    ),
  )

  readonly importExcelEffect = this.effect<UserUpdateLegalCaseInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.legalCaseService.importLegalCases(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addLegalCases(created)
            this.updateLegalCases(updated)

            this.toast.success(
              `${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`,
              { duration: 3000 },
            )
          }),
        ),
      ),
    ),
  )

  updateCaseStatusEffect = this.effect<{ legalCaseId: string, name: string, firmId: string, patientId: string, caseStatusId: string }>(input$ => input$.pipe(
    tap((input) => { this.patchState({ loading: true }) }),
    switchMap((input) => this.data.userUpdateLegalCase({ legalCaseId: input.legalCaseId, input: { name: input.name, firmId: input.firmId, patientId: input.patientId, caseStatusId: input.caseStatusId } }).pipe(
      tapResponse(
        (res) => {
          this.toast.success(`Successfully updated case status to ${res.data.updated?.caseStatus?.name ?? ''}`, { duration: 3000 })
          this.patchState({
            loading: false,
          })
        },
        (error) => {
          this.toast.error("Failed to update status", { duration: 3000 })
          console.log(error);
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))


  readonly updateFundingApproved = this.effect<{ input: UserUpdateProcedureVendorInput; resultEmitter?: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>{
    console.log('updateFundingApproved', data)

          return this.data.userUpdateProcedureVendor({ procedureVendorId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.currentLegalCaseId$.subscribe((currentLegalCaseId)=>{
                  this.loadLegalCaseEffect(currentLegalCaseId)
                }).unsubscribe();
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
              },
              (errors: any) =>
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                }),
            ),
          )
        }

        ),
      ),
  )
}
