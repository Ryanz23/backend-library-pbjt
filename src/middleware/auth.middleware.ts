import { AppError } from "../handler/error";
import { AdminService } from "../modules/admin/admin.service";

export const authMiddleware = async ({ headers, jwt }: any) => {
  const authorization = headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError("Token tidak ditemukan", 401);
  }

  const token = authorization.split(" ")[1];
  const payload = await jwt.verify(token);

  if (!payload) {
    throw new AppError("Token tidak valid atau kadaluarsa", 401);
  }

  if (payload.role !== "admin") {
    throw new AppError("Akses ditolak", 403);
  }

  const admin = await AdminService.getAdminById(payload.sub);

  if (!admin) {
    throw new AppError("Admin tidak ditemukan", 404);
  }

  return {
    admin,
  };
};
