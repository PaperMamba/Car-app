import { Car, Booking, Agency, User } from './types';

export const MOCK_AGENCIES: Agency[] = [
  {
    id: 'agency_1',
    name: 'EliteDrive Premium',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTSSeF5fUi8T-XTg6VmQG_xqn2qx25vIX0GHxyjRxt6F-3zuxhwlhxdSfnvnT9ULqMWAVNlmh1y69SFVEvVabFvLT6Jy0vb9jE4Q682pINnI4UgEC0o58T7R24AXpEkfz_kETNlzqDM99bebPBkpyUYQeOcQAkbzHEKDpCGFKK5fCwAlnNIP1LSc3ZCQC2sunGmvIK-2fjGufvytsKkbt6TW-H01WbYrEQD-ftIv0EbW1ZN8a3SP492VjrYPTqX94E_FrKQ3Rwmkzj',
    rating: 4.9
  },
  {
    id: 'agency_2',
    name: 'Sixt Luxury',
    logo: 'https://picsum.photos/seed/sixt/100/100',
    rating: 4.8
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Marc Lefebvre',
    email: 'marc@example.com',
    role: 'Client',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTSSeF5fUi8T-XTg6VmQG_xqn2qx25vIX0GHxyjRxt6F-3zuxhwlhxdSfnvnT9ULqMWAVNlmh1y69SFVEvVabFvLT6Jy0vb9jE4Q682pINnI4UgEC0o58T7R24AXpEkfz_kETNlzqDM99bebPBkpyUYQeOcQAkbzHEKDpCGFKK5fCwAlnNIP1LSc3ZCQC2sunGmvIK-2fjGufvytsKkbt6TW-H01WbYrEQD-ftIv0EbW1ZN8a3SP492VjrYPTqX94E_FrKQ3Rwmkzj'
  },
  {
    id: 'user_2',
    name: 'Sarah Agency',
    email: 'sarah@elitedrive.com',
    role: 'AgencyManager',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    agencyId: 'agency_1'
  }
];

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    agencyId: 'agency_2',
    name: 'BMW M5 Competition',
    type: 'Luxury Sedan',
    category: 'Luxury',
    price: 245,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKG5HSEcqE4WRJOXZbTlw3qkjhgDPj21bLvfTI-RRuYQKXl6x6OBdzWMSfV4-BUYcPRGeRsBqMoYjtxg-7CR7Om5DGcm5ifz-RJkS9sv4ld4ccHTeZS76Dj9Gd3pYh2LMmtfCKdC1RIcDLqzeclbnsb1Etq3kK9Soogs8Dtv3f7BS5Gm3cL76kJ5qL4adtVXeW_HOkK-oMCdceUiNMfZFNjzcmjNt-FSo2gZxpGguArPS_J1bbkLNJkKikRHFx2OQVHIvEeFxHg34J',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    description: 'Ultimate Performance & Executive Comfort. The BMW M5 Competition combines track-ready performance with the luxury of a premium sedan.',
    features: ['GPS Navigation', 'Leather Seats', 'Sunroof', 'Bluetooth'],
    location: 'Beverly Hills, CA',
    isLimited: true,
    coordinates: { lat: 34.0736, lng: -118.4004 }
  },
  {
    id: '2',
    agencyId: 'agency_1',
    name: 'Porsche 911 Carrera S',
    type: 'Luxury Sport',
    category: 'Sports',
    price: 450,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzPjN0_cGBV0yTARY-pyC9ISfuf9_o9natfX7_FM6-PZ0qTFibtnjegNzdM_Eo3vLQWXnCVSKWZoEGOLQgt3qZHGkwC7P7YtnDAU3bcb10a12p3zgrWlppi3I2Yd06RDv9UwHUj8Q4q8M0KJwBFE5MRlW2yzXMZpGx3CDsyIw99MxiVSLY-6D_YKDQU-MNiwSIgHh9-CaGS6P7Ad_6_D0yBvCYUgoGHgLpsHc2a0Rg4qq4KKHqBCM3_f7g3Q3o5ZSXv0dOXwCH22_W',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol',
    description: 'Experience the legendary performance of the Porsche 911 Carrera S. This model features a twin-turbocharged flat-six engine that delivers 443 horsepower.',
    features: ['Climate Control', 'Entertainment', 'GPS Navigation', 'Bluetooth'],
    location: 'Beverly Hills, CA',
    coordinates: { lat: 34.0786, lng: -118.4054 }
  },
  {
    id: '3',
    agencyId: 'agency_2',
    name: 'Land Rover Defender',
    type: 'Luxury SUV',
    category: 'SUV',
    price: 180,
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y3gBu5Oobo5zrDhA14Of6z2CKDdOUC2C824eraLpzYSqx5Esd4r4SgrW5R5O_S3ZUGSnmFiP5fSQrp8EtJdg_6XUw3SCA-Ihs9D_y4c4CZnYPeI1SMHZekr0VkTCdmxYZNwz7Va0edvy0EitNdAJL3opn7_GrMdfF4yhjbdV5Zx6ZgtRitIxcdWCdsLXEEmW-jcl5-nVyEO7EMn0eA92FDtdzhX4Q-DkxanO_VqOQ3sUgEjsJt_SmQm1fiBecyE9mp8WGGy1xQ-b',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    description: 'Rugged capability meets modern luxury. The Land Rover Defender is ready for any adventure.',
    features: ['Off-road Mode', '360 Camera', 'Sunroof'],
    location: 'Malibu, CA',
    coordinates: { lat: 34.0259, lng: -118.7798 }
  },
  {
    id: '4',
    agencyId: 'agency_1',
    name: 'Tesla Model S Plaid',
    type: 'Electric Sedan',
    category: 'Electric',
    price: 210,
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQmzyBogfw-F-x42WHKx0Ba0QfY17Js--cOol7gVLyMlKjhrZYQUKwzWgjuBjCmDhrb-GPLG86FBhe0eUzOu5y6EpiRUQrkJWjAYleoyKH6YIbgePI0asPaqbnMp82Y1TLR5e1VkJF_t_jPvuOjPhrNIBz9MRbAazm65jvRW7-lvpSGK5L9okbNWzMt_uHhupdKMDXsffx7Nt_Hg69CDNdEp5Fo-hOx78UtUEfCGgpb3uBWL3GM6hysNplkakZTvsJ5Reg4Kca1cfX',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    description: 'The quickest accelerating car in production today. 0-60 mph in 1.99s.',
    features: ['Autopilot', 'Premium Sound', 'Ludicrous Mode'],
    location: 'Palo Alto, CA',
    coordinates: { lat: 37.4419, lng: -122.1430 }
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    carId: '2',
    userId: 'user_1',
    agencyId: 'agency_1',
    carName: 'Porsche 911 Carrera S',
    carImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiHXR3lEUBTnnwuteYnBXOSycmgwmAcFJbKZbOXhcJb1i1w8w5hx_1CkkyJYsS_bh-vKOzHLgFy-gMLoqg3XEtQIeomIeyLuPAsdYzNYPUOex80PYwXQxZIvaIQtdAKauOrzI0ruqDhFrCnu71hphzEyr3VL9Ya2byfNoOH422uL5YOLv0TMKTIG9307eSsgmdo8IMcRi8sxvto0627qWo06tdsaC05-ysulPS-Q91f4rFQCPXZ_VX02dhWX6htAR5fzUZaDb-3SGI',
    confirmationNumber: '#ED-82910',
    totalPrice: 1350,
    startDate: '2023-10-12',
    endDate: '2023-10-15',
    status: 'confirmed',
    createdAt: '2023-10-01'
  }
];
