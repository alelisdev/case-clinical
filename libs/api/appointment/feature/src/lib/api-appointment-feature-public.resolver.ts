
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAppointmentInput,
  ApiAppointmentDataAccessPublicService,
  Appointment,
} from '@case-clinical/api/appointment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAppointmentFeaturePublicResolver {
  constructor(private readonly service: ApiAppointmentDataAccessPublicService) {}
           
  @Query(() => [Appointment], { nullable: true })
  publicAppointments(
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.publicAppointments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAppointments(
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.publicCountAppointments(input)
  }

  @Query(() => [Appointment], { nullable: true })
  publicSelectAppointments(
    @Args({ name: 'input', type: () => UserListAppointmentInput, nullable: true }) input?: UserListAppointmentInput,
  ) {
    return this.service.publicSelectAppointments(input)
  }

  @Query(() => Appointment, { nullable: true })
  publicAppointment(@Args('appointmentId') appointmentId: string) {
    return this.service.publicAppointment(appointmentId)
  }
}
