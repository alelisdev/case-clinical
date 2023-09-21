import { Component, Input, OnInit } from '@angular/core'
import { FieldType, FormlyFormOptions } from '@ngx-formly/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FileSystemEntry, FileSystemFileEntry, FileSystemDirectoryEntry, NgxFileDropEntry } from 'ngx-file-drop'
import {
  CreateAttachmentsGQL,
  AttachmentInputType,
  GetAttachmentsGQL,
  UpdateAttachmentsGQL,
} from 'apps/pch/src/generated/graphql'
import { filter, map } from 'rxjs/operators'
import { API_BASE_URL } from '../../../shared/service-proxies/service-proxies'
import {
  BlobSharedViewStateService,
  BlobDeletesViewStateService,
  BlobDownloadsViewStateService,
} from '@schema-driven/azure-storage'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { Url } from 'url'

@Component({
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent extends FieldType implements OnInit {
  @Input('fileKind') fileKind = ''
  @Input('fileTypeEntityId') fileTypeEntityId = ''

  items$ = this.blobState.itemsInContainer$
  public items: any

  public files: NgxFileDropEntry[] = []
  public hasFile: boolean = false
  public fileLink: string = ''
  public link: any

  public selectedItem: any

  viewer = 'google'
  url =
    'https://pchdev.blob.core.windows.net/pch-files/3/LetterOfDesignation/b46f310b-e2a4-74a4-36a5-39f97b05778c.temp?sp=rl&st=2020-12-16T00:22:08Z&se=2020-12-17T00:22:08Z&sv=2019-12-12&sr=b&sig=OmRRXOEOC78NZRlwuYkmGZ5OaDp1V6ZkLz3Y7I%2B%2FmYc%3D'

  selectedAttachment: AttachmentInputType

  constructor(
    private http: HttpClient,
    private createAttachment: CreateAttachmentsGQL,
    private updateAttachment: UpdateAttachmentsGQL,
    private blobState: BlobSharedViewStateService,
    private blobDeletes: BlobDeletesViewStateService,
    private blobDownloads: BlobDownloadsViewStateService,
    private getAttachment: GetAttachmentsGQL,
    private sanitizer: DomSanitizer,
  ) {
    super()
  }

  onDownloadClick(filename: string): void {
    if (this.selectedAttachment && this.selectedAttachment.fileKind && this.selectedAttachment.uniqueId) {
      console.log(this.selectedAttachment)

      let fileList = this.blobState.getContainerItems('pch-files')
      console.log(fileList)
      //filename = this.formControl.value;
      console.log(filename)
      //this.fileLink = filename;
      filename = '3/' + this.selectedAttachment.fileKind + '/' + this.selectedAttachment.uniqueId + '.temp'

      this.blobDownloads.downloadFile(filename).subscribe((r) => {
        console.log(r)
        if (r.url) {
          this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
            (r.url as any).changingThisBreaksApplicationSecurity,
          )

          console.log(this.link)

          //this.getTheLink();
        }
      })
    } else {
      console.log('not enough information to enable download')
    }
  }

  getTheLink() {
    this.url = this.link
    return this.link
  }

  onDeleteClick(filename: string): void {
    this.blobDeletes.deleteItem(filename)
  }

  ngOnInit() {
    if (this.formControl.value) {
      this.hasFile = true
      this.getAttachment.fetch({ id: this.formControl.value }).subscribe((r) => {
        if (r.data.attachments[0]) {
          this.fileLink = r.data.attachments[0].name
          this.selectedAttachment = r.data.attachments[0]
        }
      })
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
        fileEntry.file((file: File) => {
          let attachments: AttachmentInputType = {
            fileKind: this.fileKind,
            name: file.name,
            extension: file.type,
            filePath: droppedFile.relativePath,
          }

          this.createAttachment.mutate({ attachments }).subscribe((attach) => {
            let attachmentId = attach.data.createAttachments.id

            if (!this.fileKind) {
              this.fileKind = this.field.templateOptions.folderPath
            }

            let keys = {
              'File-Attachment': `{"UniqueId": "${attachmentId}","SequentialId": null,"FileName": "${file.name}", "FileExtension": "${file.type}", "FileKind": "${this.fileKind}"}`,
            }
            let headers = new HttpHeaders(keys)
            const formData = new FormData()

            const filename = droppedFile.relativePath + '/' + droppedFile.fileEntry.name

            let reader = new FileReader()
            formData.append('', file)

            this.http
              .post('https://zeropchgraph.azurewebsites.net/uploadNew', formData, {
                headers: headers,
                responseType: 'json',
              })
              .subscribe((data: any) => {
                this.formControl.setValue(data.result.sequentialId)
                this.hasFile = true
                attachments.uniqueId = data.result.sequentialId
                attachments.storageUrl = '3/' + this.fileKind + '/' + data.result.sequentialId + '.temp'
                attachments.fileKind = this.fileKind
                attachments.id = attachmentId
                this.selectedAttachment = attachments

                this.updateAttachment.mutate({ attachments }).subscribe()

                this.selectedItem = this.items$.pipe(
                  filter((files: any) => files.name.contains(data.result.sequentialId)),
                )

                this.fileLink = data.result.sequentialId
              })
          })
        })
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry
        console.log(droppedFile.relativePath, fileEntry)
      }
    }
  }

  public fileOver(event) {
    console.log(event)
  }

  public fileLeave(event) {
    console.log(event)
  }
}
