
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBatchControlInput,
  ApiBatchControlDataAccessPublicService,
  BatchControl,
} from '@case-clinical/api/batch-control/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiBatchControlFeaturePublicResolver {
  constructor(private readonly service: ApiBatchControlDataAccessPublicService) {}
           
  @Query(() => [BatchControl], { nullable: true })
  publicBatchControls(
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.publicBatchControls(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBatchControls(
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.publicCountBatchControls(input)
  }

  @Query(() => [BatchControl], { nullable: true })
  publicSelectBatchControls(
    @Args({ name: 'input', type: () => UserListBatchControlInput, nullable: true }) input?: UserListBatchControlInput,
  ) {
    return this.service.publicSelectBatchControls(input)
  }

  @Query(() => BatchControl, { nullable: true })
  publicBatchControl(@Args('batchControlId') batchControlId: string) {
    return this.service.publicBatchControl(batchControlId)
  }
}
