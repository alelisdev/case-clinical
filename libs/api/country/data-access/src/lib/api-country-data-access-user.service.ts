
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCountryInput } from './dto/user-create-country.input'
import { UserListCountryInput } from './dto/user-list-country.input'
import { UserUpdateCountryInput } from './dto/user-update-country.input'
import { UserUpdateCountriesInput } from './dto/user-update-countries.input'



@Injectable()
export class ApiCountryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCountries(userId: string, input?: UserListCountryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.country.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectCountries(userId: string, input?: UserListCountryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.country.findMany({
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

  async userCountCountries(userId: string, input?: UserListCountryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.country.count(
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

  async userCountry(userId: string, countryId) {

    return this.data.country.findUnique({ where: { id: countryId } , include: {contactPhoneNumbers: {include: {country: true, contact: true}}}  })
  }

  async checkCountryExist(countryName: string) {
    try {
      return this.data.country.findMany({ where: { name: countryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCountry(userId: string, input: UserCreateCountryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const countryData = await this.checkCountryExist(input.name)

        if (countryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Country', 'Create', input)

    let country = await this.data.country.create({
      data: { 
name: input.name, 
iso: input.iso, 
code: input.code, 
flagImagePos: input.flagImagePos, 

}
, include: {contactPhoneNumbers: {include: {country: true, contact: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Country', 'Create', country)

    return country

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Country')
    }

  }


  
  

  async userUpdateCountry(userId: string, countryId: string, input: UserUpdateCountryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!countryId) {
        throw new BadRequestException('Country Id is required')
      } else {

      const countryData = await this.checkCountryExist(input.name)

      if (countryData.length > 0) {
        if (countryData[0].id != countryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Country', 'Update', input)

    let country = this.data.country.update({
      where: { id: countryId },
      data: {
name: input.name, 
iso: input.iso, 
code: input.code, 
flagImagePos: input.flagImagePos, 

}
, include: {contactPhoneNumbers: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Country', 'Update', country)

    return country

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Country')
    }
  }

  async userUpdateCountries(userId: string, input: UserUpdateCountriesInput): Promise<UpdateResult> {
    const total = input.countries.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.countries) {
      const inputData = input.countries[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
iso: inputData.iso, 
code: inputData.code, 
flagImagePos: inputData.flagImagePos, 

      }

      const countryData = await this.checkCountryExist(inputData.name)

      if (countryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.country.upsert({
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


  async userDeleteCountry(userId: string, countryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!countryId) {
        throw new BadRequestException('Country Id is required')
      } else {

        const contactPhoneNumberCount = await this.data.contactPhoneNumber.count({ where: { countryId: countryId }})
        if(contactPhoneNumberCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Phone Number')
        }

        await this.data.logEvent(sendingUser, true, 'Country', 'Delete', countryId)

        let country = this.data.country.delete({
          where: { id: countryId }
        })

        await this.data.logEvent(sendingUser, false, 'Country', 'Delete', country)

        return country

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Country')
    }
  }
}

