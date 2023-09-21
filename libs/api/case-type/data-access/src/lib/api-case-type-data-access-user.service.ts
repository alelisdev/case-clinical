
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseTypeInput } from './dto/user-create-case-type.input'
import { UserListCaseTypeInput } from './dto/user-list-case-type.input'
import { UserUpdateCaseTypeInput } from './dto/user-update-case-type.input'
import { UserUpdateCaseTypesInput } from './dto/user-update-case-types.input'



@Injectable()
export class ApiCaseTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseTypes(userId: string, input?: UserListCaseTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCaseTypes(userId: string, input?: UserListCaseTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseType.findMany({
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

  async userCountCaseTypes(userId: string, input?: UserListCaseTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseType.count(
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

  async userCaseType(userId: string, caseTypeId) {

    return this.data.caseType.findUnique({ where: { id: caseTypeId } , include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}}  })
  }

  async checkCaseTypeExist(caseTypeName: string) {
    try {
      return this.data.caseType.findMany({ where: { name: caseTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseType(userId: string, input: UserCreateCaseTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const caseTypeData = await this.checkCaseTypeExist(input.name)

        if (caseTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'CaseType', 'Create', input)

    let caseType = await this.data.caseType.create({
      data: { 
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
removed: input.removed, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: {include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseType', 'Create', caseType)

    return caseType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Type')
    }

  }


  
  

  async userUpdateCaseType(userId: string, caseTypeId: string, input: UserUpdateCaseTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseTypeId) {
        throw new BadRequestException('Case Type Id is required')
      } else {

      const caseTypeData = await this.checkCaseTypeExist(input.name)

      if (caseTypeData.length > 0) {
        if (caseTypeData[0].id != caseTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'CaseType', 'Update', input)

    let caseType = this.data.caseType.update({
      where: { id: caseTypeId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
removed: input.removed, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'CaseType', 'Update', caseType)

    return caseType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Type')
    }
  }

  async userUpdateCaseTypes(userId: string, input: UserUpdateCaseTypesInput): Promise<UpdateResult> {
    const total = input.caseTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.caseTypes) {
      const inputData = input.caseTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
orderIndex: inputData.orderIndex, 
dateCreated: inputData.dateCreated, 
removed: inputData.removed, 
migSource: inputData.migSource, 
entity: inputData.entity, 
temp: inputData.temp, 

      }

      const caseTypeData = await this.checkCaseTypeExist(inputData.name)

      if (caseTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseType.upsert({
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


  async userDeleteCaseType(userId: string, caseTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!caseTypeId) {
        throw new BadRequestException('Case Type Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { caseTypeId: caseTypeId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }
        
        await this.data.logEvent(sendingUser, true, 'CaseType', 'Delete', caseTypeId)

        let caseType = this.data.caseType.delete({
          where: { id: caseTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseType', 'Delete', caseType)

        return caseType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Case Type')
    }
  }
}

