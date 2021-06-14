import bcrypt from 'bcryptjs';

const vendors = [
  {
    vendorName: 'Admin',
    email: 'aquibnizar@gmail.com',
    primaryContactNo: '+974-7008-9191',
    alternateContactNo: '+974-7008-9191',
    companyRegistration: 'CR100200300',
    password: bcrypt.hashSync('123456', 10),
    address: '11, Lorem Road, Ipsum, Doha, Qatar',
    isAdmin: true,
  },
  {
    vendorName: 'Developer',
    email: 'faheemkodi@gmail.com',
    primaryContactNo: '+91-98958-93111',
    alternateContactNo: '+91-98958-93111',
    companyRegistration: 'CR400500600',
    password: bcrypt.hashSync('123456', 10),
    address: '344/18, Mongam, Kerala, India',
  },
];

export default vendors;
