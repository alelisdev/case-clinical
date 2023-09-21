
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTreatmentInput } from './dto/user-create-treatment.input'
import { UserListTreatmentInput } from './dto/user-list-treatment.input'
import { UserUpdateTreatmentInput } from './dto/user-update-treatment.input'
import { UserUpdateTreatmentsInput } from './dto/user-update-treatments.input'



@Injectable()
export class ApiTreatmentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTreatments(userId: string, input?: UserListTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.treatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectTreatments(userId: string, input?: UserListTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.treatment.findMany({
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

  async userCountTreatments(userId: string, input?: UserListTreatmentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.treatment.count(
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

  async userTreatment(userId: string, treatmentId) {

    return this.data.treatment.findUnique({ where: { id: treatmentId } , include: {leads: true}  })
  }

  async checkTreatmentExist(treatmentName: string) {
    try {
      return this.data.treatment.findMany({ where: { name: treatmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTreatment(userId: string, input: UserCreateTreatmentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const treatmentData = await this.checkTreatmentExist(input.name)

        if (treatmentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Treatment', 'Create', input)

    let treatment = await this.data.treatment.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Treatment', 'Create', treatment)

    return treatment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Treatment')
    }

  }


  
  

  async userUpdateTreatment(userId: string, treatmentId: string, input: UserUpdateTreatmentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!treatmentId) {
        throw new BadRequestException('Treatment Id is required')
      } else {

      const treatmentData = await this.checkTreatmentExist(input.name)

      if (treatmentData.length > 0) {
        if (treatmentData[0].id != treatmentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Treatment', 'Update', input)

    let treatment = this.data.treatment.update({
      where: { id: treatmentId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Treatment', 'Update', treatment)

    return treatment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Treatment')
    }
  }

  async userUpdateTreatments(userId: string, input: UserUpdateTreatmentsInput): Promise<UpdateResult> {
    const total = input.treatments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.treatments) {
      const inputData = input.treatments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const treatmentData = await this.checkTreatmentExist(inputData.name)

      if (treatmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.treatment.upsert({
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


  async userDeleteTreatment(userId: string, treatmentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!treatmentId) {
        throw new BadRequestException('Treatment Id is required')
      } else {


        const leadTreatmentCount = await this.data.leadTreatment.count({ where: { treatmentId: treatmentId }})
        if(leadTreatmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead Treatment')
        }


        await this.data.logEvent(sendingUser, true, 'Treatment', 'Delete', treatmentId)

        let treatment = this.data.treatment.delete({
          where: { id: treatmentId }
        })

        await this.data.logEvent(sendingUser, false, 'Treatment', 'Delete', treatment)

        return treatment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Treatment')
    }
  }
}

