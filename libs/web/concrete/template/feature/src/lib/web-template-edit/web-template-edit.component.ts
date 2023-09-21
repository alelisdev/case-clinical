import { Component, HostListener, OnInit, SecurityContext } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { getEnumAsArray } from '@case-clinical/web/core/feature'

import { UserUpdateTemplateInput, Role, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebTemplateEditStore } from './web-template-edit.store'

import { map, tap } from 'rxjs/operators'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { callbackify } from 'util'

declare const TXTextControl: any
declare const TXTextControlWeb: any
declare const TXDocumentViewer: any
declare const removeEditorFromDom: any
declare const loadJsonData: any

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class='w-full flex flex-col'>
        <ui-page-header title="Edit Template" linkPath=".." linkTitle="Back" class='w-full'></ui-page-header>

        <as-split [useTransition]="true" direction="horizontal" option="" [unit]="'pixel'" class="w-full flex-1 flex flex-row">
          <as-split-area [order]="0" [size]="500">
          <div class="dark:bg-gray-800 px-6 py-4 rounded-md">
            <ui-form [fields]="fields" [model]="vm.item" (submitForm)="updateTemplate($event)">
              <div class="flex flex-row">
                <div class="flex w-full"></div>
                <div class="flex-none space-x-2">
                <ui-button label="Load Data" type="button" (click)="loadJsonData()"></ui-button>
                  <ui-button label="Submit" type="submit"></ui-button>
                </div>
              </div>
            </ui-form>
          </div>
          </as-split-area>
          <as-split-area [order]="2">
            <tx-document-editor 
            class='w-full' 
            height="1100px"
            webSocketURL="wss://documentserver.caseclinical.com:443/MemberOnboarding"
            >
            </tx-document-editor>
          </as-split-area>
        </as-split>
    </div>
    </ng-container>
  `,
  providers: [WebTemplateEditStore],
})
export class WebTemplateEditComponent implements OnInit {
  readonly vm$ = this.store.vm$
  readonly user$ = this.store.user$
  readonly loading$ = this.store.loading$
  readonly form = new FormGroup({})

  currentToken = ''
  //readonly rawUrl: string = `wss://backend.textcontrol.com?access-token=${this.currentToken}`
  readonly rawUrl: string = "https://localhost:443/MemberOnboarding"
  readonly secureUrl: SafeUrl
  readonly safeResourceUrl: string = ''
  
  showDocumentViewer = false

  fileData = ''

  fields = [
    WebUiFormField.input('id', { label: 'Id' }, { className: 'w-1/2  px-1', hide: true }),
    WebUiFormField.input('name', { label: 'Name' }),
    WebUiFormField.input('encoding', { label: 'Encoding' }),
    WebUiFormField.jsonEditor('code', {label: 'Json Object' }, { className: 'w-full px-1' })// need a code field here
  ]

  constructor(private readonly store: WebTemplateEditStore, 
    private domSanitizer: DomSanitizer,
    private readonly data: WebCoreDataAccessService
   ) {
    this.secureUrl = this.domSanitizer.bypassSecurityTrustUrl(this.rawUrl)
    this.safeResourceUrl = domSanitizer.sanitize(SecurityContext.URL, this.secureUrl)
  }

  @HostListener('document:txDocumentEditorLoaded', ['$event'])
  onTxDocumentEditorLoaded() {
    if (TXTextControl != undefined) {
      try {
        TXTextControl.addEventListener('ribbonTabsLoaded', async () => {
          this.getFileData()
        })
      } catch (error) {
        window.location.reload()
      }
    }
  }

  callback() {
    console.log('callback')
    //this.loadJsonData(vm.item.code)
  }
  errorCallback(event) {
    console.log('errorCallback', event)
  }

  async getFileData() {
    await this.loading$.pipe(
      tap((loading) => {
        while (loading !== true) {
          console.log('in the while')
        }
      }),
    )
    await this.vm$
      .pipe(
        tap((vm) => {
          if (vm.item?.attachment) {
            this.fileData = vm.item.attachment
            const fileinfo = vm.item.attachment
            let applicationFieldType = 'MSWord'
            let reportingMergeBlockFormat = 'Default'
            let sigType = 'WordprocessingML'
        
            let streamType = TXTextControl.StreamType[sigType]
            let loadSettings = {
              reportingMergeBlockFormat: TXTextControl.SaveSettings.ReportingMergeBlockFormat[reportingMergeBlockFormat]
            }

            TXTextControl.load(streamType,fileinfo,  () => this.callback() ,loadSettings, this.errorCallback)
            TXTextControl.loadJsonData(JSON.stringify([vm.item.code]))

            return fileinfo
          }
        }),
      )
      .subscribe()
  }

  loadAttached() {
    let sigType = 'WordprocessingML'
    let streamType = TXTextControl.StreamType[sigType]
    let loadSettings = {
      applicationFieldFormat: TXTextControl.ApplicationFieldFormat.MSWord,
      reportingMergeBlockFormat: TXTextControl.SaveSettings.ReportingMergeBlockFormat.Default
    }
    TXTextControl.load(streamType, this.fileData, this.callback, loadSettings, this.errorCallback)
  }

  async updateTemplate(input: UserUpdateTemplateInput) {
    const { id, name, encoding, code } = input

    let attachment = ''

    let applicationFieldType = 'MSWord'
    let reportingMergeBlockFormat = 'Default'
    let sigType = 'WordprocessingML'

    let streamType = TXTextControl.StreamType[sigType]
    let settings = {
      applicationFieldFormat: TXTextControl.ApplicationFieldFormat[applicationFieldType],
      reportingMergeBlockFormat: TXTextControl.SaveSettings.ReportingMergeBlockFormat[reportingMergeBlockFormat]
    }

    await TXTextControl.saveDocument(streamType, async (e) => {
      attachment = e.data
      input.attachment = attachment

      if (attachment && attachment != '') {
        this.store.updateTemplateEffect({ id, name, encoding, code: JSON.stringify(code), attachment })
      }
    }, settings, this.errorCallback)
  }

  loadData(attachment) {
    if(TXTextControl) {
      TXTextControl.loadSelection(TXTextControl.StreamType.WordprocessingML, attachment)
    }
  }

  loadJsonData(code) {
      let arr: any[] = [code]

      if(TXTextControl) {
        TXTextControl.loadJsonData(JSON.stringify(arr))
      }
  }

  ngOnDestroy() {
    this.removeFromDom()
  }

  ngOnInit() {
  }

  removeFromDom() {
    if (TXTextControl !== undefined) {
      console.log(TXTextControl)
      TXTextControl.removeEventListener('ribbonTabsLoaded', () => {})
      TXTextControl.removeFromDom()
    }
  }

  handleShowDocumentViewerChange(nextState) {
    this.showDocumentViewer = nextState
  }
}
