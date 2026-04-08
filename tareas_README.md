-- Las rutas no están protegidas con JWT (no se usa JwtAuthGuard en controladores), aunque el guard existe en jwt-auth.guard.ts.
-- Riesgo en producción: synchronize: true en ormconfig.ts.
-- JWT tiene fallback inseguro de secreto en auth.module.ts y jwt.strategy.ts.
E2E hoy falla por alias src/* no resuelto en jest-e2e.json y por imports absolutos en auth.service.ts.
-- npm run build falla por permisos en dist (EACCES), no por TypeScript.
Qué agregar primero (top 6)

-- Seguridad de API: aplicar JwtAuthGuard + guard por roles en módulos sensibles (reservas, hoteles, user).
-- Migraciones TypeORM (migration:generate/run) y desactivar synchronize fuera de dev.
Swagger/OpenAPI en main.ts para documentar y probar endpoints.
-- Rate limiting en auth (/inicio-sesion, /forgot-password) para mitigar brute force.
Manejo global de errores y logging estructurado (interceptor + exception filter).
Suite de pruebas real: unit tests de servicios + e2e de auth/reservas (corrigiendo jest-e2e.json).
-- Mejoras de producto que suman mucho

Política de cancelación: ventana de cancelación y posible reembolso Stripe en reservas.service.ts.
Notificaciones por correo al crear/cancelar reserva (ya tienes base en auth mailer).