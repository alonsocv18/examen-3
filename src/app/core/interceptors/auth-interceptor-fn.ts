import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('Interceptor Funcional - Token:', token);
  console.log('Interceptor Funcional - URL:', req.url);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    console.log(
      'Interceptor Funcional - Headers agregados:',
      clonedRequest.headers.get('Authorization')
    );
    return next(clonedRequest);
  }

  console.log('Interceptor Funcional - No hay token');
  return next(req);
};
