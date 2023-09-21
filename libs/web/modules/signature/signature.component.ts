import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DocumentInput } from '@case-clinical/api/document/data-access'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import {
  RegisterInput,
  Template,
  UserCreateDocumentInput,
  WebCoreDataAccessService,
} from '@case-clinical/web/core/data-access'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FuseAlertType } from '@fuse/components/alert'
import { tapResponse } from '@ngrx/component-store'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { of, tap } from 'rxjs'

declare const TXTextControl: any
declare const TXTextControlWeb: any
declare var TXDocumentViewer: any

@Component({
  selector: 'esign-home',
  template: `
    <tx-document-viewer
      id="txViewer"
      width="1400px"
      height="800px"
      documentData="SGVsbG8gdGhlcmU="
      dock="Fill"
      [toolbarDocked]="true"
      documentPath="test.docx"
      [isSelectionActivated]="true"
      [showThumbnailPane]="true"
      [signatureSettings]="{
                showSignatureBar: true,
                signatureBoxName: 'txsign',
                redirectUrlAfterSignature: '/home',
                ownerName: 'Paul',
                signerName: 'John Doe',
            }"
      basePath="https://documentserver.caseclinical.com:443/MemberOnboarding"
    >
    </tx-document-viewer>
  `,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    WebLegalCaseFeatureStore,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignatureComponent implements OnDestroy, OnInit {
  readonly pageTitle = 'Register'
  errors = null
  canProgress = false

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  }
  showAlert: boolean = false

  document$ = of({
    name: 'SignatureDocument',
    attachment: '<div>Hello World</div>',
    encoding: 'WordprocessingML',
    extension: '.docx',
    patientId: this.router.snapshot.params.legalCaseId,
  })

  fileName: string = ''
  url: string = ''

  signatureBoxName = ''
  redirectUrlAfterSignature = ''
  ownerName = ''
  signerName = ''
  signatureName = ''
  signerInitials = ''
  formData = {}

  readonly vm$ = this.store.vm$

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  signatureDoc = ''
  template: Template

  readonly fields = [
    WebUiFormField.email('email', { label: 'Email', required: true }),
    WebUiFormField.password('password', { label: 'Password', required: true }),
    WebUiFormField.input('username', { label: 'Username', required: false }),
    WebUiFormField.input('firstName', { label: 'First name', required: false }),
    WebUiFormField.input('lastName', { label: 'Last name', required: false }),
  ]

  formRowClasses = 'flex flex-auto'

  steps: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      templateOptions: {
        formClass: 'flex flex-auto',
        onComplete: () => this.submit(),
        // getActiveStep: (activatedStep) => this.triggerActiveStepChange(activatedStep)
      },
      fieldGroup: [
        {
          templateOptions: {
            label: 'User Registration',
          },
          fieldGroup: [...this.fields],
        },
        {
          key: 'registrantSignature',
          type: 'file-viewer',
          templateOptions: {
            label: 'Please Sign',
            document$: of(this.signatureDoc),
            signatureBoxName: '',
            redirectUrlAfterSignature: '/apps/dashboard',
            ownerName: 'PCH',
            signerName: '',
            signerInitials: '',
            documentSubmit: (d) => {
              console.log('signature', d)
            },
          },
          hooks: {
            afterViewChecked: () => {
              setTimeout(() => {
                this.GetTemplate('clhoppwsg0022je01iixof03x')
              }, 100)
            },
            onDestroy: () => {
              if (document.getElementById('txViewer') !== null) {
                if (typeof TXDocumentViewer !== 'undefined') {
                  console.log('in the destroy', TXDocumentViewer)
                  TXDocumentViewer == undefined
                }
              }
            },
          },
        },
        {
          key: 'thankYou',
          templateOptions: {
            label: 'Thank You',
          },
          fieldGroupClassName: 'grid grid-cols-1',
          fieldGroup: [
            WebUiFormField.template(`
            <div>
              <h2>
                Thank you for applying! 
                Ready to submit your application? 
                Click the green button below to finish the application process.
              </h2>
            </div>
            
            `),
          ],
        },
      ],
    },
  ]

  constructor(
    private readonly store: WebAuthStore,
    private readonly legalCase: WebLegalCaseFeatureStore,
    private readonly data: WebCoreDataAccessService,
    private readonly http: HttpClient,
    private readonly router: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    const legalCaseId = this.router.snapshot.params.legalCaseId
    await this.legalCase.loadLegalCaseEffect(legalCaseId)
    await this.GetTemplate('clhoppwsg0022je01iixof03x')
  }

  ngOnDestroy() {
    if (document.getElementById('txViewer') !== null) {
      if (typeof TXDocumentViewer !== 'undefined') {
        console.log('in the destroy', TXDocumentViewer)
      }
    }
  }

  async submit() {
    await this.register(this.model)
  }

  async register(input) {
    var assignedName = ''
    const { name } = input

    if (name === '' || name === undefined || name === null) {
      assignedName = 'HIPAA Agreement'
    } else {
      assignedName = name
    }

    const { email, phoneNumber, firstName, lastName, username, password } = input.userRegistration

    let registerInput: RegisterInput = {
      email,
      phone: phoneNumber,
      firstName,
      lastName,
      username,
      password,
    }

    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    this.store.registerEffect(registerInput)
  }

  checkDocumentViewer() {
    if (typeof TXDocumentViewer !== 'undefined') {
      console.log('initializing the document viewer', TXDocumentViewer)
      TXDocumentViewer.init({
        containerID: 'txViewer',
        viewerSettings: {
          signatureSettings: this.GetSignatureSettingsForUser(),
          userNames: [],
          dock: 1,
          documentData: this.signatureDoc,
          documentPath: 'test.docx',
          toolbarDocked: true,
          isSelectionActivated: true,
          showThumbnailPane: true,
          resources: null,
          basePath: 'https://documentserver.caseclinical.com:443/MemberOnboarding',
        },
      }).then((res) => {
        TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this))
      })
    }

    // if (document.getElementById("txViewer") === null) {

    //     if (typeof(TXDocumentViewer) !== "undefined") {
    //       TXDocumentViewer = undefined;
    //     }

    //   }
    //   else { // the DocumentViewer exists

    //     console.log('hit the else')
    //     // wait until object TXDocumentViewer is available (lazy loading)
    //     var checkExist = setInterval(function() {

    //       if (typeof TXDocumentViewer !== "undefined") {

    //         // call init to initialize the viewer
    //         TXDocumentViewer.init( {
    //           containerID: 'txViewer',
    //           viewerSettings: {
    //             toolbarDocked: true,
    //             documentData: "SGVsbG8gdGhlcmU=",
    //             dock: "Fill",
    //             isSelectionActivated: true,
    //             showThumbnailPane: true,
    //             basePath: 'https://backend.textcontrol.com',
    //           }
    //         });

    //         clearInterval(checkExist);

    //       }

    //     }, 100);

    //   }
  }

  documentSubmit(wind: any) {
    console.log('document submit', wind)
    this.store.user$
      .pipe(
        tap((user) => {
          let mergeDocument = {
            document: wind.document,
          }

          this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument).subscribe((res: any) => {
            this.legalCase.item$.pipe(
              tap((patient) => {
                console.log('patient', patient)
                let document: UserCreateDocumentInput = {
                    name: this.template.name,
                    encoding: 'PDF',
                    patientId: patient.id,
                    attachment: res.document,
                    extension: '.pdf',
                  }

                this.legalCase.createPatientDocumentEffect(document)
              }),
            ).subscribe()

            return document
          })
        }),
      ).subscribe()
  }

  GetSignatureSettingsForUser() {
    var initials = ''
    if(!this.model?.firstName || !this.model?.lastName) {
      initials = 'PCH'
    } else {
      initials = this.model?.firstName?.substring(0, 1) + this.model?.lastName?.substring(0, 1)
    }

    return {
        ownerName: 'PCH',
        signatureBoxName: 'txsign',
        signerName: this.model?.firstName + ' ' + this.model?.lastName,
        signerInitials: initials,
        showSignatureBar: true
    }
  }

  async GetTemplate(templateId: string) {
    var tempreturn = await this.data
      .userTemplate({ templateId })
      .pipe(
        tapResponse(
          (res) => {
            console.log(res.data)
            this.template = res.data.item
            this.signatureDoc = res.data.item.attachment
          },
          (errors) => console.log(errors),
        ),
        tap((s) => {
          return this.legalCase.item$.pipe(
            tap((legalCase) => {
                if(legalCase) {
                    this.model = legalCase.patient 
                }
            }),
            tap((legalCase) => {
                var merged = this.http
                .post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', {
                  data: JSON.stringify(this.model),
                  template: this.signatureDoc,
                })
                .subscribe((res: any) => {
                  let pdf = res.document
                  this.signatureDoc = pdf
    
                  this.checkDocumentViewer()
                  return pdf
                })
              return merged
            
            })
        ).subscribe()
        })
      ).subscribe()

      return tempreturn
  }

  toggleProgress(can: boolean) {
    this.canProgress = can
  }
}
