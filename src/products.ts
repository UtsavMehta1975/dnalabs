export type ProductCategory = 'anabolics' | 'sarms' | 'dietary';

export interface ProductItem {
  slug: string;
  name: string;
  priceGBP: number;
  category: ProductCategory;
  image: string; // public path
  description: string;
}

// Helper to build slugs
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const products: ProductItem[] = [
  { name: 'AMP', priceGBP: 50, category: 'anabolics', image: '/assets/products/AMP.49ed8230d4f06b18668f.jpeg', slug: toSlug('AMP'), description: 'AMP is positioned as a high-performance support blend. It is commonly included in cutting or performance phases to complement disciplined nutrition and training. Information here is educational only; always consult a qualified professional to determine suitability, dosage, and timing within a structured protocol.' },
  { name: 'Bolda', priceGBP: 55, category: 'anabolics', image: '/assets/products/Bolda.865f5ba0774f53d2192f.jpeg', slug: toSlug('Bolda'), description: 'Bolda is often discussed for steady support over longer phases. Users typically highlight a focus on quality routines, adequate protein intake, and responsible periodization. This overview is informational only and not guidance; seek professional advice for any use, monitoring, and safety considerations.' },
  { name: 'Cut Mix', priceGBP: 51, category: 'anabolics', image: '/assets/products/CutMix.0007fee8e08d5a16a1f6.jpeg', slug: toSlug('Cut Mix'), description: 'Cut Mix blends are commonly referenced in contexts emphasizing definition phases. Effective outcomes rely on nutrition, hydration, and rest. This description is purely educational and not a recommendation. Engage a qualified professional to evaluate risks, interactions, and appropriate strategies before considering any product.' },
  { name: 'DEC-A', priceGBP: 56, category: 'anabolics', image: '/assets/products/DecA.b16e48904271234c543d.jpeg', slug: toSlug('DEC-A'), description: 'DEC-A is associated with structured plans that prioritize recovery, mobility, and consistent training. Outcomes are highly individual and depend on lifestyle. This information is not medical advice. Consult a qualified professional for personalized assessment, contraindications, and safe, responsible use under supervision.' },
  { name: 'Gain Blend', priceGBP: 60, category: 'anabolics', image: '/assets/products/GainBlend.423f5bc7c8ac53a7f8b3.jpeg', slug: toSlug('Gain Blend'), description: 'Gain Blend products are typically mentioned for phases focused on strength and size, alongside adequate calories and protein. Results depend on compliance and recovery. This educational summary is not a recommendation. Always consult a qualified professional before use to understand risks and appropriate programming.' },
  { name: 'Masterone', priceGBP: 64, category: 'anabolics', image: '/assets/products/Masterone.56f10a2a01e4947e9d34.jpeg', slug: toSlug('Masterone'), description: 'Masterone is often described in definition-oriented contexts emphasizing responsible planning and close monitoring. Outcomes vary based on individual factors. This page provides information only and is not a substitute for professional guidance. Discuss suitability and safe practices with a qualified professional.' },
  { name: 'Primobolan', priceGBP: 53, category: 'anabolics', image: '/assets/products/Primobolan.19734eae68fa841e2fb4.jpeg', slug: toSlug('Primobolan'), description: 'Primobolan is referenced in literature for measured approaches with focus on nutrition and long-term consistency. Individual responses can differ. This content is educational and not medical advice. Always consult a qualified professional for suitability, monitoring, and safe, responsible use within a supervised plan.' },
  { name: 'TEST-C', priceGBP: 74, category: 'anabolics', image: '/assets/products/TestC.d8a1524adfeb440bf34f.jpeg', slug: toSlug('TEST-C'), description: 'TEST-C is discussed in contexts that emphasize individualized protocols and periodic assessments. Lifestyle, recovery, and nutrition are critical to outcomes. This description is for information only. Seek guidance from a qualified professional before considering use, and ensure supervision for safety and compliance.' },
  { name: 'TEST-P', priceGBP: 77, category: 'anabolics', image: '/assets/products/TestP.bae9c9e3260e36c67f9e.jpeg', slug: toSlug('TEST-P'), description: 'TEST-P is frequently associated with structured routines demanding precise timing, nutrition, and rest. Effects are influenced by individual context. This is not a recommendation or medical guidance. Consult a qualified professional to evaluate risks, interactions, and appropriate application under supervision.' },
  { name: 'Tren-A', priceGBP: 80, category: 'anabolics', image: '/assets/products/TrenA.39b19a8f2ba03420deaf.jpeg', slug: toSlug('Tren-A'), description: 'Tren-A appears in advanced discussions emphasizing careful planning and close oversight. Lifestyle and recovery habits significantly affect outcomes. The details here are informational and not advice. Seek a qualified professional to determine suitability and to supervise safe, responsible use.' },
  { name: 'Tren-E', priceGBP: 52, category: 'anabolics', image: '/assets/products/TrenE.e59bdcccd7101bf058ac.jpeg', slug: toSlug('Tren-E'), description: 'Tren-E is generally referenced for experienced users within comprehensive programs that prioritize monitoring, nutrition, and recovery. Results vary. This text is educational only and not a recommendation. Always consult a qualified professional and proceed only under appropriate supervision.' },
  { name: 'Tren-H', priceGBP: 54, category: 'anabolics', image: '/assets/products/TrenH.5bc2084181edc8449f6a.jpeg', slug: toSlug('Tren-H'), description: 'Tren-H discussions frequently underscore responsibility, adherence, and professional oversight. Progress depends on habits, nutrition, and rest. This summary is not medical advice. Consult a qualified professional to evaluate suitability, risks, and safe protocols tailored to individual circumstances.' },
  { name: 'Tri Tren', priceGBP: 61, category: 'anabolics', image: '/assets/products/TriTren.2d6466cc271eee1efa20.jpeg', slug: toSlug('Tri Tren'), description: 'Tri Tren references appear in contexts requiring experience and structured planning, emphasizing dietary discipline and regular monitoring. Outcomes are individual. This content is for information only. Engage a qualified professional to discuss suitability, safety, and responsible use within a supervised plan.' },
  { name: 'Winstrol', priceGBP: 65, category: 'anabolics', image: '/assets/products/Winstrol.a2f120efc16688820337.jpeg', slug: toSlug('Winstrol'), description: 'Winstrol is commonly mentioned for definition-focused phases supported by nutrition and recovery strategies. Responses vary widely. This is not guidance or medical advice. Consult a qualified professional for individualized evaluation, potential risks, and supervised application where appropriate.' },
  { name: 'Cardarine', priceGBP: 77, category: 'sarms', image: '/assets/products/Cardarine.fd1c77bca569050859a7.jpg', slug: toSlug('Cardarine'), description: 'Cardarine is discussed in performance and conditioning contexts in conjunction with responsible training and nutrition. Results can differ by individual. The overview here is informational only. Always consult a qualified professional before any use and follow supervised, safety-first practices.' },
  { name: 'LGD-4033', priceGBP: 78, category: 'sarms', image: '/assets/products/LGD4033.53cc515fc89947fe7890.jpg', slug: toSlug('LGD-4033'), description: 'LGD-4033 is often referenced for strength and preservation phases under structured programs. Outcomes depend on consistency, nutrition, and recovery. This information is not medical advice. Consult a qualified professional to evaluate suitability, risks, and appropriate protocols under supervision.' },
  { name: 'MK-677', priceGBP: 56, category: 'sarms', image: '/assets/products/MK677.e9ca52fcd568293c2c00.jpg', slug: toSlug('MK-677'), description: 'MK-677 is discussed regarding appetite and recovery contexts, typically within comprehensive plans. Responses differ by individual and routine. This description is educational only, not a recommendation. Engage a qualified professional for personalized guidance and safety oversight.' },
  { name: 'MK-2866', priceGBP: 80, category: 'sarms', image: '/assets/products/MK2866.d400f9ce63bbe9ac248a.jpg', slug: toSlug('MK-2866'), description: 'MK-2866 appears in literature for support during recomposition-style approaches. Effects are highly dependent on training, nutrition, and rest. This content is informational only. Consult a qualified professional to assess suitability, potential risks, and responsible supervised use.' },
  { name: 'RAD', priceGBP: 65, category: 'sarms', image: '/assets/products/RAD.29f74fabd3673468688c.jpg', slug: toSlug('RAD'), description: 'RAD is referenced for performance-focused plans that emphasize progressive training and adequate recovery. Outcomes vary by individual context. This page provides educational information only. Seek qualified professional advice before considering use, and ensure appropriate supervision.' },
  { name: 'S-23', priceGBP: 79, category: 'sarms', image: '/assets/products/S23.ca5bf438e0c8507e446f.jpg', slug: toSlug('S-23'), description: 'S-23 is typically discussed for experienced contexts with strict adherence to programming and monitoring. Lifestyle and nutrition remain crucial. This information is not medical guidance. Consult a qualified professional regarding suitability, safety, and responsible use under supervision.' },
  { name: 'SR-9009', priceGBP: 80, category: 'sarms', image: '/assets/products/SR9009.d18d8d09b579751370b9.jpg', slug: toSlug('SR-9009'), description: 'SR-9009 appears in conditioning-oriented discussions highlighting consistency, rest, and nutrition. Individual responses vary. This summary is for educational purposes only. Always consult a qualified professional before any use, and proceed only with appropriate supervision and safety measures.' },
];

export const categories = [
  { slug: 'anabolics-steroid', name: 'Anabolics Steroid', key: 'anabolics' as const },
  { slug: 'sarms', name: 'SARMs', key: 'sarms' as const },
  { slug: 'dietary-supplements', name: 'Dietary supplements', key: 'dietary' as const },
];

export function productsByCategory(slug?: string) {
  if (!slug) return products;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return products;
  return products.filter(p => p.category === cat.key);
}

export const trendingNames = [
  'SR-9009','AMP','Bolda','Cut Mix','DEC-A','Gain Blend','Masterone','Primobolan','TEST-C','TEST-P','Tren-A','Tren-E','Tren-H','Tri Tren','Winstrol','Cardarine','LGD-4033','MK-677','MK-2866','RAD','S-23'
];

export const trendingProducts: ProductItem[] = trendingNames
  .map(name => products.find(p => p.name === name))
  .filter(Boolean) as ProductItem[];
