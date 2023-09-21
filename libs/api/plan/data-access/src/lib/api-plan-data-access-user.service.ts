import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService} from '@case-clinical/api/core/data-access'
import { UserListPlanInput } from './dto/user-list-plan.input'
import { UserUpdateBillingInfoInput } from '../../../../stripe/data-access/src/lib/dto/user-update-billing-info-input'

@Injectable()
export class ApiPlanDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) { }

  async userPlans(userPlanId: string, input: UserListPlanInput) {
    let plans = await this.data.plan.findMany({})
    plans = plans.map((plan) => {
      if(plan.id === userPlanId) {
        plan['isMine'] = true
      } else {
        plan['isMine'] = false
      }
      return plan;
    })
    return plans;
  }
}

