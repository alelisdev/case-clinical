
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLocationInput } from './dto/admin-create-location.input'
import { AdminListLocationInput } from './dto/admin-list-location.input'
import { AdminListPlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access'
import { AdminUpdateLocationInput } from './dto/admin-update-location.input'

@Injectable()
export class ApiLocationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLocations(adminId: string, input?: AdminListLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.location.findMany({
      where: {
            name: {
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true}
    })
  }

  async adminCountLocations(adminId: string, input?: AdminListLocationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.location.count(
    {
      where: {
            name: {
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }




  async adminLocation(adminId: string, locationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.location.findUnique({ where: { id: locationId } , include: {placeOfService: true, appointments: true, caseAccounts: true, caseProcedures: true, providerLocations: true, vendorLocation: true} })
  }

  async checkLocationExist(locationName: string) {
    try {
      return this.data.location.findMany({ where: { name: locationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLocation(adminId: string, input: AdminCreateLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const locationData = await this.checkLocationExist(input.name)

      if (locationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.location.create({
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
    , include: {placeOfService: true, appointments: true, caseAccounts: true, caseProcedures: true, providerLocations: true, vendorLocation: true}
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLocation(adminId: string, locationId, input: AdminUpdateLocationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.location.update({
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
, include: {placeOfService: true, appointments: true, caseAccounts: true, caseProcedures: true, providerLocations: true, vendorLocation: true}
    })
  }

  async adminDeleteLocation(adminId: string, locationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.location.delete({ where: { id: locationId } })
  }
}

