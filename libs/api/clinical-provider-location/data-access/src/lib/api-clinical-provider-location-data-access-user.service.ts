
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderLocationInput } from './dto/user-create-clinical-provider-location.input'
import { UserListClinicalProviderLocationInput } from './dto/user-list-clinical-provider-location.input'
import { UserUpdateClinicalProviderLocationInput } from './dto/user-update-clinical-provider-location.input'
import { UserUpdateClinicalProviderLocationsInput } from './dto/user-update-clinical-provider-locations.input'
import { getCalculateDistance } from '@case-clinical/shared/util/helpers'

@Injectable()
export class ApiClinicalProviderLocationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClinicalProviderLocations(userId: string, input?: UserListClinicalProviderLocationInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } });
    const name = input?.name ? input.name : undefined
    if(user.vendorId && (input?.clinicalProviderId == 'all' || input?.clinicalProviderId == '')){
      input.clinicalProviderId = undefined;
    }

    let providerLocations = await this.data.clinicalProviderLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProvider: {
              name: { contains: input.providerName },
              clinicalProviderSpecialties: (input?.specialties && input.specialties?.length > 0) ? {
                some: {
                  specialtyId: {
                    in: input.specialties
                  }
                }
              } : undefined,
              favoriteProviders: input.favorite ? {
                some: {
                  userId
                }
              } : undefined,
              vendorId:user.vendorId
            },
            clinicalProviderId: user.vendorId?input?.clinicalProviderId:undefined,
id: input?.locationId,}]
          },
      take: input?.limit,
      skip: input?.skip ,
      include: {clinicalProvider: {include:{ vendor: true, services: true, favoriteProviders: {where: { userId }}, clinicalProviderTags: { include: { tag: true } }, clinicalProviderSpecialties: { include: { specialty: true } } }}, location: { include: { locationImages: true }}}
    })

    if(input.centerLocation && input.distance) {
      providerLocations = providerLocations.map((providerLocation) => {
        let distance = 999999;
        if(providerLocation.location) {
          distance = getCalculateDistance(input?.centerLocation , [providerLocation.location?.latitude, providerLocation.location?.longitude]);
        }
        providerLocation['distance'] = distance;
        return providerLocation;
      }).filter((providerLocation) => providerLocation['distance'] <= input.distance);
    }
    return providerLocations;
  }

  async userSelectClinicalProviderLocations(userId: string, input?: UserListClinicalProviderLocationInput) {
    const name = input?.name ? input.name : undefined

    return this.data.clinicalProviderLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,

locationId: input?.locationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviderLocations(userId: string, input?: UserListClinicalProviderLocationInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderLocation.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProvider: {
              name: { contains: input.providerName },
              clinicalProviderSpecialties: (input?.specialties && input.specialties?.length > 0) ? {
                some: {
                  specialtyId: {
                    in: input.specialties
                  }
                }
              } : undefined,
              favoriteProviders: input.favorite ? {
                some: {
                  userId
                }
              } : undefined,
            },
            clinicalProviderId: input?.clinicalProviderId,
locationId: input?.locationId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProviderLocation(userId: string, clinicalProviderLocationId) {

    return this.data.clinicalProviderLocation.findUnique({
      where: { id: clinicalProviderLocationId } ,
      include: {
        clinicalProvider: {include: {
          vendor: true,
          services: true,
          educations: true,
          experiences: true,
          awards: true,
          favoriteProviders: {where: { userId }},
          clinicalProviderLocations: { include: { clinicalProviderLocationAvailabilities: true, location: { include: { locationImages: true } } } },
          clinicalProviderTags: { include: { tag: true } },
          clinicalProviderSpecialties: { include: { specialty: true } } },
        },
        location: { include: { locationImages: true }}
      }
    });
  }

  async checkClinicalProviderLocationExist(clinicalProviderLocationName: string) {
    try {
      return this.data.clinicalProviderLocation.findMany({ where: { name: clinicalProviderLocationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProviderLocation(userId: string, input: UserCreateClinicalProviderLocationInput) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const clinicalProviderLocationData = await this.checkClinicalProviderLocationExist(input.name)

        if (clinicalProviderLocationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }

        if(input.location){
          const location = await this.data.location.create({
            data: {
                      name: input?.location.name,
            locationName: input.location.locationName,
            line1: input.location.line1,
            line2: input.location.line2,
            city: input.location.city,
            state: input.location.state,
            postalCode: input.location.postalCode,
            latitude: input.location.latitude,
            longitude: input.location.longitude,
            abbrev: input.location.abbrev,
            division: input.location.division,
            country: input.location.country,
            officePhone: input.location.officePhone,
            fax: input.location.fax,
            attentionTo: input.location.attentionTo,
            
            }
          })
          input.locationId = location.id
        }

    await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocation', 'Create', input)

    const clinicalProviderLocation = await this.data.clinicalProviderLocation.create({
      data: {

                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,

}
, include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true}
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocation', 'Create', clinicalProviderLocation)

    return clinicalProviderLocation

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider Location')
    }

  }





  async userUpdateClinicalProviderLocation(userId: string, clinicalProviderLocationId: string, input: UserUpdateClinicalProviderLocationInput) {

    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderLocationId) {
        throw new BadRequestException('Clinical Provider Location Id is required')
      } else {

      const clinicalProviderLocationData = await this.checkClinicalProviderLocationExist(input.name)

      if (clinicalProviderLocationData.length > 0) {
        if (clinicalProviderLocationData[0].id != clinicalProviderLocationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocation', 'Update', input)

    const clinicalProviderLocation = this.data.clinicalProviderLocation.update({
      where: { id: clinicalProviderLocationId },
      data: {

                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,

}
, include: {clinicalProvider: true, location: true, clinicalProviderLocationAvailabilities: true}
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocation', 'Update', clinicalProviderLocation)

    return clinicalProviderLocation

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider Location')
    }
  }

  async userUpdateClinicalProviderLocations(userId: string, input: UserUpdateClinicalProviderLocationsInput): Promise<UpdateResult> {
    const total = input.clinicalProviderLocations.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.clinicalProviderLocations) {
      const inputData = input.clinicalProviderLocations[key]

      const data = {
        id: inputData.id,
name: inputData.name,
clinicalProviderId: inputData.clinicalProviderId,
locationId: inputData.locationId,

      }

      const clinicalProviderLocationData = await this.checkClinicalProviderLocationExist(inputData.name)

      if (clinicalProviderLocationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProviderLocation.upsert({
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


  async userDeleteClinicalProviderLocation(userId: string, clinicalProviderLocationId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderLocationId) {
        throw new BadRequestException('Clinical Provider Location Id is required')
      } else {

        const clinicalProviderLocationAvailabilityCount = await this.data.clinicalProviderLocationAvailability.count({ where: { clinicalProviderLocationId: clinicalProviderLocationId }})
        if(clinicalProviderLocationAvailabilityCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Location Availability')
        }

        await this.data.logEvent(sendingUser, true, 'ClinicalProviderLocation', 'Delete', clinicalProviderLocationId)

        const clinicalProviderLocation = this.data.clinicalProviderLocation.delete({
          where: { id: clinicalProviderLocationId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProviderLocation', 'Delete', clinicalProviderLocation)

        return clinicalProviderLocation

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Clinical Provider Location')
    }
  }
}

