
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureVendorInput } from './dto/user-create-procedure-vendor.input'
import { UserListProcedureVendorInput } from './dto/user-list-procedure-vendor.input'
import { UserUpdateProcedureVendorInput } from './dto/user-update-procedure-vendor.input'
import { UserUpdateProcedureVendorsInput } from './dto/user-update-procedure-vendors.input'

import { UserListCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'
import { UserListContractInput } from '@case-clinical/api/contract/data-access'
import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'
import { UserListProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access'

@Injectable()
export class ApiProcedureVendorDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureVendors(userId: string, input?: UserListProcedureVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {procedure: true, contract: true, vendor: true, status: true}
    })
  }

  async userSelectProcedureVendors(userId: string, input?: UserListProcedureVendorInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendor.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountProcedureVendors(userId: string, input?: UserListProcedureVendorInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendor.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            procedureId: input.procedureId,
contractId: input.contractId,
vendorId: input.vendorId,
statusId: input.statusId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userProcedureVendor(userId: string, procedureVendorId) {

    return this.data.procedureVendor.findUnique({ where: { id: procedureVendorId } , include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true}  })
  }

  async checkProcedureVendorExist(procedureVendorName: string) {
    try {
      return this.data.procedureVendor.findMany({ where: { name: procedureVendorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureVendor(userId: string, input: UserCreateProcedureVendorInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureVendorData = await this.checkProcedureVendorExist(input.name)

        if (procedureVendorData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureVendor', 'Create', input)

    let procedureVendor = await this.data.procedureVendor.create({
      data: {

                procedure:
                input.procedureId != null
                ? {
                        connect:  {
                            id: input.procedureId
                        }
                    }: undefined,
                contract:
                input.contractId != null
                ? {
                        connect:  {
                            id: input.contractId
                        }
                    }: undefined,
                vendor:
                input.vendorId != null
                ? {
                        connect:  {
                            id: input.vendorId
                        }
                    }: undefined,
                status:
                input.statusId != null
                ? {
                        connect:  {
                            id: input.statusId
                        }
                    }: undefined,name: input.name,
estimate: input.estimate,
fundingApproved: input.fundingApproved,

}
, include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureVendor', 'Create', procedureVendor)

    return procedureVendor

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure Vendor')
    }

  }





  async userUpdateProcedureVendor(userId: string, procedureVendorId: string, input: UserUpdateProcedureVendorInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    console.log({ procedureVendorId, input})
    try {
      if (!procedureVendorId) {
        throw new BadRequestException('Procedure Vendor Id is required')
      } else {

      const procedureVendorData = await this.checkProcedureVendorExist(input.name)

      if (procedureVendorData.length > 0) {
        if (procedureVendorData[0].id != procedureVendorId) {
          throw new ConflictException("Record must be unique.")
        }
      }

    if(!input.statusId && input.status) {
      const status = await this.data.procedureVendorStatus.findFirst({
        where: {
          id: input.status.id,
          name: input.status.name
        }
      });
      if(!status) throw new BadRequestException(`Cannot find procedureVendorStatus named ${input.status.name}`);
      else input.statusId = status.id;
    }

    await this.data.logEvent(sendingUser, true, 'ProcedureVendor', 'Update', input)

    let procedureVendor = this.data.procedureVendor.update({
      where: { id: procedureVendorId },
      data: {

                procedure:
                input.procedureId != null
                ? {
                        connect:  {
                            id: input.procedureId
                        }
                    }: undefined,
                contract:
                input.contractId != null
                ? {
                        connect:  {
                            id: input.contractId
                        }
                    }: undefined,
                vendor:
                input.vendorId != null
                ? {
                        connect:  {
                            id: input.vendorId
                        }
                    }: undefined,
                status:
                input.statusId != null
                ? {
                        connect:  {
                            id: input.statusId
                        }
                    }: undefined,name: input.name,
estimate: input.estimate,
fundingApproved: input.fundingApproved,

}
, include: {procedure: true, contract: true, vendor: true, status: true, caseAccounts: true, documents: true}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureVendor', 'Update', procedureVendor)

    return procedureVendor

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure Vendor')
    }
  }

  async userUpdateProcedureVendors(userId: string, input: UserUpdateProcedureVendorsInput): Promise<UpdateResult> {
    const total = input.procedureVendors.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureVendors) {
      const inputData = input.procedureVendors[key]

      const data = {
        id: inputData.id,
name: inputData.name,
procedureId: inputData.procedureId,
contractId: inputData.contractId,
vendorId: inputData.vendorId,
statusId: inputData.statusId,
estimate: inputData.estimate,
fundingApproved: inputData.fundingApproved,

      }

      const procedureVendorData = await this.checkProcedureVendorExist(inputData.name)

      if (procedureVendorData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureVendor.upsert({
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


  async userDeleteProcedureVendor(userId: string, procedureVendorId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureVendorId) {
        throw new BadRequestException('Procedure Vendor Id is required')
      } else {


        const caseAccountCount = await this.data.caseAccount.count({ where: { procedureVendorId: procedureVendorId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        const documentCount = await this.data.document.count({ where: { procedureVendorId: procedureVendorId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }


        await this.data.logEvent(sendingUser, true, 'ProcedureVendor', 'Delete', procedureVendorId)

        let procedureVendor = this.data.procedureVendor.delete({
          where: { id: procedureVendorId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureVendor', 'Delete', procedureVendor)

        return procedureVendor

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Procedure Vendor')
    }
  }
}

