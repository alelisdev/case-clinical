import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'auth-sign-up-settings',
  templateUrl: './sign-up-settings.component.html',
})
export class SignUpSettingsComponent {
  @Input() panels = []

  signInForm: FormGroup
  horizontalStepperForm: FormGroup;
  verticalStepperForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    })
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        language: ['', Validators.required]
      }),
      step2: this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        about: ['']
      }),
      step3: this._formBuilder.group({
        byEmail: this._formBuilder.group({
          companyNews: [true],
          featuredProducts: [false],
          messages: [true]
        }),
        pushNotifications: ['everything', Validators.required]
      })
    });
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        language: ['', Validators.required]
      }),
      step2: this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        about: ['']
      }),
      step3: this._formBuilder.group({
        byEmail: this._formBuilder.group({
          companyNews: [true],
          featuredProducts: [false],
          messages: [true]
        }),
        pushNotifications: ['everything', Validators.required]
      })
    });
  }

  signIn() {
    console.log('signIn')
  }
}
