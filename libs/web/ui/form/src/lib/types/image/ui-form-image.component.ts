import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UiFormBaseField } from '../base-field-type';

@Component({
  template: `
  <div [style]="Style" class="overflow-hidden">
    <img [src]="Url" [style]="ImageStyle" alt="">
  </div>
  `,
})
export class UiFormImageComponent extends UiFormBaseField implements OnInit, OnDestroy {
  formControl!: FormControl
  url = null

  documentId;
  subscriber;

  public get Url() : string {
    return (this.url === 'undefined' || this.url === 'null') ? (this.to.defaultUrl ?? 'assets/images/doctor.png') : this.url;
  }

  public get Style() : string {
    let style ="";
    if(this.to.width) {
      style = `width: ${this.to.width}px;`
    }
    if(this.to.height) {
      style += `height: ${this.to.height}px;`
    }
    return style;
  }

  public get ImageStyle() : string {
    return `height:100%;object-fit: ${this.to.objectFit ?? 'cover'}`
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.url = this.to.defaultUrl;

    if(this.to.useDocumentId === 1) {
      const documentIdKey = this.to.documentIdKey;
      this.subscriber = this.service.getDataStream().subscribe((data) => {
        const documentId = this.formService.getValueForKey(documentIdKey, data);
        if(this.documentId !== documentId) {
          if(documentId) {
            this.apiService.getDocument( documentId ).subscribe((document) => {
              if(document?.attachment) {
                const profileImage = document?.attachment
                let imageFlag = false
                imageFlag = !document?.attachment?.substring(0,15).includes('image');
                if(profileImage.length < 20) imageFlag = true

                if (imageFlag) {
                  this.url = this.to.defaultUrl;
                  this.documentId = null
                } else {
                  this.url = document.attachment;
                  this.documentId = documentId;
                }

              }
            })
          } else {
            this.url = this.to.defaultUrl;
            this.documentId = null;
          }
        }
      })
    } else {
      if(this.to.url) {
        this.subscriber = this.service.parseStatementStream(this.to.url).subscribe((url) => {
          if(url && this.url !== url)
            this.url = url;
            if(url.includes('avatar?d=mp')) this.url = this.to.defaultUrl;
        })
      }
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriber?.unsubscribe();
 }

}
