
import { Component, OnDestroy } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { HttpClient } from '@angular/common/http'
import { FirmStatus, UserCreateDocumentInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebFirmCreateStore } from './web-firm-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FuseAlertType } from '@fuse/components/alert'
import { BehaviorSubject, of } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

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
export class WebFirmCreateStepperComponent implements OnDestroy {
    readonly vm$ = this.store.vm$
    readonly firmStatuses$ = this.store.firmStatuses$
    readonly pageTitle = 'Register'
    
    signatureDoc = ''
    signatureDoc$: BehaviorSubject<string> = new BehaviorSubject<string>(this.signatureDoc)

    errors = null
    canProgress = false
  
    alert: { type: FuseAlertType; message: string } = {
      type: 'success',
      message: '',
    }
    showAlert: boolean = false

  model:any = {}

  parentFirmStatusId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

    fields = [
        {
          key: 'registrantSignature',
          type: 'file-viewer',
          templateOptions: {
            label: 'Please Sign',
            document$: this.signatureDoc$,
            signatureBoxName: 'txSign',
            ownerName: 'PCH',
            signerName: '',
            signerInitials: '',
            documentSubmit: (d) => {console.log('signature', d)}
          },
          hooks: {
            afterViewChecked: () => {
                setTimeout(()=>{               
                 console.log('in the afterViewChecked', TXDocumentViewer)
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
    ]

    
  constructor(
    private readonly store: WebFirmCreateStore,
    private readonly data: WebCoreDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly toast: WebUiToastService
  ) {}

  ngOnDestroy(): void {
    if (document.getElementById("txViewer") !== null) {
  
      if (typeof(TXDocumentViewer) !== "undefined") {
        console.log('in the destroy', TXDocumentViewer)
        TXDocumentViewer == undefined
      }

    }
  }

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
    const {
      name
    } = input

    if (name === '' || name === undefined || name === null) {
      this.model.eula.name = 'Firm EULA'
    } else {
      this.model.eula.name = name + 'Firm EULA'
    }

    await this.store.createFirmEffect(input)
  }

  checkDocumentViewer() {
    if (TXDocumentViewer !== null) {
      console.log('hit the check')
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
    console.log('hit the submit')
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

        this.toast.success('Signature received, move to next step')
        this.toggleProgress(true)
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
          this.signatureDoc$.next(this.signatureDoc)
          this.checkDocumentViewer()
          this.toggleProgress(false)
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
