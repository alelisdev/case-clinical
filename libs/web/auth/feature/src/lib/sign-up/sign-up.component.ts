import {
  Component, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { fuseAnimations } from '@fuse/animations'
import { FuseAlertType } from '@fuse/components/alert'
import { AuthService } from '@case-clinical/core/auth'
import { Observable, of } from 'rxjs'

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
}

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  }
  signUpForm: FormGroup
  showAlert = false

  document$: Observable<DocumentInput> = of({
    name: 'SignatureDocument',
    attachment: '<div>Hello World</div>',
    encoding: 'WordprocessingML',
    extension: '.docx'
  })

  fileName = ''
  url = ''

  signatureBoxName = ''
  redirectUrlAfterSignature = ''
  ownerName = ''
  signerName = ''
  signerInitials = ''

  formControlValueChanged(event) {
    console.log('form control value', event)
    // if(event?.name) {
    //   this.document$ = of({name: event?.name, attachment: event.attachment})
    //   this.ref.markForCheck()
    // }
  }

  fileChanged(event) {
    console.log(event)
  }

  documentSubmit(wind: any) {
    console.log('document called', wind)
  }

  delete(file) {
    console.log(file)
  }

  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute,) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company: [''],
      agreements: ['', Validators.requiredTrue],
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return
    }
    console.log('signUP', this.signUpForm.value)

    // Disable the form
    this.signUpForm.disable()

    // Hide the alert
    this.showAlert = false

    const { name, email, password } = this.signUpForm.value;

    // Sign up
    this._authService.signUp({ username: name, email, password }).then(
      (response) => {
        // Navigate to the confirmation required page
        console.log(response)
        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect'
        this._router.navigateByUrl(redirectURL)
        // localStorage.setItem('accessToken', response.data.register.token)
        // this._router.navigateByUrl('/sign-up-setting')
        // this._router.navigateByUrl('/signed-in-redirect')
      },
      (response) => {
        // Re-enable the form
        this.signUpForm.enable()

        // Reset the form
        this.signUpNgForm.resetForm()

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Something went wrong, please try again.',
        }

        // Show the alert
        this.showAlert = true
      },
    )
  }
}
