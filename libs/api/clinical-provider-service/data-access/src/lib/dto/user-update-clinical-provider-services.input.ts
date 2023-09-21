import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderServiceInput } from './user-update-clinical-provider-service.input'

@InputType()
export class UserUpdateClinicalProviderServicesInput {
  @Field(() => [UserUpdateClinicalProviderServiceInput], {nullable: true }) 
  clinicalProviderServices: UserUpdateClinicalProviderServiceInput[]
}
