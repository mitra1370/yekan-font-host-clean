const fs = require('fs');

// مسیر دقیق پوشه فونت‌ها
const fontsDir = "/Users/mitra/WebstormProjects/fonts/Yekan Bakh";

// اولویت فرمت‌ها: woff2 → woff
const isFont = (f) => (f.endsWith('.woff2') || f.endsWith('.woff')) && !f.toLowerCase().includes('en');
const extPriority = (f) => (f.endsWith('.woff2') ? 0 : 1);

// خواندن، فیلتر، و سورت
const files = fs.readdirSync(fontsDir)
    .filter(f => isFont(f) && f !== '.DS_Store')
    .sort((a, b) => {
        const aBase = a.toLowerCase().replace(/\.(woff2|woff)$/, '');
        const bBase = b.toLowerCase().replace(/\.(woff2|woff)$/, '');
        // سورت بر اساس نام، بعد بر اساس اولویت فرمت
        return aBase === bBase ? extPriority(a) - extPriority(b) : aBase.localeCompare(bBase);
    });

// چاپ لینک‌ها
files.forEach(file => {
    console.log(`https://yekan-font-host-clean.vercel.app/fonts/${encodeURI(file)}`);
});
