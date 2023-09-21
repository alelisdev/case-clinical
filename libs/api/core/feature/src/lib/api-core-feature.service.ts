import { Injectable, NotFoundException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ApiCoreDataAccessService, UserUpdateDto } from '@case-clinical/api/core/data-access'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import { LegalCase } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiCoreFeatureService {
  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly http: HttpService
  ) {}

  uptime(): number {
    return process.uptime()
  }
  
  async userCreateSignDocument(user, attachment) {
    let userD = {
      firstName: user.firstName,
      lastName: user.lastName,
    }

    let mergeDocument = {
      data: userD,
      template: attachment,
    }

    let data = JSON.stringify(mergeDocument)

    return await this.http
      .post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      })
      .subscribe((data: any) => {
        console.log(data)
        return data.document
      })
  }

  async userCreatePatientSignDocument(patient, attachment) {
      let mergeDocument = {
        data: patient,
        template: attachment,
      }
  
      let data = JSON.stringify(mergeDocument)
  
      return await this.http
        .post('https://documentserver.caseclinical.com:443/MemberOnboarding/MergeRawStringDocument', data, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        })
        .subscribe((data: any) => {
          console.log(data)
          return data.document
        })
    }

  async getPdfDocument(user, attachment, templateName): Promise<any> {
    let mergeDocument = {
      document: attachment,
    }

    let result = await this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument).subscribe((res: any) => {
      let pdf = res.document
      let doc: UserCreateDocumentInput = {
        name: user.name + ' ' + templateName,
        attachment: pdf,
        extension: 'application/pdf',
      }

      return doc
    })

    console.log(result)
    return result
  }

  async getPatientMRN(user, dateOfBirth, dateOfLoss, accidentKind, legalCaseId): Promise<any> {
    let patientMRN = await this.data.getPatientMRN(user, dateOfBirth, dateOfLoss, accidentKind, legalCaseId)
    return patientMRN
  }


  async userPublicTemplate(templateId) {
    
    console.log('the template ',templateId)
    var theTemplate = await this.data.template.findUnique({
      where: { id: templateId },
      include: { assignedDocuments: true },
    })
    if (!theTemplate) {
      theTemplate = await this.data.template.findUnique({
        where: { name: templateId },
        include: { assignedDocuments: true },
      })
    }

    console.log('found template ', theTemplate)

    if(theTemplate) {
      const metadata = JSON.parse((await theTemplate)?.attachment)

      console.log('looking up template:', metadata)
      const buffer = Buffer.alloc(Number.parseInt(metadata?.size))
      try {
        var connString = process.env.AZURE_STORAGE_CONNECTIONSTRING
        var blobServiceClient = BlobServiceClient.fromConnectionString(connString)
  
        // Create a unique name for the container
        const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName)
        const blockBlobClient = containerClient.getBlockBlobClient(theTemplate?.id)
        await blockBlobClient.downloadToBuffer(buffer, 0, undefined, {
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => console.log(ev),
        })
        theTemplate.attachment = buffer.toString('utf8')
      } catch (err) {
        console.log(
          err,
          // `downloadToBuffer failed, requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
        )
      }
  
      console.log(theTemplate)
      return theTemplate
    } else {
      throw new NotFoundException('Template Not Found: ' + templateId)
    }
    
  }
}
