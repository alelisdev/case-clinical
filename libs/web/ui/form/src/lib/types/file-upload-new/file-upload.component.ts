/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { tapResponse } from '@ngrx/component-store'
import { Document } from '@case-clinical/api/document/data-access'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebUiFilePreviewComponent } from 'libs/web/ui/file-preview/web-ui-file-preview.component'
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
  size?: number
}

@Component({
  selector: 'formly-field-file-new',
  templateUrl: './file-upload.component.html',
  styleUrls:['./style.scss']
})
export class FormlyFieldFileNew extends FieldType implements OnInit {
  @ViewChild('filePreview') filePreviewComponent!: WebUiFilePreviewComponent
  public files: any[] = [];
  documents = []
  uploadedDocuments = []
  readonlyFileview = false
  dragDropFile = false
  config = {
    required: false,
    isValidFile: true,
    multiple: false,
    unlimitedSize:false,
    sizeLimitInKB: 500,
    allowedExtensions: ['PNG', 'JPG', 'PDF', 'DOC', 'txt','DCM', 'DOCX'],
    outputUploaded: false,
  }
  initalized = false

  constructor(
    private ref: ChangeDetectorRef,
    private readonly store: WebCoreDataAccessService,
    private toast: WebUiToastService,
  ) {
    super()
  }

  ngOnInit() {
    this.to.instance = this
    this.setConfig()
    this.readonlyFileview = this.to.readOnly
    if(this.to.dragDropFile){
      this.dragDropFile = this.to.dragDropFile
    }
    this.formControl.valueChanges.subscribe((val) => {
      if (val && !this.initalized) {
        this.initalized = true
        this.checkAndSetInitialValue()
      }
    })
  }

  removeDocuments() {
    this.setDocuments([])
    this.setUploadedDocuments([])
  }

  setConfig() {
    if (this.to.required) {
      this.config.required = true
    }
    if (this.to.multiple === true) {
      this.config.multiple = true
    }
    if (this.to.allowedExtensions) {
      this.config.allowedExtensions = this.to.allowedExtensions
    }
    if(this.to.unlimitedSize){
      this.config.unlimitedSize = this.to.unlimitedSize
    }
    if (this.to.sizeLimitInKB) {
      this.config.sizeLimitInKB = this.to.sizeLimitInKB
    }

    if (this.to.outputUploaded) {
      this.config.outputUploaded = this.to.outputUploaded
    }
    if (this.formControl.value) {
      this.checkAndSetInitialValue()
      this.initalized = true
    } else {
      this.validateFiles()
    }
  }

