# Thẻ Pokémon

Card dùng mặt graphite phẳng, viền pha 24% màu hệ chính và bóng trung tính nhỏ. Hai lớp màu được giới hạn trong vùng artwork. Trọng số màu trích giảm từ 44% xuống 12%, tương đương giảm 73%. Màu hệ hai giảm từ 31% xuống 9%, tương đương giảm 71%. Đây là tỷ lệ CSS, không phải phép đo cường độ sáng cảm nhận. Texture chấm và bóng ellipse màu cũ đã bỏ.

Giữ canvas 30×30, chấm điểm theo type/chroma, cache theo URL và type, fallback theo hệ và kiểm tra kết quả async khớp ảnh hiện tại. `PokemonArtwork` tiếp tục tải đúng ảnh Normal/Shiny theo ID form, giữ tỉ lệ và vùng ảnh riêng với text. Số National Dex, tim, ảnh, tên tối đa hai dòng, form label và badge có vị trí nhất quán. Khu vực thông tin có chiều cao tối thiểu, tên dài giữ trong hai dòng và badge hệ neo ở dưới. Pill Mega/Gigantamax nằm góc dưới vùng artwork.

Hover nâng 4 px và tăng scale ảnh 1.04 trong 200 ms. Border và nền thay nhẹ, không thêm ánh sáng. Entrance dịch 4 px, tim scale 1.13 trong 220 ms. Dark skeleton tĩnh. Reduced motion giữ trạng thái chọn và focus, bỏ chuyển động thẻ và dropdown.

[Hover](screenshots/card-hover.png) · [Favorite](screenshots/favorite.png)
