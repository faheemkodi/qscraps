import bcrypt from 'bcryptjs';

const vendors = [
  {
    vendorName: 'Admin',
    email: 'admin@example.com',
    primaryContactNo: '+971 508 756 735',
    alternateContactNo: '+971 547 391 080',
    companyRegistration: 'ABCD100200300',
    password: bcrypt.hashSync('123456', 10),
    address: 'Baker Street, Doha',
    isAdmin: true,
  },
  {
    vendorName: 'Aquib Nizar',
    email: 'aquib@example.com',
    primaryContactNo: '508756736',
    alternateContactNo: '547391081',
    companyRegistration: 'ABCD100200301',
    password: bcrypt.hashSync('123456', 10),
    address: 'Baker Street, Doha',
  },
  {
    vendorName: 'Faheem Kodi',
    email: 'faheem@example.com',
    primaryContactNo: '508756737',
    alternateContactNo: '547391082',
    companyRegistration: 'ABCD100200302',
    password: bcrypt.hashSync('123456', 10),
    address: 'Baker Street, Doha',
  },
];

export default vendors;
