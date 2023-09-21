
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListFirmInput,
  ApiFirmDataAccessPublicService,
  Firm,
} from '@case-clinical/api/firm/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiFirmFeaturePublicResolver {
  constructor(private readonly service: ApiFirmDataAccessPublicService) {}
           
  @Query(() => [Firm], { nullable: true })
  publicFirms(
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.publicFirms(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountFirms(
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.publicCountFirms(input)
  }

  @Query(() => [Firm], { nullable: true })
  publicSelectFirms(
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.publicSelectFirms(input)
  }

  @Query(() => Firm, { nullable: true })
  publicFirm(@Args('firmId') firmId: string) {
    return this.service.publicFirm(firmId)
  }
}
