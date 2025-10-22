# Bikonomi — Ön İzleme (Vite + React)

Bu proje, Bikonomi.com arayüzünün **çalışır ön izleme** sürümüdür.

## Çalıştırma
```bash
npm i
npm run dev
# http://localhost:5173
```

## Vercel'e Tek Tık Deploy
1. Bu klasörü bir GitHub reposuna gönderin (örn. `bikonomi-preview`)
2. https://vercel.com 'de **New Project** → GitHub repo'yu seçin
3. **Framework Preset = Vite**, `npm run build` ve `dist` otomatik tanınır
4. Deploy → size `https://bikonomi-preview.vercel.app` gibi bir link verecek

## İçerik
- **Ana sayfa**: arama, düşen ürünler, fiyat nabzı
- **Ürün sayfası**: fiyat geçmişi grafiği (Recharts), AI kararı (Şimdi Al/Bekle), satıcı tablosu

> Not: Veriler demo amaçlıdır. Gerçek veriye bağlamak için API uçlarını ekleyiniz.
🟢 Son test dağıtımı – Bikonomi ön izleme güncellendi.


