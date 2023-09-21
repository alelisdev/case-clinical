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
  HostListener,
} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { tapResponse } from '@ngrx/component-store'
import { environment } from 'libs/core/feature/src/environments/environment'
import { BehaviorSubject, first, map, Subject, takeUntil } from 'rxjs'
// import { Document } from '../../../api/document/data-access/src'
import { Document } from '../../../../../../api/document/data-access/src'
// import { WebUiToastService } from '../toast/src'
// import { WebUiToastService } from '../../..'
// import { Document } from '@case-clinical/api/document/data-access/'
import { WebUiToastService } from '@case-clinical/web/ui/toast';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
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
    .gallery-wrapper {
      text-align: center;
      margin-top: 50px;
    }
    .current-image-gallery{
      background-position : center !important;
      background-size : contain !important;
      background-repeat : no-repeat !important;
    }

    .next-prev:disabled,
      .next-prev[disabled] {
        opacity: 0.5;
      }

      ::ng-deep .ngneat-dialog-content {
        width: 100% !important;
        height: 100% !important;
      }
    `
  ],
})
export class WebUiFilePreviewComponent implements AfterViewChecked, OnInit {
  @Input('isDownloadable') isDownloadable : boolean = false;
  @Input('documents') documents : any;
  @Input('mode') mode = 'default';
  @Input('textWhileLoading') loadingText :string = '';
  public document: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  public avatarImage : BehaviorSubject<Document> = new BehaviorSubject<Document>(null)
  public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  destroy$: Subject<boolean> = new Subject<boolean>()
  fetchedDocs : BehaviorSubject<Array<Document>> = new BehaviorSubject<Array<Document>>([]);
  @Output('hideButton') hideButtonEvent = new EventEmitter<boolean>();
  @ViewChild('documentTpl', { static: true }) documentTpl!: TemplateRef<any>
  isLoading = false;
  getEventLog(data : any) {
    // console.log('event called' ,data)
  };
  selectedIndex = 0;
  isDialogOpen = false;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.isDialogOpen) {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        this.nextPrevClick(true)
      }

      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        this.nextPrevClick(false);
      }
    }
  }
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
      if(doc && doc.isDicom) {
        if(!doc.url) {
          this.getDicomUrl(doc);
        } else {
          if(!this.isDialogOpen) {
            this.openDialog()
          }
        }
      } else {
        if (doc.attachment && doc.attachment != '') {
          if(!this.isDialogOpen) {
            this.openDialog()
          }
          this._loading = true;
        } else if (doc.id) {
          // its from server
          this.getDoc(doc.id)
        }
      }
    });
  }

  ngOnInit(): void {
    if(this.mode === 'avatar' && !Array.isArray(this.documents) && this.documents.__typename === 'Document' && this.documents.id){
      // make sure its an avatar and a single upload Document object
      this.getDoc(this.documents.id,this.avatarImage)
    }else if(this.mode=== 'gallery' && Array.isArray(this.documents) && this.documents.length > 0){
      const docs = this.documents.filter(ele=>{
        if(this.documents[0].id && this.documents[0]?.__typename === 'Document') return true;
        return false;
      })
      this.getDocs(docs.map(ele=>ele.id), this.fetchedDocs);
      console.log(this.fetchedDocs)
      this.fetchedDocs.subscribe(val=>{
        this.galleryImages = val.filter(ele=>{return ele?.extension?.split('/')[0] === 'image'})
        if(this.galleryImages.length<1) this.hideButtonEvent.emit(true);
        this.ref.detectChanges()
        console.log(this.galleryImages)
      })
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
    downloadLink.href = doc.attachment
    downloadLink.download = doc.name
    downloadLink.click()
  }

  openDocument(file : Document,e : Event, index = 0) {
    this.selectedIndex = index;
    e.stopImmediatePropagation();
    this.document.next(file);
  }

  progressLog(e : any){
    if(e?.source?.downloadComplete===false){
      let int = setInterval(()=>{if(e.source?.downloadComplete===true){
        this._loading = false;
        clearInterval(int)
      }},150)
    }
  }

  openDialog(size : string = 'xxl') {
    const dialogRef = this.dialog.open(this.documentTpl, {size: size, resizable: false, closeButton: false });
    this.isDialogOpen = true;
    dialogRef.afterClosed$.subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  closeDialog(e: Event) {
    this.dialog.closeAll()
  }

  safeUrl(url) {
    return this.sanitized.bypassSecurityTrustUrl(url);
  }

  getDoc(documentId, customSubject? : BehaviorSubject<Document>) {
    this.isLoading = true;
    this.webData
      .getDocument(documentId)
      .pipe(
        tapResponse(
          (document: any) => {
            if(customSubject) customSubject.next(document);
            else this.document.next(document);
            this.isLoading = false;
            this.destroy$.next(true)
          },
          (errors: any) => {
            this.toast.error(errors.message || 'error while fetching data')
            this.isLoading = false;
            this.destroy$.next(true)
          },
        ),
        takeUntil(this.destroy$),
      )
      .subscribe()
  }

  getDicomUrl(doc) {
    const url = `${environment.dicom_base_url}viewer/${doc.dicomStudyId}?domain=${window.location.host.split('.')[0]}`
    doc.url = this.sanitized.bypassSecurityTrustResourceUrl(url);
    this.document.next(doc);
  }

  getDocs(docIds : Array<string>, customSubject? : BehaviorSubject<Array<Document>>){
    const temp = []
    docIds.forEach(docId=>{
    const destroy$ = new Subject<boolean>();
    this.webData.getDocument(docId)
    .pipe(
      tapResponse(
        (document : any) => {
          temp.push(document);
          customSubject && customSubject.next(temp);
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

  nextPrevClick(isNext = true) {
    const nextPrevIndex = isNext ? this.selectedIndex + 1 : this.selectedIndex - 1;
    if(this.documents && this.documents[nextPrevIndex] ) {
      const file = this.documents[nextPrevIndex];
      if(file && file.isDicom) {
        this.getDicomUrl(file)
      } else {
        this.getDoc(file.id)
      }
      this.document.next(file);
      this.selectedIndex = nextPrevIndex
    } else {
      return;
    }
  }

  showError(e){
    console.log(e)
  }
  firstError : boolean = true;
  showDownloadOnError(imgElement,containerElement,e){
    // if(!this.firstError) return;
    imgElement.classList.add('hidden');
    containerElement.classList.remove('hidden');
    this.firstError = false;
  }
}
