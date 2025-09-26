// portfolio/src/components/Certificates.tsx
import React from 'react';
// Swiper React parts
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
// Swiper feature modules
import {
	Navigation,
	Pagination,
	A11y,
	Autoplay,
	Keyboard,
	Mousewheel,
} from 'swiper/modules';
// NOTE: Swiper core CSS and module CSS are already imported globally in src/index.css

import placeholder from '../assets/images/placeholder.png';

export interface Certificate {
	id: number;
	title: string;
	issuer: string;
	date: string;
	imageUrl: string;
	link?: string;
}

interface CertificatesProps {
	// Optional prop for future data injection from JSON
	certificates?: Certificate[];
}

/**
 * SlideCard renders an individual certificate and adjusts scale/opacity
 * based on slide state (active/prev/next vs far) using Swiper's useSwiperSlide().
 * - Active (center): larger and fully opaque
 * - Nearby (prev/next): slightly smaller, slightly faded
 * - Far (others): smaller and more faded
 */
const SlideCard: React.FC<{ cert: Certificate }> = ({ cert }) => {
	const slide = useSwiperSlide();

	const isActive = slide.isActive;
	const isNearby = slide.isPrev || slide.isNext;

	// Scale mapping for visual emphasis
	const scaleClass = isActive ? 'scale-105' : isNearby ? 'scale-95' : 'scale-90';
	// Opacity mapping to push non-focused slides to the background
	const opacityClass = isActive ? 'opacity-100' : isNearby ? 'opacity-80' : 'opacity-50';
	// Elevation ensures the center card appears atop neighbors
	const zClass = isActive ? 'z-20' : isNearby ? 'z-10' : 'z-0';

	return (
		<div
			className={`transform ${scaleClass} ${opacityClass} ${zClass} transition-all duration-300 ease-out will-change-transform`}
		>
			<div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200">
				<a
					href={cert.link || '#'}
					target={cert.link ? '_blank' : undefined}
					rel={cert.link ? 'noopener noreferrer' : undefined}
					aria-label={cert.link ? `Open ${cert.title}` : undefined}
					className="block"
				>
					<div className="aspect-video bg-gray-100">
						<img
							src={cert.imageUrl}
							alt={`${cert.title} certificate`}
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>
				</a>

				<div className="p-6 space-y-2">
					<h3 className="font-lilita text-2xl text-gray-900">{cert.title}</h3>
					<p className="text-sm text-gray-600">
						{cert.issuer} • {cert.date}
					</p>

					{cert.link && (
						<a
							href={cert.link}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
						>
							View
							<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
	// Placeholder items for now; wire to src/data/certificates.json later
	const items: Certificate[] =
		certificates ??
		[
			{ id: 1, title: 'Sample Certificate', issuer: 'Provider', date: '2024', imageUrl: placeholder, link: '#' },
			{ id: 2, title: 'Another Certificate', issuer: 'Provider', date: '2024', imageUrl: placeholder, link: '#' },
			{ id: 3, title: 'Third Certificate', issuer: 'Provider', date: '2023', imageUrl: placeholder, link: '#' },
			{ id: 4, title: 'Fourth Certificate', issuer: 'Provider', date: '2023', imageUrl: placeholder, link: '#' },
			{ id: 5, title: 'Fifth Certificate', issuer: 'Provider', date: '2022', imageUrl: placeholder, link: '#' },
		];

	return (
		<section className="section bg-white py-24">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Section header */}
				<div className="px-8 sm:px-6 lg:px-8 mb-10">
					<h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900">Certificates</h2>
					<p className="text-gray-600 mt-3">Center slide is emphasized. Autoplay pauses on hover. Drag or use arrows.</p>
				</div>

				{/* Swiper configuration:
					 - Centered slides ensure an obvious “active” center.
					 - 3 visible slides on desktop; responsive breakpoints below.
					 - Autoplay runs continuously; pause on hover; resumes after interaction.
					 - Keyboard + mouse wheel for additional interaction.
				*/}
				<Swiper
					modules={[Navigation, Pagination, A11y, Autoplay, Keyboard, Mousewheel]}
					className="skills-swiper"
					spaceBetween={24}
					loop={true}
					centeredSlides={true}
					grabCursor={true}
					navigation
					pagination={{ clickable: true }}
					keyboard={{ enabled: true }}
					mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={750}
					breakpoints={{
						0: { slidesPerView: 1.05, spaceBetween: 16 },   // mobile: 1 slide focused
						640: { slidesPerView: 1.3, spaceBetween: 18 },  // small tablets
						768: { slidesPerView: 2.1, spaceBetween: 20 },  // tablets: 2-ish
						1024: { slidesPerView: 3, spaceBetween: 24 },   // desktop: 3 at a time
					}}
					aria-label="Certificates carousel"
				>
					{items.map((cert) => (
						<SwiperSlide key={cert.id}>
							<SlideCard cert={cert} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Certificates;