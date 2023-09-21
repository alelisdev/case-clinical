import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'
import { UiFormCarouselComponent } from './ui-form-carousel.component'
import { SwiperModule } from 'swiper/angular'

@NgModule({
  declarations: [UiFormCarouselComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'carousel',
          component: UiFormCarouselComponent,
        },
      ],
    }),
  ],
})
export class UiFormCarouselModule {}
