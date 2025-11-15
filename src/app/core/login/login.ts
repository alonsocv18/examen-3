import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials: LoginRequest = {
      user_email: this.email,
      user_password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.tipo === '1' && response.data) {
          // Redirigir al dashboard
          console.log('Login exitoso:', response);
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = response.mensajes[0] || 'Error al iniciar sesión';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos';
        this.isLoading = false;
      },
    });
  }

  irAregister() {
    this.router.navigate(['/login/register']);
  }
}
