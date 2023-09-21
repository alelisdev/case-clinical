
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListFirmStatusInput,
  ApiFirmStatusDataAccessPublicService,
  FirmStatus,
} from '@case-clinical/api/firm-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiFirmStatusFeaturePublicResolver {
  constructor(private readonly service: ApiFirmStatusDataAccessPublicService) {}
           
  @Query(() => [FirmStatus], { nullable: true })
  publicFirmStatuses(
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.publicFirmStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountFirmStatuses(
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.publicCountFirmStatuses(input)
  }

  @Query(() => [FirmStatus], { nullable: true })
  publicSelectFirmStatuses(
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.publicSelectFirmStatuses(input)
  }

  @Query(() => FirmStatus, { nullable: true })
  publicFirmStatus(@Args('firmStatusId') firmStatusId: string) {
    return this.service.publicFirmStatus(firmStatusId)
  }
}
