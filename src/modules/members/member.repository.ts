import { db } from "../../config/db";
import { Member, CreateMemberDTO } from "./member.model";

export const MemberRepository = {
  async findAll(): Promise<Member[]> {
    const members = await db<Member[]>`
      SELECT * FROM members
      ORDER BY name
    `;
    return members;
  },

  async findById(id: string) {
    const result = await db`
      SELECT * FROM members
      WHERE id = ${id}
    `;
    return result[0] ?? null;
  },

  async create(member: CreateMemberDTO): Promise<void> {
    await db`
      INSERT INTO members (
        id, name, studyProgram, semester
      ) VALUES (
        ${member.id},
        ${member.name},
        ${member.study_program},
        ${member.semester}
      )
    `;
  },

  async update(id: string, data: Partial<CreateMemberDTO>) {
    await db`
      UPDATE members SET
        name = COALESCE(${data.name ?? null}, name),
        studyProgram = COALESCE(${data.study_program ?? null}, studyProgram),
        semester = COALESCE(${data.semester ?? null}, semester)
      WHERE id = ${id}
    `;
  },

  async delete(id: string) {
    await db`
      DELETE FROM members WHERE id = ${id}
    `;
  }
};
