import { Injectable } from '@nestjs/common'
import {  HttpService } from '@nestjs/axios'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { UserCreateTemplateInput } from './dto/user-create-template.input'
import { UserListTemplateInput } from './dto/user-list-template.input'
import { UserUpdateTemplateInput } from './dto/user-update-template.input'
import { UserListAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access'
import { UserUpdateDto } from '@case-clinical/api/user/data-access'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { AzureStorageService, UploadedFileMetadata } from '@nestjs/azure-storage'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'

@Injectable()
export class ApiTemplateDataAccessUserService {
  constructor(
    private readonly data: ApiCoreDataAccessService,
    private readonly http: HttpService,
    private readonly azureStorage: AzureStorageService,
  ) {}

  async userTemplates(userId: string, input?: UserListTemplateInput) {
    return this.data.template.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { assignedDocuments: true },
    })
  }


  async userSelectTemplates(userId: string, input?: UserListTemplateInput) {
    return this.data.template.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      select: {id: true, name: true}
    })
  }

  async userCountTemplates(userId: string, input?: UserListTemplateInput): Promise<CorePaging> {
    const total = await this.data.template.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userTemplate(userId: string, templateId) {
    const theTemplate = await this.data.template.findUnique({
      where: { id: templateId },
      include: { assignedDocuments: true },
    })

    const metadata = JSON.parse((await theTemplate).attachment)

    console.log('looking up template:', metadata)
    try {
      const buffer = Buffer.alloc(Number.parseInt(metadata?.size))
      var connString = process.env.AZURE_STORAGE_CONNECTIONSTRING

      const blobServiceClient = BlobServiceClient.fromConnectionString(connString)
      const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
      const containerPath = containerName
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
  }

  async userCreateTemplate(userId: string, input: UserCreateTemplateInput) {
    var connString = process.env.AZURE_STORAGE_CONNECTIONSTRING
    const blobServiceClient = BlobServiceClient.fromConnectionString(connString)
    const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
    const containerPath = containerName
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName)

    var theSavedTemplate = await this.data.template.create({
      data: {
        assignedDocuments: {
          createMany: {
            data: {
              ...input.assignedDocuments,
            },
          },
        },
        name: input.name,
        encoding: input.encoding,
        signatureFileType: input.signatureFileType,
        code: input.code
      },
      include: { assignedDocuments: true },
    })

    try {
      var mimetype = 'application/txt'
      var encoding = 'UTF-8'

      const file: UploadedFileMetadata = {
        fieldname: theSavedTemplate.id,
        originalname: input.name,
        encoding,
        mimetype,
        buffer: Buffer.from(input.attachment),
        size: input.attachment.length.toString(),
      }

      const blockBlobClient = containerClient.getBlockBlobClient(theSavedTemplate.id)
      const storageUrlResponse = await blockBlobClient.upload(file.buffer, input.attachment.length)

      console.log('Blob was uploaded successfully. requestId: ', storageUrlResponse)
      //const storageUrl = await this.azureStorage.upload(file)

      file.buffer = null
      theSavedTemplate.attachment = JSON.stringify(file)

      await this.data.template.update({
        where: { id: theSavedTemplate.id },
        data: {
          attachment: theSavedTemplate.attachment,
        },
      })
    } catch (error) {
      console.log('something happened:', error)
    }

    return theSavedTemplate
  }

  async userTemplateAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput) {
    return this.data.assignedDocument.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { templateId: input.templateId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountTemplateAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput): Promise<CorePaging> {
    const total = await this.data.assignedDocument.count({ where: { templateId: input.templateId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUpdateTemplate(userId: string, templateId: string, input: UserUpdateTemplateInput) {
    var connString = process.env.AZURE_STORAGE_CONNECTIONSTRING
    const blobServiceClient = BlobServiceClient.fromConnectionString(connString)
    const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
    const containerPath = containerName

    console.log('\nCreating container...')
    console.log('\t', containerName)

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName)

    try {
      var mimetype = 'application/txt'
      var encoding = 'UTF-8'

      const file: UploadedFileMetadata = {
        fieldname: input.id,
        originalname: input.name,
        encoding,
        mimetype,
        buffer: Buffer.from(input.attachment),
        size: input.attachment.length.toString(),
      }

      const blockBlobClient = containerClient.getBlockBlobClient(input.id)
      const storageUrlResponse = await blockBlobClient.upload(file.buffer, input.attachment.length)

      console.log('Blob was uploaded successfully. requestId: ', storageUrlResponse)
      //const storageUrl = await this.azureStorage.upload(file)

      file.buffer = null
      input.attachment = JSON.stringify(file)

      await this.data.template.update({
        where: { id: input.id },
        data: {
          attachment: input.attachment,
          code: input.code
        },
      })
    } catch (error) {
      console.log('something happened:', error)
    }

    return input
  }

  async userDeleteTemplate(userId: string, templateId: string) {
    return this.data.template.delete({ where: { id: templateId } })
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
      .post(process.env.DOCUMENT_SERVER_URL + '/MergeStringDocument', data, {
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

  async getPdfDocument(userId, attachment, templateName) {
    const user = await this.findUserById(userId)

    let mergeDocument = {
      document: attachment,
    }

    this.http.post('https://documentserver.caseclinical.com:443/MemberOnboarding/DownloadPdf', mergeDocument).subscribe((res: any) => {
      let pdf = res.document
      let doc: UserCreateDocumentInput = {
        name: user.name + ' ' + templateName,
        attachment: pdf,
        extension: 'application/pdf',
        folderId: '',
        createdBy: userId,
        size: pdf.length,
        type: 'pdf',
        contents: '',
        description: ''
      }

      let userDto: UserUpdateDto = {
        id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        document: doc,
      }

      return this.userUpdateUser(userDto)
    })
  }

  findUserById(userId) {
    return this.data.findUserById(userId)
  }

  userUpdateUser(user: UserUpdateDto) {
    this.data.user.update({
      where: { id: user.id },
      data: {
        assignedDocuments: {
          create: user.document,
        },
      },
    })
  }
}
