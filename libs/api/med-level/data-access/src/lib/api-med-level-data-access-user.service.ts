
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateMedLevelInput } from './dto/user-create-med-level.input'
import { UserListMedLevelInput } from './dto/user-list-med-level.input'
import { UserUpdateMedLevelInput } from './dto/user-update-med-level.input'
import { UserUpdateMedLevelsInput } from './dto/user-update-med-levels.input'



@Injectable()
export class ApiMedLevelDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userMedLevels(userId: string, input?: UserListMedLevelInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medLevel.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectMedLevels(userId: string, input?: UserListMedLevelInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medLevel.findMany({
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

  async userCountMedLevels(userId: string, input?: UserListMedLevelInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.medLevel.count(
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

  async userMedLevel(userId: string, medLevelId) {

    return this.data.medLevel.findUnique({ where: { id: medLevelId } , include: {legalCases: { include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}, requiredFields: {include: {accidentType: true, medLevel: true}}}  })
  }

  async checkMedLevelExist(medLevelName: string) {
    try {
      return this.data.medLevel.findMany({ where: { name: medLevelName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateMedLevel(userId: string, input: UserCreateMedLevelInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const medLevelData = await this.checkMedLevelExist(input.name)

        if (medLevelData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'MedLevel', 'Create', input)

    let medLevel = await this.data.medLevel.create({
      data: { 
name: input.name, 
approvedSiteCosts: input.approvedSiteCosts, 
maximumMedicalBillsToDate: input.maximumMedicalBillsToDate, 

}
, include: {legalCases: true, requiredFields: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedLevel', 'Create', medLevel)

    return medLevel

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Med Level')
    }

  }


  
  

  async userUpdateMedLevel(userId: string, medLevelId: string, input: UserUpdateMedLevelInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!medLevelId) {
        throw new BadRequestException('Med Level Id is required')
      } else {

      const medLevelData = await this.checkMedLevelExist(input.name)

      if (medLevelData.length > 0) {
        if (medLevelData[0].id != medLevelId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'MedLevel', 'Update', input)

    let medLevel = this.data.medLevel.update({
      where: { id: medLevelId },
      data: {
name: input.name, 
approvedSiteCosts: input.approvedSiteCosts, 
maximumMedicalBillsToDate: input.maximumMedicalBillsToDate, 

}
, include: {legalCases: true, requiredFields: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedLevel', 'Update', medLevel)

    return medLevel

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Med Level')
    }
  }

  async userUpdateMedLevels(userId: string, input: UserUpdateMedLevelsInput): Promise<UpdateResult> {
    const total = input.medLevels.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.medLevels) {
      const inputData = input.medLevels[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
approvedSiteCosts: inputData.approvedSiteCosts, 
maximumMedicalBillsToDate: inputData.maximumMedicalBillsToDate, 

      }

      const medLevelData = await this.checkMedLevelExist(inputData.name)

      if (medLevelData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.medLevel.upsert({
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


  async userDeleteMedLevel(userId: string, medLevelId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!medLevelId) {
        throw new BadRequestException('Med Level Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { medLevelId: medLevelId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }

        const requiredFieldCount = await this.data.requiredField.count({ where: { medLevelId: medLevelId }})
        if(requiredFieldCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it has reference at other place')
        }

        await this.data.logEvent(sendingUser, true, 'MedLevel', 'Delete', medLevelId)

        let medLevel = this.data.medLevel.delete({
          where: { id: medLevelId }
        })

        await this.data.logEvent(sendingUser, false, 'MedLevel', 'Delete', medLevel)

        return medLevel

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Med Level')
    }
  }
}

