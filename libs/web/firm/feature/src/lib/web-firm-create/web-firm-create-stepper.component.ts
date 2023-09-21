import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { HttpClient } from '@angular/common/http'
import { FirmStatus, UserCreateDocumentInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebFirmCreateStore } from './web-firm-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FuseAlertType } from '@fuse/components/alert'
import { of } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'

declare const TXTextControl: any
declare const TXTextControlWeb: any
declare const TXDocumentViewer: any

@Component({
  templateUrl: './web-firm-create-stepper.component.html',
  providers: [WebFirmCreateStore, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  }],
})
export class WebFirmCreateStepperComponent {
    readonly vm$ = this.store.vm$
    readonly firmStatuses$ = this.store.firmStatuses$
    readonly pageTitle = 'Register'
    errors = null
    canProgress = false
  
    alert: { type: FuseAlertType; message: string } = {
      type: 'success',
      message: '',
    }
    showAlert: boolean = false

  model:any = {}

  signatureDoc = ''

  parentFirmStatusId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

    fields = [
      WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('firmName', { label: 'Firm Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('address2', { label: 'Address 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('zip', { label: 'Zip' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('country', { label: 'Country' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('office', { label: 'Office' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('webAddress', { label: 'Web Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})
])

]


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
              label: 'Firm Registration',
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
              documentSubmit: (d) => {console.log('signature', d)}
            },
            hooks: {
              afterViewChecked: () => {
                  setTimeout(()=>{               
                    this.GetTemplate("EULA")
                }, 100);
              },
              onDestroy: () => {
                if (document.getElementById("txViewer") !== null) {
  
                  if (typeof(TXDocumentViewer) !== "undefined") {
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
              //TODO: Add the preview of the signature document and the final submit button
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
    private readonly store: WebFirmCreateStore,
    private readonly data: WebCoreDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly http: HttpClient
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createFirm(input) {

    if(this.parentFirmStatusId != ''){
      input = {...input, firmStatusId: this.parentFirmStatusId} 
    }

    this.store.createFirmEffect(input)
  }

  async submit() {
    await this.register(this.model)
  }

  async register(input) {
    var assignedName = ''
    const {
      name
    } = input

    if (name === '' || name === undefined || name === null) {
      assignedName = 'Firm EULA'
    } else {
      assignedName = name
    }

    const { email, phoneNumber, firstName, lastName, username, password } = input.userRegistration

    // let registerInput: RegisterInput = {
    //   email,
    //   phone: phoneNumber,
    //   firstName,
    //   lastName,
    //   username,
    //   password,
    // }

    // var today = new Date()
    // var dd = String(today.getDate()).padStart(2, '0')
    // var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    // var yyyy = today.getFullYear()

    // this.store.registerEffect(registerInput)
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
          basePath: 'https://documentserver.schemadriven.com:443',
        },
      })

      TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this))
    }
  }

  documentSubmit(wind: any) {
    
    let mergeDocument = {
      document: wind.document,
    }

    this.http
      .post('https://documentserver.schemadriven.com:443/DownloadPdf', mergeDocument)
      .subscribe((res: any) => {
        let document: UserCreateDocumentInput = {
          name: this.model.name,
          encoding: 'PDF',
          attachment: res.document,
          extension: '.pdf',
        }

        return this.model.eula = document
      })
  }

  GetSignatureSettingsForUser() {
    return {
      ownerName: 'PCH',
      signatureBoxName: 'txSign',
      signerName: this.model?.name,
      signerInitials: '',
      showSignatureBar: true
    }
  }

  GetTemplate(templateId: string) {

    return this.data.userTemplate({templateId}).pipe(
      tapResponse(
       (res) => {
          console.log(res.data)
          this.signatureDoc = res.data.item.attachment
        },
        (errors) => console.log(errors),
      ),
      tap((s) =>
      {
        //TODO: use the graphql resolver instead
        
        var merged = this.http.post('https://documentserver.schemadriven.com:443/MergeRawStringDocument', {data: JSON.stringify(this.model), template: this.signatureDoc}).subscribe((res: any) => {
          let pdf = res.document
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
