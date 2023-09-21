
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
} from '@case-clinical/api/auth/util'

import {
  ApiNotificationDataAccessPublicService,
  Notification,
} from '@case-clinical/api/notification/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiNotificationFeaturePublicResolver {
  constructor(private readonly service: ApiNotificationDataAccessPublicService) {}
           
}

