import { MemberRepository } from "./member.repository";
import { CreateMemberDTO } from "./member.model";
import { AppError } from "../../handler/error";

export const MemberService = {
  async getAllMembers() {
    return await MemberRepository.findAll();
  },

  async getMemberById(id: string) {
    const member = await MemberRepository.findById(id);
    if (!member) {
      throw new AppError("Member tidak ditemukan", 404);
    }
    return member;
  },

  async addMember(data: CreateMemberDTO) {
    if (data.semester < 1 || data.semester > 14) {
      throw new AppError("Semester tidak valid", 400);
    }

    await MemberRepository.create(data);

    return {
      message: "Member berhasil ditambahkan",
    };
  },

  async updateMember(id: string, data: Partial<CreateMemberDTO>) {
    const member = await MemberRepository.findById(id);
    if (!member) {
      throw new AppError("Member tidak ditemukan", 404);
    }

    await MemberRepository.update(id, data);
    return {
      message: "Member berhasil diperbarui",
    };
  },

  async deleteMember(id: string) {
    const member = await MemberRepository.findById(id);
    if (!member) {
      throw new AppError("Member tidak ditemukan", 404);
    }

    await MemberRepository.delete(id);
    return {
      message: "Member berhasil dihapus",
    };
  },
};
