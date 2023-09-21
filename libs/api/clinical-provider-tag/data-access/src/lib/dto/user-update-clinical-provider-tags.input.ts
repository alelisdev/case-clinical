import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClinicalProviderTagInput } from './user-update-clinical-provider-tag.input'

@InputType()
export class UserUpdateClinicalProviderTagsInput {
  @Field(() => [UserUpdateClinicalProviderTagInput], {nullable: true }) 
  clinicalProviderTags: UserUpdateClinicalProviderTagInput[]
}
