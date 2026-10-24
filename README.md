# Action Detectives

[English](README.en.md)

İngilizce derslerinde sınıf eylemlerini, ülkeleri ve milliyetleri görseller üzerinden çalışmak için hazırlanmış çevrimdışı kart oyunudur. GitHub deposu: [action-detectives](https://github.com/erhankoclar/action-detectives).

## Kullanım

`index.html` dosyasını Chrome veya Edge ile açın. Kurulum, internet bağlantısı veya sunucu gerekmez. Klasör yapısını koruyun.

1. Açılışta **CLASSROOM LANGUAGE** (16 kart) veya **COUNTRIES & NATIONALITIES** (14 kart) seçin.
2. **Start** ve ardından **Next** düğmesiyle kart seçin. Boşluk tuşu da seçimi başlatır.
3. Üç saniyelik rastgele görsel geçişinden sonra destenin sıradaki kartı gösterilir. Mevcut geçiş sesi ve final sesi korunmuştur.
4. Ülkeler kategorisinde görselin altında Word belgesindeki ilgili soru, görselle eşzamanlı gösterilir. Sınıf kategorisinde ek soru bulunmaz.
5. **Change category** kategori seçimine döner; her kategorinin tamamlanan ilerlemesi ayrı korunur. Her yeni açılışta kategori yeniden sorulur.

## Kart sırası ve kayıt

Kategori ilk seçildiğinde Fisher–Yates yöntemiyle bir deste karılır. Her kart, tur içinde tam bir kez ve belirlenen sırada seçilir. Tur bittiğinde farklı bir sıra oluşturulur; yeni turun ilk kartı önceki turun son kartıyla aynı olmaz. Geçiş animasyonundaki rastgele görseller deste sırasını değiştirmez.

Deste, sıradaki konum ve son tamamlanan kart, kategori bazında `localStorage` içinde saklanır. Aynı tarayıcı ve dosya konumunda yeniden açıldığında kategori seçildikten sonra kaldığı yerden sürer. Tarayıcı kayıtları engellenirse oturum içinde çalışmaya devam eder. Eski sabit sıra kaydı kullanılmaz.

**Reset**, seçili kategori için yeni deste oluşturur. Ses tercihi korunur. Geçiş sırasında Reset, kategori değiştirme veya sekmenin gizlenmesi seçimi ve sesleri durdurur; yarım kalan seçim sırayı ilerletmez. Tam ekran, ses seviyesi ve susturma kontrolleri korunmuştur.

## Dosyalar

- `index.html`: arayüz, kategori kartları, soru eşleştirmeleri, karıştırma, kayıt ve ses yönetimi.
- `resimler/classroom-language/`: eyleme göre adlandırılmış 16 sınıf görseli.
- `resimler/countries-nationalities/`: kişi ve ülkeye göre adlandırılmış 14 benzersiz görsel. Bayrak klasöründeki 13 birebir kopya kaldırıldı; eski `mısır` dosyası, görseldeki Irak bayrağına göre `zaha-hadid-iraq.jpeg` olarak adlandırıldı.
- `docs/ingilizce_resimli_sorular.docx`: 14 soru eşleştirmesinin kaynak belgesi; metinleri belgedeki yazımlarıyla kullanılır.
- `ses/`: özgün iki MP3 dosyası.
- `tests/check-game.cjs`: gerçek Chrome ile kategori, tur sırası, karıştırma, kayıt, iptal ve farklı ekran boyutlarını denetleyen odaklı test. Node.js ve Playwright kurulu ortamda `node tests/check-game.cjs` ile çalıştırılır.
- `docs/PLAN.md` ve `docs/TEST_RAPORU.md`: önceki sürümün tarihsel planı ve test kaydı.

Yeni kart eklemek için görseli ilgili kategori klasörüne koyup `index.html` içindeki `categories` listesine dosya adını ve gerekiyorsa `text` alanını ekleyin. Kart sayısı değiştiğinde uyumsuz kayıt otomatik olarak yeni bir desteyle değiştirilir.

## Lisans

Proje [MIT lisansı](LICENSE) ile sunulur. Çoğaltma, değiştirme, dağıtma ve satışa izin verilir; lisans ve telif bildirimi kopyalarda korunmalıdır. Eklenen görsellerin ve seslerin üçüncü taraf hakları kendi hak sahiplerine aittir.
