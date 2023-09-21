
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderSpecialtyInput } from './dto/user-create-clinical-provider-specialty.input'
import { UserListClinicalProviderSpecialtyInput } from './dto/user-list-clinical-provider-specialty.input'
import { UserUpdateClinicalProviderSpecialtyInput } from './dto/user-update-clinical-provider-specialty.input'
import { UserUpdateClinicalProviderSpecialtiesInput } from './dto/user-update-clinical-provider-specialties.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserListSpecialtyInput } from '@case-clinical/api/specialty/data-access'

@Injectable()
export class ApiClinicalProviderSpecialtyDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClinicalProviderSpecialties(userId: string, input?: UserListClinicalProviderSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderSpecialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, specialty: true}
    })
  }

  async userSelectClinicalProviderSpecialties(userId: string, input?: UserListClinicalProviderSpecialtyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderSpecialty.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviderSpecialties(userId: string, input?: UserListClinicalProviderSpecialtyInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderSpecialty.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
specialtyId: input.specialtyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProviderSpecialty(userId: string, clinicalProviderSpecialtyId) {

    return this.data.clinicalProviderSpecialty.findUnique({ where: { id: clinicalProviderSpecialtyId } , include: {clinicalProvider: true, specialty: true}  })
  }

  async checkClinicalProviderSpecialtyExist(clinicalProviderSpecialtyName: string) {
    try {
      return this.data.clinicalProviderSpecialty.findMany({ where: { name: clinicalProviderSpecialtyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProviderSpecialty(userId: string, input: UserCreateClinicalProviderSpecialtyInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const clinicalProviderSpecialtyData = await this.checkClinicalProviderSpecialtyExist(input.name)

        if (clinicalProviderSpecialtyData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderSpecialty', 'Create', input)

    let clinicalProviderSpecialty = await this.data.clinicalProviderSpecialty.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
npi: input.npi, 

}
, include: {clinicalProvider: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderSpecialty', 'Create', clinicalProviderSpecialty)

    return clinicalProviderSpecialty

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider Specialty')
    }

  }


  
  

  async userUpdateClinicalProviderSpecialty(userId: string, clinicalProviderSpecialtyId: string, input: UserUpdateClinicalProviderSpecialtyInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderSpecialtyId) {
        throw new BadRequestException('Clinical Provider Specialty Id is required')
      } else {

      const clinicalProviderSpecialtyData = await this.checkClinicalProviderSpecialtyExist(input.name)

      if (clinicalProviderSpecialtyData.length > 0) {
        if (clinicalProviderSpecialtyData[0].id != clinicalProviderSpecialtyId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderSpecialty', 'Update', input)

    let clinicalProviderSpecialty = this.data.clinicalProviderSpecialty.update({
      where: { id: clinicalProviderSpecialtyId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
npi: input.npi, 

}
, include: {clinicalProvider: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderSpecialty', 'Update', clinicalProviderSpecialty)

    return clinicalProviderSpecialty

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider Specialty')
    }
  }

  async userUpdateClinicalProviderSpecialties(userId: string, input: UserUpdateClinicalProviderSpecialtiesInput): Promise<UpdateResult> {
    const total = input.clinicalProviderSpecialties.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.clinicalProviderSpecialties) {
      const inputData = input.clinicalProviderSpecialties[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
npi: inputData.npi, 
clinicalProviderId: inputData.clinicalProviderId, 
specialtyId: inputData.specialtyId, 

      }

      const clinicalProviderSpecialtyData = await this.checkClinicalProviderSpecialtyExist(inputData.name)

      if (clinicalProviderSpecialtyData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProviderSpecialty.upsert({
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


  async userDeleteClinicalProviderSpecialty(userId: string, clinicalProviderSpecialtyId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!clinicalProviderSpecialtyId) {
        throw new BadRequestException('Clinical Provider Specialty Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ClinicalProviderSpecialty', 'Delete', clinicalProviderSpecialtyId)

        let clinicalProviderSpecialty = this.data.clinicalProviderSpecialty.delete({
          where: { id: clinicalProviderSpecialtyId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProviderSpecialty', 'Delete', clinicalProviderSpecialty)

        return clinicalProviderSpecialty

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Clinical Provider Specialty')
    }
  }
}

