
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateMedicalConditionInput } from './dto/user-create-medical-condition.input'
import { UserListMedicalConditionInput } from './dto/user-list-medical-condition.input'
import { UserUpdateMedicalConditionInput } from './dto/user-update-medical-condition.input'
import { UserUpdateMedicalConditionsInput } from './dto/user-update-medical-conditions.input'



@Injectable()
export class ApiMedicalConditionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userMedicalConditions(userId: string, input?: UserListMedicalConditionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalCondition.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectMedicalConditions(userId: string, input?: UserListMedicalConditionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalCondition.findMany({
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

  async userCountMedicalConditions(userId: string, input?: UserListMedicalConditionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalCondition.count(
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

  async userMedicalCondition(userId: string, medicalConditionId) {

    return this.data.medicalCondition.findUnique({ where: { id: medicalConditionId }  })
  }

  async checkMedicalConditionExist(medicalConditionName: string) {
    try {
      return this.data.medicalCondition.findMany({ where: { name: medicalConditionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateMedicalCondition(userId: string, input: UserCreateMedicalConditionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const medicalConditionData = await this.checkMedicalConditionExist(input.name)

        if (medicalConditionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'MedicalCondition', 'Create', input)

    let medicalCondition = await this.data.medicalCondition.create({
      data: { 
name: input.name, 

}

    })

    await this.data.logEvent(sendingUser, false, 'MedicalCondition', 'Create', medicalCondition)

    return medicalCondition

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Medical Condition')
    }

  }


  
  

  async userUpdateMedicalCondition(userId: string, medicalConditionId: string, input: UserUpdateMedicalConditionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!medicalConditionId) {
        throw new BadRequestException('Medical Condition Id is required')
      } else {

      const medicalConditionData = await this.checkMedicalConditionExist(input.name)

      if (medicalConditionData.length > 0) {
        if (medicalConditionData[0].id != medicalConditionId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'MedicalCondition', 'Update', input)

    let medicalCondition = this.data.medicalCondition.update({
      where: { id: medicalConditionId },
      data: {
name: input.name, 

}

    })

    await this.data.logEvent(sendingUser, false, 'MedicalCondition', 'Update', medicalCondition)

    return medicalCondition

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Medical Condition')
    }
  }

  async userUpdateMedicalConditions(userId: string, input: UserUpdateMedicalConditionsInput): Promise<UpdateResult> {
    const total = input.medicalConditions.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.medicalConditions) {
      const inputData = input.medicalConditions[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const medicalConditionData = await this.checkMedicalConditionExist(inputData.name)

      if (medicalConditionData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.medicalCondition.upsert({
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


  async userDeleteMedicalCondition(userId: string, medicalConditionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!medicalConditionId) {
        throw new BadRequestException('Medical Condition Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'MedicalCondition', 'Delete', medicalConditionId)

        let medicalCondition = this.data.medicalCondition.delete({
          where: { id: medicalConditionId }
        })

        await this.data.logEvent(sendingUser, false, 'MedicalCondition', 'Delete', medicalCondition)

        return medicalCondition

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Medical Condition')
    }
  }
}

