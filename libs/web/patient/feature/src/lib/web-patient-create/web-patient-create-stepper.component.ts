
import { Component, OnInit } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Ethnicity,Gender,Language } from '@case-clinical/web/core/data-access'
import { WebPatientCreateStore } from './web-patient-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http'
import { FirmStatus, UserCreateDocumentInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FuseAlertType } from '@fuse/components/alert'
import { tapResponse } from '@ngrx/component-store'
import { of } from 'rxjs'

declare const TXTextControl: any
declare const TXTextControlWeb: any
declare var TXDocumentViewer: any

@Component({
  templateUrl: './web-patient-create.component.html',
  providers: [WebPatientCreateStore, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  }]
})
export class WebPatientCreateComponent implements OnInit {
  readonly vm$ = this.store.vm$
  readonly ethnicities$ = this.store.ethnicities$
  readonly genders$ = this.store.genders$
  readonly languages$ = this.store.languages$

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

parentEthnicityId: ''
parentGenderId: ''
parentLanguageId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
              {
                key: 'registrantSignature',
                type: 'file-viewer',
                templateOptions: {
                  label: 'Please Sign',
                  document$: of(this.signatureDoc),
                  signatureBoxName: 'txSign',
                  redirectUrlAfterSignature: '/apps/dashboard',
                  ownerName: 'PCH',
                  signerName: this.model.firstName + ' ' + this.model.lastName,
                  signerInitials: this.model.firstName?.charAt(0) + this.model.lastName?.charAt(0),
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
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('middleName', { label: 'Middle Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('suffix', { label: 'Suffix' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('nickname', { label: 'Nickname' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('height', { label: 'Height' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('weight', { label: 'Weight' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date of Birth' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryPhoneNumber', { label: 'Primary Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('isPrimaryPhoneMobile', { label: 'Is Primary Phone Mobile' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('secondaryPhoneNumber', { label: 'Secondary Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('isSecondaryPhoneMobile', { label: 'Is Secondary Phone Mobile' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('memberRegistrationNumber', { label: 'Member Registration Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('requiresTranslator', { label: 'Requires Translator' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('socialSecurityNumber', { label: 'Social Security Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('honorific', { label: 'Honorific' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryEmailAddress', { label: 'Primary Email Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine1', { label: 'Primary Address Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine2', { label: 'Primary Address Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressCity', { label: 'Primary Address City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressStateOrProvince', { label: 'Primary Address State or Province' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressPostalCode', { label: 'Primary Address Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.number('latitude', { label: 'Latitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('longitude', { label: 'Longitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('emergencyContactId', { label: 'Emergency Contact Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('homePhoneNumber', { label: 'Home Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('mobileNumber', { label: 'Mobile Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('bmi', { label: 'Bmi' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('occupation', { label: 'Occupation' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('debtorRemarks', { label: 'Debtor Remarks' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('user', { label: 'User' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('workAddressLine1', { label: 'Work Address Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('workAddressLine2', { label: 'Work Address Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('workAddressCity', { label: 'Work Address City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('workAddressStateOrProvince', { label: 'Work Address State or Province' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('workAddressPostalCode', { label: 'Work Address Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('workLatitude', { label: 'Work Latitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('workLongitude', { label: 'Work Longitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
  WebUiFormField.selectForm(
          'ethnicity',
          'ethnicityId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('ethnicityId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentEthnicityId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,
  WebUiFormField.selectForm(
          'gender',
          'genderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('genderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentGenderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,
  WebUiFormField.selectForm(
          'language',
          'languageId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('languageId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLanguageId = s
                field.hide = true
              }
            })
          },
        }
      }
    ), 
    
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
    private readonly store: WebPatientCreateStore,
    private readonly data: WebCoreDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}


  ngOnInit(): void {
    if (document.getElementById("txViewer") === null) {

      if (typeof(TXDocumentViewer) !== "undefined") {
        TXDocumentViewer = undefined;
      }

    }
    else { // the DocumentViewer exists

      // wait until object TXDocumentViewer is available (lazy loading)
      var checkExist = setInterval(function() {

        if (typeof TXDocumentViewer !== "undefined") {
      
          // call init to initialize the viewer
          TXDocumentViewer.init( {
            containerID: 'txViewer',
            viewerSettings: {
              toolbarDocked: true,
              documentData: "SGVsbG8gdGhlcmU=",
              dock: "Fill",
              isSelectionActivated: true,
              showThumbnailPane: true,
              basePath: 'https://documentserver.caseclinical.com:443/MemberOnboarding',
            }
          });
      
          clearInterval(checkExist);
          
        }

      }, 100); 

    }
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
          basePath: 'https://documentserver.caseclinical.com:443/MemberOnboarding',
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
      .post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument)
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
        
        var merged = this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', {data: JSON.stringify(this.model), template: this.signatureDoc}).subscribe((res: any) => {
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

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPatient(input) {

    if(this.parentEthnicityId != ''){
      input = {...input, ethnicityId: this.parentEthnicityId} 
    }


    if(this.parentGenderId != ''){
      input = {...input, genderId: this.parentGenderId} 
    }


    if(this.parentLanguageId != ''){
      input = {...input, languageId: this.parentLanguageId} 
    }


    this.store.createPatientEffect(input)
  }
}
