
import { ApiCoreSharedService, CorePaging } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { UserCreateTenantInput } from './dto/user-create-tenant.input'
import { UserListTenantInput } from './dto/user-list-tenant.input'
import { UserUpdateTenantInput } from './dto/user-update-tenant.input'
import { UserUpdateTenantsInput } from './dto/user-update-tenants.input'

@Injectable()
export class ApiTenantDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) { }

  async userUpdateTenants(userId: string, input: UserUpdateTenantsInput) {
    console.log(input.tenants)
    const total = input.tenants.length;
    let updated = [];
    let created = [];
    let failed = [];    input.tenants.forEach(async (inputData) => {
      const data = {
        name: inputData.name,
        code: inputData.code,
      }
      try {
        const result = await this.data.tenant.upsert({
          where: { id: inputData.id || "" },
          create: data,
          update: data
        })
        if (result.id === inputData.id)
          updated.push(result);
        else {
          created.push(result);
        }
      } catch (error) {
        failed.push(inputData);
      }
    })
    return {
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
  }

  async userTenants(userId: string, input?: UserListTenantInput) {

    return this.data.tenant.findMany({
      where: {
        AND: [{
          name: { contains: input?.name },
        }]
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectTenants(userId: string, input?: UserListTenantInput) {
    return this.data.tenant.findMany({
      where: {
        AND: [{
          name: { contains: input?.name },
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

  async userCountTenants(userId: string, input?: UserListTenantInput): Promise<CorePaging> {

    const total = await this.data.tenant.count(
      {
        where: {
          AND: [{
            name: { contains: input?.name },
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

  async userTenant(userId: string, tenantId) {

    return this.data.tenant.findUnique({ where: { id: tenantId } })
  }

  async checkTenantExist(tenantName: string) {
    try {
      return this.data.tenant.findMany({ where: { name: tenantName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTenant(userId: string, input: UserCreateTenantInput) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      const tenantData = await this.checkTenantExist(input.name)

      if (tenantData.length > 0) {
        throw new ConflictException("Record must be unique.")
      }



      await this.data.logEvent(sendingUser, true, 'Tenant', 'Create', input)

      const tenant = await this.data.tenant.create({
        data: {
          name: input.name,
        }
      })

      await this.data.logEvent(sendingUser, false, 'Tenant', 'Create', tenant)

      return tenant

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Tenant')
    }
  }

  async userUpdateTenant(userId: string, tenantId: string, input: UserUpdateTenantInput) {

    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!tenantId) {
        throw new BadRequestException('Tenant Id is required')
      } else {

        const tenantData = await this.checkTenantExist(input.name)

        if (tenantData.length > 0) {
          if (tenantData[0].id != tenantId) {
            throw new ConflictException("Record must be unique.")
          }
        }



        await this.data.logEvent(sendingUser, true, 'Tenant', 'Update', input)

        const tenant = this.data.tenant.update({
          where: { id: tenantId },
          data: {
            name: input.name,
          }
        })

        await this.data.logEvent(sendingUser, false, 'Tenant', 'Update', tenant)
        return tenant

      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Error in updating Tenant')
      }
      throw new InternalServerErrorException('Error in updating Tenant')
    }
  }

  async userDeleteTenant(userId: string, tenantId: string) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!tenantId) {
        throw new BadRequestException('Tenant Id is required')
      } else {
        await this.data.logEvent(sendingUser, true, 'Tenant', 'Delete', tenantId)

        const tenant = this.data.tenant.delete({
          where: { id: tenantId }
        })

        await this.data.logEvent(sendingUser, false, 'Tenant', 'Delete', tenant)

        return tenant

      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Error in deleting Tenant')
      }
      throw new InternalServerErrorException('Error in deleting Tenant')
    }
  }
}

