import { BlobServiceClient } from '@azure/storage-blob'
import { UserListAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access'
import {
  FileManagerDocument,
  UserCreateDocumentInput,
  UserListDocumentInput,
  UserUpdateDocumentInput,
  UserUpdateDocumentsInput
} from '@case-clinical/api/document/data-access'
import { UploadedFileMetadata } from '@nestjs/azure-storage'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ApiCoreDataAccessService } from './api-core-data-access.service'
import { CorePaging } from './models/core-paging.model'
import { UpdateResult } from './models/update-result.model'
import { Inngest } from 'inngest'
import { User } from '@case-clinical/api/user/data-access'
import { DateFilterInput } from './dto/date-filter.input'
import * as moment from 'moment'
import { Prisma } from '@prisma/client'
import { UserCreateRecommendedOrderDiagnosisCodeInput } from '@case-clinical/api/recommended-order-diagnosis-code/data-access'

export interface IFileApiItem {
  id: string // 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
  folderId: null | string //,
  name: string //'Personal',
  createdBy: string // 'Brian Hughes',
  createdAt: string // 'April 24, 2018',
  modifiedAt: string //'April 24, 2018',
  size: string //'87 MB',
  type: string // 'folder',
  contents: string //'57 files',
  description: string //'Personal documents such as insurance policies, tax papers and etc.',
}

