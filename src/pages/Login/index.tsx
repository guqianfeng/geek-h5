import styles from "./index.module.scss";
import { NavBar, Toast, Form, Input, List, Button } from "antd-mobile";
import { useHistory } from "react-router";
import { LoginForm } from "@/types/data";
import { useDispatch } from "react-redux";
import { login } from "@/store/actions/login";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const finishFn = async (values: LoginForm) => {
    await dispatch(login(values));
    Toast.show({
      content: "登录成功",
      duration: 1000,
      afterClose: () => {
        history.push("/home");
      },
    });
  };
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={finishFn}>
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
