import { AdminCreateTenantInput } from './dto/admin-create-tenant.input'
import { AdminListTenantInput } from './dto/admin-list-tenant.input'
import { AdminUpdateTenantInput } from './dto/admin-update-tenant.input'
import { ApiCoreDataAccessService, CorePaging } from '@case-clinical/api/core/data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiTenantDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) { }

  async adminTenants(adminId: string, input?: AdminListTenantInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.tenant.findMany({
      where: {
        name: {
          contains: input?.name
        }
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async adminCountTenants(adminId: string, input?: AdminListTenantInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.tenant.count(
      {
        where: {
          name: {
            contains: input?.name
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

  async adminTenant(adminId: string, tenantId) {
    await this.data.ensureAdminUser(adminId)
    return this.data.tenant.findUnique({ where: { id: tenantId } })
  }

  async adminCreateTenant(adminId: string, input: AdminCreateTenantInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.tenant.create({
      data: {
        name: input.name,
      }
    })
  }

  async adminUpdateTenant(adminId: string, tenantId, input: AdminUpdateTenantInput) {
    await this.data.ensureAdminUser(adminId)

    const updateData = {}

    if(input.name) updateData['name'] = input.name
    if(input.email) updateData['email'] = input.email
    if(input.logo_url) updateData['logo_url'] = input.logo_url
    if(input.country) updateData['country'] = input.country
    if(input.phone) updateData['phone'] = input.phone

    return this.data.tenant.update({
      where: { id: tenantId },
      data: updateData
    })
  }

  async adminDeleteTenant(adminId: string, tenantId) {
    await this.data.ensureAdminUser(adminId)
    return this.data.tenant.delete({ where: { id: tenantId } })
  }
}

