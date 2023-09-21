import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'

const modules = [        
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule
]
@NgModule({
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ],
})
export class SharedModule {}
