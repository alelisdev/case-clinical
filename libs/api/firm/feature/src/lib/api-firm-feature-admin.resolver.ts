
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFirmInput,
  AdminListFirmInput,
  AdminUpdateFirmInput,
  ApiFirmDataAccessAdminService,
  Firm
} from '@case-clinical/api/firm/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListFirmStatusInput, FirmStatus } from '@case-clinical/api/firm-status/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFirmFeatureAdminResolver {
  constructor(private readonly service: ApiFirmDataAccessAdminService) {}

  @Query(() => [Firm], { nullable: true })
  adminFirms(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFirmInput, nullable: true }) input?: AdminListFirmInput,
  ) {
    return this.service.adminFirms(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFirms(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFirmInput, nullable: true }) input?: AdminListFirmInput,
  ) {
    return this.service.adminCountFirms(admin.id, input)
  }





  @Query(() => Firm, { nullable: true })
  adminFirm(@CtxUser() admin: User, @Args('firmId') firmId: string) {
    return this.service.adminFirm(admin.id, firmId)
  }

  @Mutation(() => Firm, { nullable: true })
  adminCreateFirm(@CtxUser() admin: User, @Args('input') input: AdminCreateFirmInput,) {
    return this.service.adminCreateFirm(admin.id, input)
  }

  @Mutation(() => Firm, { nullable: true })
  adminUpdateFirm(
    @CtxUser() admin: User,
    @Args('firmId') firmId: string,
    @Args('input') input: AdminUpdateFirmInput,
  ) {
    return this.service.adminUpdateFirm(admin.id, firmId, input)
  }

  @Mutation(() => Firm, { nullable: true })
  adminDeleteFirm(@CtxUser() admin: User, @Args('firmId') firmId: string) {
    return this.service.adminDeleteFirm(admin.id, firmId)
  }
}

