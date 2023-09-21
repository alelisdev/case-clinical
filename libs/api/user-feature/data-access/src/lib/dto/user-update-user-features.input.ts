import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserFeatureInput } from './user-update-user-feature.input'

@InputType()
export class UserUpdateUserFeaturesInput {
  @Field(() => [UserUpdateUserFeatureInput], {nullable: true }) 
  userFeatures: UserUpdateUserFeatureInput[]
}
