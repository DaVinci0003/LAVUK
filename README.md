# X Gün Sayacı

Mavi tonlarda, sade ve mobil uyumlu bir PWA (telefona ana ekrana eklenebilen web sitesi).

## GitHub Pages ile yayınlama
1. ZIP içeriğini bir GitHub deposunun kök dizinine yükleyin.
2. Depoda **Settings → Pages** bölümünü açın.
3. **Deploy from a branch** seçin, `main` ve `/ (root)` seçip kaydedin.
4. GitHub Pages HTTPS bağlantısını oluşturduğunda telefondan açın.
5. iPhone: Paylaş → Ana Ekrana Ekle. Android/Chrome: menü → Uygulamayı yükle veya Ana ekrana ekle.

## Davranış
- İlk açılışta ayarlardan takip adını girin.
- “Bugün yazmadım” sayacı bir artırır; aynı gün ikinci kez seçim yapılamaz.
- “Bugün yazdım” onayla seriyi sıfırlar ve bugünün seçimini tamamlar.
- Hedef adı, bugünün seçimi tamamlandıktan sonra kilitlenir. Sıfırlama seçeneğinden sonra tekrar değiştirilebilir.
- Sayaç ve ayarlar aynı cihazın tarayıcısında saklanır.

Not: Tarayıcı/site verileri silinirse yerel kayıt da silinebilir. Bu sürümde bulut senkronizasyonu yoktur.
