# Eylem Dedektifleri

## Amaç ve dosyalar

İlkokul öğrencileri resimdeki eylemi sözlü tahmin eder. Proje Windows'ta `index.html` dosyasına çift tıklamayla açılır; internet, sunucu veya kurulum gerektirmez.

- Proje klasörü: `D:\Projeler\eylem-dedektifleri` (önceki adı `eee`).
- Mevcut 16 JPEG resimler/ klasöründe aynı adlarla korunur; resimler göreli yollarla açık bir listeden yüklenir.
- Tasarım sıcak renkli, sade, büyük görselli ve büyük düğmelidir. Resimler kesilmeden, oranları korunarak gösterilir.
- Yalnız Başla, Sıradaki öğrenci, Sıfırla ve Tam ekran düğmelerinde yazı bulunur. Görsellerde soru, cevap, açıklama, dosya adı veya sıra numarası görünmez. Yükleme/kayıt/ses hataları gerektiğinde öğretmene kısa mesajla bildirilir.

## Seçim ve ses

- Başla/Sıradaki öğrenci tıklaması yaklaşık üç saniyelik geçişi başlatır.
- Resimler 100 ms aralıklarla rastgele değişir; hızlanma/yavaşlama yoktur. Animasyonda tekrar başlatma engellenir.
- Son resim sabit doğal dosya sırasından seçilir: tarih/saat, aynı saatte numarasız dosya, ardından (1), (2), ... (10).
- 16. resimden sonra ilk resme dönülür; bu sıra öğrenci ekranında gösterilmez.
- Kullanıcının seçtiği `ses/dump_audio.mp3`, geçiş boyunca sabit oynatma hızında döngü halinde çalar. Dosyaya veya ritmine müdahale edilmez.
- Resim durduğu anda geçiş sesi kesilir ve bağımsız `ses/universfield-comedy-drum-roll-242242.mp3` bir kez çalar.
- Sesler yerel HTML audio ile çalınır; fetch, sunucu veya harici servis gerekmez. Açılışta, yeniden açmada ve sıfırlamada ses çalmaz.
- Ses hatası görsel seçimini engellemez. Yeni seçim ve sıfırlama eski sesleri durdurur.

## İlerleme ve kontroller

- Son seçilen resim ve sonraki konum localStorage içinde saklanır. Aynı bilgisayar/tarayıcı/dosya konumunda kapatıp açma veya yenileme sonrası devam edilir.
- Sıfırla kaydı siler ve başlangıç ekranına döner; sonraki seçim ilk resimdir.
- Yarım kalan seçim sırayı ilerletmez. Sekme gizlenirse animasyon ve sesler iptal edilir; son tamamlanan resim geri gelir.
- Tam ekran ve boşluk tuşuyla başlatma desteklenir. Tarayıcı verilerinin silinmesi ilerlemeyi kaldırabilir.
- Puan, öğrenci listesi, cevap sistemi veya ayrı ayar ekranı bulunmaz.

## Kabul kontrolleri

- Windows'ta file:// üzerinden çevrimdışı açılış, 16 resim ve iki MP3 yüklenmesi.
- 17 tamamlanan seçimde doğru sıra, başa dönüş ve tekrar tıklamaya karşı sıra atlamama.
- Geçiş sesi döngüsü, sabit oynatma hızı, finalin yalnız bir kez çalması ve seslerin örtüşmemesi.
- Yenileme, yeniden açma, sıfırlama ve seçim ortasında sekme gizleme sonrası ilerleme davranışı.
- Masaüstü, küçük pencere ve tam ekranda kesilmeyen resimler ve erişilebilir kontroller.

Seslerin işitsel uygunluğu kullanıcı tarafından seçilmiştir; bu Codex oturumu dinleyerek değerlendirme yapmamıştır.

## Uygulama sonucu — 4 Ekim 2026

Chrome üzerinde gerçek `file://` kullanımında kontroller geçti: 17 seçim (0–15, ardından 0), her seçimde bir final sesi, geçiş/final seslerinin örtüşmemesi, sabit oynatma hızında döngü, yenileme ve tarayıcının tamamen kapanıp açılması sonrasında ilerlemenin korunması, seçim ortasında sıfırlama ve kesinti, tam ekran açma/kapama. 1366×768, 820×650, 390×844 ve 850×420 boyutlarında taşma veya görünmeyen kontrol bulunmadı; çalışma zamanı hatası oluşmadı.


## Genişletilmiş doğrulama — 4 Ekim 2026

Chrome 154.0.8037.97 ve Edge 154.0.4258.53 üzerinde toplam 66 sıralı seçim, tam ekran açma/kapama, ses döngüsü ve durması, kalıcı kayıt, seçim iptali, 11 pencere boyutu ve 12 hata senaryosu kontrol edildi. Dar pencerelerdeki düğme taşmaları düzeltildi. Ayrıntılar ve kapsam sınırları TEST_RAPORU.md dosyasında.


## Ses ayarı — 4 Ekim 2026

Sıfırla yanında temayla uyumlu hoparlör düğmesi bulunur. Açılan panelde 0–100 ses seviyesi ve sustur/aç düğmesi vardır. Ayar iki sesi birlikte etkiler, mevcut geçiş/final dengesi korunur ve çalan sese anında uygulanır. Ses tercihi ayrı localStorage kaydında saklanır; Sıfırla ses tercihini değiştirmez. Panel dışına tıklama veya Escape paneli kapatır. Klavyeyle sürgü kullanımı desteklenir.
