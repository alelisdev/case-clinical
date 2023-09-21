
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateDocumentTypeInput } from './dto/user-create-document-type.input'
import { UserListDocumentTypeInput } from './dto/user-list-document-type.input'
import { UserUpdateDocumentTypeInput } from './dto/user-update-document-type.input'
import { UserUpdateDocumentTypesInput } from './dto/user-update-document-types.input'



@Injectable()
export class ApiDocumentTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userDocumentTypes(userId: string, input?: UserListDocumentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.documentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectDocumentTypes(userId: string, input?: UserListDocumentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.documentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountDocumentTypes(userId: string, input?: UserListDocumentTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.documentType.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userDocumentType(userId: string, documentTypeId) {

    return this.data.documentType.findUnique({ where: { id: documentTypeId } , include: {assignedDocuments: {include: { document: true, template: true, documentType: true, user: true }}}  })
  }

  async checkDocumentTypeExist(documentTypeName: string) {
    try {
      return this.data.documentType.findMany({ where: { name: documentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateDocumentType(userId: string, input: UserCreateDocumentTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const documentTypeData = await this.checkDocumentTypeExist(input.name)

        if (documentTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'DocumentType', 'Create', input)

    let documentType = await this.data.documentType.create({
      data: { 
name: input.name, 

}
, include: {assignedDocuments: {include: { document: true, template: true, documentType: true, user: true }}} 
    })

    await this.data.logEvent(sendingUser, false, 'DocumentType', 'Create', documentType)

    return documentType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Document Type')
    }

  }


  
  

  async userUpdateDocumentType(userId: string, documentTypeId: string, input: UserUpdateDocumentTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!documentTypeId) {
        throw new BadRequestException('Document Type Id is required')
      } else {

      const documentTypeData = await this.checkDocumentTypeExist(input.name)

      if (documentTypeData.length > 0) {
        if (documentTypeData[0].id != documentTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'DocumentType', 'Update', input)

    let documentType = this.data.documentType.update({
      where: { id: documentTypeId },
      data: {
name: input.name, 

}
, include: {assignedDocuments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'DocumentType', 'Update', documentType)

    return documentType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Document Type')
    }
  }

  async userUpdateDocumentTypes(userId: string, input: UserUpdateDocumentTypesInput): Promise<UpdateResult> {
    const total = input.documentTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.documentTypes) {
      const inputData = input.documentTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const documentTypeData = await this.checkDocumentTypeExist(inputData.name)

      if (documentTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.documentType.upsert({
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
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteDocumentType(userId: string, documentTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!documentTypeId) {
        throw new BadRequestException('Document Type Id is required')
      } else {

        const assignedDocumentCount = await this.data.assignedDocument.count({ where: { documentTypeId: documentTypeId }})
        if(assignedDocumentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Assigned Document')
        }

        await this.data.logEvent(sendingUser, true, 'DocumentType', 'Delete', documentTypeId)

        let documentType = this.data.documentType.delete({
          where: { id: documentTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'DocumentType', 'Delete', documentType)

        return documentType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Document Type')
    }
  }
}

