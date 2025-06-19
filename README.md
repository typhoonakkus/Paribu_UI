
# 🧪 Paribu UI Test Automation - Playwright + Cucumber

This project is a test automation framework developed as part of a case study for a Senior QA Engineer position. It includes both UI and API test scenarios and follows industry best practices such as BDD, Page Object Model, and multi-browser support.

---

## 📚 Tech Stack

- **Language:** TypeScript
- **Test Runner:** [Cucumber.js](https://github.com/cucumber/cucumber-js)
- **Automation Library:** [Playwright](https://playwright.dev/)
- **BDD Syntax:** Gherkin
- **Assertions:** Playwright Expect
- **Test Design:** Page Object Model (POM)
- **Multi-Browser:** Chromium, Firefox, WebKit
- **Environment Management:** `cross-env`

---

## 📁 Klasör Yapısı

```bash
paribu-ui-case-study/
├── features/
│   ├── paribuMarket.feature           # Gherkin formatlı senaryolar
│   └── step_definitions/
│       └── paribuMarket.steps.ts     # Step defineleri
├── src/
│   ├── pages/                         # Page Object Model yapısı
│   ├── utils/                         # Logger, test verisi okuma
│   └── basePage.ts
├── test-data/
│   └── data.json                      # Statik test verileri
├── screenshots/                       # Otomatik alınan ekran görüntüleri
├── test-results/                      # HTML rapor çıktısı
├── .env.testing                       # Test ortamı yapılandırması
├── playwright.config.ts
├── generateReport.ts                 # HTML rapor üretici script
├── README.md
└── package.json
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Gerekli Paketleri Yükle

```bash
npm install
```

### 2. Ortam Değişkenlerini Ayarla

`.env.testing`, `.env.qa`, `.env.staging`, vb. dosyalar kullanılabilir.

Örnek `.env.testing`:

```
BASE_URL=https://www.paribu.com
```

### 3. Testleri Çalıştır

🚀 Running Tests
UI Test Command Examples
Command	Description
npm run test:chromium	Run tests in Chromium
npm run test:firefox	Run tests in Firefox
npm run test:webkit	Run tests in WebKit (Safari engine)

All tests are opened in non-headless mode, in incognito and fullscreen (maximized) mode.

---

## 🧪 Yazılmış Test Senaryosu

**`paribuMarket.feature`**

- FAN kategorisi filtrelenir
- 12 saatlik fiyat değişimi seçilir
- 3. coin seçilir
- Güncel fiyat birim fiyat alanına yazılır
- Adet bilgisi test verisinden alınarak girilir (örn. `5`)
- Total Price hesaplaması doğrulanır

---

## 📸 Ekran Görüntüleri

Hatalı durumlarda `screenshots/` klasörüne otomatik olarak ekran görüntüsü alınır ve saklanır.

---

## 📊 HTML Raporu Oluşturma

Test çalıştıktan sonra HTML raporu oluşturmak için:

```bash
npm run report
```

Bu komut `test-results/report.html` dosyasını oluşturur. Tarayıcı ile açarak sonuçları görselleştirebilirsin.

---

## 🔧 Faydalı Komutlar

```bash
# Test çalıştır
npx cucumber-js

# HTML rapor üret
npx ts-node scripts/generateReport.ts

# Paralel test çalıştır (isteğe bağlı)
npx cucumber-js --parallel 2
```

---

## 🧼 Kod Kalitesi

Kod yapısı aşağıdaki ilkelere göre hazırlanmıştır:

- BDD (Behavior Driven Development)
- SOLID prensipleri
- Clean Code standartları
- Ortak metotlar BasePage üzerinden erişilir
- Statik test verileri JSON dosyasından alınır

---

✅ Project Highlights
 Playwright + Cucumber integration with TypeScript

 BDD-style reusable steps

 Page Object Model structure

 Dynamic browser selection

 Viewport is maximized on launch

 Static wait avoided — proper waitFor usage

 Clean code and SOLID principles

 Custom assertion helpers via BasePage

 Easily configurable base URL (via env.ts)

🔍 Notes
this.homePage, this.marketPage, etc. are injected in Cucumber world context via hooks.ts.

## 📄 Lisans

MIT License
