
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPrescriptionInput,
  ApiPrescriptionDataAccessPublicService,
  Prescription,
} from '@case-clinical/api/prescription/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPrescriptionFeaturePublicResolver {
  constructor(private readonly service: ApiPrescriptionDataAccessPublicService) {}
           
  @Query(() => [Prescription], { nullable: true })
  publicPrescriptions(
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.publicPrescriptions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPrescriptions(
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.publicCountPrescriptions(input)
  }

  @Query(() => [Prescription], { nullable: true })
  publicSelectPrescriptions(
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.publicSelectPrescriptions(input)
  }

  @Query(() => Prescription, { nullable: true })
  publicPrescription(@Args('prescriptionId') prescriptionId: string) {
    return this.service.publicPrescription(prescriptionId)
  }
}
