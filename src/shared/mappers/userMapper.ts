import type { User, UserDto } from "../types/usersTypes";

export function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    firstname: dto.firstname,
    lastname: dto.lastname,
    email: dto.email,
    roleId: dto.role_id,
    isActive: dto.is_active,
    isBlocked: dto.is_blocked,
    description: dto.description,
    avatarUrl: dto.avatar_url,
  };
}
