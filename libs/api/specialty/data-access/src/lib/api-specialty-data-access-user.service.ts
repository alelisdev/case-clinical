
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateSpecialtyInput } from './dto/user-create-specialty.input'
import { UserListSpecialtyInput } from './dto/user-list-specialty.input'
import { UserUpdateSpecialtyInput } from './dto/user-update-specialty.input'
import { UserUpdateSpecialtiesInput } from './dto/user-update-specialties.input'



@Injectable()
export class ApiSpecialtyDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userSpecialties(userId: string, input?: UserListSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.specialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectSpecialties(userId: string, input?: UserListSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.specialty.findMany({
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

  async userCountSpecialties(userId: string, input?: UserListSpecialtyInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.specialty.count(
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

  async userSpecialty(userId: string, specialtyId) {

    return this.data.specialty.findUnique({ where: { id: specialtyId } , include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true}  })
  }

  async checkSpecialtyExist(specialtyName: string) {
    try {
      return this.data.specialty.findMany({ where: { name: specialtyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateSpecialty(userId: string, input: UserCreateSpecialtyInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const specialtyData = await this.checkSpecialtyExist(input.name)

        if (specialtyData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Specialty', 'Create', input)

    let specialty = await this.data.specialty.create({
      data: { 
name: input.name, 
active: input.active, 

}
, include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Specialty', 'Create', specialty)

    return specialty

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Specialty')
    }

  }


  
  

  async userUpdateSpecialty(userId: string, specialtyId: string, input: UserUpdateSpecialtyInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!specialtyId) {
        throw new BadRequestException('Specialty Id is required')
      } else {

      const specialtyData = await this.checkSpecialtyExist(input.name)

      if (specialtyData.length > 0) {
        if (specialtyData[0].id != specialtyId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Specialty', 'Update', input)

    let specialty = this.data.specialty.update({
      where: { id: specialtyId },
      data: {
name: input.name, 
active: input.active, 

}
, include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Specialty', 'Update', specialty)

    return specialty

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Specialty')
    }
  }

  async userUpdateSpecialties(userId: string, input: UserUpdateSpecialtiesInput): Promise<UpdateResult> {
    const total = input.specialties.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.specialties) {
      const inputData = input.specialties[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
active: inputData.active, 

      }

      const specialtyData = await this.checkSpecialtyExist(inputData.name)

      if (specialtyData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.specialty.upsert({
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


  async userDeleteSpecialty(userId: string, specialtyId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!specialtyId) {
        throw new BadRequestException('Specialty Id is required')
      } else {


        const clinicalProviderSpecialtyCount = await this.data.clinicalProviderSpecialty.count({ where: { specialtyId: specialtyId }})
        if(clinicalProviderSpecialtyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Specialty')
        }


        const facilityFeeScheduleCount = await this.data.facilityFeeSchedule.count({ where: { specialtyId: specialtyId }})
        if(facilityFeeScheduleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Facility Fee Schedule')
        }


        const feeScheduleCount = await this.data.feeSchedule.count({ where: { specialtyId: specialtyId }})
        if(feeScheduleCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Fee Schedule')
        }


        await this.data.logEvent(sendingUser, true, 'Specialty', 'Delete', specialtyId)

        let specialty = this.data.specialty.delete({
          where: { id: specialtyId }
        })

        await this.data.logEvent(sendingUser, false, 'Specialty', 'Delete', specialty)

        return specialty

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Specialty')
    }
  }
}

