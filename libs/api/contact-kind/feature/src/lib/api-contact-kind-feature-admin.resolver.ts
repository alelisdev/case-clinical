
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactKindInput,
  AdminListContactKindInput,
  AdminUpdateContactKindInput,
  ApiContactKindDataAccessAdminService,
  ContactKind
} from '@case-clinical/api/contact-kind/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactKindFeatureAdminResolver {
  constructor(private readonly service: ApiContactKindDataAccessAdminService) {}

  @Query(() => [ContactKind], { nullable: true })
  adminContactKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactKindInput, nullable: true }) input?: AdminListContactKindInput,
  ) {
    return this.service.adminContactKinds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContactKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactKindInput, nullable: true }) input?: AdminListContactKindInput,
  ) {
    return this.service.adminCountContactKinds(admin.id, input)
  }





  @Query(() => ContactKind, { nullable: true })
  adminContactKind(@CtxUser() admin: User, @Args('contactKindId') contactKindId: string) {
    return this.service.adminContactKind(admin.id, contactKindId)
  }

  @Mutation(() => ContactKind, { nullable: true })
  adminCreateContactKind(@CtxUser() admin: User, @Args('input') input: AdminCreateContactKindInput,) {
    return this.service.adminCreateContactKind(admin.id, input)
  }

  @Mutation(() => ContactKind, { nullable: true })
  adminUpdateContactKind(
    @CtxUser() admin: User,
    @Args('contactKindId') contactKindId: string,
    @Args('input') input: AdminUpdateContactKindInput,
  ) {
    return this.service.adminUpdateContactKind(admin.id, contactKindId, input)
  }

  @Mutation(() => ContactKind, { nullable: true })
  adminDeleteContactKind(@CtxUser() admin: User, @Args('contactKindId') contactKindId: string) {
    return this.service.adminDeleteContactKind(admin.id, contactKindId)
  }
}

