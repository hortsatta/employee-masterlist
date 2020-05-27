import rbacRules from 'config/rbac/rbac.rules';

const check = (rules, role, actions, data) => {
  const permissions = rules[role];

  // current role does not exist in the rule
  if (!permissions) { return false; }

  const staticPermissions = permissions.static || [];

  if (staticPermissions) {
    const filteredStaticPermissions = staticPermissions
      .filter((permission) => actions.includes(permission));
    if (filteredStaticPermissions && filteredStaticPermissions.length) {
      return true;
    }
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const filteredDynamicPermission = dynamicPermissions
      .find((permission) => actions.includes(permission));

    // dynamic rule does not exist in current role
    if (!filteredDynamicPermission) { return false; }

    return filteredDynamicPermission(data);
  }

  return false;
};

const CanActivate = ({ userRole, actions, data, yes, no }) => (
  check(rbacRules, userRole, actions, data)
    ? yes()
    : no()
);

CanActivate.defaultProps = {
  userRole: 0,
  actions: [],
  yes: () => null,
  no: () => null
};

export default CanActivate;
