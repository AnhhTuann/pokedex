# CatchTracker

Nguồn baseline `8e57448` và PokeAPI/api-data `508fd7c3a7d54ac175e00afe420b11a5af983bd6`; bằng chứng là source diff và fixture 1.351 dòng. Kết quả ở tầng ứng dụng kiểm offline; DB **UNVERIFIED**.

Bản cũ truyền `limit: 1025` từ CatchTracker và dùng 1.025 làm mẫu số national. Server hỗ trợ offset và count form, còn cơ chế Load More chỉ tăng số thẻ được render. Một filter trả hơn 1.025 form vì thế chỉ tải 1.025 dòng đầu, ảnh hưởng cả Mark Current và progress. Form bị cắt cụ thể phụ thuộc thứ tự và dữ liệu runtime.

CatchTracker dùng operation chung và gom trang 250 từ API hiện có. No-cache tách từng trang khỏi Apollo merge của PokéDex. Khi đổi filter, bỏ kết quả in-flight cũ; nếu trang lỗi thì thông báo và cho retry. Chỉ mở bulk action cho tập đã tải hoàn chỉnh; Mark Current giữ scope server filters và ID form. Hide Caught tiếp tục là view filter. National progress lấy mẫu số toàn bộ form và giao các ID đã lưu với tập này; key trong catch store được giữ nguyên. Load More vẫn phân đoạn render.

Việc tải đầy đủ là chủ ý vì Mark Current và progress cần tập hoàn chỉnh; giới hạn size trang là 250 và số trang theo total. Cần đo network/CPU với deployment được phép và kiểm đổi filter/progress trong browser. Nếu quy mô catalog tăng đáng kể, cân nhắc endpoint riêng trả IDs và aggregate, giữ contract count form.