  checkAndSetInitialValue() {
    const val = this.formControl.value
    let uploaded = false
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        const element = val[i]
        if (element.id) {
          uploaded = true
          break
        }
      }
    } else {
      if (val.id) {
        uploaded = true
      }
    }
    if (uploaded) {
      this.setInitialValue()
      this.runChangeDetection()
    } else {
      this.setDocuments(this.to.multiple ? val : [val])
    }
    this.validateFiles()
  }

  setInitialValue() {
    const val = this.formControl.value
    val && this.filterDocs(val)
    this.patchValue()
  }

  filterDocs(docs) {
    if (this.to.multiple) {
      this.setUploadedDocuments(docs.filter((ele) => ele.id))
      this.setDocuments(docs.filter((ele) => !ele.id))
    } else {
      if (docs.id) this.setUploadedDocuments([docs])
      else this.setDocuments([docs])
    }
  }

  patchValue() {
    if (this.config.multiple) {
      if (this.config.outputUploaded) {
        this.formControl.patchValue([...this.documents, ...this.uploadedDocuments])
      } else {
        this.formControl.patchValue(this.documents)
      }
    } else {
      console.log(this.documents[0]);
      this.formControl.setValue(this.documents[0] || null)
    }

    this.model[this.field.key.toString()] = this.formControl.value
  }

  runChangeDetection() {
    this.ref.markForCheck()
    this.ref.detectChanges()
    this.formControl.markAsDirty()
    this.formControl.markAsTouched()
    this.formControl.updateValueAndValidity()
  }

  onFileUploadBtnClick($event, fileUploadRef) {
    this.setValidationError(null);
    this.setValidationError({windowFocus: true});
    setTimeout(() => {
      window.addEventListener('focus', this.onWindowFocus, false);
    }, 0);

    $event.stopPropagation()
    fileUploadRef.click()
  }


  onWindowFocus = () => {
    window.removeEventListener('focus', this.onWindowFocus, false);
    console.log('File dialog closed');
    if (this.config.required && (this.config.multiple || !this.uploadedDocuments.length)) {
      this.setValidationError({ required: true })
      this.setValidationError({windowFocus: false});
    }
  };
  async fileChanged(event) {
    if (!event.target.files) {
      return
    }

    console.log("uploading-fileChanged", event.target.files)

    const size = this.config.sizeLimitInKB * 1024
    const selectedFiles: DocumentInput[] = []
    for (const ele of event.target.files) {
      let extension: string = ele.type;
      if(!extension && ele.name.includes('.')) {
        const lastDotIndex = (ele.name as string).lastIndexOf('.');
        extension = `data/${ele.name.substring(lastDotIndex+1, ele.name.length)}`;
      }
      console.log({ extension })
      if (ele.size < size) {
        const base64 = (await this.fileToDataURL(ele)) as string
        selectedFiles.push({
          name: ele.name,
          extension,
          size: ele.size,
          attachment: base64,
        })
      } else {
        selectedFiles.push({
          name: ele.name,
          extension,
          size: ele.size,
          attachment: '',
        })
      }
    }
    const vals = this.config.multiple ? [...this.documents, ...selectedFiles] : selectedFiles
    this.initalized = true
    this.setDocuments(vals)
    this.validateFiles()
    this.to?.onChange && this.to.onChange(this.formControl?.value, this.field)
    event.target.value = null
  }

  async fileDragDropChanged(dragDropFiles) {
    if (!dragDropFiles) {
      return
    }
    console.log("uploading", dragDropFiles)
    const size = this.config.sizeLimitInKB * 1024
    const selectedFiles: DocumentInput[] = []
    for (const ele of dragDropFiles) {
      let extension: string = ele.type;
      if(!extension && ele.name.includes('.')) {
        const lastDotIndex = (ele.name as string).lastIndexOf('.');
        extension = `data/${ele.name.substring(lastDotIndex+1, ele.name.length)}`;
      }
      console.log({ extension })
      if (ele.size < size) {
        const base64 = (await this.fileToDataURL(ele)) as string
        selectedFiles.push({
          name: ele.name,
          extension,
          size: ele.size,
          attachment: base64,
        })
      } else {
        selectedFiles.push({
          name: ele.name,
          extension,
          size: ele.size,
          attachment: '',
        })
      }
    }
    const vals = this.config.multiple ? [...this.documents, ...selectedFiles] : selectedFiles
    this.initalized = true
    this.setDocuments(vals)
    this.validateFiles()
    this.to?.onChange && this.to.onChange(this.formControl?.value, this.field)
    //event.target.value = null
  }

  setDocuments(docs: any[]) {
    this.documents = docs
    this.patchValue()
    this.runChangeDetection()
  }

  setUploadedDocuments(docs: any[]) {
    this.uploadedDocuments = docs
    // this.to.uploadedDocs = docs;
    this.ref.markForCheck()
    this.ref.detectChanges()
  }

  validateFiles() {
    const files = this.documents;
    this.config.isValidFile = true

    if (!files || !files.length) {
      this.setValidationError(null)
      if (this.config.required && (this.config.multiple || !this.uploadedDocuments.length)) {
        console.log("isvalide", false)
        this.config.isValidFile = false
        this.setValidationError({ required: true })
      }
    } else {
      this.validateFileSize(files)
      this.validateFileType(files)

      if (this.config.isValidFile) {
        this.setValidationError(null)
      }
    }
  }

  fileDeleted(file, index) {
    if (file.id) {
      this.deleteFromServer(file)
      return
    }
    const data = this.documents
    data.splice(index ?? 0, 1)
    this.setDocuments(data)
    this.validateFiles()
    this.formControl.setValue(null);
  }

  deleteFile(id: string) {
    const updata = this.uploadedDocuments
    const uploadedIndex = updata.findIndex((ele) => ele.id === id)
    if (uploadedIndex > -1) {
      if (this.to.onDelete) {
        this.to.onDelete(id, this.field)
      }
      updata.splice(uploadedIndex, 1)
    }
    this.setUploadedDocuments(updata)
    if (!this.config.multiple) {
      this.setDocuments([])
    }
    if (this.config.outputUploaded) {
      this.formControl.patchValue([...this.documents, ...this.uploadedDocuments])
    }
    this.validateFiles()
  }

  deleteFromServer(file: Document) {
    if (!confirm('File will be permanently deleted from the server. Do you wish to continue?')) return
    const featureName = this.to?.featureName ?? ''
    this.store
      .userDeleteDocument({ documentId: file.id, featureName: featureName })
      .pipe(
        tapResponse(
          (res) => {
            this.toast.success('File deleted successfully')
            this.deleteFile(file.id)
          },
          (errors: any) => {
            this.toast.error(errors.message || 'File could not be deleted')
          },
        ),
      )
      .subscribe()
  }

  openDocument(file: Document) {
    console.log("openDocument", file)
    this.filePreviewComponent?.document.next(file)
  }

  validateFileSize(files) {
    if(!this.config.unlimitedSize)
    {
      const size = this.config.sizeLimitInKB * 1024
      for (const file of files) {
        const ele = file
        if (ele.size > size) {
          this.config.isValidFile = false
          this.setValidationError({ fileSize: true })
          break
        }
      }  
    }

  }

  validateFileType(files) {
    if (!this.config.allowedExtensions.length) {
      return
    }
    console.log("validateFileType", files);
    const firstFileName= files?.at(0)?.name
    const specialImage = (firstFileName !== 'ProfileImage.png')
    for (let index = 0; index < files.length; index++) {
      const lowerFileTypes: string[] = this.config.allowedExtensions.map(item => item.toLowerCase());
      let strFileType = (files[index]?.extension?.split('/')?.[1])?.toLowerCase() ?? 'unknown';
      if(strFileType === 'jpeg') strFileType = 'jpg';
      if(strFileType === 'msword') strFileType = 'doc';
      if(strFileType === 'msword') strFileType = 'docx';
      console.log(lowerFileTypes, strFileType)
      if (!lowerFileTypes.includes(strFileType) && specialImage) {
        this.config.isValidFile = false
        console.log("validFlag", false)
        this.setValidationError({ extensionType: true })
        break
      }
    }
  }

  setValidationError(obj) {
    this.formControl.setErrors(obj)
  }

  getAbbrName(s: string) {
    if (!s) return ''
    const maxLength = 30
    return s.length > maxLength ? s.slice(0, maxLength) + '...' : s
  }

  fileToDataURL(file_: File) {
    const reader = new FileReader()
    // tslint:disable-next-line:no-unused
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file_)
      reader.addEventListener(
        'load',
        function (event) {
          resolve(event.target.result)
        },
        false,
      )
    })
  }

  public dropped(files: NgxFileDropEntry[]) {
    let selectedFiles:any[];
    if(this.to.multiple)
    {
      selectedFiles = files.map(file=> file.fileEntry as FileSystemFileEntry).filter(f=>f.isFile);
    }
    else{
      selectedFiles = [files.map(file=> file.fileEntry as FileSystemFileEntry).filter(f=>f.isFile)[0]]
    }
    this.fileDragDropChanged(selectedFiles)
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

}
