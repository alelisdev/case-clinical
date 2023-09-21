
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateDocumentTypeInput,
  UserListDocumentTypeInput,
  UserUpdateDocumentTypeInput,
  UserUpdateDocumentTypesInput,
  ApiDocumentTypeDataAccessUserService,
  DocumentType,
} from '@case-clinical/api/document-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiDocumentTypeFeatureUserResolver {
  constructor(private readonly service: ApiDocumentTypeDataAccessUserService) {}

  @Query(() => [DocumentType], { nullable: true })
  userDocumentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.userDocumentTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountDocumentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.userCountDocumentTypes(user.id, input)
  }

  @Query(() => [DocumentType], { nullable: true })
  userSelectDocumentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentTypeInput, nullable: true }) input?: UserListDocumentTypeInput,
  ) {
    return this.service.userSelectDocumentTypes(user.id, input)
  }







  @Query(() => DocumentType, { nullable: true })
  userDocumentType(@CtxUser() user: User, @Args('documentTypeId') documentTypeId: string) {
    return this.service.userDocumentType(user.id, documentTypeId)
  }

  @Mutation(() => DocumentType, { nullable: true })
  userCreateDocumentType(@CtxUser() user: User, @Args('input') input: UserCreateDocumentTypeInput,) {
    return this.service.userCreateDocumentType(user.id, input)
  }

  @Mutation(() => DocumentType, { nullable: true })
  userUpdateDocumentType(
    @CtxUser() user: User,
    @Args('documentTypeId') documentTypeId: string,
    @Args('input') input: UserUpdateDocumentTypeInput,
  ) {
    return this.service.userUpdateDocumentType(user.id, documentTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateDocumentTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateDocumentTypesInput,
  ) {
    return this.service.userUpdateDocumentTypes(user.id, input)
  }

  @Mutation(() => DocumentType, { nullable: true })
  userDeleteDocumentType(@CtxUser() user: User, @Args('documentTypeId') documentTypeId: string) {
    return this.service.userDeleteDocumentType(user.id, documentTypeId)
  }
}

