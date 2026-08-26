import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';

import { SneakerArt } from '@/components/sneaker-art';
import { Button } from '@/components/ui/button';
import { brands, formatPrice, products } from '@/data/catalog';
import { cn } from '@/lib/utils';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */

const perks = [
    { icon: Truck, label: 'Penghantaran 1-3 hari' },
    { icon: ShieldCheck, label: 'Jaminan 100% original' },
    { icon: RotateCcw, label: 'Tukar saiz percuma' },
];

const ALL = 'Semua';

export default function Welcome() {
    const { auth } = usePage().props;
    const [activeBrand, setActiveBrand] = useState<string>(ALL);

    const visible = useMemo(
        () =>
            activeBrand === ALL
                ? products
                : products.filter((product) => product.brand === activeBrand),
        [activeBrand],
    );

    return (
        <>
            <Head title="Kedai Kasut - Kasut Original, Harga Jujur" />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
                    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
                        <Link href="/" className="font-semibold tracking-tight">
                            Kedai<span className="text-primary">Kasut</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild size="sm">
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={login()}>Log masuk</Link>
                                    </Button>
                                    {/* @chisel-registration */}
                                    <Button asChild size="sm">
                                        <Link href={register()}>Daftar</Link>
                                    </Button>
                                    {/* @end-chisel-registration */}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex-1">
                    <section className="border-b border-border">
                        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Kedai kasut dalam talian
                                </p>
                                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                                    Kasut original, harga jujur.
                                </h1>
                                <p className="mt-5 max-w-md text-muted-foreground">
                                    Sneaker, formal dan sukan dari lapan brand
                                    terpilih. Stok simpan sendiri - tiada
                                    dropship, tiada tunggu-tunggu.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Button asChild size="lg">
                                        <a href="#katalog">
                                            Lihat koleksi
                                            <ArrowRight />
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href={login()}>
                                            Semak pesanan
                                        </Link>
                                    </Button>
                                </div>

                                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                                    {perks.map(({ icon: Icon, label }) => (
                                        <li
                                            key={label}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <Icon className="size-4 text-primary" />
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-border bg-muted p-8">
                                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    Pilihan minggu ini
                                </span>
                                <SneakerArt
                                    accent="#ef4444"
                                    className="mx-auto my-6 w-full max-w-sm"
                                />
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Nike
                                        </p>
                                        <p className="font-medium">
                                            Air Max 90 - Infrared
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        {formatPrice(629)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="katalog" className="scroll-mt-16">
                        <div className="mx-auto w-full max-w-6xl px-6 py-14">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Katalog
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {visible.length} pasang tersedia
                                    {activeBrand !== ALL &&
                                        ` daripada ${activeBrand}`}
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {[ALL, ...brands].map((brand) => (
                                    <button
                                        key={brand}
                                        type="button"
                                        onClick={() => setActiveBrand(brand)}
                                        aria-pressed={activeBrand === brand}
                                        className={cn(
                                            'rounded-full border px-4 py-1.5 text-sm transition-colors',
                                            activeBrand === brand
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                                        )}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>

                            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {visible.map((product) => (
                                    <li
                                        key={product.id}
                                        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
                                    >
                                        <div className="relative flex aspect-4/3 items-center justify-center bg-muted p-4">
                                            {product.tag && (
                                                <span className="absolute top-3 left-3 rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background">
                                                    {product.tag}
                                                </span>
                                            )}
                                            <SneakerArt
                                                accent={product.accent}
                                                className="w-full transition-transform duration-300 group-hover:-translate-y-1"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-3 p-4">
                                            <div>
                                                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                                                    {product.brand}
                                                </p>
                                                <h3 className="mt-1 font-medium">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {product.colorway}
                                                </p>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                Saiz {product.sizes.join(' | ')}
                                            </p>

                                            <div className="mt-auto flex items-baseline gap-2">
                                                <span className="font-semibold">
                                                    {formatPrice(product.price)}
                                                </span>
                                                {product.was && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        {formatPrice(
                                                            product.was,
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                            >
                                                Tambah ke troli
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-border">
                    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground">
                        <span>
                            &copy; {new Date().getFullYear()} KedaiKasut
                        </span>
                        <span>Mockup - data produk belum disambung ke DB</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
