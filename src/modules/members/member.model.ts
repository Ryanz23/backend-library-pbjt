export interface Member {
  id: string;
  name: string;
  study_program: string;
  semester: number;
}

export interface CreateMemberDTO {
  id: string;
  name: string;
  study_program: string;
  semester: number;
}
