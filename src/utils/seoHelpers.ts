import { GovernmentJob } from '../types';

export const SITE_DOMAIN = 'https://glitread.com';
export const DEFAULT_OG_IMAGE = 'https://glitread.com/glitread-og-banner.png';

/**
 * Generates Google Discover & Search Optimized Meta Title
 */
export function getOptimizedMetaTitle(job: GovernmentJob): string {
  if (job.metaTitle) return job.metaTitle;

  const totalVacancies = job.vacancyDetails?.totalVacancy;
  const vacancyStr = totalVacancies && totalVacancies > 0 ? ` (${totalVacancies.toLocaleString()} Vacancies)` : '';
  const org = job.organization || 'Sarkari Naukri';

  return `${job.title}${vacancyStr}: Apply Online, Syllabus, Age Limit & Notification - ${org}`;
}

/**
 * Generates Google Search & Discover Meta Description
 */
export function getOptimizedMetaDescription(job: GovernmentJob): string {
  if (job.metaDescription) return job.metaDescription;

  const org = job.organization || 'Government Department';
  const vacancies = job.vacancyDetails?.totalVacancy ? `${job.vacancyDetails.totalVacancy.toLocaleString()} Posts` : 'Multiple Vacancies';
  const lastDate = job.importantDates?.applicationLastDate || 'Check Notification';
  const minQual = job.eligibility?.educationalQualification || 'As specified';

  return `Latest Government Job Notification: ${job.title} by ${org}. Total Vacancies: ${vacancies}. Qualification: ${minQual}. Last Date to Apply Online: ${lastDate}. Check Eligibility, Age Limit, Fee, Exam Pattern & Official Link.`;
}

/**
 * Generates high-volume keywords for Google ranking
 */
export function getOptimizedKeywords(job: GovernmentJob): string[] {
  if (job.keywords && job.keywords.length > 0) return job.keywords;

  const baseKeywords = [
    job.title,
    `${job.title} Notification 2026`,
    `${job.organization} Recruitment 2026`,
    `${job.organization} Vacancy`,
    'Sarkari Naukri 2026',
    'Government Job Notification',
    'Sarkari Result 2026',
    `${job.category} Jobs 2026`,
    `${job.state} Government Jobs`,
    'Free Job Alert',
    'Apply Online Govt Job'
  ];

  if (job.postNames && job.postNames.length > 0) {
    job.postNames.forEach(p => baseKeywords.push(`${p} Recruitment`));
  }

  return Array.from(new Set(baseKeywords));
}

/**
 * Generates Google Jobs (JobPosting) JSON-LD Schema
 */
export function generateJobPostingSchema(job: GovernmentJob, siteUrl: string = SITE_DOMAIN) {
  const canonicalUrl = `${siteUrl}/government-jobs/${job.slug || job.id}`;
  const postDateIso = job.postDate ? new Date(job.postDate).toISOString() : new Date().toISOString();

  // Compute valid through date (Default 60 days if applicationLastDate is missing or unparseable)
  let validThroughIso: string;
  if (job.importantDates?.applicationLastDate) {
    const parsedDate = new Date(job.importantDates.applicationLastDate);
    if (!isNaN(parsedDate.getTime())) {
      validThroughIso = parsedDate.toISOString();
    } else {
      const fallbackDate = new Date(postDateIso);
      fallbackDate.setDate(fallbackDate.getDate() + 60);
      validThroughIso = fallbackDate.toISOString();
    }
  } else {
    const fallbackDate = new Date(postDateIso);
    fallbackDate.setDate(fallbackDate.getDate() + 60);
    validThroughIso = fallbackDate.toISOString();
  }

  const jobDescriptionHtml = `
    <h3>${job.title} Recruitment Notification 2026</h3>
    <p><strong>Organization:</strong> ${job.organization || 'Government Department'}</p>
    <p><strong>Department:</strong> ${job.department || job.category}</p>
    <p><strong>Total Vacancies:</strong> ${job.vacancyDetails?.totalVacancy || 'Multiple'}</p>
    <p><strong>State/Region:</strong> ${job.state || 'All India'}</p>
    <h4>Eligibility Criteria:</h4>
    <ul>
      <li><strong>Educational Qualification:</strong> ${job.eligibility?.educationalQualification || 'Check Official Notification'}</li>
      <li><strong>Age Limit:</strong> ${job.ageLimit?.minimumAge || 18} to ${job.ageLimit?.maximumAge || 35} years</li>
    </ul>
    <h4>Important Dates:</h4>
    <ul>
      <li><strong>Notification Released:</strong> ${job.importantDates?.notificationDate || job.postDate}</li>
      <li><strong>Application Start Date:</strong> ${job.importantDates?.applicationStart || 'Started'}</li>
      <li><strong>Application Last Date:</strong> ${job.importantDates?.applicationLastDate || 'See Notification'}</li>
    </ul>
    <p>${job.shortInformation || ''}</p>
  `.replace(/\s+/g, ' ').trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': jobDescriptionHtml,
    'identifier': {
      '@type': 'PropertyValue',
      'name': job.organization || 'Government Body',
      'value': job.id || job.slug
    },
    'datePosted': postDateIso,
    'validThrough': validThroughIso,
    'employmentType': 'FULL_TIME',
    'hiringOrganization': {
      '@type': 'GovernmentOrganization',
      'name': job.organization || 'Government of India',
      'sameAs': job.officialWebsiteUrl || 'https://india.gov.in',
      'logo': `${siteUrl}/glitread-logo.svg`
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': job.state || 'All India',
        'addressRegion': job.state || 'All India',
        'addressCountry': 'IN'
      }
    },
    'applicantLocationRequirements': {
      '@type': 'Country',
      'name': 'IN'
    },
    'directApply': true,
    'url': canonicalUrl
  };
}

