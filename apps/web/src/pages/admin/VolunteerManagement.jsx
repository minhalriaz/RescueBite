import ManagementPage from "./ManagementPage";
import { adminVolunteers } from "../../data/adminMockData";
export default function VolunteerManagement() {
  return <ManagementPage title="Volunteer Management" description="Verify volunteers and manage approval status." initialRows={adminVolunteers} type="volunteer" />;
}
