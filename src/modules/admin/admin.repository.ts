import { db } from "../../config/db";
import { Admin, AdminResponse, CreateAdminDTO } from "./admin.model";

export const AdminRepository = {
  async findByUsername(username: string): Promise<Admin | null> {
    const result = await db<Admin[]>`
          SELECT * FROM admins
          WHERE username = ${username}
        `;
    return result[0] ?? null;
  },

  async findById(id: string): Promise<Admin | null> {
    const result = await db<Admin[]>`
          SELECT * FROM admins
          WHERE id = ${id}
        `;
    return result[0] ?? null;
  },

  async create(admin: CreateAdminDTO): Promise<AdminResponse> {
    const result = await db<AdminResponse[]>`
          INSERT INTO admins (username, password)
          VALUES (
            ${admin.username},
            ${admin.password}
          )
          RETURNING id, username, created_at
        `;

    return result[0];
  },
};
