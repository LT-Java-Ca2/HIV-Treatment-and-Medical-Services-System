// package com.hospital.config; // Đảm bảo package này đúng với cấu trúc dự án của bạn

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**") // Áp dụng CORS cho TẤT CẢ các đường dẫn API trong ứng dụng của bạn
//                 .allowedOrigins("http://localhost:3000") // Đặt chính xác URL của frontend React của bạn
//                 .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Cho phép các phương thức HTTP cần thiết
//                 .allowedHeaders("*") // Cho phép tất cả các header trong yêu cầu
//                 .allowCredentials(true); // Rất quan trọng nếu bạn sử dụng cookie, session, hoặc gửi header Authorization (như JWT)
//     }
// }