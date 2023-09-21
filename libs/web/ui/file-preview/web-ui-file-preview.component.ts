import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewChecked,
  SimpleChanges,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { tapResponse } from '@ngrx/component-store'
import { BehaviorSubject, first, map, Subject, takeUntil } from 'rxjs'
import { Document } from '../../../api/document/data-access/src'
import { WebUiToastService } from '../toast/src'
@Component({
  selector: 'ui-file-preview',
  templateUrl: './web-ui-file-preview.component.html',
  styles: [
    `
      .basis-200px {
        flex-basis: 20rem;
      }
    `,

    `
      .minImage{
        min-width : 200px;
        max-height: 800px;
      }
    `,
    `
      ::ng-deep ngx-extended-pdf-viewer .toolbarField.pageNumber.visiblePageIsLoading{
        background : transparent !important;
      }
    `,
    `
      ::ng-deep ngx-extended-pdf-viewer .toolbarField.pageNumber{
        text-align : center !important;
        margin : 5px 0 !important;
      }
    `,
    `
      ::ng-deep ngx-extended-pdf-viewer #scaleSelectContainer select{
        width : 120px !important;
        padding-left : 15px;
      }
    `,
    `
      ::ng-deep .toolbarButton svg{
        height : calc(100% - 5px) !important;
        width : auto !important;
        margin : 0 auto !important;
      }
    `,
    `
      ::ng-deep ngx-extended-pdf-viewer #secondaryToolbarButtonContainer{
        display : flex !important;
        flex-direction : column !important;
        padding : 10px 0;
      }
    `,
    `
     ::ng-deep ngx-extended-pdf-viewer #secondaryToolbarButtonContainer button{
      width : auto !important;
     }
    `,
    `
    ::ng-deep ngx-extended-pdf-viewer div.zoom{
      height: 600px !important;
      width: 1450px !important;
    }
    `,
    `
      ::ng-deep .mat-tooltip{
        word-break: break-all !important;
        white-space: normal !important;
        /* font-size : 1rem; */
      }
    `,
    `
      ::ng-deep ngx-extended-pdf-viewer #numPages{
        padding-top: 1px;
      }
    `,
    `
      ::ng-deep .center-image{
        background-position : center !important;
        background-size : cover !important;
        background-repeat : no-repeat !important;
      }

      ::ng-deep ngneat-dialog .ngneat-dialog-backdrop{
        z-index: 998 !important;
      }
    `,
    `
    ::ng-deep ui-file-preview .ngneat-dialog-content {
      width: 80% !important;
    }
    `,
    `
    .gallery-wrapper {
      text-align: center;
      margin-top: 50px;
    }
    .current-image-gallery{
      background-position : center !important;
      background-size : contain !important;
      background-repeat : no-repeat !important;
    }
    `
  ],
})
export class WebUiFilePreviewComponent implements AfterViewChecked, OnInit {
  @Input('isDownloadable') isDownloadable : boolean = false;
  @Input('documents') documents : any;
  @Input('mode') mode = 'default';
  @Input('textWhileLoading') loadingText :string = '';
  public document: BehaviorSubject<Document> = new BehaviorSubject<Document>(null!)
  public avatarImage : BehaviorSubject<Document> = new BehaviorSubject<Document>(null!)
  public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  destroy$: Subject<boolean> = new Subject<boolean>()
  fetchedDocs : BehaviorSubject<Array<Document>> = new BehaviorSubject<Array<Document>>([]);
  @Output('hideButton') hideButtonEvent = new EventEmitter<boolean>();
  @ViewChild('documentTpl', { static: true }) documentTpl!: TemplateRef<any>
  formControl: any
  field: any
  validImage ?: boolean

  getEventLog(data : any) {
    // console.log('event called' ,data)
  };
  private _loading = false;
  constructor(
    private readonly dialog: DialogService,
    private readonly webData: WebCoreDataAccessService,
    private readonly toast: WebUiToastService,
    private el : ElementRef,
    private sanitized: DomSanitizer,
    private ref : ChangeDetectorRef
  ) {
    this.document.subscribe((doc) => {
      // console.log(doc)
      if (!doc) return
      if (doc.attachment && doc.attachment != '') {
        try {
          this.validImage = !(doc.attachment??'null').includes('null')
        } catch (e) {
          this.validImage = false;
        }
        if (doc.extension === 'application/pdf') {
          this.openDialog()
          this._loading = true;
        }else if(doc.extension?.split('/')[0] === 'image'){
          this.openDialog('lg')
        } else {
          const downloadLink = document.createElement('a')
          downloadLink.href = doc.attachment
          downloadLink.download = doc.name!
          downloadLink.click()
          this.toast.warning('Only PDF and Image View are supported for now') // Add Downlaod functionality
        }
      } else if (doc.id) {
        // its from server
        this.getDoc(doc.id)
      }
    });
  }

