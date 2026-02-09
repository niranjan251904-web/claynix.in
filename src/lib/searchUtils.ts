import { Product } from '@/lib/types';

// Jewelry-specific synonyms for semantic search
const synonyms: Record<string, string[]> = {
    // Materials
    'gold': ['golden', 'gilt', 'aureate', '14k', '18k', '24k', 'plated'],
    'silver': ['sterling', 'argentum', 'silvery'],
    'rose gold': ['rose', 'pink gold', 'blush'],
    'stainless': ['steel', 'stainless steel', 'ss'],

    // Jewelry types
    'necklace': ['necklaces', 'chain', 'chains', 'pendant', 'pendants', 'choker', 'locket'],
    'ring': ['rings', 'band', 'bands', 'finger ring'],
    'earring': ['earrings', 'studs', 'stud', 'hoops', 'hoop', 'danglers', 'drops', 'ear'],
    'bracelet': ['bracelets', 'bangle', 'bangles', 'wrist', 'cuff'],

    // Stones
    'diamond': ['diamonds', 'ad', 'american diamond', 'cz', 'cubic zirconia', 'zirconia'],
    'emerald': ['emeralds', 'green stone', 'green'],
    'ruby': ['rubies', 'red stone', 'red'],
    'pearl': ['pearls', 'moti'],
    'sapphire': ['sapphires', 'blue stone', 'blue'],

    // Styles
    'floral': ['flower', 'flowers', 'bloom', 'botanical', 'rose'],
    'heart': ['hearts', 'love', 'romantic'],
    'butterfly': ['butterflies', 'moth'],
    'leaf': ['leaves', 'leafy', 'botanical', 'nature'],
    'snake': ['serpent', 'chain snake'],
    'star': ['stars', 'starry', 'celestial'],
    'moon': ['crescent', 'lunar', 'celestial'],

    // Categories/Trends
    'office': ['work', 'professional', 'formal', 'corporate', 'minimal'],
    'dreamy': ['romantic', 'soft', 'feminine', 'delicate', 'dainty'],
    'island': ['beach', 'summer', 'tropical', 'vacation', 'boho'],
    'trending': ['viral', 'popular', 'hot', 'bestseller', 'new'],
    'handmade': ['handcrafted', 'artisan', 'custom', 'artisanal'],
    'clay': ['polymer', 'polymer clay', 'craft'],

    // Descriptors
    'adjustable': ['flexible', 'one size', 'resizable'],
    'anti tarnish': ['anti-tarnish', 'tarnish free', 'durable', 'long lasting'],
    'studded': ['embedded', 'set', 'encrusted'],
    'elegant': ['classy', 'sophisticated', 'chic', 'stylish'],
    'minimalist': ['minimal', 'simple', 'subtle', 'understated'],
    'statement': ['bold', 'chunky', 'eye catching', 'dramatic'],
};

// Calculate similarity between two strings using Levenshtein distance
function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Check if word matches with fuzzy tolerance
function fuzzyMatch(word: string, target: string, tolerance: number = 2): boolean {
    if (target.includes(word) || word.includes(target)) return true;
    if (word.length < 3 || target.length < 3) return word === target;
    return levenshteinDistance(word, target) <= tolerance;
}

// Expand query with synonyms
function expandQuery(query: string): string[] {
    const words = query.toLowerCase().split(/\s+/);
    const expanded = new Set<string>(words);

    words.forEach(word => {
        // Check if word is a key in synonyms
        if (synonyms[word]) {
            synonyms[word].forEach(syn => expanded.add(syn));
        }

        // Check if word is a value in synonyms (reverse lookup)
        Object.entries(synonyms).forEach(([key, values]) => {
            if (values.some(v => v.includes(word) || word.includes(v))) {
                expanded.add(key);
                values.forEach(v => expanded.add(v));
            }
        });
    });

    return Array.from(expanded);
}

// Calculate relevance score for a product
function calculateRelevance(product: Product, queryTerms: string[]): number {
    let score = 0;
    const name = (product.name || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    const material = (product.material || '').toLowerCase();
    const tags = (product.tags || []).map(t => t.toLowerCase());
    const stone = (product.stone || '').toLowerCase();

    queryTerms.forEach(term => {
        // Exact match in name (highest priority)
        if (name.includes(term)) {
            score += 10;
            // Bonus for match at beginning
            if (name.startsWith(term)) score += 5;
        }

        // Match in category
        if (category.includes(term)) score += 8;

        // Match in tags
        if (tags.some(tag => tag.includes(term) || fuzzyMatch(term, tag))) score += 7;

        // Match in material
        if (material.includes(term) || fuzzyMatch(term, material)) score += 6;

        // Match in stone
        if (stone && (stone.includes(term) || fuzzyMatch(term, stone))) score += 6;

        // Match in description
        if (description.includes(term)) score += 3;

        // Fuzzy match in name
        const nameWords = name.split(/\s+/);
        if (nameWords.some(w => fuzzyMatch(term, w))) score += 4;
    });

    // Boost for featured/trending products
    if (product.featured) score += 2;
    if (tags.includes('trending')) score += 1;
    if (tags.includes('new')) score += 1;

    return score;
}

// Main semantic search function
export function semanticSearch(products: Product[], query: string): Product[] {
    if (!query || query.length < 2) return [];

    const queryTerms = expandQuery(query);

    // Calculate relevance for all active products
    const scoredProducts = products
        .filter(p => p.isActive)
        .map(product => ({
            product,
            score: calculateRelevance(product, queryTerms)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    return scoredProducts.map(item => item.product);
}

// Quick search for autocomplete (lighter weight)
export function quickSearch(products: Product[], query: string, limit: number = 5): Product[] {
    if (!query || query.length < 2) return [];

    const lowercaseQuery = query.toLowerCase();

    return products
        .filter(p => p.isActive && (
            p.name.toLowerCase().includes(lowercaseQuery) ||
            (p.category && p.category.toLowerCase().includes(lowercaseQuery)) ||
            p.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
        ))
        .slice(0, limit);
}
