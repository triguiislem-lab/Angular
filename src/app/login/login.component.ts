import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';  // ✅ Ajouté ici

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Connexion réussie');
        this.router.navigate(['/members']);
        // Redirection ou action à faire après connexion
      })
      .catch(error => {
        this.errorMessage = error.message;  // ✅ Utilise la propriété
        console.error('Erreur de connexion :', error);
      });
  }
}
