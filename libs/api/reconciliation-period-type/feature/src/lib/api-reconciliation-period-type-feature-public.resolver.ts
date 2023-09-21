
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListReconciliationPeriodTypeInput,
  ApiReconciliationPeriodTypeDataAccessPublicService,
  ReconciliationPeriodType,
} from '@case-clinical/api/reconciliation-period-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiReconciliationPeriodTypeFeaturePublicResolver {
  constructor(private readonly service: ApiReconciliationPeriodTypeDataAccessPublicService) {}
           
  @Query(() => [ReconciliationPeriodType], { nullable: true })
  publicReconciliationPeriodTypes(
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.publicReconciliationPeriodTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountReconciliationPeriodTypes(
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.publicCountReconciliationPeriodTypes(input)
  }

  @Query(() => [ReconciliationPeriodType], { nullable: true })
  publicSelectReconciliationPeriodTypes(
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.publicSelectReconciliationPeriodTypes(input)
  }

  @Query(() => ReconciliationPeriodType, { nullable: true })
  publicReconciliationPeriodType(@Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string) {
    return this.service.publicReconciliationPeriodType(reconciliationPeriodTypeId)
  }
}
