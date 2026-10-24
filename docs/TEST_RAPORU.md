# Eylem Dedektifleri — Test raporu

Tarih: 4 Ekim 2026. Proje: `D:\Projeler\eylem-dedektifleri`.

## Sonuç

Chrome ve Microsoft Edge üzerinde aşağıdaki kontroller geçti. Testler gerçek `index.html` dosyasında, `file://` adresinden, internet bağlantısı kapalı ve ayrı tarayıcı profilleriyle yapıldı. Kullanıcının tarayıcı kaydı değiştirilmedi.

| Kontrol | Sonuç |
| --- | --- |
| Açılışta 16 farklı görsel ve iki yerel MP3 yüklenmesi | Geçti |
| Açılışta ve yeniden açmada sesin kendiliğinden başlamaması | Geçti |
| Her tarayıcıda 33 seçim: 1–16, 1–16, ardından 1 | Geçti; toplam 66 seçimde sıra atlanmadı |
| Animasyon sırasında 20 ek tıklama ve yeniden başlatma denemesi | Geçti; tek seçim tamamlandı |
| Yaklaşık üç saniye boyunca hızlı görsel geçişi, ardından resmin sabit kalması | Geçti |
| Geçiş sesinin döngüye dönmesi ve 1x hızda çalması | Geçti; iki tarayıcıda da döngü gözlendi |
| Seçim anında davulun durması, ayrı finalin bir kez çalması | Geçti; sesler çakışmadı |
| Final bittikten sonra sessizlik | Geçti |
| Yenileme ve tarayıcının tamamen kapatılıp yeniden açılması | Geçti; tamamlanan seçim korundu |
| Geçiş ortasında yenileme veya sıfırlama | Geçti; ses ve zamanlayıcılar durdu, sıra atlanmadı |
| Sekme gizlenme olayının tetiklenmesi | Geçti; seçim iptal edildi, son tamamlanan resim korundu |
| Boşluk ve odaklanmış düğmede Enter ile başlatma | Geçti |
| Geçiş sırasında tam ekran açılması ve seçimin tamamlanması | Geçti |
| Düğmeyle dört kez tam ekran açma ve kapama | Geçti; düğme metni güncellendi |
| 11 pencere boyutu, kısa ve uzun tam ekran düğme metinleri | Geçti; taşma ve ekran dışında kontrol yok |
| Görsellerin oranları korunarak kesilmeden gösterilmesi | Geçti; ekran görüntüleri de incelendi |
| Normal kullanımda JavaScript çalışma zamanı hatası | Görülmedi |

Ekran boyutları: 1920×1080, 1366×768, 1024×768, 820×650, 801×420, 800×650, 768×650, 701×650, 390×844, 320×568 ve 850×420.

## Hata durumları

Ayrı test sayfalarında 12 hata senaryosu geçti: bozuk JSON, bilinmeyen görsel kaydı, sınır dışı sıra, tutarsız kayıt, depolama okuma/yazma/silme engeli, iki ses dosyasının ayrı ayrı eksik olması, ses oynatma izninin reddi, tam ekran isteğinin reddi ve eksik resim.

Depolama veya ses sorunu oyunu kilitlemedi; öğretmene bildirim gösterildi. Eksik görselde boş resimle seçim yapılmasını önlemek için Başla düğmesi kapalı kaldı. Tam ekran isteği reddedildiğinde F11 yönlendirmesi gösterildi. Asıl resim ve ses dosyaları hata testleri için değiştirilmedi.

## Düzeltilen sorunlar

- 701–800 piksel aralığında uzun tam ekran düğme metni taşabiliyordu. Dar pencere düzeninin sınırı 800 piksele çıkarıldı.
- 320 piksel genişlikte alt düğmeler taşabiliyordu. Sütunlar daralabilir hale getirildi; düğme genişliği sınırlanıp metnin satıra geçmesi sağlandı.

İlk tam ekran testi, `fullscreenchange` olayı metni güncellemeden kontrol yapıyordu. Test ilgili olayı bekleyecek şekilde düzeltildi; bu bir uygulama hatası değildi. Düzeltmelerden sonra ilgili Chrome ve Edge kontrolleri tekrar çalıştırılıp geçti. Sıralama kodu değiştirilmediği için tamamlanan 66 seçimlik test tekrar edilmedi.

## Kapsam sınırı

Sekme gizlenmesi olayı doğrudan tetiklenerek sınandı. Otomasyon penceresinde fiziksel sekme değiştirme ve tarayıcının yerel Escape/F11 kısayolları güvenilir biçimde doğrulanamadı; bu kısayollar geçti olarak sayılmadı. Uygulamanın tam ekran düğmesi iki tarayıcıda doğrulandı. Seslerin işitsel uygunluğu kullanıcının seçimine dayanır; ses oynatma, döngü ve durma davranışı test edildi.


## Ses ayarı ek kontrolü — 4 Ekim 2026

Chrome ve Edge üzerinde ses seviyesi, sıfır seviyede sessizlik, sustur/aç, önceki seviyeye dönüş, geçiş sırasında susturma, yeniden yüklemede tercihin korunması, Sıfırla ile ses tercihinin korunması, sıralı iki seçim, tam ekranda ses ayarı ve klavye kontrolleri geçti. Bozuk/sınır dışı ses kaydı güvenli başlangıç seviyesine döndü. 13 genişlikte panel açıkken iki tam ekran etiketiyle 26 görünüm kontrolü her tarayıcıda geçti; taşma veya erişilemeyen düğme görülmedi. Masaüstü ve dar pencere ekran görüntüleri incelendi. JavaScript çalışma zamanı hatası görülmedi.


## Kategori ve karılmış deste — 24 Ekim 2026

Chrome üzerinde gerçek `file://` sayfası ve ayrı, geçici tarayıcı profiliyle `tests/check-game.cjs` çalıştırıldı. Kullanıcının tarayıcı kaydı değiştirilmedi.

- CLASSROOM LANGUAGE: 16 kartın ilk karılan sıraya birebir uyumu ve tur içinde tekrarsız gösterimi geçti.
- COUNTRIES & NATIONALITIES: 14 kart için aynı kontroller ve görselle soru metninin eşleşmesi geçti.
- Her iki kategoride tur sonunda farklı sıra, tur sınırında aynı kartın tekrar etmemesi, sonraki turun ilk kartı, yinelenen başlatma girişiminin engellenmesi geçti.
- Yeniden yüklemede kategori seçiminin sorulması, seçilen kategorinin destesinin ve konumunun korunması geçti.
- Geçiş ortasında kategori değiştirme ile iptal ve sıranın korunması, Reset ile yeni deste geçti.
- Bozuk/tekrarlı kayıtlı destenin yeni geçerli desteyle değiştirilmesi geçti.
- 30 görsel dosyasının tamamının bulunması doğrulandı; JavaScript çalışma zamanı hatası görülmedi.
- 1366×768, 820×650, 390×844 ve 850×420 boyutlarında her iki kategoride görsel ve kontrollerin ekrana sığması geçti. Ülkeler kategorisinin masaüstü ve telefon ekran görüntüleri görsel olarak incelendi.

Zaman alan geçişler testte tarayıcının sanal saatiyle ilerletildi. Ses dosyaları ve ses kontrol kodu korunmuştur; bu turda sesin işitsel değerlendirmesi ve önceki sürümün tüm ses/tam ekran hata senaryoları tekrarlanmadı. Build veya lint çalıştırılmadı; statik HTML uygulamasının derleme adımı yoktur.
