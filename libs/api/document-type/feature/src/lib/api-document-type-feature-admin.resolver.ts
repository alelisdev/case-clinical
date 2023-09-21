
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateDocumentTypeInput,
  AdminListDocumentTypeInput,
  AdminUpdateDocumentTypeInput,
  ApiDocumentTypeDataAccessAdminService,
  DocumentType
} from '@case-clinical/api/document-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiDocumentTypeFeatureAdminResolver {
  constructor(private readonly service: ApiDocumentTypeDataAccessAdminService) {}

  @Query(() => [DocumentType], { nullable: true })
  adminDocumentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentTypeInput, nullable: true }) input?: AdminListDocumentTypeInput,
  ) {
    return this.service.adminDocumentTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountDocumentTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentTypeInput, nullable: true }) input?: AdminListDocumentTypeInput,
  ) {
    return this.service.adminCountDocumentTypes(admin.id, input)
  }





  @Query(() => DocumentType, { nullable: true })
  adminDocumentType(@CtxUser() admin: User, @Args('documentTypeId') documentTypeId: string) {
    return this.service.adminDocumentType(admin.id, documentTypeId)
  }

  @Mutation(() => DocumentType, { nullable: true })
  adminCreateDocumentType(@CtxUser() admin: User, @Args('input') input: AdminCreateDocumentTypeInput,) {
    return this.service.adminCreateDocumentType(admin.id, input)
  }

  @Mutation(() => DocumentType, { nullable: true })
  adminUpdateDocumentType(
    @CtxUser() admin: User,
    @Args('documentTypeId') documentTypeId: string,
    @Args('input') input: AdminUpdateDocumentTypeInput,
  ) {
    return this.service.adminUpdateDocumentType(admin.id, documentTypeId, input)
  }

  @Mutation(() => DocumentType, { nullable: true })
  adminDeleteDocumentType(@CtxUser() admin: User, @Args('documentTypeId') documentTypeId: string) {
    return this.service.adminDeleteDocumentType(admin.id, documentTypeId)
  }
}

