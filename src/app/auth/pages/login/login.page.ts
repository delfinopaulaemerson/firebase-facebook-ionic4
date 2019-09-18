import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authProviders = AuthProvider;
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create accout'
  };

  private nameControl = new FormControl(' ', [Validators.required, Validators.minLength(3)]);

  constructor(private fb: FormBuilder, private service: AuthService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      email: [' ', [Validators.required, Validators.email]],
      password: [' ', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login ' : ' Sign Up';
    this.configs.actionChange = isSignIn ? ' Create account ' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }
  async onSubmit(provider: AuthProvider): Promise<void> {
    try {
      const credentiais = await this.service.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Authenticated', credentiais);
      console.log('Redirect.........');
    } catch (e) {
      console.log('Authenticated', e);
    }
  }
}
