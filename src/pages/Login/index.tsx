import styles from "./index.module.scss";
import { NavBar, Form, Input, List, Button } from "antd-mobile";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form>
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>

          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: "请输入验证码",
                },
                {
                  pattern: /\d{6}/,
                  message: "验证码格式错误",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>

          <Form.Item>
            <Button
              color="primary"
              className="login-submit"
              block
              type="submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
