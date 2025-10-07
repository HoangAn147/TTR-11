<script setup lang="ts">
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "{Brand} - Thiết kế Website",
  "image": "https://yourdomain.com/images/logo.png",
  "@id": "https://yourdomain.com/",
  "url": "https://yourdomain.com/thiet-ke-website",
  "telephone": "+84-912345678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Đường ABC",
    "addressLocality": "Hà Nội",
    "addressRegion": "HN",
    "postalCode": "100000",
    "addressCountry": "VN"
  },
  "priceRange": "$$",
  "description": "Dịch vụ thiết kế website chuẩn SEO, responsive, tốc độ cao và tối ưu chuyển đổi.",
  "areaServed": { "@type": "Place", "name": "Việt Nam" },
  "sameAs": [
    "https://www.facebook.com/yourbrand",
    "https://www.linkedin.com/company/yourbrand"
  ]
}

useHead({
  title: 'Thiết kế Website Chuyên Nghiệp | {Brand}',
  meta: [
    { name: 'description', content: 'Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng. Liên hệ {Brand} để bắt đầu ngay!' },
    { name: 'keywords', content: 'thiết kế website, thiết kế web chuẩn SEO, dịch vụ web, làm web chuyên nghiệp' },
    { property: 'og:title', content: 'Thiết kế Website Chuyên Nghiệp | {Brand}' },
    { property: 'og:description', content: 'Dịch vụ thiết kế web tối ưu SEO, giao diện hiện đại và thân thiện với Google.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://yourdomain.com/thiet-ke-website' },
    { property: 'og:image', content: 'https://yourdomain.com/images/og-thiet-ke-web.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [{ rel: 'canonical', href: 'https://yourdomain.com/thiet-ke-website' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema)
    }
  ]
})
</script>


<template>
  <div class="container py-5">
    <h1>Thiết kế Website Chuyên Nghiệp</h1>
    <p>Dịch vụ thiết kế website chuẩn SEO, tốc độ cao, giao diện đẹp và tối ưu trải nghiệm người dùng.</p>
  </div>
</template>
