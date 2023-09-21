
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService,  } from '@case-clinical/api/core/data-access'
import { AdminCreatePlanInput } from './dto/admin-create-plan-input'


@Injectable()
export class ApiPlanDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCreatePlan(input: AdminCreatePlanInput) {
    return this.data.plan.create({
      data: {
        name: input.name,
        detail: input.detail,
        price: input.price
      }
    })
  }
}

