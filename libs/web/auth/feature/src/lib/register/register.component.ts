import { Component, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DocumentInput } from '@case-clinical/api/document/data-access'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import {
  RegisterInput,
  WebCoreDataAccessService,
} from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FuseAlertType } from '@fuse/components/alert'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { of, Observable, tap } from 'rxjs'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { tapResponse } from '@ngrx/component-store'


declare const TXDocumentViewer: any


@Component({
  template: `
    <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow">
      <ui-form [fields]="steps" [model]="model" [options]="options"></ui-form>
    </div>
 `,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnDestroy {
  readonly vm$ = this.store.vm$
  readonly pageTitle = 'Register'
  errors = null
  canProgress = false

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  }
  showAlert = false

  document$: Observable<DocumentInput> = of({
    name: 'SignatureDocument',
    attachment: '<div>Hello World</div>',
    encoding: 'WordprocessingML',
    extension: '.docx'
  })

  fileName = ''
  url = ''

  signatureBoxName = ''
  redirectUrlAfterSignature = ''
  ownerName = ''
  signerName = ''
  signatureName = ''
  signerInitials = ''

  readonly fields = [
    WebUiFormField.email('email', { label: 'Email', required: true }),
    WebUiFormField.password('password', { label: 'Password', required: true }),
    WebUiFormField.input('username', { label: 'Username', required: false }),
    WebUiFormField.input('firstName', { label: 'First name', required: false }),
    WebUiFormField.input('lastName', { label: 'Last name', required: false }),
  ]

  formRowClasses = 'flex flex-auto'

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }


  signatureDoc = ''

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
            documentSubmit: (d) => { console.log('signature', d) }
          },
          hooks: {
            afterViewChecked: () => {
              setTimeout(() => {
                this.GetTemplate("ckyuloscl0097y0veddmeuxwh")
              }, 100);
            },
            onDestroy: () => {
              if (document.getElementById("txViewer") !== null) {

                if (typeof (TXDocumentViewer) !== "undefined") {
                  console.log('in the destroy', TXDocumentViewer)
                  TXDocumentViewer == undefined
                }

              }
            }
          }
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

  constructor(private readonly store: WebAuthStore, private readonly data: WebCoreDataAccessService, private readonly http: HttpClient) { }
  ngOnDestroy() {
    if (document.getElementById("txViewer") !== null) {

      if (typeof (TXDocumentViewer) !== "undefined") {
        console.log('in the destroy', TXDocumentViewer)

      }

    }
  }

  async submit() {
    console.log('submi data = ', this.model)
    await this.register(this.model)
  }

  async register(input) {
    let assignedName = ''
    const {
      name
    } = input

    if (name === '' || name === undefined || name === null) {
      assignedName = 'Loan Application'
    } else {
      assignedName = name
    }

    const { email, phoneNumber, firstName, lastName, username, password } = input.userRegistration

    const registerInput: RegisterInput = {
      email,
      phone: phoneNumber,
      firstName,
      lastName,
      username,
      password,
    }

    this.store.registerEffect(registerInput)
  }

  checkDocumentViewer() {
    if (TXDocumentViewer !== null) {
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
      })

      TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this))
    }
  }

  documentSubmit(wind: any) {
    this.store.user$
      .pipe(
        tap(() => {

          // this.http
          //   .post('https://documentserver.schemadriven.com:443/DownloadPdf', mergeDocument)
          //   .subscribe((res: any) => {
          //     let document: UserCreateDocumentInput = {
          //       name: assignedDocument.name,
          //       encoding: 'PDF',
          //       userId: user.id,
          //       attachment: res.document,
          //       extension: '.pdf',
          //     }

          //     return this.documentStore.createDocumentEffect(document)
          //   })
        }),
      )
      .subscribe()
  }

  GetSignatureSettingsForUser() {
    return {
      ownerName: 'PCH',
      signatureBoxName: 'txsign',
      signerName: this.model?.firstName + ' ' + this.model?.lastName,
      signerInitials: this.model?.firstName.substring(0, 1) + this.model?.lastName.substring(0, 1),
      showSignatureBar: true
    }
  }

  GetTemplate(templateId: string) {
    return this.data.userTemplate({ templateId }).pipe(
      tapResponse(
        (res) => {
          console.log(res.data)
          this.signatureDoc = res.data.item.attachment
        },
        (errors) => console.log(errors),
      ),
      tap(() => {
        const merged = this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', { data: JSON.stringify(this.model), template: this.signatureDoc }).subscribe((res: any) => {
          const pdf = res.document
          this.signatureDoc = pdf

          this.checkDocumentViewer()
          return pdf
        })
        return merged
      })
    ).subscribe()
  }

  toggleProgress(can: boolean) {
    this.canProgress = can
  }
}
