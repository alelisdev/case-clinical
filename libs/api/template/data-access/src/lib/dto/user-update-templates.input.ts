import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTemplateInput } from './user-update-template.input'

@InputType()
export class UserUpdateTemplatesInput {
  @Field(() => [UserUpdateTemplateInput], {nullable: true }) 
  templates: UserUpdateTemplateInput[]
}
