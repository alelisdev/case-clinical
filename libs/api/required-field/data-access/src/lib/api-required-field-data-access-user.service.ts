
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRequiredFieldInput } from './dto/user-create-required-field.input'
import { UserListRequiredFieldInput } from './dto/user-list-required-field.input'
import { UserUpdateRequiredFieldInput } from './dto/user-update-required-field.input'
import { UserUpdateRequiredFieldsInput } from './dto/user-update-required-fields.input'

import { UserListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { UserListMedLevelInput } from '@case-clinical/api/med-level/data-access'

@Injectable()
export class ApiRequiredFieldDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRequiredFields(userId: string, input?: UserListRequiredFieldInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requiredField.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input?.accidentTypeId,
medLevelId: input?.medLevelId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, medLevel: true}
    })
  }

  async userSelectRequiredFields(userId: string, input?: UserListRequiredFieldInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requiredField.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input?.accidentTypeId,
medLevelId: input?.medLevelId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountRequiredFields(userId: string, input?: UserListRequiredFieldInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.requiredField.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input?.accidentTypeId,
medLevelId: input?.medLevelId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userRequiredField(userId: string, requiredFieldId) {

    return this.data.requiredField.findUnique({ where: { id: requiredFieldId } , include: {accidentType: true, medLevel: true}  })
  }

  async checkRequiredFieldExist(requiredFieldName: string) {
    try {
      return this.data.requiredField.findMany({ where: { name: requiredFieldName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRequiredField(userId: string, input: UserCreateRequiredFieldInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const requiredFieldData = await this.checkRequiredFieldExist(input.name)

        if (requiredFieldData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RequiredField', 'Create', input)

    let requiredField = await this.data.requiredField.create({
      data: { 
  
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,name: input.name, 
entityName: input.entityName, 

}
, include: {accidentType: true, medLevel: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RequiredField', 'Create', requiredField)

    return requiredField

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Required Field')
    }

  }


  
  

  async userUpdateRequiredField(userId: string, requiredFieldId: string, input: UserUpdateRequiredFieldInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!requiredFieldId) {
        throw new BadRequestException('Required Field Id is required')
      } else {

      const requiredFieldData = await this.checkRequiredFieldExist(input.name)

      if (requiredFieldData.length > 0) {
        if (requiredFieldData[0].id != requiredFieldId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RequiredField', 'Update', input)

    let requiredField = this.data.requiredField.update({
      where: { id: requiredFieldId },
      data: {
  
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,name: input.name, 
entityName: input.entityName, 

}
, include: {accidentType: true, medLevel: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RequiredField', 'Update', requiredField)

    return requiredField

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Required Field')
    }
  }

  async userUpdateRequiredFields(userId: string, input: UserUpdateRequiredFieldsInput): Promise<UpdateResult> {
    const total = input.requiredFields.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.requiredFields) {
      const inputData = input.requiredFields[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
entityName: inputData.entityName, 
accidentTypeId: inputData.accidentTypeId, 
medLevelId: inputData.medLevelId, 

      }

      const requiredFieldData = await this.checkRequiredFieldExist(inputData.name)

      if (requiredFieldData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.requiredField.upsert({
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


  async userDeleteRequiredField(userId: string, requiredFieldId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!requiredFieldId) {
        throw new BadRequestException('Required Field Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'RequiredField', 'Delete', requiredFieldId)

        let requiredField = this.data.requiredField.delete({
          where: { id: requiredFieldId }
        })

        await this.data.logEvent(sendingUser, false, 'RequiredField', 'Delete', requiredField)

        return requiredField

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Required Field')
    }
  }
}

