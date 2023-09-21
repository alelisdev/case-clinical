import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLanguageInput } from './user-update-language.input'

@InputType()
export class UserUpdateLanguagesInput {
  @Field(() => [UserUpdateLanguageInput], {nullable: true }) 
  languages: UserUpdateLanguageInput[]
}
