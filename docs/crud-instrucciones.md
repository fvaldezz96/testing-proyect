# Instrucciones para Implementar CRUD de Usuarios

## General
- Implementa en `src/controllers/userController.ts` usando interfaces de `src/models/userModel.ts`.
- Usa un mock DB (array `mockUsers: User[] = [];`) para simular persistencia.
- Funciones deben ser async, manejar errores con `throw new Error`.
- No conectes a DB real ni modifiques tests.

## Test 1: Crear Usuario
- Función: `createUser(data: Omit<User, 'id'>): Promise<User>`
- Genera ID único (e.g., `Date.now().toString()`).
- Agrega al mock DB y retorna User con ID.

## Test 2: Obtener Usuario
- Función: `getUserById(id: string): Promise<User>`
- Busca en mock DB, lanza error si no existe.

## Test 3: Actualizar Usuario
- Función: `updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>`
- Actualiza campos parciales en mock DB.

## Test 4: Eliminar Usuario
- Función: `deleteUser(id: string): Promise<void>`
- Remueve de mock DB, lanza error si no existe.