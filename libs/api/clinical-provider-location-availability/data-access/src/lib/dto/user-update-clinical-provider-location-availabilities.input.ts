import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderLocationAvailabilityInput } from './user-update-clinical-provider-location-availability.input'

@InputType()
export class UserUpdateClinicalProviderLocationAvailabilitiesInput {
  @Field(() => [UserUpdateClinicalProviderLocationAvailabilityInput], {nullable: true }) 
  clinicalProviderLocationAvailabilities: UserUpdateClinicalProviderLocationAvailabilityInput[]
}
