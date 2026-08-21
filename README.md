# Smart Shop — www.cargolf.net

متجر إلكتروني احترافي ثنائي اللغة (العربية / الإنجليزية) على النطاق **https://www.cargolf.net**

## المميزات

- لغتان: العربية (RTL) والإنجليزية
- عملات: SAR, AED, KWD, BHD, OMR, QAR, MAD, USD
- الدفع عند الاستلام · توصيل مجاني · استرداد 30 يومًا
- صفحة منتج + هبوط + لوحة تحكم

## التشغيل المحلي

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## ربط النطاق www.cargolf.net (Vercel)

1. ارفع المشروع إلى GitHub أو انشر مباشرة:
   ```bash
   npx vercel
   ```
2. من لوحة Vercel → Project → Settings → Domains أضف:
   - `www.cargolf.net`
   - `cargolf.net` (اختياري مع إعادة توجيه إلى www)
3. في لوحة DNS عند مزوّد النطاق (Namecheap أو غيره) ضع:
   - **www** → CNAME إلى `cname.vercel-dns.com`
   - أو سجّل **A** حسب تعليمات Vercel
4. انتظر انتشار DNS (دقائق إلى ساعات)

متغير البيئة المطلوب:

```
NEXT_PUBLIC_SITE_URL=https://www.cargolf.net
```

لوحة التحكم بعد النشر: https://www.cargolf.net/admin
