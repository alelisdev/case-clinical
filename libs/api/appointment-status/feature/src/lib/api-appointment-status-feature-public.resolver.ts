
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAppointmentStatusInput,
  ApiAppointmentStatusDataAccessPublicService,
  AppointmentStatus,
} from '@case-clinical/api/appointment-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAppointmentStatusFeaturePublicResolver {
  constructor(private readonly service: ApiAppointmentStatusDataAccessPublicService) {}
           
  @Query(() => [AppointmentStatus], { nullable: true })
  publicAppointmentStatuses(
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.publicAppointmentStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAppointmentStatuses(
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.publicCountAppointmentStatuses(input)
  }

  @Query(() => [AppointmentStatus], { nullable: true })
  publicSelectAppointmentStatuses(
    @Args({ name: 'input', type: () => UserListAppointmentStatusInput, nullable: true }) input?: UserListAppointmentStatusInput,
  ) {
    return this.service.publicSelectAppointmentStatuses(input)
  }

  @Query(() => AppointmentStatus, { nullable: true })
  publicAppointmentStatus(@Args('appointmentStatusId') appointmentStatusId: string) {
    return this.service.publicAppointmentStatus(appointmentStatusId)
  }
}
