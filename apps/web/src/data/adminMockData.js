export const adminStats = [
  { label: "Total Donors", value: "2,348", change: "+12.4%", tone: "green" },
  { label: "Total NGOs", value: "186", change: "+8.2%", tone: "blue" },
  { label: "Volunteers", value: "1,209", change: "+15.7%", tone: "purple" },
  { label: "Active Donations", value: "542", change: "+6.1%", tone: "orange" },
  { label: "Completed Rescues", value: "418", change: "+11.3%", tone: "green" },
  { label: "Meals Shared", value: "125.6K", change: "+18.9%", tone: "teal" },
];

export const adminNgos = [
  { id: 1, name: "Hope Foundation", contact: "hope@example.com", area: "Dhanmondi", status: "Pending", date: "08 Sep 2026" },
  { id: 2, name: "Care & Share", contact: "care@example.com", area: "Mirpur", status: "Approved", date: "07 Sep 2026" },
  { id: 3, name: "Dhaka Food Aid", contact: "aid@example.com", area: "Uttara", status: "Pending", date: "06 Sep 2026" },
  { id: 4, name: "Community Kitchen", contact: "kitchen@example.com", area: "Mohammadpur", status: "Rejected", date: "05 Sep 2026" },
];

export const adminVolunteers = [
  { id: 1, name: "Ayesha Rahman", email: "ayesha@example.com", area: "Banani", status: "Pending", joined: "08 Sep 2026" },
  { id: 2, name: "Rafi Ahmed", email: "rafi@example.com", area: "Dhanmondi", status: "Approved", joined: "07 Sep 2026" },
  { id: 3, name: "Nabila Islam", email: "nabila@example.com", area: "Uttara", status: "Pending", joined: "06 Sep 2026" },
];

export const adminDonors = [
  { id: 1, name: "Green Plate Restaurant", email: "greenplate@example.com", donations: 24, status: "Active" },
  { id: 2, name: "Fresh Basket", email: "fresh@example.com", donations: 18, status: "Active" },
  { id: 3, name: "Rahman Family", email: "rahman@example.com", donations: 7, status: "Inactive" },
  { id: 4, name: "City Bakery", email: "citybakery@example.com", donations: 31, status: "Active" },
];

export const adminDonations = [
  { id: "RB-1042", food: "Cooked Rice & Curry", donor: "Green Plate Restaurant", quantity: "35 meals", status: "Available", area: "Dhanmondi" },
  { id: "RB-1041", food: "Fresh Bread", donor: "City Bakery", quantity: "80 packs", status: "Rescued", area: "Uttara" },
  { id: "RB-1040", food: "Vegetable Biryani", donor: "Fresh Basket", quantity: "45 meals", status: "Pending", area: "Mirpur" },
  { id: "RB-1039", food: "Mixed Vegetables", donor: "Rahman Family", quantity: "12 kg", status: "Completed", area: "Banani" },
];

export const adminActivities = [
  { id: 1, title: "New NGO registration", detail: "Hope Foundation submitted an application", time: "12 min ago", type: "ngo" },
  { id: 2, title: "Volunteer approved", detail: "Rafi Ahmed is now an approved volunteer", time: "28 min ago", type: "volunteer" },
  { id: 3, title: "Donation completed", detail: "RB-1039 was successfully rescued", time: "1 hr ago", type: "rescue" },
  { id: 4, title: "New donor registered", detail: "City Bakery joined RescueBite", time: "2 hrs ago", type: "donor" },
  { id: 5, title: "Content reported", detail: "Donation RB-1038 needs review", time: "3 hrs ago", type: "report" },
];

export const reportItems = [
  { id: "RP-021", target: "Donation RB-1038", reason: "Incorrect food details", reporter: "NGO account", status: "Open" },
  { id: "RP-020", target: "Donation RB-1035", reason: "Expired pickup time", reporter: "Volunteer", status: "Reviewing" },
];

export const rescueChart = [
  { month: "Apr", donations: 42, rescues: 28 },
  { month: "May", donations: 58, rescues: 41 },
  { month: "Jun", donations: 66, rescues: 49 },
  { month: "Jul", donations: 74, rescues: 57 },
  { month: "Aug", donations: 88, rescues: 72 },
  { month: "Sep", donations: 96, rescues: 84 },
];
