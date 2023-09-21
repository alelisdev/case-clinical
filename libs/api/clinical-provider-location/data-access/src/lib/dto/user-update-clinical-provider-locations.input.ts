import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderLocationInput } from './user-update-clinical-provider-location.input'

@InputType()
export class UserUpdateClinicalProviderLocationsInput {
  @Field(() => [UserUpdateClinicalProviderLocationInput], {nullable: true }) 
  clinicalProviderLocations: UserUpdateClinicalProviderLocationInput[]
}
