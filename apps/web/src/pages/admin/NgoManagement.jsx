import ManagementPage from "./ManagementPage";
import { adminNgos } from "../../data/adminMockData";
export default function NgoManagement() {
  return <ManagementPage title="NGO Management" description="Review and verify NGO registrations." initialRows={adminNgos} type="ngo" />;
}
