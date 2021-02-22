import { atom } from "recoil";

interface Tenant {
  id: number;
  name: string;
  code: string;
}

interface TenantState {
  init: boolean;
  tenants: Tenant[];
}

const tenantAtom = atom({
  key: 'tenantState',
  default: {
    init: false,
    tenants: []
  } as TenantState,
});

export default tenantAtom;