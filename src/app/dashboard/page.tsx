'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { properties, getProgress, formatPrice } from '@/lib/propertyData';
// SKILLS import removed - skills page is disabled

export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();

  // Redirect if not completed flow
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  // Skills section removed - skills page is disabled

  const handleLogout = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 safe-top safe-bottom">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 page-transition">
        <Logo className="w-32 h-8" variant="dark" />

        <button
          onClick={handleLogout}
          className="text-text-muted hover:text-text-primary text-sm transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="mb-8 page-transition">
        <h1 className="text-hero text-white mb-1 heading-luxury">
          Welcome back, <span className="text-gradient-gold">{state.displayName}</span>
        </h1>
        <p className="text-text-secondary">
          Your exclusive portal to premium real estate
        </p>
      </section>

      {/* Skills section removed - skills page is disabled */}

      {/* Stats Overview */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="card-container">
          <p className="text-text-muted text-caption mb-1">Available Properties</p>
          <p className="text-2xl font-semibold text-white">{properties.length}</p>
        </div>
        <div className="card-container">
          <p className="text-text-muted text-caption mb-1">Avg. Yield</p>
          <p className="text-2xl font-semibold text-gold">4.3%</p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title text-white">Featured Properties</h2>
          <button className="text-gold text-sm font-medium hover:text-gold-light transition-colors">
            View All
          </button>
        </div>

        {/* Property Cards */}
        <div className="space-y-4 overflow-y-auto hide-scrollbar">
          {properties.map((property) => (
            <article key={property.id} className="property-card">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Tag */}
                {property.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-sm text-xs font-medium text-gold border border-border-gold">
                    {property.tag}
                  </span>
                )}

                {/* Type Badge */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-sm text-xs text-text-secondary">
                  {property.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Name & Location */}
                <h3 className="text-white font-medium mb-1">{property.name}</h3>
                <p className="text-text-muted text-sm mb-3">
                  {property.location}, {property.city}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-text-muted text-xs mb-0.5">Price</p>
                    <p className="text-white font-medium">{formatPrice(property.price)}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-0.5">Yield</p>
                    <p className="text-success font-medium">{property.rentalYield}%</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-0.5">Growth</p>
                    <p className="text-gold font-medium">+{property.appreciation}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-text-muted">Tokens Sold</span>
                    <span className="text-text-secondary">{getProgress(property)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${getProgress(property)}%` }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Spacer for mobile */}
      <div className="h-4" />
    </div>
  );
}
