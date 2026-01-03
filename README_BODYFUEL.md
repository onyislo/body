# Body Fuel Fitness Website

A professional gym website for Body Fuel Fitness, located at Ushirika Plaza, Nairobi.

## Features

### Public Website
- **Homepage**: Stunning hero section with call-to-action
- **About Us**: Information about the gym and dedicated women's section
- **Trainers**: Showcase of certified trainers with specialties (Boxing, Bodybuilding, Zumba, CrossFit, Yoga, Powerlifting)
- **Pricing**: Membership plans in KSH with detailed features
- **Contact Form**: User inquiry form for potential members
- **Footer**: Location details and quick links
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices

### Admin Dashboard
- **Manage Pricing Plans**: Add, edit, and delete membership plans
- **Manage Trainers**: Add, edit, and delete trainer profiles
- **View Inquiries**: Track and manage customer inquiries with status updates
- **Secure Authentication**: Protected admin access

## Color Scheme
- **Primary**: Red (#dc2626)
- **Secondary**: Black (#000000)
- **Accent**: White (#ffffff)

## Admin Access

### Setting Up Admin Account

1. Open `setup-admin.html` in your browser
2. Click "Create Admin Account" button
3. The admin account will be created with:
   - Email: `admin@gmail.com`
   - Password: `12345678`

### Accessing Admin Panel

Once the admin account is created, access the admin panel at:

**Admin Login URL**: `/admin-login`

Simply add `/admin-login` to your website URL (e.g., `http://localhost:5173/admin-login`)

**Login Credentials**:
- Email: `admin@gmail.com`
- Password: `12345678`

## Database

The website uses Supabase for:
- User authentication
- Pricing plans storage
- Trainer profiles
- Customer inquiry management

All database tables are configured with Row Level Security (RLS) for data protection.

## Mock Data

The database is pre-populated with mock data:

### Pricing Plans
- Daily Pass: KSH 500
- Weekly Pass: KSH 2,000
- Monthly Membership: KSH 5,000
- Quarterly Membership: KSH 13,500
- Annual Membership: KSH 48,000

### Trainers
- Mike Johnson (Boxing)
- Sarah Williams (Bodybuilding)
- Grace Mwangi (Zumba)
- James Omondi (CrossFit)
- Linda Achieng (Yoga)
- David Kamau (Powerlifting)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Build Tool**: Vite

## Important Notes

1. The admin login page is NOT linked from the main website for security
2. Access admin panel directly via `/admin-login` URL
3. All mock data can be edited through the admin dashboard
4. The women's gym section (Body Fuel) is highlighted in the About section
5. Mobile-responsive design ensures perfect viewing on all devices

## Contact Information

- **Location**: Ushirika Plaza, Nairobi, Kenya
- **Email**: info@bodyfuel.co.ke
- **Phone**: +254 700 000 000

---

Built with professional standards to showcase Body Fuel Fitness as a premier fitness destination.
