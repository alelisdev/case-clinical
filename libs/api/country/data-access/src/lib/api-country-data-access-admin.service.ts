
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCountryInput } from './dto/admin-create-country.input'
import { AdminListCountryInput } from './dto/admin-list-country.input'

import { AdminUpdateCountryInput } from './dto/admin-update-country.input'

@Injectable()
export class ApiCountryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCountries(adminId: string, input?: AdminListCountryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.country.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCountries(adminId: string, input?: AdminListCountryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.country.count(
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

  
  

  async adminCountry(adminId: string, countryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.country.findUnique({ where: { id: countryId } , include: {contactPhoneNumbers: true} })
  }

  async checkCountryExist(countryName: string) {
    try {
      return this.data.country.findMany({ where: { name: countryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCountry(adminId: string, input: AdminCreateCountryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const countryData = await this.checkCountryExist(input.name)

      if (countryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.country.create({
          data: { 
    name: input.name, 
iso: input.iso, 
code: input.code, 
flagImagePos: input.flagImagePos, 

    }
    , include: {contactPhoneNumbers: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCountry(adminId: string, countryId, input: AdminUpdateCountryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.country.update({
      where: { id: countryId },
      data: {
name: input.name, 
iso: input.iso, 
code: input.code, 
flagImagePos: input.flagImagePos, 

}
, include: {contactPhoneNumbers: true} 
    })
  }

  async adminDeleteCountry(adminId: string, countryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.country.delete({ where: { id: countryId } })
  }
}

