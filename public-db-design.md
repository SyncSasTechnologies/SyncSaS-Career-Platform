SyncSaS Career Platform
Public UI & Database Design (High-Level)
1. Public Page Sitemap

Home

About

Internship Listings

Internship Detail Page

Mentor Listings

Mentor Profile

Company Listings

Company Profile

Public Intern Profile

2. Database Collections
Users

userId

name

email

password

role (Intern / Mentor / Company / Admin)

isVerified

createdAt

Interns

internId (ref: User)

education

skills (array)

experience

internshipsEnrolled (ref: Internship)

certificates (ref: Certificate)

level

credits

Mentors

mentorId (ref: User)

expertise

internshipsCreated (ref: Internship)

rating

earnings

Companies

companyId (ref: User)

industry

verificationStatus

internshipsPosted (ref: Internship)

Internships

internshipId

title

description

tier (Basic / Premium / Corporate)

mentorId (ref: Mentor)

companyId (ref: Company)

enrolledInterns (array of Intern refs)

startDate

endDate

status

Certificates

certificateId

internId (ref: Intern)

internshipId (ref: Internship)

mentorApproved

internAccepted

adminVerified

issueDate

3. Data Relationships

One User → One Role

One Mentor → Many Internships

One Company → Many Internships

One Intern → Many Internships

One Internship → Many Interns

One Certificate → Linked to Intern & Internship

4. Scalability Considerations

Use references instead of deep nesting

Index on email and internshipId

Separate certificate collection for verification tracking

Role-based access control