/**
 * Generates BreadcrumbList JSON-LD Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generates FAQPage JSON-LD Schema for Google Rich Snippets & Discover
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generates GovernmentOrganization JSON-LD Schema
 */
export function generateGovOrganizationSchema(job: GovernmentJob) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    'name': job.organization || 'Government Department',
    'alternateName': job.category,
    'url': job.officialWebsiteUrl || 'https://india.gov.in',
    'subOrganization': job.department ? {
      '@type': 'GovernmentOrganization',
      'name': job.department
    } : undefined
  };
}

/**
 * Generates SpeakableSpecification Schema for AI Voice Assistants, Gemini AI Overviews & Perplexity AI
 */
export function generateSpeakableSchema(cssSelectors: string[] = ['#ai-summary-box', '#faqs', '.job-header-title']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': cssSelectors
    }
  };
}

/**
 * Generates Article / TechArticle Schema for Generative AI Search & Knowledge Graph grounding
 */
export function generateGEOArticleSchema(job: GovernmentJob, siteUrl: string = SITE_DOMAIN) {
  const canonicalUrl = `${siteUrl}/government-jobs/${job.slug || job.id}`;
  const pubDate = job.postDate ? new Date(job.postDate).toISOString() : new Date().toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': `${job.title} Notification 2026: Total ${job.vacancyDetails?.totalVacancy || 'Multiple'} Vacancies - Apply Online`,
    'description': getOptimizedMetaDescription(job),
    'image': [job.ogImageUrl || `${siteUrl}/glitread-og-banner.png`],
    'datePublished': pubDate,
    'dateModified': job.updatedAt || pubDate,
    'author': {
      '@type': 'Organization',
      'name': 'Glitread Editorial Team',
      'url': siteUrl
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Glitread Government Jobs',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/glitread-logo.svg`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    'about': {
      '@type': 'Thing',
      'name': `${job.organization || 'Government'} Exam & Recruitment`,
      'description': job.shortInformation || ''
    }
  };
}

/**
 * Generates Standard Government Job FAQs automatically from job fields
 */
export function generateAutomatedJobFaqs(job: GovernmentJob): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];

  if (job.title && job.organization) {
    faqs.push({
      question: `What is the last date to apply online for ${job.title}?`,
      answer: `The last date to submit the online application for ${job.title} is ${job.importantDates?.applicationLastDate || 'as mentioned in the official notification'}. Candidates are advised to apply early to avoid last-minute server rush.`
    });
  }

  if (job.vacancyDetails?.totalVacancy) {
    faqs.push({
      question: `How many total vacancies are announced in ${job.title}?`,
      answer: `A total of ${job.vacancyDetails.totalVacancy.toLocaleString()} vacancies have been officially announced for ${job.title} across various categories.`
    });
  }

  if (job.eligibility?.educationalQualification) {
    faqs.push({
      question: `What is the educational qualification required for ${job.title}?`,
      answer: `The required educational qualification is: ${job.eligibility.educationalQualification}`
    });
  }

  if (job.ageLimit?.minimumAge || job.ageLimit?.maximumAge) {
    faqs.push({
      question: `What is the age limit for ${job.title}?`,
      answer: `The minimum age limit is ${job.ageLimit?.minimumAge || 18} years and maximum age limit is ${job.ageLimit?.maximumAge || 35} years. Upper age relaxation is applicable for reserved categories (SC/ST/OBC/Ex-Servicemen) as per government rules.`
    });
  }

  faqs.push({
    question: `Where can I download the official notification for ${job.title}?`,
    answer: `You can download the official PDF notification directly from the official link provided on Glitread or visit ${job.officialWebsiteUrl || 'the conducting authority website'}.`
  });

  return faqs;
}
