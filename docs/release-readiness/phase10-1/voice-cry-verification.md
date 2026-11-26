# Voice và Cry

- **Voice thật — BLOCKED.** Chrome chạy Web Speech API, `getVoices()` trả mảng rỗng. API báo `synthesis-failed` với utterance `en-US`. Chưa xác minh được tiếng đọc thực tế hoặc chọn giọng bản địa trên máy có giọng.
- **Cry thật — PASSED ở tầng trình duyệt.** Bulbasaur dùng URL `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg` từ catalog. Chrome ghi sự kiện `loadeddata`, `playing` và `ended` ở volume `0.5`. Không đo đầu ra loa vật lý.
- **Vòng đời bằng mock.** Test phân biệt giọng tiếng Anh và tiếng Pháp, kiểm Play, Pause, Resume, Stop, end, error, dọn speech/cry khi đổi Pokémon hoặc đóng detail, và trường hợp thiếu URL. Kết quả từng bước nằm trong JSON.
- **Sửa lỗi.** Giữ tham chiếu utterance và Audio để hủy đúng instance, dọn listener và nguồn media, chặn bấm lặp lúc đang phát, hiển thị lỗi cho người dùng. Màu nhấn theo hệ vẫn giữ nguyên.

[Bằng chứng Chromium](results/browser-media.json)
