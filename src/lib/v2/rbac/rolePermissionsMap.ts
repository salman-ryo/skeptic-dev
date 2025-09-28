/**
 * Defines the shape of permission flags for a given role on a resource.
 */
export interface RolePermissions {
  /** Whether entity creation is allowed */
  canCreate: boolean;
  /** Whether entity reading is allowed */
  canRead: boolean;
  /** Whether entity updates are allowed */
  canUpdate: boolean;
  /** Whether entity deletion is allowed */
  canDelete: boolean;
  /** Whether full management of the resource is allowed (admin-level) */
  canManageAll?: boolean;
}

/**
 * A mapping of common permission abbreviations to their role permission sets.
 *
 * Keys:
 * - `R`: Read only
 * - `CR`: Create + Read
 * - `CRU`: Create + Read + Update
 * - `CRUD`: Full CRUD
 * - `CRUDA`: Full CRUD + Admin (manage all)
 * - `Nil`: No permissions
 */
export const ROLE_PERMISSION_MAP = {
  /**
   * **R** → Read only
   * Can read, but cannot create, update, or delete.
   */
  R: {
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
  } satisfies RolePermissions,

  /**
   * **CR** → Create + Read
   * Can create and read, but cannot update or delete.
   */
  CR: {
    canCreate: true,
    canRead: true,
    canUpdate: false,
    canDelete: false,
  } satisfies RolePermissions,

  /**
   * **CRU** → Create + Read + Update
   * Can create, read, and update, but cannot delete.
   */
  CRU: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: false,
  } satisfies RolePermissions,

  /**
   * **CRUD** → Create + Read + Update + Delete
   * Full CRUD access but not admin-level management.
   */
  CRUD: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
  } satisfies RolePermissions,

  /**
   * **CRUDA** → Create + Read + Update + Delete + Admin
   * Full CRUD access plus manage-all capabilities (admin-level).
   */
  CRUDA: {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canManageAll: true,
  } satisfies RolePermissions,

  /**
   * **Nil** → No permissions
   * Cannot create, read, update, or delete.
   */
  Nil: {
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  } satisfies RolePermissions,
} as const;
