import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFeatureInput } from './user-update-feature.input'

@InputType()
export class UserUpdateFeaturesInput {
  @Field(() => [UserUpdateFeatureInput], {nullable: true }) 
  features: UserUpdateFeatureInput[]
}
