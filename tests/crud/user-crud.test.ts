import { 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../../src/controllers/userController';
import { User } from '../../src/models/userModel';

describe('Operaciones CRUD para Usuarios', () => {
  let createdUserId: string;

  // Opcional: Setup antes de tests (e.g., mock DB si necesitas)
  beforeAll(() => {
    // Aquí puedes jest.mock para simular dependencias reales
  });

  /**
   * INSTRUCCIONES PARA DESARROLLADORES:
   * - Implementa la función createUser en src/controllers/userController.ts.
   * - Debe ser async, recibir datos sin 'id', generar un ID único (e.g., UUID o timestamp).
   * - Retornar un objeto User completo con 'id'.
   * - Usa un mock de DB (array en memoria) para simular persistencia, sin conectar a DB real.
   * - Formato: Usa interfaces de src/models/userModel.ts. Ejemplo de input: { nombre, email, edad }.
   * - No modifiques este test – solo implementa para que pase.
   */
  test('debe crear un nuevo usuario', async () => {
    const newUserData = {
      nombre: 'Usuario Test',
      email: 'test@example.com',
      edad: 30
    };
    const createdUser: User = await createUser(newUserData);
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.nombre).toBe(newUserData.nombre);
    expect(createdUser.email).toBe(newUserData.email);
    createdUserId = createdUser.id;
  });

  /**
   * INSTRUCCIONES PARA DESARROLLADORES:
   * - Implementa getUserById en src/controllers/userController.ts.
   * - Debe ser async, buscar por ID en el mock DB.
   * - Si no existe, lanza Error('Usuario no encontrado').
   * - Retornar el objeto User completo.
   * - Usa el mismo mock DB de createUser para consistencia.
   * - Formato: Input ID string, output User.
   */
  test('debe obtener un usuario por ID', async () => {
    const user: User = await getUserById(createdUserId);
    expect(user.id).toBe(createdUserId);
    expect(user.edad).toBe(30);
  });

  /**
   * INSTRUCCIONES PARA DESARROLLADORES:
   * - Implementa updateUser en src/controllers/userController.ts.
   * - Debe ser async, actualizar solo campos parciales (e.g., { edad: 31 }).
   * - Si no existe, lanza Error('Usuario no encontrado').
   * - Retornar el User actualizado.
   * - Usa el mock DB para actualizar in-place.
   * - Formato: Input ID string + Partial<Omit<User, 'id'>>.
   */
  test('debe actualizar un usuario', async () => {
    const updateData = { edad: 31 };
    const updatedUser: User = await updateUser(createdUserId, updateData);
    expect(updatedUser.edad).toBe(31);
    expect(updatedUser.nombre).toBe('Usuario Test'); // No cambia
  });

  /**
   * INSTRUCCIONES PARA DESARROLLADORES:
   * - Implementa deleteUser en src/controllers/userController.ts.
   * - Debe ser async, eliminar por ID del mock DB.
   * - Si no existe, lanza Error('Usuario no encontrado').
   * - No retornar nada (Promise<void>).
   * - Usa el mock DB para remover el elemento.
   * - Formato: Input ID string.
   */
  test('debe eliminar un usuario', async () => {
    await deleteUser(createdUserId);
    await expect(getUserById(createdUserId)).rejects.toThrow('Usuario no encontrado');
  });
});