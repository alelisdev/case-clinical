
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateMedicalConditionProviderInput } from './dto/user-create-medical-condition-provider.input'
import { UserListMedicalConditionProviderInput } from './dto/user-list-medical-condition-provider.input'
import { UserUpdateMedicalConditionProviderInput } from './dto/user-update-medical-condition-provider.input'
import { UserUpdateMedicalConditionProvidersInput } from './dto/user-update-medical-condition-providers.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiMedicalConditionProviderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userMedicalConditionProviders(userId: string, input?: UserListMedicalConditionProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalConditionProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async userSelectMedicalConditionProviders(userId: string, input?: UserListMedicalConditionProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalConditionProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountMedicalConditionProviders(userId: string, input?: UserListMedicalConditionProviderInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalConditionProvider.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userMedicalConditionProvider(userId: string, medicalConditionProviderId) {

    return this.data.medicalConditionProvider.findUnique({ 
      where: { id: medicalConditionProviderId } , 
      include: {
        clinicalProvider: true, 
        medicalRecords: {
          include: {
            medicalConditionProvider: true,
            patientStudy: true,
            procedureVendor: true, 
            contract: true,
            patient: true,
            prescriptions: true
          }
        }
      }  })
  }

  async checkMedicalConditionProviderExist(medicalConditionProviderName: string) {
    try {
      return this.data.medicalConditionProvider.findMany({ where: { name: medicalConditionProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateMedicalConditionProvider(userId: string, input: UserCreateMedicalConditionProviderInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const medicalConditionProviderData = await this.checkMedicalConditionProviderExist(input.name)

        if (medicalConditionProviderData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'MedicalConditionProvider', 'Create', input)

    let medicalConditionProvider = await this.data.medicalConditionProvider.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, medicalRecords: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedicalConditionProvider', 'Create', medicalConditionProvider)

    return medicalConditionProvider

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Medical Condition Provider')
    }

  }


  
  

  async userUpdateMedicalConditionProvider(userId: string, medicalConditionProviderId: string, input: UserUpdateMedicalConditionProviderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!medicalConditionProviderId) {
        throw new BadRequestException('Medical Condition Provider Id is required')
      } else {

      const medicalConditionProviderData = await this.checkMedicalConditionProviderExist(input.name)

      if (medicalConditionProviderData.length > 0) {
        if (medicalConditionProviderData[0].id != medicalConditionProviderId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'MedicalConditionProvider', 'Update', input)

    let medicalConditionProvider = this.data.medicalConditionProvider.update({
      where: { id: medicalConditionProviderId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, medicalRecords: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedicalConditionProvider', 'Update', medicalConditionProvider)

    return medicalConditionProvider

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Medical Condition Provider')
    }
  }

  async userUpdateMedicalConditionProviders(userId: string, input: UserUpdateMedicalConditionProvidersInput): Promise<UpdateResult> {
    const total = input.medicalConditionProviders.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.medicalConditionProviders) {
      const inputData = input.medicalConditionProviders[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
medicalConditionId: inputData.medicalConditionId, 
clinicalProviderId: inputData.clinicalProviderId, 

      }

      const medicalConditionProviderData = await this.checkMedicalConditionProviderExist(inputData.name)

      if (medicalConditionProviderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.medicalConditionProvider.upsert({
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


  async userDeleteMedicalConditionProvider(userId: string, medicalConditionProviderId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!medicalConditionProviderId) {
        throw new BadRequestException('Medical Condition Provider Id is required')
      } else {

        const documentCount = await this.data.document.count({ where: { medicalConditionProviderId: medicalConditionProviderId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }

        await this.data.logEvent(sendingUser, true, 'MedicalConditionProvider', 'Delete', medicalConditionProviderId)

        let medicalConditionProvider = this.data.medicalConditionProvider.delete({
          where: { id: medicalConditionProviderId }
        })

        await this.data.logEvent(sendingUser, false, 'MedicalConditionProvider', 'Delete', medicalConditionProvider)

        return medicalConditionProvider

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Medical Condition Provider')
    }
  }
}

