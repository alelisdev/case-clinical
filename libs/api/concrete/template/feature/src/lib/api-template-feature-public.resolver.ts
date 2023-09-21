
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
} from '@case-clinical/api/auth/util'

import {
  ApiTemplateDataAccessPublicService,
  Template,
} from '@case-clinical/api/template/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTemplateFeaturePublicResolver {
  constructor(private readonly service: ApiTemplateDataAccessPublicService) {}
           
}

