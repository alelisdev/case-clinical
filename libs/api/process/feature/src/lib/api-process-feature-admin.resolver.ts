
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcessInput,
  AdminListProcessInput,
  AdminUpdateProcessInput,
  ApiProcessDataAccessAdminService,
  Process
} from '@case-clinical/api/process/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcessFeatureAdminResolver {
  constructor(private readonly service: ApiProcessDataAccessAdminService) {}

  @Query(() => [Process], { nullable: true })
  adminProcesses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcessInput, nullable: true }) input?: AdminListProcessInput,
  ) {
    return this.service.adminProcesses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcesses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcessInput, nullable: true }) input?: AdminListProcessInput,
  ) {
    return this.service.adminCountProcesses(admin.id, input)
  }





  @Query(() => Process, { nullable: true })
  adminProcess(@CtxUser() admin: User, @Args('processId') processId: string) {
    return this.service.adminProcess(admin.id, processId)
  }

  @Mutation(() => Process, { nullable: true })
  adminCreateProcess(@CtxUser() admin: User, @Args('input') input: AdminCreateProcessInput,) {
    return this.service.adminCreateProcess(admin.id, input)
  }

  @Mutation(() => Process, { nullable: true })
  adminUpdateProcess(
    @CtxUser() admin: User,
    @Args('processId') processId: string,
    @Args('input') input: AdminUpdateProcessInput,
  ) {
    return this.service.adminUpdateProcess(admin.id, processId, input)
  }

  @Mutation(() => Process, { nullable: true })
  adminDeleteProcess(@CtxUser() admin: User, @Args('processId') processId: string) {
    return this.service.adminDeleteProcess(admin.id, processId)
  }
}

