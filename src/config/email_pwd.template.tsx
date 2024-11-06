import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  userFirstname?: string;
  url?: string;
  code?: string;
  urlRedirectWithCode?: string;
}

export const ResetPasswordEmail = ({
  userFirstname,
  code,
  url,
  urlRedirectWithCode,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraphTitle}>CHÀO MỪNG BẠN ĐẾN VỚI FASTFOOD</Text>
          <Text style={paragraph}>Xin chào {userFirstname},</Text>
          <Text style={paragraph}>
            Đây là email reset password của bạn. Bạn vui lòng nhập mã đặt lại
            mật khẩu sau đây:
          </Text>
          <Section style={btnContainer}>
            <Button style={buttonWithCode} href={url}>
              {code}
            </Button>
          </Section>
          <Text style={paragraph}>
            Ngoài ra bạn cũng có thể thay đổi trực tiếp mật khẩu của mình
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={urlRedirectWithCode}>
              Đổi mật khẩu
            </Button>
          </Section>
          <Text style={paragraph}>
            <strong style={{ color: '#47699d' }}>ADMIN FASTFOOD</strong> xin gửi
            lời cảm ơn đến bạn đã đăng ký tham gia
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Trân trọng, <br />
            <strong style={{ color: '#47699d' }}>ADMIN FASTFOOD</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  userFirstname: 'CustomAFK',
  code: '123456',
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
const paragraphTitle = {
  fontSize: '16px',
  lineHeight: '26px',
  fontWeight: 'bold' as const,
};

const btnContainer = {
  textAlign: 'center' as const,
};
const buttonWithCode = {
  backgroundColor: 'transparent',
  border: '1px solid #1977f3',
  fontSize: '16px',
  padding: '12px',
};

const button = {
  backgroundColor: '#1977f3',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  fontSize: '16px',
  lineHeight: '26px',
};
