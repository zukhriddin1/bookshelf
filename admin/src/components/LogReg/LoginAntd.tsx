import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./registr.css";
import axiosAPI from "../api/axiosAPI";
import updateLocalUser from "../service/updateLocalUser";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async ({ name, password }: any) => {
    try {
      setLoading(true);
      const res = await axiosAPI.post("/user/login", {
        name,
        password,
      });
      updateLocalUser(res.data);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name?: string;
    password?: string;
  };

  return (
    <div className="registet">
      <div className="registet_senter">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Log In
            </Button>
            <Button type="default" style={{ marginLeft: "10px" }}>
              <Link to="/register">SIGIN UP</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Login;
