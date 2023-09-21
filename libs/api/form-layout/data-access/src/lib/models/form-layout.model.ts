import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FormLayout {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  config?: string

  @Field({ nullable: true })
  customLayouts?: string

  @Field({ nullable: true })
  type?: number

  @Field({ nullable: true })
  order?: number

  @Field({ nullable: true })
  previewImage?: string

  @Field({ nullable: true })
  parentId?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  testData?: string

  @Field({ nullable: true })
  modelData?: string

  @Field(() => [FormLayout], { nullable: true })
  children?: FormLayout[]
}
