
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderLocationAvailabilityInput } from './dto/user-create-clinical-provider-location-availability.input'
import { UserListClinicalProviderLocationAvailabilityInput } from './dto/user-list-clinical-provider-location-availability.input'
import { UserUpdateClinicalProviderLocationAvailabilityInput } from './dto/user-update-clinical-provider-location-availability.input'
import { UserUpdateClinicalProviderLocationAvailabilitiesInput } from './dto/user-update-clinical-provider-location-availabilities.input'

import { UserListClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'

@Injectable()
export class ApiClinicalProviderLocationAvailabilityDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClinicalProviderLocationAvailabilities(userId: string, input?: UserListClinicalProviderLocationAvailabilityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocationAvailability.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input?.clinicalProviderLocationId,
            day: {
              equals: input?.day
            }
          }]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProviderLocation: {include:{clinicalProvider: {include:{profileImage:true}},location:true}}}
    })
  }

  async userSelectClinicalProviderLocationAvailabilities(userId: string, input?: UserListClinicalProviderLocationAvailabilityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocationAvailability.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input?.clinicalProviderLocationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviderLocationAvailabilities(userId: string, input?: UserListClinicalProviderLocationAvailabilityInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocationAvailability.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderLocationId: input?.clinicalProviderLocationId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProviderLocationAvailability(userId: string, clinicalProviderLocationAvailabilityId) {

    return this.data.clinicalProviderLocationAvailability.findUnique({ where: { id: clinicalProviderLocationAvailabilityId } , include: {clinicalProviderLocation: {include:{clinicalProvider: {include:{profileImage:true}},location:true}}}})
  }

  async checkClinicalProviderLocationAvailabilityExist(clinicalProviderLocationAvailabilityName: string) {
    try {
      return this.data.clinicalProviderLocationAvailability.findMany({ where: { name: clinicalProviderLocationAvailabilityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProviderLocationAvailability(userId: string, input: UserCreateClinicalProviderLocationAvailabilityInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const clinicalProviderLocationAvailabilityData = await this.checkClinicalProviderLocationAvailabilityExist(input.name)

        if (clinicalProviderLocationAvailabilityData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocationAvailability', 'Create', input)

    let clinicalProviderLocationAvailability = await this.data.clinicalProviderLocationAvailability.create({
      data: {

                clinicalProviderLocation:
                input.clinicalProviderLocationId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name,
day: input.day,
startTime: input.startTime,
endTime: input.endTime,

}
, include: {clinicalProviderLocation: {include:{clinicalProvider: true,location:true}}}
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocationAvailability', 'Create', clinicalProviderLocationAvailability)

    return clinicalProviderLocationAvailability

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider Location Availability')
    }

  }





  async userUpdateClinicalProviderLocationAvailability(userId: string, clinicalProviderLocationAvailabilityId: string, input: UserUpdateClinicalProviderLocationAvailabilityInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderLocationAvailabilityId) {
        throw new BadRequestException('Clinical Provider Location Availability Id is required')
      } else {

      const clinicalProviderLocationAvailabilityData = await this.checkClinicalProviderLocationAvailabilityExist(input.name)

      if (clinicalProviderLocationAvailabilityData.length > 0) {
        if (clinicalProviderLocationAvailabilityData[0].id != clinicalProviderLocationAvailabilityId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocationAvailability', 'Update', input)

    let clinicalProviderLocationAvailability = this.data.clinicalProviderLocationAvailability.update({
      where: { id: clinicalProviderLocationAvailabilityId },
      data: {

                clinicalProviderLocation:
                input.clinicalProviderLocationId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name,
day: input.day,
startTime: input.startTime,
endTime: input.endTime,

}
, include: {clinicalProviderLocation: {include:{clinicalProvider: true,location:true}}}
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocationAvailability', 'Update', clinicalProviderLocationAvailability)

    return clinicalProviderLocationAvailability

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider Location Availability')
    }
  }

  async userUpdateClinicalProviderLocationAvailabilities(userId: string, input: UserUpdateClinicalProviderLocationAvailabilitiesInput): Promise<UpdateResult> {
    const total = input.clinicalProviderLocationAvailabilities.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.clinicalProviderLocationAvailabilities) {
      const inputData = input.clinicalProviderLocationAvailabilities[key]

      const data = {
        id: inputData.id,
name: inputData.name,
day: inputData.day,
startTime: inputData.startTime,
endTime: inputData.endTime,
clinicalProviderLocationId: inputData.clinicalProviderLocationId,

      }

      const clinicalProviderLocationAvailabilityData = await this.checkClinicalProviderLocationAvailabilityExist(inputData.name)

      if (clinicalProviderLocationAvailabilityData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProviderLocationAvailability.upsert({
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


  async userDeleteClinicalProviderLocationAvailability(userId: string, clinicalProviderLocationAvailabilityId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderLocationAvailabilityId) {
        throw new BadRequestException('Clinical Provider Location Availability Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocationAvailability', 'Delete', clinicalProviderLocationAvailabilityId)

        let clinicalProviderLocationAvailability = this.data.clinicalProviderLocationAvailability.delete({
          where: { id: clinicalProviderLocationAvailabilityId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocationAvailability', 'Delete', clinicalProviderLocationAvailability)

        return clinicalProviderLocationAvailability

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Clinical Provider Location Availability')
    }
  }

  async userClinicalProviderBusinessHours(userId: string, clinicalProviderId: string) {
    const clinicalProviderLocationIds = (await this.data.clinicalProviderLocation.findMany({
      where: {
        clinicalProviderId
      }
    })).flatMap((el) => el.id);
    const locationAvailabilities = await this.data.clinicalProviderLocationAvailability.findMany({
      where: {
        clinicalProviderLocationId: {
          in: clinicalProviderLocationIds
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    });
    console.log(locationAvailabilities);
    return locationAvailabilities;
  }
}

