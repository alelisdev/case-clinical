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
import { WebUiFilePreviewComponent } from 'libs/web/ui/file-preview/web-ui-file-preview.component'
import { BehaviorSubject, filter, from, map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs'
import { FormControl, Validators } from '@angular/forms';
import {  WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { tapResponse } from '@ngrx/component-store'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
  size?: number
}

@Component({
  selector: 'file-upload-chat-input',
  templateUrl: './file-upload-chat-input.component.html',
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
export class FileUploadChatInput implements OnInit, AfterViewInit {
  @Input() formControl: FormControl;
  @Input() allowedExtensions: any = undefined;
  @Input() multiple: boolean = true;
  @Input() sizeLimit: number = undefined;
  @Output() clickedLink = new EventEmitter<any>()
  @Output() fChanged = new EventEmitter<any>()
  @Output() fChangedEventTargetFiles = new EventEmitter<any>();
  @ViewChild('filePreview') filePreviewComponent !: WebUiFilePreviewComponent;
  @ViewChild('fileUpload',{static:false, read: ElementRef}) elRef;
  @ViewChild('imageFileInput',{static:false, read: ElementRef}) imageFileInput;
  document$: BehaviorSubject<Array<DocumentInput>> = new BehaviorSubject<Array<DocumentInput>>([]);
  uploadedDocuments$ : BehaviorSubject<Array<Document>> = new BehaviorSubject<Array<Document>>([]);
  fieldBlur$= of(false);
  fileUploadConfig = {
    controlName: "",
    formType: "create",
    required: false,
    isValidFile:true
  }
  // TO DO LIST :
  // Create a custom button, on click trigger input
  // create custom file counter ( counts both already stored files, newly selected files)
  //

  constructor(
    private ref: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private readonly store : WebCoreDataAccessService,
    private toast : WebUiToastService
    ) {
    // super()
  }
  // allowInput = false;
  // preventDef(e : Event){
  //   if(!this.allowInput)e.preventDefault();
  //   else this.allowInput = !this.allowInput;
  // }

  getAbbrName(s : string){
    const maxLength = 30; //30 Characters + ... returned
    if(!s) return '';
    return s.length > 30 ? s.slice(0,30) + '...' : s;
  }

  // getSize(s : number){
  //   if(s > (1024 * 1024)){
  //     return ''+Math.floor(s/(1024*1024))+' MB'
  //   }else if(s > 1024){
  //     return ''+Math.floor(s/1024)+' KB'
  //   }else{
  //     return ''+s+' Byte'
  //   }
  // }

  ngOnInit() {
    // this.fileUploadConfig.controlName = this.field.key.toString();
    // if(this.to.required){
    //   this.fileUploadConfig.required = true;
    // }
    // if(this.to.documents$){
    //   this.fileUploadConfig.formType = "edit";
    // }
    // if(Array.isArray(this.to.currentFiles)){
    //   // let up = [];
    //   // let curr = [];
    //   // this.to.currentFiles.forEach(ele=>{
    //   //     if(ele.id){up.push(ele);}
    //   //     else{ curr.push(ele);}
    //   // })
    //   // this.document$.next(curr);
    //   // this.uploadedDocuments$.next(up);
    //   this.document$.next(this.to.currentFiles)
    // }

    // if(this.to.updateCurrentDocs$){
    //   this.to.updateCurrentDocs$.subscribe(val=>{
    //     this.document$.next( (Array.isArray(val)) ? val : [val] );
    //   })
    // }

    //  this.document$.pipe().subscribe(val=>{
    //   if(this.to?.isWitnessStepper === true){
    //     this.model.witnessDocument = val;
    //   }else if(this.to?.isPriorInjuryStepper === true){
    //     this.model.document = val;
    //   }else{
    //     if(this.to.multiple){
    //       if(this.to.multiple===true)this.to?.onChange(val);
    //     }else{
    //       this.to?.onChange(val[0] || null);
    //     }
    //   }
    //   this.setFileUploadValidation(val)
    // })

    // this.uploadedDocuments$.subscribe(ele=>{
    //   if(ele && ele.length===0 && this.document$.value.length===0){
    //     this.setFileUploadValidation();
    //   }
    // })
    // if((this.to.documents$) && (this.fileUploadConfig.formType == "edit")){
    //   this.uploadedDocuments$.subscribe(ele=>{
    //     // console.log(ele)
    //   })
    //   const destroy$ = new Subject<boolean>();
    //   if(this.to.multiple===true) {
    //     this.to.documents$.pipe(takeUntil(destroy$)).subscribe(val=>{
    //       this.uploadedDocuments$.next(val.filter(ele=>ele!=null && ele!=undefined));
    //       // if(this.uploadedDocuments$.value && this.uploadedDocuments$.value.length > 0)
    //       // destroy$.next(true);
    //     });
    //   }
    //   else {
    //     this.to.documents$.subscribe(val=>{
    //       this.uploadedDocuments$.next(val);
    //       // if((this.to?.multiple===true) && (this.uploadedDocuments$.value.length > 0)){
    //       //   destroy$.next(true);
    //       // }
    //       // else if(this.uploadedDocuments$.value){
    //       //   destroy$.next(true);
    //       // }
    //     });
    //   }
    // }
  }

  ngAfterViewInit(){
    // setTimeout(() => {
    //   this.uploadedDocuments$.subscribe(data => {
    //     this.setFileUploadValidation()
    //   });
    // },300);
  }

  // onFileUploadBtnClick(fileUploadRef){
  //   this.allowInput = true;
  //   fileUploadRef.click();
  //   fileUploadRef.focus();
  // }

  // onFocus(event:any){
  //   /* if(!((<HTMLInputElement>event.target)?.classList?.contains('ng-untouched'))){
  //     this.formControl.updateValueAndValidity();
  //   }else{
  //     this.formControl.setErrors(null);
  //   } */

  //   this.setFileUploadData(event);
  // }

  fileToDataURL(file_: File) {
    const reader = new FileReader();
    // tslint:disable-next-line:no-unused
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

  async fileChanged(event) {
    console.log("event", event)
    if(!event.target.files) return;

    /* const datas : DocumentInput[] = [];
      await Array.from(event.target.files).forEach(async (ele : File)=>{
         datas.push(
          {
            name : ele.name,
            extension : ele.type,
            attachment : (await this.fileToDataURL(ele) as string)
          }
         )
      }) */

      this.formControl.setErrors({"maxFileSize":true});
      this.ref.markForCheck();
      this.ref.detectChanges();

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
    this.fChangedEventTargetFiles.emit(event.target.files ?? []);
    this.formControl.patchValue(null);

    this.document$.next( (!!this.multiple && this.multiple===true) ? [...this.document$.getValue(),...datas] : datas );

    /* this.document$ = of(datas);
    if(this.to?.isWitnessStepper === true){
      this.model.witnessDocument = datas;
    }else if(this.to?.isPriorInjuryStepper === true){
      this.model.document = datas;
    }else{
      // this.to?.onChange(datas);
      if(this.to.multiple){
        if(this.to.multiple===true)this.to?.onChange(datas);

      }else{
        this.to?.onChange(datas[0]);
      }
    } */
    this.formControl.markAsDirty();
    this.formControl.updateValueAndValidity();
    this.ref.markForCheck();
    this.ref.detectChanges();

    this.setFileUploadData();
  }

  // getFormData(base64 : string, fileName : string){

  //   // Form Data testing
  //   const file = this.DataURIToBlob(base64)
  //   const formData = new FormData();
  //   formData.append('upload', file, fileName)

  //   return formData;
  // }

  // DataURIToBlob(dataURI: string) {
  //   const splitDataURI = dataURI.split(',')
  //   const byteString = splitDataURI[0].indexOf('base64') >= 0 ? Buffer.from(splitDataURI[1],'base64').toString() : decodeURI(splitDataURI[1])
  //   const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  //   const ia = new Uint8Array(byteString.length)
  //   for (let i = 0; i < byteString.length; i++)
  //       ia[i] = byteString.charCodeAt(i)

  //   console.log(byteString)
  //   return new Blob([ia], { type: mimeString })
  // }

  setFileUploadValidation(files:any = [], focusEvent:any = ""){
    if(!this.fileUploadConfig.required || this.document$.value.length){
      this.formControl.clearValidators();
      this.formControl.updateValueAndValidity();
    }else{
      if(this.document$.value?.length===0){
        if(this.fileUploadConfig.formType == "edit"){
          const data = this.uploadedDocuments$.getValue();
            if(data && data.length){
              //this.formControl.patchValue(null);
              this.formControl.clearValidators();
              this.formControl.updateValueAndValidity();
            }
            else{
              this.formControl.patchValue(null);
              this.formControl.markAsDirty();
              this.formControl.markAsTouched();
              this.formControl.setValidators(Validators.required)
              this.formControl.updateValueAndValidity();
            }
        }
        else{
          this.formControl.patchValue(null);
          this.formControl.setValidators(Validators.required)
          this.formControl.updateValueAndValidity();
        }
      }
    }

    if(!(files && files.length)){
      this.formControl.setErrors(null);

        if((focusEvent) && (!(<HTMLInputElement>focusEvent.target)?.classList?.contains('ng-untouched'))){
          this.formControl.updateValueAndValidity();
        }
        else if(!focusEvent){
          this.formControl.updateValueAndValidity();
        }

        this.fileUploadConfig.isValidFile = true;
    }else{
      // validation start

      let invalidFiles = []


      // Adding support for custom extension validation
      // declare allowedExtensions in templateOptions in your formField, should be a string[] with following format :
      // example, { allowedExtensions : [ 'png', 'jpg', 'jpeg' ] }
      if(this.allowedExtensions && Array.isArray(this.allowedExtensions) && this.allowedExtensions.length > 0){
        if(!(typeof this.allowedExtensions[0] === 'string')) console.error('allowedExtensions in fileUpload of wrong type, allowed type is string');
        else{
          this.fileUploadConfig.isValidFile = true;
          this.formControl.setErrors({"extensionType":true});
          this.ref.markForCheck()
          this.ref.detectChanges()

          for(let index = 0; index < files.length; index++){
            if(!this.allowedExtensions.includes(files[index]?.extension?.split('/')?.[1])){
              this.fileUploadConfig.isValidFile = false;
              this.toast.error(`${files[index]?.name} is of invalid extension`)
              invalidFiles.push(files[index])
              // break;
            }
          }
        }

        // checks if previous validation returns invalid. if invalid, it wont execute below validation
        if(this.fileUploadConfig.isValidFile===false){
          this.ref.markForCheck()
          this.ref.detectChanges()
          // return;
        }else if(this.fileUploadConfig.isValidFile){
          this.formControl.setErrors(null);
          this.formControl.updateValueAndValidity();
          this.fileUploadConfig.isValidFile = true;
        }
      }

      // size validation start


      // Adding support for custom size validation
      // Declare sizeLimit in templateOptions in your formField.
      // sizeLimit is in bytes, be careful of that.


      if(this.sizeLimit && typeof this.sizeLimit === 'number' ){
        const customLimit = this.sizeLimit;

        this.fileUploadConfig.isValidFile = true;
        this.formControl.setErrors({"customFileSize":true});
        this.ref.markForCheck()
        this.ref.detectChanges()

        Array.prototype.forEach.call(files, (ele) => {
          if(ele.size > customLimit){
            this.fileUploadConfig.isValidFile = false;
            this.toast.error(`${ele.name} file is too big`)
            invalidFiles.push(ele)
          }
        });
      }else{

        // Normal size validation
        const maxFileSizeInMB = 200;
        const totalFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
        this.fileUploadConfig.isValidFile = true;
          this.formControl.setErrors({"maxFileSize":true});
          this.ref.markForCheck()
          this.ref.detectChanges()

          Array.prototype.forEach.call(files, (ele) => {
            if(ele.size > totalFileSizeInBytes){
              this.fileUploadConfig.isValidFile = false;
              this.toast.error(`${ele.name} file is too big`)
              invalidFiles.push(ele)
            }
          });
      }

      // remove invalid files
      let validFiles = files.filter((file) => !invalidFiles.includes(file))
      this.fChanged.emit(validFiles)
      this.document$.next([])
      this.imageFileInput.nativeElement.value = ''

      if(this.fileUploadConfig.isValidFile){
        this.formControl.setErrors(null);
        this.formControl.updateValueAndValidity();
        this.fileUploadConfig.isValidFile = true;
      }
      //sizeValidation end

    }
    this.ref.markForCheck()
    this.ref.detectChanges()
    // console.log(this.fileUploadConfig.isValidFile)
  }

  // fileDeleted(file, index) {
  //   /* const destroy$ = new Subject<boolean>();
  //   this.document$.pipe(
  //     map(ele=>ele.filter(ele=>(ele.name!=event.name) || (ele?.attachment!=ele?.attachment))),
  //     filter(array=>array && array.length>=0),
  //     takeUntil(destroy$)
  //   ).subscribe(val=>{this.document$.next(val); destroy$.next(true)}); */


  //   /* this.document$.pipe(take(1)).subscribe(datas=>{
  //     if(datas.length<1) this.formControl.setValue(null);
  //     if(this.to?.isWitnessStepper === true){
  //       this.model.witnessDocument = datas;
  //     }else if(this.to?.isPriorInjuryStepper === true){
  //       this.model.document = datas;
  //     }else{
  //       if(this.to.multiple){
  //         if(this.to.multiple===true)this.to?.onChange(datas);

  //       }else{
  //         this.to?.onChange(null);
  //       }
  //     }
  //   }); */
  //   if(file.id) {this.deleteUploaded(file, index, true); return;}
  //   const data = this.document$.getValue()
  //   data.splice(index,1);
  //   // console.log(typeof data )
  //   this.document$.next(data);
  //   this.formControl.markAsDirty()
  //   this.formControl.updateValueAndValidity()
  //   this.ref.markForCheck()
  //   this.ref.detectChanges()

  //   this.setFileUploadData();
  // }

  // deleteUploaded(file : Document,i, isUploadedInDocument?: boolean ){
  //   if(!confirm('File will be permanently deleted from the server. Do you wish to continue?')) return;
  //   const featureName = this.to?.featureName ?? ''
  //   this.store.userDeleteDocument({documentId : file.id, featureName : featureName}).pipe(
  //     tapResponse(
  //       (res) => {this.toast.success('File deleted successfully'); this.deleteFile(file.id, i,isUploadedInDocument ?? false)},
  //       (errors: any) =>
  //         {
  //           this.toast.error(errors.message || 'File could not be deleted')
  //         }
  //     ),
  //     take(1)
  //   ).subscribe();
  // }

  // deleteFile(id : string, index?:number, isUploadedInDocument? : boolean){
  //   const updata = this.uploadedDocuments$.getValue()
  //   const uploadedIndex = updata.findIndex(ele=>ele.id===id);
  //   if(uploadedIndex > -1){
  //     if(this.to.uploadedDeleted)  this.to?.uploadedDeleted(id);
  //     updata.splice(uploadedIndex, 1);
  //   }
  //   this.uploadedDocuments$.next(updata)
  //   this.to.documents$.next(this.uploadedDocuments$.getValue())
  //   if(isUploadedInDocument){
  //   const data = this.document$.getValue()
  //   data.splice(index,1);
  //   this.document$.next(data);
  //   }
  //   // this.document$.next(this.document$.getValue().filter(ele=>ele.id!=id));
  // }

  // openDocument(file : Document){
  //   this.filePreviewComponent?.document.next(file);
  //   this.to?.clickedLink(file);
  // }

  setFileUploadData(focusEvent:any = ""){
     this.setFileUploadValidation(this.document$.getValue(), focusEvent)
  }
}
