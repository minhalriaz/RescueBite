import ManagementPage from "./ManagementPage";
import { adminDonors } from "../../data/adminMockData";
export default function DonorManagement() {
  return <ManagementPage title="Donor Management" description="View registered donors and their donation activity." initialRows={adminDonors} type="donor" />;
}
