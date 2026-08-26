export type Product = {
    id: number;
    brand: string;
    name: string;
    colorway: string;
    price: number;
    was?: number;
    tag?: string;
    accent: string;
    sizes: number[];
};

export const brands = [
    'Nike',
    'Adidas',
    'New Balance',
    'Puma',
    'Vans',
    'Converse',
    'Asics',
    'Salomon',
] as const;

export const products: Product[] = [
    {
        id: 1,
        brand: 'Nike',
        name: 'Air Force 1 Low',
        colorway: 'Triple White',
        price: 449,
        tag: 'Laris',
        accent: '#e2e8f0',
        sizes: [39, 40, 41, 42, 43, 44],
    },
    {
        id: 2,
        brand: 'Nike',
        name: 'Air Max 90',
        colorway: 'Infrared',
        price: 629,
        was: 749,
        tag: 'Diskaun',
        accent: '#ef4444',
        sizes: [40, 41, 42, 44],
    },
    {
        id: 3,
        brand: 'Nike',
        name: 'Dunk Low Retro',
        colorway: 'Panda',
        price: 549,
        accent: '#404040',
        sizes: [39, 40, 41, 42, 43],
    },
    {
        id: 4,
        brand: 'Adidas',
        name: 'Samba OG',
        colorway: 'Cloud White / Black',
        price: 479,
        tag: 'Laris',
        accent: '#f8fafc',
        sizes: [38, 39, 40, 41, 42, 43, 44],
    },
    {
        id: 5,
        brand: 'Adidas',
        name: 'Gazelle Indoor',
        colorway: 'Bold Green',
        price: 499,
        accent: '#16a34a',
        sizes: [40, 41, 42, 43],
    },
    {
        id: 6,
        brand: 'Adidas',
        name: 'Ultraboost Light',
        colorway: 'Core Black',
        price: 789,
        was: 899,
        tag: 'Diskaun',
        accent: '#1f2937',
        sizes: [41, 42, 43, 44, 45],
    },
    {
        id: 7,
        brand: 'New Balance',
        name: '550',
        colorway: 'White / Green',
        price: 559,
        tag: 'Baru',
        accent: '#84cc16',
        sizes: [39, 40, 41, 42, 43],
    },
    {
        id: 8,
        brand: 'New Balance',
        name: '9060',
        colorway: 'Sea Salt',
        price: 749,
        accent: '#cbd5e1',
        sizes: [40, 41, 42, 43, 44],
    },
    {
        id: 9,
        brand: 'Puma',
        name: 'Suede Classic XXI',
        colorway: 'Peacoat',
        price: 329,
        accent: '#1e3a8a',
        sizes: [39, 40, 41, 42, 43, 44],
    },
    {
        id: 10,
        brand: 'Puma',
        name: 'Palermo Leather',
        colorway: 'Vapor Grey',
        price: 389,
        tag: 'Baru',
        accent: '#94a3b8',
        sizes: [40, 41, 42, 43],
    },
    {
        id: 11,
        brand: 'Vans',
        name: 'Old Skool',
        colorway: 'Black / White',
        price: 299,
        tag: 'Laris',
        accent: '#111827',
        sizes: [38, 39, 40, 41, 42, 43, 44],
    },
    {
        id: 12,
        brand: 'Vans',
        name: 'Knu Skool',
        colorway: 'Navy Gum',
        price: 349,
        accent: '#1d4ed8',
        sizes: [40, 41, 42, 43],
    },
    {
        id: 13,
        brand: 'Converse',
        name: 'Chuck 70 Hi',
        colorway: 'Parchment',
        price: 379,
        accent: '#eab308',
        sizes: [39, 40, 41, 42, 43, 44],
    },
    {
        id: 14,
        brand: 'Asics',
        name: 'Gel-Kayano 14',
        colorway: 'Cream / Black',
        price: 699,
        was: 829,
        tag: 'Diskaun',
        accent: '#a8a29e',
        sizes: [41, 42, 43, 44],
    },
    {
        id: 15,
        brand: 'Asics',
        name: 'Gel-1130',
        colorway: 'Oyster Grey',
        price: 599,
        accent: '#78716c',
        sizes: [40, 41, 42, 43, 44, 45],
    },
    {
        id: 16,
        brand: 'Salomon',
        name: 'XT-6 Gore-Tex',
        colorway: 'Black / Phantom',
        price: 1099,
        tag: 'Baru',
        accent: '#0f172a',
        sizes: [41, 42, 43, 44],
    },
];

const formatter = new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
});

export function formatPrice(value: number): string {
    return formatter.format(value);
}
