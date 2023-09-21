
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAdverseInsuranceStatusInput } from './dto/user-create-adverse-insurance-status.input'
import { UserListAdverseInsuranceStatusInput } from './dto/user-list-adverse-insurance-status.input'
import { UserUpdateAdverseInsuranceStatusInput } from './dto/user-update-adverse-insurance-status.input'
import { UserUpdateAdverseInsuranceStatusesInput } from './dto/user-update-adverse-insurance-statuses.input'



@Injectable()
export class ApiAdverseInsuranceStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAdverseInsuranceStatuses(userId: string, input?: UserListAdverseInsuranceStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.adverseInsuranceStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAdverseInsuranceStatuses(userId: string, input?: UserListAdverseInsuranceStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.adverseInsuranceStatus.findMany({
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

  async userCountAdverseInsuranceStatuses(userId: string, input?: UserListAdverseInsuranceStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.adverseInsuranceStatus.count(
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

  async userAdverseInsuranceStatus(userId: string, adverseInsuranceStatusId) {

    return this.data.adverseInsuranceStatus.findUnique({ where: { id: adverseInsuranceStatusId } , include: {legalCases: { 
      include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, }
     }}  })
  }

  async checkAdverseInsuranceStatusExist(adverseInsuranceStatusName: string) {
    try {
      return this.data.adverseInsuranceStatus.findMany({ where: { name: adverseInsuranceStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAdverseInsuranceStatus(userId: string, input: UserCreateAdverseInsuranceStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const adverseInsuranceStatusData = await this.checkAdverseInsuranceStatusExist(input.name)

        if (adverseInsuranceStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AdverseInsuranceStatus', 'Create', input)

    let adverseInsuranceStatus = await this.data.adverseInsuranceStatus.create({
      data: { 
name: input.name, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AdverseInsuranceStatus', 'Create', adverseInsuranceStatus)

    return adverseInsuranceStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Adverse Insurance Status')
    }

  }


  
  

  async userUpdateAdverseInsuranceStatus(userId: string, adverseInsuranceStatusId: string, input: UserUpdateAdverseInsuranceStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!adverseInsuranceStatusId) {
        throw new BadRequestException('Adverse Insurance Status Id is required')
      } else {

      const adverseInsuranceStatusData = await this.checkAdverseInsuranceStatusExist(input.name)

      if (adverseInsuranceStatusData.length > 0) {
        if (adverseInsuranceStatusData[0].id != adverseInsuranceStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AdverseInsuranceStatus', 'Update', input)

    let adverseInsuranceStatus = this.data.adverseInsuranceStatus.update({
      where: { id: adverseInsuranceStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AdverseInsuranceStatus', 'Update', adverseInsuranceStatus)

    return adverseInsuranceStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Adverse Insurance Status')
    }
  }

  async userUpdateAdverseInsuranceStatuses(userId: string, input: UserUpdateAdverseInsuranceStatusesInput): Promise<UpdateResult> {
    const total = input.adverseInsuranceStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.adverseInsuranceStatuses) {
      const inputData = input.adverseInsuranceStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const adverseInsuranceStatusData = await this.checkAdverseInsuranceStatusExist(inputData.name)

      if (adverseInsuranceStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.adverseInsuranceStatus.upsert({
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


  async userDeleteAdverseInsuranceStatus(userId: string, adverseInsuranceStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!adverseInsuranceStatusId) {
        throw new BadRequestException('Adverse Insurance Status Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { adverseInsuranceStatusId: adverseInsuranceStatusId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }
 
        await this.data.logEvent(sendingUser, true, 'AdverseInsuranceStatus', 'Delete', adverseInsuranceStatusId)

        let adverseInsuranceStatus = this.data.adverseInsuranceStatus.delete({
          where: { id: adverseInsuranceStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'AdverseInsuranceStatus', 'Delete', adverseInsuranceStatus)

        return adverseInsuranceStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Adverse Insurance Status')
    }
  }
}

