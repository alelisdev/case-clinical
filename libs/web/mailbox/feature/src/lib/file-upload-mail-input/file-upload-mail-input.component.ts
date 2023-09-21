import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'
import { Document } from '@case-clinical/api/document/data-access'
import { FieldType } from '@ngx-formly/core'
import { BehaviorSubject, filter, from, map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs'
import { FormControl, Validators } from '@angular/forms';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { tapResponse } from '@ngrx/component-store'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { MailComposeService } from '../mail-compose/mail-compose.service'
import { WebUiFilePreviewComponent } from '../file-preview/web-ui-file-preview.component'

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
  size?: number
}

@Component({
  selector: 'file-upload-mail-input',
  templateUrl: './file-upload-mail-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles : [
    `
      ::ng-deep .mat-tooltip{
        word-break: break-all !important;
        white-space: normal !important;
        /* font-size : 1rem; */
      }
    `
  ]
})
export class FileUploadMailInput implements OnInit, AfterViewInit {
  @Input() formControl: FormControl;
  @Input() multiple: boolean = true;
  @Input() allowedExtensions: any = undefined;
  @Input() removedFileEvent = new Subject();
  @Input() draftFiles$: BehaviorSubject<Array<DocumentInput>> = new BehaviorSubject<Array<DocumentInput>>([]);

  @Output() draftFileDeleteEvent = new EventEmitter();
  @Output() fChanged = new EventEmitter<any>()
  @Output() fChangedEventTargetFiles = new EventEmitter<any>();

  @ViewChild('filePreview') filePreviewComponent !: WebUiFilePreviewComponent;
  @ViewChild('fileUpload',{static:false, read: ElementRef}) elRef;

  //document$: BehaviorSubject<Array<DocumentInput>> = new BehaviorSubject<Array<DocumentInput>>([]);
  document = [];
  uploadedDocument = [];
  fileUploadErrorMessage:string = "Total size of the files can't be exceed 25MB"

  fieldBlur$= of(false);

  constructor(
    private ref: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private readonly store : WebCoreDataAccessService,
    private toast : WebUiToastService,
    public mailComposeService: MailComposeService,
    ) {
  }

  ngOnInit() {
    this.draftFiles$.pipe().subscribe(val=>{
      if(val?.length){
        this.uploadedDocument = val;
      }
    })

    this.removedFileEvent.subscribe((res) => {
      if(res){
        this.removeFileById(res);
      }
    })
  }

  ngAfterViewInit(){
  }

  async fileChanged(event) {
    if(event.target.files?.length){
      const datas : DocumentInput[] = [];
      for (const ele of event.target.files) {
        const base64 = (await this.fileToDataURL(ele) as string)
        datas.push(
          {
            name : ele.name,
            extension : ele.type,
            size : ele.size,
            attachment : base64
          }
        )
      }

      if(!this.checkFileSizeValidation(datas)){
        this.formControl.patchValue(null);
        this.toast.error(this.fileUploadErrorMessage)
      }
      else{
        let docData = [...this.document, ...datas]
        let tmpData = [...this.document, ...this.uploadedDocument, ...datas]

        if(!this.checkFileSizeValidation(tmpData)){
          this.formControl.patchValue(null);
          this.toast.error(this.fileUploadErrorMessage)
        }
        else{
          this.document = docData;
          this.formControl.patchValue(null);
          this.fChanged.emit(this.document)
        }
      }

      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }

  fileToDataURL(file_: File) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file_);
      reader.addEventListener(
        'load',
        function (event) {
          resolve(event.target.result);
        },
        false,
      );
    });
  }

  checkFileSizeValidation(files:any = []){
    if(files && files.length){
      const maxFileSizeInMB = 25;
      const totalFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

      let fileSizeSum = files.map(ele => ele.size).reduce((acc, cur) => acc + cur, 0);

      if(fileSizeSum > totalFileSizeInBytes){
        return false
      }
      else{
        return true
      }
    }
  }

  getAbbrName(s: string) {
    const maxLength = 30 //30 Characters + ... returned
    if (!s) return ''
    return s.length > 30 ? s.slice(0, 30) + '...' : s
  }

  fileDeleted(file, index) {
    if(file.id && file.draftId){
      this.draftFileDeleteEvent.emit({draftId: file.draftId, id: file.id});
    }
    else{
      const data = this.document
      data.splice(index, 1)
      this.document = data.length ? data : []
      this.fChanged.emit(this.document)
      this.ref.markForCheck()
      this.ref.detectChanges()
    }
  }

  removeFileById(id){
    let index = this.uploadedDocument.findIndex(ele => ele.id == id)
    this.uploadedDocument.splice(index, 1)
    this.ref.markForCheck()
    this.ref.detectChanges()
  }

  openDocument(file: any) {
    if (file.id) {
      const attachment = this.uploadedDocument.find((f) => f.id === file.id)
      if (attachment) {
        this.filePreview(attachment)
      }
    } else {
      this.filePreviewComponent?.document.next(file)
    }
  }

  filePreview(attachment) {
    const fileName = attachment.filename ?? 'File'
    this.mailComposeService.getFile(attachment.id).subscribe((res) => {
      if (res) {
        const base64 = `data: ${attachment.content_type} ;base64,` + res.file?.body
        const obj: any = {
          attachment: base64,
          extension: attachment.content_type,
          name: fileName,
          size: attachment.size,
        }
        this.filePreviewComponent?.document.next(obj)
      }
    })
  }
}
