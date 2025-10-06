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

  test('debe obtener un usuario por ID', async () => {
    const user: User = await getUserById(createdUserId);
    expect(user.id).toBe(createdUserId);
    expect(user.edad).toBe(30);
  });

  test('debe actualizar un usuario', async () => {
    const updateData = { edad: 31 };
    const updatedUser: User = await updateUser(createdUserId, updateData);
    expect(updatedUser.edad).toBe(31);
    expect(updatedUser.nombre).toBe('Usuario Test'); // No cambia
  });

  test('debe eliminar un usuario', async () => {
    await deleteUser(createdUserId);
    await expect(getUserById(createdUserId)).rejects.toThrow('Usuario no encontrado');
  });
});