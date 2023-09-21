import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderInput } from './user-update-clinical-provider.input'

@InputType()
export class UserUpdateClinicalProvidersInput {
  @Field(() => [UserUpdateClinicalProviderInput], {nullable: true }) 
  clinicalProviders: UserUpdateClinicalProviderInput[]
}
