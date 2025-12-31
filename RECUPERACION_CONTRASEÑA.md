# Configuración de Recuperación de Contraseña

## Implementación completada ✅

Se ha implementado un sistema completo de recuperación de contraseña que incluye:

### 1. Endpoints creados

#### POST `/auth/forgot-password`
Solicita la recuperación de contraseña. Envía un email con un enlace que contiene un JWT.

**Body:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Respuesta:**
```json
{
  "message": "Si el correo está registrado, se ha enviado un enlace de recuperación de contraseña."
}
```

#### POST `/auth/reset-password`
Restablece la contraseña verificando el JWT recibido por email.

**Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nuevaContrasena": "nuevaContraseña123"
}
```

**Respuesta:**
```json
{
  "message": "Contraseña restablecida exitosamente"
}
```

### 2. Seguridad implementada

- ✅ **JWT firmado**: El token se genera con firma JWT y expira en 1 hora
- ✅ **Token en BD**: El token se guarda en la base de datos para verificación
- ✅ **Verificación doble**: Se verifica tanto la validez del JWT como que coincida con el de la BD
- ✅ **Fecha de expiración**: Se guarda la fecha de expiración en la BD (1 hora)
- ✅ **Tipo de token**: Se verifica que el token sea de tipo 'password-reset'
- ✅ **Hash de contraseña**: La nueva contraseña se hashea con bcrypt antes de guardar
- ✅ **Limpieza automática**: Después de usar el token, se limpia de la BD

### 3. Cambios en la base de datos

Se agregaron dos nuevos campos a la entidad `User`:

```typescript
@Column({ type: 'varchar', length: 512, nullable: true, select: false })
resetPasswordToken: string;

@Column({ type: 'timestamp', nullable: true, select: false })
resetPasswordExpires: Date;
```

**⚠️ IMPORTANTE**: Ejecuta una migración o actualiza manualmente la tabla `user` para agregar estos campos.

### 4. Configuración del servidor de correo

Configura las siguientes variables de entorno en tu archivo `.env`:

```env
# Gmail (recomendado para desarrollo)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu-email@gmail.com
MAIL_PASSWORD=tu-contraseña-de-aplicacion
MAIL_FROM=tu-email@gmail.com

# URL del frontend
FRONTEND_URL=http://localhost:3000
```

#### Configuración de Gmail

Para usar Gmail necesitas:

1. **Activar la verificación en dos pasos** en tu cuenta de Google
2. **Generar una contraseña de aplicación**:
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Copia la contraseña generada (sin espacios)
   - Úsala en `MAIL_PASSWORD`

#### Otros proveedores de email

**Outlook/Hotmail:**
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
```

**Yahoo:**
```env
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
```

**Servicios profesionales:**
- **SendGrid**: Más recomendado para producción
- **Mailgun**: Buena opción para producción
- **AWS SES**: Escalable y económico

### 5. Flujo completo

```
1. Usuario solicita recuperación → POST /auth/forgot-password
   ↓
2. Sistema genera JWT y lo guarda en BD
   ↓
3. Sistema envía email con enlace: 
   http://localhost:3000/reset-password?token=JWT_TOKEN
   ↓
4. Usuario hace clic en el enlace del email
   ↓
5. Frontend envía: POST /auth/reset-password
   {
     "token": "JWT_TOKEN",
     "nuevaContrasena": "nueva123"
   }
   ↓
6. Backend verifica:
   - JWT es válido ✓
   - JWT coincide con BD ✓
   - JWT no ha expirado ✓
   - Tipo de token es correcto ✓
   ↓
7. Si todo es válido:
   - Hash nueva contraseña
   - Actualiza contraseña
   - Limpia token de BD
   - Retorna éxito
```

### 6. Ejemplo de uso con cURL o Postman

**Paso 1: Solicitar recuperación**
```bash
curl -X POST http://localhost:3000/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@ejemplo.com"}'
```

**Paso 2: Resetear contraseña (con el token del email)**
```bash
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "nuevaContrasena": "miNuevaContraseña123"
  }'
```

### 7. Manejo de errores

El sistema maneja los siguientes casos:

- ❌ Email no registrado → No revela si existe (seguridad)
- ❌ Token inválido → "Token inválido o expirado"
- ❌ Token no coincide con BD → "Token no coincide con el registrado"
- ❌ Token expirado → "El token ha expirado"
- ❌ Tipo de token incorrecto → "Token no válido para esta operación"
- ❌ Error al enviar email → "Error al enviar el correo de recuperación"

### 8. Archivos modificados/creados

#### Nuevos archivos:
- ✅ `src/auth/dto/forgot-password.dto.ts`
- ✅ `src/auth/dto/reset-password.dto.ts`
- ✅ `RECUPERACION_CONTRASEÑA.md` (este archivo)

#### Archivos modificados:
- ✅ `src/auth/auth.service.ts` - Lógica de negocio
- ✅ `src/auth/auth.controller.ts` - Endpoints
- ✅ `src/user/user.entity.ts` - Nuevos campos
- ✅ `.env` - Variables de configuración
- ✅ `package.json` - Dependencias (nodemailer)

### 9. Testing recomendado

1. **Probar email inválido**: Debe retornar mensaje genérico sin error
2. **Probar email válido**: Debe recibir correo con enlace
3. **Probar token expirado**: Esperar más de 1 hora y intentar usar el token
4. **Probar token usado**: Intentar usar el mismo token dos veces
5. **Probar token inválido**: Modificar el token manualmente
6. **Probar nueva contraseña**: Login con la nueva contraseña

### 10. Frontend - Ejemplo de implementación

```typescript
// Página: /forgot-password
async function handleForgotPassword(email: string) {
  const response = await fetch('http://localhost:3000/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await response.json();
  // Mostrar mensaje: "Revisa tu email"
}

// Página: /reset-password?token=XXX
async function handleResetPassword(token: string, nuevaContrasena: string) {
  const response = await fetch('http://localhost:3000/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, nuevaContrasena })
  });
  
  if (response.ok) {
    // Redirigir a login con mensaje de éxito
  } else {
    const error = await response.json();
    // Mostrar error (token expirado, inválido, etc.)
  }
}
```

### 11. Próximos pasos

- [ ] Configurar las credenciales de email en `.env`
- [ ] Ejecutar migración de base de datos para agregar los nuevos campos
- [ ] Probar el flujo completo de recuperación
- [ ] Implementar el frontend para las páginas de recuperación
- [ ] (Opcional) Personalizar el diseño del email
- [ ] (Opcional) Agregar límite de intentos de recuperación
- [ ] (Opcional) Agregar logs de auditoría

---

**Desarrollado por:** Vicente Silva  
**Fecha:** 30 de diciembre de 2025
