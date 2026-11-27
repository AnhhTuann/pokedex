# Thẻ Pokémon

Mỗi thẻ có số National Dex ở góc trên và số regional riêng khi có. Nút tim đứng độc lập với nút mở thẻ. Artwork dùng `object-fit: contain`, có vùng cố định để đổi ảnh Shiny mà giữ kích thước thẻ. Tên, nhãn form và badge hệ nằm theo thứ tự dưới artwork. Mega và Gigantamax có pill vàng. Compare tiếp tục dùng form ID và trạng thái `aria-pressed`.

Giữ quy trình màu Phase 10 và các cải tiến lịch sử tại `a573b85`, `fa80c32`, `58f17aa`. Canvas lấy mẫu 30×30, bỏ pixel trong suốt, nhóm RGB, ưu tiên chroma và hue hệ chính, cache theo URL và hệ. Kiểm tra URL/hệ trước khi dùng kết quả async. Nếu artwork thiếu hoặc không trích được, helper giữ pastel fallback theo hệ. Hai lớp radial trộn màu đã trích và màu hệ thứ hai. Một lớp riêng dùng hệ chính cho bóng mềm bên dưới ảnh. Texture chấm nằm sau ảnh, không phủ hoặc làm tối pixel artwork.

Giữ `PokemonArtwork` cho lỗi tải và hình thiếu, với nhãn đúng normal/shiny. Giữ đường dẫn artwork đến từng form. Dashboard và Light tiếp tục hiển thị thẻ cũ.

[Hover](screenshots/card-hover.png) · [Favorite](screenshots/favorite.png)
