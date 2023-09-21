import { FormLayout } from '../../../data-access/src/lib/models/form-layout.model';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'
import { ApiFormLayoutDataAccessService } from '@case-clinical/api/form-layout/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFormLayoutFeatureUserResolver {
  constructor(private readonly service: ApiFormLayoutDataAccessService) { }

  @Query(() => FormLayout, { nullable: true })
  userFormLayout(
    @CtxUser() user: User,
    @Args({ name: 'formName', type: () => String, nullable: true }) formName?: string,
  ) {
    return this.service.userFormLayout(user.id, formName)
  }

  @Query(() => FormLayout, { nullable: true })
  userWebTemplate(
    @CtxUser() user: User,
    @Args({ name: 'formName', type: () => String, nullable: true }) formName?: string,
  ) {
    return this.service.userWebTemplate(user.id, formName)
  }

  @Query(() => FormLayout, { nullable: true })
  userWebWrapper(
    @CtxUser() user: User,
    @Args({ name: 'formName', type: () => String, nullable: true }) formName?: string,
  ) {
    return this.service.userWebWrapper(user.id, formName)
  }

  @Query(() => FormLayout, { nullable: true })
  userWebComponent(
    @CtxUser() user: User,
    @Args({ name: 'formName', type: () => String, nullable: true }) formName?: string,
  ) {
    return this.service.userWebComponent(user.id, formName)
  }

  @Query(() => [FormLayout], { nullable: true })
  userWebTemplates(
    @CtxUser() user: User,
  ) {
    return this.service.userWebTemplates(user.id)
  }

  @Query(() => [FormLayout], { nullable: true })
  userWebWrappers(
    @CtxUser() user: User,
  ) {
    return this.service.userWebWrappers(user.id)
  }

  @Query(() => [FormLayout], { nullable: true })
  userWebComponents(
    @CtxUser() user: User,
  ) {
    return this.service.userWebComponents(user.id)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userCreateFormLayout(
    @CtxUser() user: User,
    @Args('input') formName: string,
    @Args('config') config: string,
  ) {
    return this.service.userCreateFormLayout(user.id, formName, config, 0)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userCreateWebComponent(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
  ) {
    return this.service.userCreateFormLayout(user.id, formName, config, 1)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userCreateWebTemplate(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
  ) {
    return this.service.userCreateFormLayout(user.id, formName, config, 2)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userCreateWebWrapper(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
  ) {
    return this.service.userCreateFormLayout(user.id, formName, config, 3)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userUpdateFormLayout(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
    @Args('testData') testData: string,
  ) {
    return this.service.userUpdateFormLayout(user.id, formName, config, 0, "", testData)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userUpdateWebComponent(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
    @Args('previewImage') previewImage: string,
    @Args('testData') testData: string,
  ) {
    return this.service.userUpdateFormLayout(user.id, formName, config, 1, previewImage, testData)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userUpdateWebTemplate(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
    @Args('previewImage') previewImage: string,
    @Args('testData') testData: string,
  ) {
    return this.service.userUpdateFormLayout(user.id, formName, config, 2, previewImage, testData)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userUpdateWebWrapper(
    @CtxUser() user: User,
    @Args('formName') formName: string,
    @Args('config') config: string,
    @Args('previewImage') previewImage: string,
    @Args('testData') testData: string,
  ) {
    return this.service.userUpdateFormLayout(user.id, formName, config, 3, previewImage, testData)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userDeleteFormLayout(
    @CtxUser() user: User,
    @Args('formName') formName: string,
  ) {
    return this.service.userDeleteFormLayout(user.id, formName)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userDeleteWebComponent(
    @CtxUser() user: User,
    @Args('formName') formName: string,
  ) {
    return this.service.userDeleteFormLayout(user.id, formName)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userDeleteWebTemplate(
    @CtxUser() user: User,
    @Args('formName') formName: string,
  ) {
    return this.service.userDeleteFormLayout(user.id, formName)
  }

  @Mutation(() => FormLayout, { nullable: true })
  userDeleteWebWrapper(
    @CtxUser() user: User,
    @Args('formName') formName: string,
  ) {
    return this.service.userDeleteFormLayout(user.id, formName)
  }

}

