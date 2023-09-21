
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
} from '@case-clinical/api/auth/util'

import {
  ApiWhereDoesItHurtDataAccessPublicService,
  WhereDoesItHurt,
} from '@case-clinical/api/where-does-it-hurt/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiWhereDoesItHurtFeaturePublicResolver {
  constructor(private readonly service: ApiWhereDoesItHurtDataAccessPublicService) {}
           
}

