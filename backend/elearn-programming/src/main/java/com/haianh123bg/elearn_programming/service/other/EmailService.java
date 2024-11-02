package com.haianh123bg.elearn_programming.service.other;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    // Đối tượng JavaMailSender để gửi email
    private final JavaMailSender mailSender;

    /**
     * Phương thức gửi email dạng văn bản đơn giản
     *
     * @param to:      địa chỉ email người nhận
     * @param subject: tiêu đề email
     * @param content: nội dung email
     */
    @Async // Annotation cho phép phương thức này chạy không đồng bộ
    public void sendSimpleMail(String to, String subject, String content) {
        // Tạo đối tượng email dạng văn bản đơn giản
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        // Gửi email
        mailSender.send(message);
    }

    /**
     * Phương thức gửi email dạng HTML
     *
     * @param to:      địa chỉ email người nhận
     * @param subject: tiêu đề email
     * @param html:    nội dung HTML của email
     * @throws MessagingException : ngoại lệ khi có lỗi xảy ra trong quá trình gửi email
     */
    @Async // Annotation cho phép phương thức này chạy không đồng bộ
    public void sendHtmlMail(String to, String subject, String html) throws MessagingException {
        // Tạo đối tượng MimeMessage cho email HTML
        MimeMessage message = mailSender.createMimeMessage();
        // Sử dụng MimeMessageHelper để cấu hình email
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true); // true để chỉ định nội dung là HTML
        // Gửi email
        mailSender.send(message);
    }

    /**
     * Tạo nội dung email xác thực với mã xác thực
     *
     * @param verificationCode: mã xác thực gửi cho người dùng
     * @return: chuỗi HTML định dạng email xác thực
     */
    public static String generateVerificationEmailContent(String verificationCode) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;}"
                + ".container {max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}"
                + ".header {background-color: #007bff; color: white; padding: 10px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;}"
                + ".content {margin: 20px; text-align: center;}"
                + ".content p {font-size: 16px; line-height: 1.5;}"
                + ".verification-code {font-size: 24px; font-weight: bold; color: #007bff; margin: 20px 0;}"
                + ".footer {background-color: #f1f1f1; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'><h1>Xác Thực Email</h1></div>"
                + "<div class='content'>"
                + "<p>Chào bạn,</p>"
                + "<p>Cảm ơn bạn đã đăng ký sử dụng dịch vụ của chúng tôi. Vui lòng sử dụng mã xác thực sau để hoàn tất quá trình đăng ký:</p>"
                + "<div class='verification-code'>" + verificationCode + "</div>"
                + "<p>Nếu bạn không yêu cầu xác thực này, xin vui lòng bỏ qua email này.</p>"
                + "</div>"
                + "<div class='footer'><p>Liên hệ với chúng tôi: support@example.com</p></div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

    public static String generateInvoiceEmailContent(String invoiceLink) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;}"
                + ".container {max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}"
                + ".header {background-color: #007bff; color: white; padding: 10px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;}"
                + ".content {margin: 20px; text-align: left; font-size: 16px; line-height: 1.5;}"
                + ".invoice-link {display: block; margin: 20px 0; padding: 10px 15px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px;}"
                + ".footer {background-color: #f1f1f1; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'><h1>Thông Báo Hóa Đơn</h1></div>"
                + "<div class='content'>"
                + "<p>Xin chào,</p>"
                + "<p>Chúng tôi xin thông báo rằng hóa đơn cho đơn hàng của bạn đã được phát hành. Vui lòng bấm vào đường dẫn dưới đây để xem và tải về hóa đơn:</p>"
                + "<a href='" + invoiceLink + "' class='invoice-link'>Xem Hóa Đơn</a>"
                + "<p>Nếu bạn có bất kỳ câu hỏi nào, xin đừng ngần ngại liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi.</p>"
                + "</div>"
                + "<div class='footer'><p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p></div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }


    /**
     * Tạo nội dung email yêu cầu đặt lại mật khẩu với mã đặt lại
     *
     * @param resetCode: mã đặt lại mật khẩu
     * @return: chuỗi HTML định dạng email đặt lại mật khẩu
     */
    public static String generatePasswordResetEmailContent(String resetCode) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;}"
                + ".container {max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}"
                + ".header {background-color: #dc3545; color: white; padding: 10px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;}"
                + ".content {margin: 20px; text-align: center;}"
                + ".content p {font-size: 16px; line-height: 1.5;}"
                + ".reset-code {font-size: 24px; font-weight: bold; color: #dc3545; margin: 20px 0;}"
                + ".footer {background-color: #f1f1f1; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'><h1>Yêu Cầu Đổi Mật Khẩu</h1></div>"
                + "<div class='content'>"
                + "<p>Chào bạn,</p>"
                + "<p>Chúng tôi nhận được yêu cầu đổi mật khẩu cho tài khoản của bạn. Vui lòng sử dụng mã code sau để đặt lại mật khẩu:</p>"
                + "<div class='reset-code'>" + resetCode + "</div>"
                + "<p>Nếu bạn không yêu cầu thay đổi mật khẩu, xin vui lòng bỏ qua email này.</p>"
                + "</div>"
                + "<div class='footer'><p>Liên hệ với chúng tôi: support@example.com</p></div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

    /**
     * Tạo nội dung email khi mật khẩu mới đã được cập nhật thành công
     *
     * @param newPassword: mật khẩu mới
     * @return: chuỗi HTML định dạng email thông báo mật khẩu mới
     */
    public static String generatePasswordResetSuccessEmailContent(String newPassword) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;} "
                + ".container {max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);} "
                + ".header {background-color: #28a745; color: white; padding: 10px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;} "
                + ".content {margin: 20px; text-align: center;} "
                + ".content p {font-size: 16px; line-height: 1.5;} "
                + ".new-password {font-size: 24px; font-weight: bold; color: #28a745; margin: 20px 0;} "
                + ".footer {background-color: #f1f1f1; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;} "
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'><h1>Mật Khẩu Mới Đã Được Cập Nhật</h1></div>"
                + "<div class='content'>"
                + "<p>Chào bạn,</p>"
                + "<p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu và mật khẩu mới đã được tạo thành công. Vui lòng sử dụng mật khẩu mới dưới đây để đăng nhập vào tài khoản của bạn:</p>"
                + "<div class='new-password'>" + newPassword + "</div>"
                + "<p>Chúng tôi khuyên bạn nên thay đổi mật khẩu ngay sau khi đăng nhập lần đầu để đảm bảo an toàn cho tài khoản của bạn.</p>"
                + "<p>Nếu bạn không yêu cầu thay đổi mật khẩu này, xin vui lòng liên hệ với bộ phận hỗ trợ ngay lập tức.</p>"
                + "</div>"
                + "<div class='footer'><p>Liên hệ với chúng tôi: support@example.com</p></div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

    /**
     * Tạo nội dung email chào mừng người dùng mới với thông tin người dùng
     *
     * @param userName:    tên người dùng
     * @param email:       email của người dùng
     * @param phoneNumber: số điện thoại của người dùng
     * @return: chuỗi HTML định dạng email chào mừng
     */
    public static String generateWelcomeEmailContent(String userName, String email, String phoneNumber) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;}"
                + ".container {max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}"
                + ".header {background-color: #28a745; color: white; padding: 10px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;}"
                + ".content {margin: 20px; text-align: center;}"
                + ".content p {font-size: 16px; line-height: 1.5;}"
                + ".user-info {font-size: 18px; font-weight: bold; color: #007bff;}"
                + ".footer {background-color: #f1f1f1; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<div class='header'><h1>Chào Mừng, " + userName + "!</h1></div>"
                + "<div class='content'>"
                + "<p>Chúng tôi rất vui khi bạn trở thành một phần của cộng đồng chúng tôi!</p>"
                + "<p>Dưới đây là thông tin liên hệ của bạn:</p>"
                + "<p class='user-info'>Email: " + email + "</p>"
                + "<p class='user-info'>Số điện thoại: " + phoneNumber + "</p>"
                + "<p>Nếu bạn có bất kỳ thắc mắc hoặc yêu cầu nào, xin vui lòng liên hệ với chúng tôi.</p>"
                + "</div>"
                + "<div class='footer'><p>Liên hệ với chúng tôi: support@example.com</p></div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}





