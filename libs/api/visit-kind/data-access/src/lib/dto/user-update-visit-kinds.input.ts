import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateVisitKindInput } from './user-update-visit-kind.input'

@InputType()
export class UserUpdateVisitKindsInput {
  @Field(() => [UserUpdateVisitKindInput], {nullable: true }) 
  visitKinds: UserUpdateVisitKindInput[]
}
