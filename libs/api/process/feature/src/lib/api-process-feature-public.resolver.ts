
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcessInput,
  ApiProcessDataAccessPublicService,
  Process,
} from '@case-clinical/api/process/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcessFeaturePublicResolver {
  constructor(private readonly service: ApiProcessDataAccessPublicService) {}
           
  @Query(() => [Process], { nullable: true })
  publicProcesses(
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.publicProcesses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcesses(
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.publicCountProcesses(input)
  }

  @Query(() => [Process], { nullable: true })
  publicSelectProcesses(
    @Args({ name: 'input', type: () => UserListProcessInput, nullable: true }) input?: UserListProcessInput,
  ) {
    return this.service.publicSelectProcesses(input)
  }

  @Query(() => Process, { nullable: true })
  publicProcess(@Args('processId') processId: string) {
    return this.service.publicProcess(processId)
  }
}
