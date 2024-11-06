import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  userFirstname: string;
  url: string;
}

export const WelcomeEmail = ({
  userFirstname,
  url = '',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraphTitle}>
          [FASTFOOD] CHÀO MỪNG BẠN ĐẾN VỚI FASTFOOD
        </Text>

        <Text style={paragraph}>Xin chào {userFirstname},</Text>
        <Text style={paragraph}>
          Đây là email xác nhận đăng ký, vui lòng nhấn vào nút xác thưc bên dưới
          để tiếp tục.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Xác thực
          </Button>
        </Section>
        <Text style={paragraph}>
          <strong style={{ color: '#47699d' }}>FastFood</strong> xin gửi lời cảm
          ơn đến bạn đã đăng ký tham gia website
        </Text>
        <Text style={footer}>
          Trân trọng, <br />
          <strong style={{ color: '#47699d' }}>Admin FastFood</strong>
        </Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: 'Alan',
} as WelcomeEmailProps;

export default WelcomeEmail;

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

const button = {
  backgroundColor: '#f8a600',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const footer = {
  fontSize: '16px',
  lineHeight: '26px',
};
