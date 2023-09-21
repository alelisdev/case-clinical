import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderSpecialtyInput } from './user-update-clinical-provider-specialty.input'

@InputType()
export class UserUpdateClinicalProviderSpecialtiesInput {
  @Field(() => [UserUpdateClinicalProviderSpecialtyInput], {nullable: true }) 
  clinicalProviderSpecialties: UserUpdateClinicalProviderSpecialtyInput[]
}