  ngOnInit(): void {
    if(this.mode === 'avatar' && !Array.isArray(this.documents)){
      // make sure its an avatar and a single upload Document object
      //this.getDoc(this.avatarImage)
    }else if(this.mode=== 'gallery' && Array.isArray(this.documents) && this.documents.length > 0){
      // const docs = this.documents.filter(ele=>{
      //   if(this.documents[0].id) return true;
      //   return false;
      // })
      // this.getDocs(docs.map(ele=>ele.id), this.fetchedDocs);
      // console.log(this.fetchedDocs)
      // this.fetchedDocs.subscribe(val=>{
      //   this.galleryImages = val.filter(ele=>{return ele?.extension?.split('/')[0] === 'image'})
      //   if(this.galleryImages.length<1) this.hideButtonEvent.emit(true);
      //   this.ref.detectChanges()
      //   //console.log(this.galleryImages)
      // })
    }
  }

  getAbbrName(s : string){
    const maxLength = 30; //30 Characters + ... returned
    if(!s) return '';
    return s.length > 30 ? s.slice(0,30) + '...' : s;
  }
  get loading(){
    return this._loading;
  }

  getDataUrl(s: string) {
    return s.split('base64,')[1]
  }
  download(doc: Document) {
    const downloadLink = document.createElement('a')
    downloadLink.href = doc.attachment!
    downloadLink.download = doc.name!
    downloadLink.click()
  }

  openDocument(file : Document,e : Event){
    e.stopImmediatePropagation();
    console.log(file);
    this.document.next(file);
  }

  progressLog(e : any){
    if(e?.source?.downloadComplete===false){
      let int = setInterval(()=>{if(e.source.downloadComplete===true){
        this._loading = false;
        clearInterval(int)
      }},150)
    }
  }

  openDialog(size : string = 'xxl') {
    this.dialog.open(this.documentTpl, { size: size, resizable: false, closeButton: false })
  }

  closeDialog(e: Event) {
    this.dialog.closeAll()
  }

  safeUrl(url:any) {
    const imageUrl = this.sanitized.bypassSecurityTrustUrl(url);
    return imageUrl
  }

  getDoc(documentId:any, customSubject? : BehaviorSubject<Document>) {
    this.webData
      .getDocument(documentId)
      .pipe(
        tapResponse(
          (document: any) => {
            if(customSubject) customSubject.next(document);
            else this.document.next(document);
            this.destroy$.next(true)
          },
          (errors: any) => {
            this.toast.error(errors.message || 'error while fetching data')
            this.destroy$.next(true)
          },
        ),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  getDocs(docIds : Array<string>, customSubject? : BehaviorSubject<Array<Document>>){
    const temp:any[] = []
    docIds.forEach(docId=>{
    const destroy$ = new Subject<boolean>();
    this.webData.getDocument(docId)
    .pipe(
      tapResponse(
        (document : any) => {
          temp.push(document);
          customSubject?.next(temp!)
          destroy$.next(true)
        },
        (errors: any) => {
          this.toast.error(errors.message || 'error while fetching data')
          destroy$.next(true)
        },
      ),
      takeUntil(destroy$),
    )
    .subscribe()
    })
  }

  ngAfterViewChecked(): void {
  }

  currentGalleryIndex : number  = 0
  getCurrentGallery(){
    if(!this.currentGalleryIndex && this.galleryImages.length > 0) this.currentGalleryIndex = 0
    console.log(this.currentGalleryIndex)
    return this.galleryImages[this.currentGalleryIndex]?.attachment;
  }

  setCurrent(i : number){
    this.currentGalleryIndex = i;
  }
  setPrevious(){
    if(this.currentGalleryIndex>0) this.currentGalleryIndex -= 1;
    else this.currentGalleryIndex = this.galleryImages.length-1;
  }
  setNext(){
    if(this.currentGalleryIndex<this.galleryImages.length-1) this.currentGalleryIndex += 1;
    else this.currentGalleryIndex = 0;
  }

  galleryImages : any[] = [

  ];
}
