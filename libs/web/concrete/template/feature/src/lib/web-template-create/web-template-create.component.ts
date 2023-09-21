import { Component, HostListener, SecurityContext } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebTemplateCreateStore } from './web-template-create.store'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { of } from 'rxjs'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { map, take } from 'rxjs/operators'

interface IDropDownItem {
  label: string
  value: string
  icons?: string
}

declare const TXTextControl: any
declare const TXTextControlWeb: any
declare const TXDocumentViewer: any
declare const removeEditorFromDom: any
@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class='w-full flex flex-col'>
        <ui-page-header title="Create Template" linkPath=".." linkTitle="Back" class='w-full'></ui-page-header>

        <as-split [useTransition]="true" direction="horizontal" [unit]="'pixel'" class="w-full flex-1 flex flex-row">
          <as-split-area [order]="0" [size]="500">
          <div class="dark:bg-gray-800 px-6 py-4 rounded-md">
            <ui-form [fields]="fields" [model]="this.model" (submitForm)="createTemplate($event)">
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
            <tx-ds-document-editor 
            class='w-full' 
            width="1000px"
            height="90vh"
            serviceURL="{{ this.safeResourceUrl }}"
            oauthClientID="dsserver.N1iQJDbpsexFM1a3nBkMUD172Ukcg5nf"
            oauthClientSecret="PIaXRPf2cCQ7z1LT4yGns3cKznD1bI5S"
            >
            </tx-ds-document-editor>
          </as-split-area>
        </as-split>
    </div>
    </ng-container>
  `,
  providers: [WebTemplateCreateStore],
})
export class WebTemplateCreateComponent {
  readonly vm$ = this.store.vm$

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('id', { label: 'Id' }, { className: 'w-1/2  px-1', hide: true }),
      WebUiFormField.input('name', { label: 'Name' }, { className: 'w-full px-1' }),
      WebUiFormField.jsonEditor('code', {label: 'Json Object' }, { className: 'w-full px-1' })// need a code field here
    ]),
    WebUiFormField.fieldRow([
      // WebUiFormField.file(
      //   'attachment',
      //   {
      //     label: 'Attachment',
      //     registerOnChange: (changes) => {
      //       console.log('file:', changes)
      //     },
      //   },
      //   { className: 'w-1/2  px-1' },
      // ),
      WebUiFormField.input(
        'encoding',
        { label: 'Encoding' },
        {
          className: 'w-1/2  px-1',
          defaultValue: 'DocX',
          hide: true,
        },
      ),
    ])
  ]

  constructor(
    private readonly store: WebTemplateCreateStore,
    private domSanitizer: DomSanitizer,
    private readonly data: WebCoreDataAccessService,
  ) {
    this.secureUrl = this.domSanitizer.bypassSecurityTrustUrl(this.rawUrl)
    this.safeResourceUrl = domSanitizer.sanitize(SecurityContext.URL, this.secureUrl)
  }

  readonly rawUrl: string = 'https://trial.dsserver.io'
  readonly secureUrl: SafeUrl
  readonly safeResourceUrl: string = ''

  model: any = {
    name: '',
    attachment: '',
    code: {
      name: 'test'
    }
  }

  @HostListener('document:txDocumentEditorLoaded', ['$event'])
  onTxDocumentEditorLoaded() {
    if (TXTextControl != undefined) {
      try {
        TXTextControl.addEventListener('ribbonTabsLoaded', async () => {
          console.log('Loading the json data now')
          this.loadJsonData()
        })
      } catch (error) {
        window.location.reload()
      }
    }
  }



  async createTemplate(input) {
    await this.getFileContent(input, this.store)
  }

  async getFileContent(input, store: WebTemplateCreateStore) {
    let result = await TXTextControl.saveDocument(TXTextControl.StreamType.WordprocessingML, function (e) {
      console.log('in the file content',e)
      input.attachment = e.data
      input.code = JSON.stringify(input.code)
      store.createTemplateEffect(input)
      return e.data
    })

    return result
  }

  loadJsonData() {
      console.log('loading data now', this.model.code)
      let arr: any[]
      if(this.model.code?.length) {
        arr = this.model.code
      } else {
        arr = [this.model.code]
      }

      if(TXTextControl) {
        console.log('loading data now', this.model.code)
        TXTextControl.loadJsonData(JSON.stringify(arr))
      }
  }

  async onCloseDocument() {}

  ngOnDestroy() {
    //removeEditorFromDom()
  }
}
