
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLocationInput } from './dto/user-create-location.input'
import { UserListLocationInput } from './dto/user-list-location.input'
import { UserUpdateLocationInput } from './dto/user-update-location.input'
import { UserUpdateLocationsInput } from './dto/user-update-locations.input'
import { Location } from '@case-clinical/api/location/data-access'
import { Document, UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'

@Injectable()
export class ApiLocationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLocations(userId: string, input?: UserListLocationInput) {
    let name = input?.name ? input.name : undefined
    console.log({ input })
    let vendorLocationIds
    if(input?.vendorLocationId) {
      vendorLocationIds = [ input?.vendorLocationId ]
    } else if(input?.vendorId) {
      vendorLocationIds = (await this.data.vendorLocation.findMany({ where: { vendorId: input?.vendorId } })).flatMap((el) => el.id);
    } else if(input?.clinicalProviderId) {
      const clinicalProvider = await this.data.clinicalProvider.findUnique({ where: { id: input?.clinicalProviderId } });
      if(clinicalProvider && clinicalProvider.vendorId) {
        vendorLocationIds = (await this.data.vendorLocation.findMany({ where: { vendorId: clinicalProvider.vendorId } })).flatMap((el) => el.id);
      }
    }

    return this.data.location.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorLocationId: input?.vendorLocationId ? input?.vendorLocationId : {
              in: vendorLocationIds
            },
            placeOfServiceId: input?.placeOfServiceId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true, vendorLocation: true, locationImages: true}
    })
  }

  async userSelectLocations(userId: string, input?: UserListLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.location.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorLocationId: input?.vendorLocationId,
            placeOfServiceId: input?.placeOfServiceId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLocations(userId: string, input?: UserListLocationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.location.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorLocationId: input?.vendorLocationId,
            placeOfServiceId: input?.placeOfServiceId,}]
          },

    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLocation(userId: string, locationId) {

    const location = await this.data.location.findUnique({ where: { id: locationId } , include: {placeOfService: true,
      appointments: {include: { location: true, patient: true, clinicalProvider: {include:{clinicalProviderSpecialties:true}},
      legalCase: true, appointmentStatus: true }},
      caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true,
          portfolio: true, procedureVendor: true}}, caseProcedures: {include: {legalCase: true, location: true}},
      locationImages: true,
      providerLocations: {include: {clinicalProvider: true, location: true}}, vendorLocation: {include: {locations: true, vendor: true}}}  })

    location.locationImages = await this.getLocationImages(userId, location);

    return location;
  }

  async checkLocationExist(locationName: string) {
    try {
      return this.data.location.findMany({ where: { name: locationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLocation(userId: string, input: UserCreateLocationInput) {
     let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    console.log({ input })
    try {
        const locationData = await this.checkLocationExist(input.name)

        if (locationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }

    await this.data.logEvent(sendingUser, true, 'Location', 'Create', input)

    let location = await this.data.location.create({
      data: {
                placeOfService:
                input?.placeOfServiceId != null
                ? {
                        connect:  {
                            id: input?.placeOfServiceId
                        }
                    }: undefined,name: input?.name,
locationName: input.locationName,
line1: input.line1,
line2: input.line2,
city: input.city,
state: input.state,
vendorLocation: input?.vendorLocationId ? { connect: { id: input?.vendorLocationId } } : undefined,
postalCode: input.postalCode,
latitude: input.latitude,
longitude: input.longitude,
abbrev: input.abbrev,
division: input.division,
country: input.country,
officePhone: input.officePhone,
fax: input.fax,
attentionTo: input.attentionTo,

}
, include: {placeOfService: true, appointments: true, caseAccounts: true, caseProcedures: true, providerLocations: true, vendorLocation: true, locationImages: true}
    })

    await this.data.logEvent(sendingUser, false, 'Location', 'Create', location)


    let locationDocuments = [];
    if(input.locationImages) {
      for (const locationImage of input.locationImages) {
        locationImage.locationId = location.id;
        const locationImageDocument = await this.data.userCreateDocument(userId, locationImage);
        if(!locationImageDocument) throw new BadRequestException('Cannot access azure storage');

        locationDocuments.push(locationImageDocument);
      }
      location.locationImages = locationDocuments;
    }


    return location

    } catch (error) {
      console.log(error)
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Location')
    }

  }

  async userUpdateLocation(userId: string, locationId: string, input: UserUpdateLocationInput) {
    console.log(input)
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!locationId) {
        throw new BadRequestException('Location Id is required')
      } else {

      const locationData = await this.checkLocationExist(input.name)

      if (locationData.length > 0) {
        if (locationData[0].id != locationId) {
          throw new ConflictException("Record must be unique.")
        }
      }

    await this.data.logEvent(sendingUser, true, 'Location', 'Update', input)

    let location = this.data.location.update({
      where: { id: locationId },
      data: {
            placeOfService:
                input.placeOfServiceId != null
                ? {
                        connect:  {
                            id: input.placeOfServiceId
                        }
                    }: undefined,name: input.name,
locationName: input.locationName,
line1: input.line1,
line2: input.line2,
city: input.city,
state: input.state,
vendorLocation: input?.vendorLocationId ? { connect: { id: input?.vendorLocationId } } : undefined,
postalCode: input.postalCode,
latitude: input.latitude,
longitude: input.longitude,
abbrev: input.abbrev,
division: input.division,
country: input.country,
officePhone: input.officePhone,
fax: input.fax,
attentionTo: input.attentionTo,

}
, include: {placeOfService: true, locationImages: true, appointments: true, caseAccounts: true,
  caseProcedures: true, providerLocations: true, vendorLocation: true}
    })

    await this.data.logEvent(sendingUser, false, 'Location', 'Update', location)

    console.log(input.locationImages)
    if(input.locationImages) {
      (await this.mergeDocuments(input.locationImages, location.locationImages, userId, locationId, location));
    }

    return location

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Location')
    }
  }

  async mergeDocuments(
    upsertImages: UserUpdateDocumentInput[],
    locationImages,
    userId: string,
    locationId: string,
    location:any
    ) {

    if(!upsertImages) return [];
    let locationDocuments = [];

    for (const locationUpsertImage of upsertImages) {
      locationUpsertImage.locationId = locationId;
      let locationImageDocument:any;
      if(locationUpsertImage.id){
        locationImageDocument = await this.data.userUpdateDocument(userId, locationUpsertImage.id, locationUpsertImage);
        if(!locationImageDocument) throw new BadRequestException('Cannot access azure storage');
        locationDocuments.push(locationImageDocument);

      } else {
        locationImageDocument = await this.data.userCreateDocument(userId, locationUpsertImage);
        if(!locationImageDocument) throw new BadRequestException('Cannot access azure storage');
        locationDocuments.push(locationImageDocument);
      
      }
      
    }
    location.locationImages = locationDocuments 
    return locationDocuments;
   

  }

  async userUpdateLocations(userId: string, input: UserUpdateLocationsInput): Promise<UpdateResult> {
    const total = input.locations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.locations) {
      const inputData = input.locations[key]

      const data = {
        id: inputData.id,
name: inputData.name,
locationName: inputData.locationName,
line1: inputData.line1,
line2: inputData.line2,
city: inputData.city,
state: inputData.state,
postalCode: inputData.postalCode,
latitude: inputData.latitude,
longitude: inputData.longitude,
abbrev: inputData.abbrev,
division: inputData.division,
country: inputData.country,
officePhone: inputData.officePhone,
fax: inputData.fax,
attentionTo: inputData.attentionTo,
placeOfServiceId: inputData.placeOfServiceId,

      }

      const locationData = await this.checkLocationExist(inputData.name)

      if (locationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.location.upsert({
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


  async userDeleteLocation(userId: string, locationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!locationId) {
        throw new BadRequestException('Location Id is required')
      } else {

        const appointmentCount = await this.data.appointment.count({ where: { locationId: locationId }})
        if(appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }

        const caseAccountCount = await this.data.caseAccount.count({ where: { locationId: locationId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }

        const caseProcedureCount = await this.data.caseProcedure.count({ where: { locationId: locationId }})
        if(caseProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Procedure')
        }

        const clinicalProviderLocationCount = await this.data.clinicalProviderLocation.count({ where: { locationId: locationId }})
        if(clinicalProviderLocationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Location')
        }

        await this.data.logEvent(sendingUser, true, 'Location', 'Delete', locationId)

        let location = this.data.location.delete({
          where: { id: locationId }
        })

        await this.data.logEvent(sendingUser, false, 'Location', 'Delete', location)

        return location

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Location')
    }
  }

  async getLocationImages(userId, location) {
    var locationImages = []

    for (const locationImage of location.locationImages) {
      if(locationImage.id) {
        const locationImageDocument = await this.data.userDocument(userId, locationImage.id);
        console.log(locationImageDocument)

        locationImages.push(locationImageDocument);
      }
    }

    return locationImages;
  }
}


