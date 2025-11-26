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

import certificatesData from '../data/certificates.json';

export interface Certificate {
	id: number;
	title: string;
	issuer: string;
	date: string;
	imageUrl: string;
	link?: string;
	description?: string;
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
			className={`transform ${scaleClass} ${opacityClass} ${zClass} transition-all duration-300 ease-out will-change-transform h-full`}
		>
			<div className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
				<a
					href={cert.link || '#'}
					target={cert.link ? '_blank' : undefined}
					rel={cert.link ? 'noopener noreferrer' : undefined}
					aria-label={cert.link ? `Open ${cert.title}` : undefined}
					className="block relative overflow-hidden"
				>
					<div className="aspect-video bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
						<img
							src={cert.imageUrl}
							alt={`${cert.title} certificate`}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
						{/* Overlay gradient on hover */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						
						{/* Description overlay - only shows on hover if description exists */}
						{cert.description && (
							<div className="absolute inset-0 p-6 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
								<p className="text-white text-sm leading-relaxed font-medium drop-shadow-lg">
									{cert.description}
								</p>
							</div>
						)}
					</div>
				</a>

				<div className="p-6 bg-white flex-grow flex flex-col">
					<h3 className="font-lilita text-xl sm:text-2xl text-gray-900 leading-tight min-h-[3.5rem] group-hover:text-orange-600 transition-colors duration-200 mb-2">
						{cert.title}
					</h3>
					
					<div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
						<svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						<span className="font-medium line-clamp-1">{cert.issuer}</span>
					</div>

					<div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
						<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>{cert.date}</span>
					</div>

					{cert.link && (
						<div className="mt-auto">
							<a
								href={cert.link}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm group/link"
							>
								<span>View Certificate</span>
								<svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
	// Load certificates from JSON data file
	const items: Certificate[] = certificates ?? (certificatesData as Certificate[]);

	return (
		<section className="section bg-transparent py-24">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Section header */}
				<div className="px-8 sm:px-6 lg:px-8 mb-12">
					<h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4">Certificates & Achievements</h2>
					<p className="text-gray-600 text-lg">Professional certifications and recognitions. Drag to explore or use arrow keys to navigate.</p>
				</div>

				{/* Swiper configuration:
					 - Centered slides ensure an obvious "active" center.
					 - 3 visible slides on desktop; responsive breakpoints below.
					 - Autoplay runs continuously; pause on hover; resumes after interaction.
					 - Keyboard + mouse wheel for additional interaction.
				*/}
				<Swiper
					modules={[Navigation, Pagination, A11y, Autoplay, Keyboard, Mousewheel]}
					className="skills-swiper pb-12"
					spaceBetween={32}
					loop={true}
					centeredSlides={true}
					grabCursor={true}
					navigation
					pagination={{ 
						clickable: true,
						dynamicBullets: true,
					}}
					keyboard={{ enabled: true }}
					mousewheel={{ forceToAxis: true, sensitivity: 0.6 }}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={600}
					breakpoints={{
						0: { slidesPerView: 1.05, spaceBetween: 20 },   // mobile: 1 slide focused
						640: { slidesPerView: 1.3, spaceBetween: 24 },  // small tablets
						768: { slidesPerView: 2.2, spaceBetween: 28 },  // tablets: 2-ish
						1024: { slidesPerView: 3, spaceBetween: 32 },   // desktop: 3 at a time
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