@Injectable()
export class ApiCoreSharedService extends ApiCoreDataAccessService implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super()
  }

  parseDateFilter(filter: DateFilterInput) {
    if (!filter) return null

    let dateFilter

    let startDate = moment(filter.startDate == undefined?new Date('1970-01-01T00:00:00Z'):filter.startDate).format('YYYY-MM-DD')
  
    let endDate = filter.endDate ? moment(filter.endDate).format('YYYY-MM-DD') : undefined

    try {
      if (filter) {
        switch (filter.operator) {
          case '=': {
            const _startDate = new Date(startDate + 'T00:00:00Z')
            const _endDate = new Date(startDate + 'T23:59:59Z')
            dateFilter = {
              gte: _startDate,
              lt: _endDate,
            }
            break
          }
          case '>': {
            const baseDate = new Date(startDate + 'T23:59:59Z')
            dateFilter = {
              gt: baseDate,
            }
            break
          }
          case '<': {
            const baseDate = new Date(startDate + 'T00:00:00Z')
            dateFilter = {
              lt: baseDate,
            }
            break
          }
          case '<=': {
            const baseDate = new Date(startDate + 'T23:59:59Z')
            dateFilter = {
              lte: baseDate,
            }
            break
          }
          case '>=': {
            const baseDate = new Date(startDate + 'T00:00:00Z')
            dateFilter = {
              gte: baseDate,
            }
            break
          }
          case 'In': {
            const _startDate = startDate  ? new Date(startDate + 'T00:00:00Z'):new Date('1970-01-01T00:00:00Z')
            const _endDate = endDate ? new Date(endDate + 'T23:59:59Z') : undefined

            dateFilter = {
              gte: _startDate,
              lte: _endDate,
            }
            break
          }
          default:
            break
        }
      } else {
        // console.error(`date filter string is incorrect: ${filterStatement}`)
      }
    } catch (e) {
      // console.error(`date filter should be like (=|>|<|<=|<= yyyy-mm-dd), example: = 2022-12-13, > 2012-05-12`)
    }
    return dateFilter
  }
  async getRatingReview(userId: string, clinicalProviderId) {
    const total = await this.review.aggregate(
      {
        _avg: {
          rating: true
        },
        _count: {
          id: true,
        },
        where: {
          AND: [{
            clinicalProviderId: clinicalProviderId,
          }]
        },

      }
    )

    return total
  }

  async userDocuments(userId: string, input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.document.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            contractId: input.contractId,
            patientId: input.patientId,
            providerId: input.providerId,
            patientStudyId: input.patientStudyId,
            procedureVendorId: input.procedureVendorId,
            medicalConditionProviderId: input.medicalConditionProviderId,
            locationId: input.locationId,
            propertyDamageId:input.propertyDamageId
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true, location: true },
    })
  }

  async userCountDocuments(userId: string, input?: UserListDocumentInput): Promise<CorePaging> {
    const total = await this.document.count({
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

  async userDocument(userId: string, documentId) {
    const theDocument = await this.document.findUnique({
      where: { id: documentId },
      include: { assignedDocuments: true, user: true },
    })

    if (!theDocument) return null

    const metadata = JSON.parse((await theDocument).attachment)

    if (metadata && metadata.size) {
      const buffer = Buffer.alloc(Number.parseInt(metadata.size))

      try {
        const azureConnection = process.env.AZURE_STORAGE_CONNECTIONSTRING || ''
        const blobServiceClient = BlobServiceClient.fromConnectionString(azureConnection)
        const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
        const containerPath = containerName

        const containerClient = blobServiceClient.getContainerClient(containerPath)

        const blockBlobClient = containerClient.getBlockBlobClient(theDocument?.id)

        await blockBlobClient.downloadToBuffer(buffer, 0, undefined, {
          blockSize: 4 * 1024 * 1024, // 4MB block size
          concurrency: 20, // 20 concurrency
          onProgress: (ev) => console.log(ev),
        })
        theDocument.attachment = buffer.toString('utf8')
      } catch (err) {
        console.log(err)
      }
    } else {
      if (metadata?.length) {
        theDocument.attachment = metadata
      }
    }

    console.log('doc after load', theDocument)
    return theDocument
  }

  async checkDocumentExist(documentName: string) {
    try {
      return this.document.findMany({ where: { name: documentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateDocument(userId: string, input: UserCreateDocumentInput) {
    let sendingUser = await this.user.findFirst({ where: { id: userId } })

    try {
      // const documentData = await this.checkDocumentExist(input.name)

      // if (documentData.length > 0) {
      //   //throw new ConflictException('You are going to upload document with duplicate name')
      // }

      // await this.logEvent(sendingUser, true, 'Document', 'Create', input)

      console.log('starting to create document')
      let theDocument = await this.document.create({
        data: {
          contract:
            input.contractId != null
              ? {
                connect: {
                  id: input.contractId,
                },
              }
              : undefined,
          patient:
            input.patientId != null
              ? {
                connect: {
                  id: input.patientId,
                },
              }
              : undefined,
          miscellaneous:
              input.miscellaneousId != null
                ? {
                  connect: {
                    id: input.miscellaneousId,
                  },
                }
                : undefined,
          procedureVendor:
            input.procedureVendorId != null
              ? {
                connect: {
                  id: input.procedureVendorId,
                },
              }
              : undefined,
          medicalConditionProvider:
            input.medicalConditionProviderId != null
              ? {
                connect: {
                  id: input.medicalConditionProviderId,
                },
              }
              : undefined,
          location:
            input.locationId != null
              ? {
                connect: {
                  id: input.locationId,
                },
              }
              : undefined,
          propertyDamage:
              input.propertyDamageId != null
                ? {
                  connect: {
                    id: input.propertyDamageId,
                  },
                }
                : undefined,
          name: input.name,
          // attachment: input.attachment,
          encoding: input.encoding,
          extension: input.extension,
        },
        include: {
          contract: true,
          patient: true,
          procedureVendor: true,
          medicalConditionProvider: true,
          assignedDocuments: true,
          eulas: true,
          prescriptions: true,
          bills: true,
          medicalReports: true,
          location: true,
          propertyDamage:true
        },
      })

      console.log('created document', theDocument)
      //await this.logEvent(sendingUser, false, 'Document', 'Create', {...input, attachment: ''})

      const azureConnection = process.env.AZURE_STORAGE_CONNECTIONSTRING || ''
      const blobServiceClient = BlobServiceClient.fromConnectionString(azureConnection)
      const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
      const containerPath = containerName

      const containerClient = blobServiceClient.getContainerClient(containerPath)
      const file: UploadedFileMetadata = {
        fieldname: theDocument?.id,
        originalname: theDocument.name,
        encoding: theDocument.encoding,
        mimetype: theDocument.extension,
        buffer: Buffer.from(input.attachment),
        size: input.attachment.length.toString(),
      }

      containerClient.createIfNotExists()

      const blockBlobClient = containerClient.getBlockBlobClient(theDocument?.id)
      const storageUrlResponse = await blockBlobClient.upload(file.buffer, input.attachment.length)

      const permissions = containerClient.getProperties()
      const otherProperties = containerClient.containerName

      file.buffer = null
      input.attachment = JSON.stringify(file)
      theDocument.attachment = JSON.stringify(file)

      console.log('hit the container')

      await this.document.update({
        where: { id: theDocument.id },
        data: {
          attachment: input.attachment,
        },
      })
      console.log('hit the update')
      return theDocument

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Document', error)
    }

  }

  async userDocumentAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput) {
    return this.assignedDocument.findMany({
      where: {
        AND: [
          {
            name: {
              contains: input?.name,
            },
          },
          { documentId: input.documentId },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountDocumentAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput): Promise<CorePaging> {
    const total = await this.assignedDocument.count({ where: { documentId: input.documentId } })
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userUpdateDocument(userId: string, documentId: string, input: UserUpdateDocumentInput) {
    return this.document.update({
      where: { id: documentId },
      data: {
        name: input.name,
        attachment: input.attachment,
        encoding: input.encoding,
        extension: input.extension,
        userId: input.userId,
        parentId: input.parentId,
        locationId:input.locationId,
        propertyDamageId:input.propertyDamageId
      },
      include: { assignedDocuments: true, user: true },
    })
  }

  async userDeleteDocument(userId: string, documentId: string, featureName: string) {
    console.log({ featureName })
    // Remove Constraints
    switch(featureName) {
      case 'appointment_bill':
        {
          const appointment = await this.appointment.findFirst({ where: { billId: documentId } });
          if(appointment) {
            await this.appointment.update({ where: { id: appointment.id }, data: { bill: { disconnect: true } } })
          }
          break;
        }
      case 'appointment_medicalReport':
        {
          const appointment = await this.appointment.findFirst({ where: { medicalReportId: documentId } });
          if(appointment) {
            await this.appointment.update({ where: { id: appointment.id }, data: { medicalReport: { disconnect: true } } })
          }
          break;
        }
      case 'appointment_imaging':
        {
          const appointment = await this.appointment.findFirst({ where: { imagingId: documentId } });
          if(appointment) {
            await this.appointment.update({ where: { id: appointment.id }, data: { imaging: { disconnect: true } } })
          }
          break;
        }
      case 'appointment_miscellaneous':
        {
          const appointment = await this.appointment.findFirst({ where: { miscellaneousId: documentId } });
          if(appointment) {
            await this.appointment.update({ where: { id: appointment.id }, data: { miscellaneous: { disconnect: true } } })
          }
          break;
        }
      default:
        break;
    }
    return this.document.delete({ where: { id: documentId } })
  }

  async userListFolders(userId: string, folderId: string): Promise<FileManagerDocument[]> {
    const azureConnection = process.env.AZURE_STORAGE_CONNECTIONSTRING || ''
    const blobServiceClient = BlobServiceClient.fromConnectionString(azureConnection)
    const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
    var containerPath = containerName

    var items: IFileApiItem[] = []

    if (folderId && folderId != '') {
      containerPath = containerName + '\\' + folderId
      const containerClient = blobServiceClient.getContainerClient(containerPath)

      for await (const item of containerClient.listBlobsByHierarchy('/')) {
        var fileItem: IFileApiItem = {
          id: 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
          folderId: null,
          name: 'Personal',
          createdBy: 'Brian Hughes',
          createdAt: 'April 24, 2018',
          modifiedAt: 'April 24, 2018',
          size: '87 MB',
          type: 'folder',
          contents: '57 files',
          description: 'Personal documents such as insurance policies, tax papers and etc.',
        }

        //Need to store enough information about the file in the database to complete the property list

        if (item.kind === 'prefix') {
          //TODO: This might be a folder
          fileItem.folderId = item.name
          fileItem.id = item.name
        } else {
          fileItem.id = item.name

          console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`)
        }

        items.push(fileItem)
      }
    } else {
      //return the root list
      for await (const response of blobServiceClient.listContainers().byPage({
        maxPageSize: 20,
      })) {
        var fileItem: IFileApiItem = {
          id: 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
          folderId: null,
          name: 'Personal',
          createdBy: 'Brian Hughes',
          createdAt: 'April 24, 2018',
          modifiedAt: 'April 24, 2018',
          size: '87 MB',
          type: 'file',
          contents: null,
          description: null,
        }

        var databaseDocs = await this.document.findMany()

        console.log('- Page:')
        if (response.containerItems) {
          for (const container of response.containerItems) {
            if (container.name == 'base-project-files') {
              items.push({
                name: 'base-project-files',
                id: 'root',
                createdAt: '',
                createdBy: '',
                modifiedAt: '',
                description: 'The Root Folder',
                size: '100',
                folderId: 'root',
                type: 'folder',
                contents: '',
              })
            } else {
              let theDoc = await databaseDocs.find((file) => file.id === container.name)

              console.log(theDoc)
              console.log(container)

              fileItem.name = container.metadata?.originalname
              fileItem.id = container.metadata?.fieldname
              fileItem.type = 'folder'
              fileItem.size = this.GetSizeString(container.metadata?.size)
              fileItem.createdAt = theDoc?.createdAt?.toDateString()
              fileItem.modifiedAt = theDoc?.updatedAt?.toDateString()
              fileItem.createdBy = theDoc?.userId

              console.log(`  - ${container.name}`)

              items.push(fileItem)
            }
          }
        }
      }
    }

    return items
  }

  public GetSizeString(fileSize: string) {
    var postFix = 'MB'
    var lengthCheck = fileSize?.length
    var i = 0

    do {
      i += 1
      lengthCheck = lengthCheck / 1024
    } while (lengthCheck > 4)

    switch (i) {
      case 0:
        postFix = 'KB'
        break

      case 1:
        postFix = 'MB'
        break

      case 2:
        postFix = 'GB'
        break

      default:
        postFix = 'MB'
        break
    }

    return lengthCheck.toString() + ' ' + postFix
  }

  public async logEvent(user, isRequest, entityName, action, input) {
    try {
      const loggedIdResult = await this.userLogEvent(
        user,
        'User' + (isRequest ? '.Requested' : '') + '.' + action + '.' + entityName,
        input,
      )
    } catch (error) {
      console.log('in the catch', error)
      const forwardError = await this.userLogEvent(
        user,
        'FAILURE.LOG.EVENT.User' + (isRequest ? '.Requested' : '') + '.' + action + '.' + entityName,
        '',
      )
    }
  }

  private allowLoging() {
    let disableLogging: any = process.env.NO_LOGGING
    if (disableLogging !== undefined) disableLogging = disableLogging.trim() === 'true'
    else disableLogging = false
    return !disableLogging
  }

  public async userLogEvent(user: User, eventName: any, payload: any): Promise<boolean> {
    if (!this.allowLoging()) return

    const inngest = new Inngest({ name: 'case-clinical-2', eventKey: process.env.INNGEST_SOURCE_API_KEY })

    const batch = {
      name: eventName,
      data: payload,
      user: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          cellPhone: user.cellPhone,
          //tenantId: user.organizationId
        },
        v: process.env.SCHEMA_VERSION,
      },
    }

    console.log('thing to send', batch)

    try {
      await inngest.send(batch)
    } catch (error) {
      console.log(error)
    }

    return true
  }
  public async loginLogEvent(email: string, eventName: any, payload: any, ip: any): Promise<boolean> {
    if (!this.allowLoging()) return
    const inngest = new Inngest({ name: 'case-clinical-2', eventKey: process.env.INNGEST_SOURCE_API_KEY })

    const batch = {
      name: eventName,
      data: payload,
      user: {
        email: email,
        ip: ip,
      },
      v: process.env.SCHEMA_VERSION,
    }

    await inngest.send(batch)

    return true
  }

  async adminUpdateRoleNavigations(roleId: string, featureIds: string[]) {
    if (roleId === null) return false
    const role = await this.role.findFirst({
      where: {
        id: roleId,
      },
    })
    const roleName = role.name
    await this.roleNavigation.deleteMany({
      where: {
        roleId: roleId,
      },
    })

    {
      // Fetch navigation groups
      const navigationGroups = await this.featureNavigation.findMany({
        where: {
          parent: null,
        },
        select: {
          id: true,
          title: true,
          type: true,
          icon: true,
          link: true,
        },
      })

      // Merge navigation groups with the current role
      await this.roleNavigation.createMany({
        data: navigationGroups.map((ng) => ({
          ...ng,
          id: `${roleId}_${ng.id}`,
          roleId,
          name: `${roleName}.${ng.title}`,
        })),
      })

      // Fetch navigation items
      const navigaionItems = await this.featureNavigation.findMany({
        where: {
          featureId: {
            in: featureIds,
          },
        },
        select: {
          id: true,
          title: true,
          type: true,
          icon: true,
          link: true,
          parentId: true,
          featureId: true,
        },
      })
      // Merge navigation items with the current role
      await this.roleNavigation.createMany({
        data: navigaionItems.map((ni) => ({
          ...ni,
          parentId: `${roleId}_${ni.parentId}`,
          id: `${roleId}_${ni.id}`,
          roleId,
          name: `${roleName}.${ni.title}`,
        })),
      })

      // Update user navigations that belongs to this role
      const role = await this.role.findFirst({
        where: {
          id: roleId,
        },
        include: {
          userRoles: true,
        },
      })
      const userIds = role.userRoles.map((userRole) => userRole.userId)
      userIds.map(async (userId) => {
        const user = await this.user.findFirst({
          where: {
            id: userId,
          },
          select: {
            userRoles: true,
          },
        })
        console.log(user)
        const roleIds = user.userRoles.map((userRole) => userRole.roleId)
        await this.adminUpdateUserNavigations(userId, roleIds)
      })
    }

    return true
  }

  async adminUpdateUserNavigations(userId: string, roleIds: string[]) {
    // Delete all previous navigation items
    await this.navigation.deleteMany({
      where: {
        userId: userId,
        parentId: {
          not: null,
        },
      },
    })
    await this.navigation.deleteMany({
      where: {
        userId: userId,
        parentId: null,
      },
    })

    const navigationItems = await this.roleNavigation.findMany({
      // distinct: ['roleId', 'featureId'],
      where: {
        roleId: {
          in: roleIds,
        },
        parent: null,
      },
      include: {
        children: true,
      },
    })

    if (navigationItems.length === 0) return false
    console.log('navigatinItems = ', navigationItems)
    navigationItems.map(async (navigationGroup) => {
      const parentGroup = await this.navigation.create({
        data: {
          userId,
          name: `${userId}.${navigationGroup.title}`,
          title: navigationGroup.title,
          icon: navigationGroup.icon,
          type: navigationGroup.type,
          featureId: navigationGroup.featureId,
        },
      })
      if (navigationGroup.children.length > 0) {
        await this.navigation.createMany({
          data: navigationGroup.children.map((ni) => ({
            title: ni.title,
            icon: ni.icon,
            type: ni.type,
            userId,
            name: `${userId}.${ni.title}`,
            parentId: parentGroup.id,
            featureId: ni.featureId,
            link: ni.link,
          })),
        })
      }
    })
    return true
  }

  async userUpdateDocuments(userId: string, input: UserUpdateDocumentsInput): Promise<UpdateResult> {
    const total = input.documents.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.documents) {
      const inputData = input.documents[key]

      const data = {
        id: inputData.id,
name: inputData.name,
attachment: inputData.attachment,
encoding: inputData.encoding,
extension: inputData.extension,
contractId: inputData.contractId,
patientId: inputData.patientId,
providerId: inputData.providerId,
patientStudyId: inputData.patientStudyId,
procedureVendorId: inputData.procedureVendorId,
medicalConditionProviderId: inputData.medicalConditionProviderId,

      }

      // const documentData = await this.checkDocumentExist(inputData.name)

        try {
          const result = await this.document.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }

  async userSelectDocuments(userId: string, input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.document.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async checkRecommendedOrderDiagnosisCodeExist(recommendedOrderDiagnosisCodeName: string) {
    try {
      return this.recommendedOrderDiagnosisCode.findMany({ where: { name: recommendedOrderDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRecommendOrderDiagnosisCode(userId: string, input?: UserCreateRecommendedOrderDiagnosisCodeInput){
    let sendingUser = (await this.user.findFirst({where: { id: userId }}))

    const recommendedOrderDiagnosisCodeData = await this.checkRecommendedOrderDiagnosisCodeExist(input.name)

        if (recommendedOrderDiagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.logEvent(sendingUser, true, 'RecommendedOrderDiagnosisCode', 'Create', input)

    let recommendedOrderDiagnosisCode = await this.recommendedOrderDiagnosisCode.create({
      data: { 
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                recommendedOrder: 
                input.recommendedOrderId != null
                ? {
                        connect:  { 
                            id: input.recommendedOrderId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, recommendedOrder: true} 
    })

    await this.logEvent(sendingUser, false, 'RecommendedOrderDiagnosisCode', 'Create', recommendedOrderDiagnosisCode)

    return recommendedOrderDiagnosisCode
  }
    
}
