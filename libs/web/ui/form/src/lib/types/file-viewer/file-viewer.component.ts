/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { BehaviorSubject, Observable, map, of, take, tap } from 'rxjs'
import { DataContextService } from '../../context-provider/data-context.service'
import { FormService } from '../../form.service'
import { WebTemplateDetailStore } from '@case-clinical/web/template/feature'

// declare const TXTextControl: any
// declare const TXTextControlWeb: any
declare const TXDocumentViewer: any

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
}
@Component({
  selector: 'formly-field-file-viewer',
  template: `
        <tx-document-viewer
          id="txViewer"
          width="1400px"
          height="800px"
          documentData="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"
          basePath="https://documentserver.caseclinical.com:443/MemberOnboarding">
        </tx-document-viewer>
  `,
  providers: [WebTemplateDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldFileViewer extends FieldType implements OnInit, OnDestroy {
  document$: BehaviorSubject<DocumentInput>
  subscriber;

  signatureBoxName = '';
  redirectUrlAfterSignature = '';
  ownerName = '';
  signerName = '';
  signerInitials = '';

  fileName = ''
  url = ''

  constructor(private ref: ChangeDetectorRef, 
    private formService: FormService, 
    private contextService: DataContextService, 
    private store : WebTemplateDetailStore) {
    super()
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  ngOnInit() {
    this.subscriber = this.contextService.getDataStream().subscribe(data => {
      this.store.loadTemplateEffect('clhoppwsg0022je01iixof03x')
      
      const template$ = this.store.template$
      template$.pipe(map((template) => 
      {
        if(template?.attachment) {
          console.log('template document', template)
          console.log('TXDocumentViewer', TXDocumentViewer)
          this.document$.next({name: template?.name, attachment: template?.attachment})

          if (TXDocumentViewer !== "undefined") {
            console.log('hit the check')
            TXDocumentViewer.init({
              containerID: 'txViewer',
              viewerSettings: {
                signatureSettings: this.GetSignatureSettingsForUser(),
                userNames: [],
                dock: 1,
                documentData: template.attachment ,
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

          return this.document$
        }
      }),
      tap((document) => {
        if(document) {
          console.log('document', document)
        }
      })).subscribe()
    })

      // const _document$ = this.formService.getValueForKey(this.to.document, data);
      // if(_document$ && this.document$ !== _document$) {
      //   this.signatureBoxName = this.to.signatureBoxName ?? ''
      //   this.redirectUrlAfterSignature = this.to.redirectUrlAfterSignature;
      //   this.ownerName = this.to.ownerName;
      //   this.signerName = this.to.signerName;
      //   this.signerInitials = this.to.signerInitials;

      //   if(this.signatureBoxName?.includes('{')) {
      //     this.signatureBoxName = this.contextService.parseStatement(this.to.signatureBoxName, data);
      //   }
      //   if(this.redirectUrlAfterSignature?.includes('{')) {
      //     this.redirectUrlAfterSignature = this.contextService.parseStatement(this.to.redirectUrlAfterSignature, data);
      //   }
      //   if(this.ownerName?.includes('{')) {
      //     this.ownerName = this.contextService.parseStatement(this.to.ownerName, data);
      //   }
      //   if(this.signerName?.includes('{')) {
      //     this.signerName = this.contextService.parseStatement(this.to.signerName, data);
      //   }
      //   if(this.signerInitials?.includes('{')) {
      //     this.signerInitials = this.contextService.parseStatement(this.to.signerInitials, data);
      //   }

      //   this.document$ = _document$;
      // }

    // });

    this.formControl.valueChanges.subscribe((changes) => this.formControlValueChanged(changes))
  }

  formControlValueChanged(event) {
    console.log('form control value', event)
    // if(event?.name) {
    //   this.document$ = of({name: event?.name, attachment: event.attachment})
    //   this.ref.markForCheck()
    // }
  }

  fileChanged(event) {
    console.log(event)
    // if (event.target.files && event.target.files[0]) {
    //   console.log('this file', event.target.files[0])
    //   var filesAmount = event.target.files.length
    //   for (let i = 0; i < filesAmount; i++) {
    //     var reader = new FileReader()

    //     var file = event.target.files[0]

    //     var document: DocumentInput = {
    //       name: file.name,
    //       extension: file.type,
    //     }

    //     reader.onload = (event: any) => {
    //       document.attachment = event.target.result
    //       this.document$ = of(document)

    //       this.formControl.patchValue(document)
    //       this.ref.markForCheck()
    //     }
    //     //Trigger the onload event above with the readAs method
    //     reader.readAsDataURL(event.target.files[i])
    //   }
    // }
  }

  checkDocumentViewer() {
    // if (typeof(TXDocumentViewer) !== "undefined") {
    //   console.log('hit the check')
    //   TXDocumentViewer.init({
    //     containerID: 'txViewer',
    //     viewerSettings: {
    //       signatureSettings: this.GetSignatureSettingsForUser(),
    //       userNames: [],
    //       dock: 1,
    //       documentData: data ,
    //       documentPath: 'test.docx',
    //       toolbarDocked: true,
    //       isSelectionActivated: true,
    //       showThumbnailPane: true,
    //       resources: null,
    //       basePath: 'https://localhost:443',
    //     },
    //   })

    //   TXDocumentViewer.setSubmitCallback(this.documentSubmit.bind(this))
    // }
  }

  GetSignatureSettingsForUser() {

    let signatureSettings = {
      signatureBoxName: this.to.signatureBoxName ?? '',
      redirectUrlAfterSignature: this.to.redirectUrlAfterSignature,
      ownerName: this.to.ownerName,
      signerName: this.to.signerName,
      signerInitials: this.to.signerInitials,
      showSignatureBar: true
    }
     
     return signatureSettings
  }
  
  documentSubmit(wind: any) {
    this.to.documentSubmit.bind(this)
  }

  delete(file) {
    // this.to.delete(file)
    // this.document$ = of({ name: null })
    // this.ref.markForCheck()
  }
}
