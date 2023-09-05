import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const formData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/user/register",
        formData
      );

      if (response.data) {
        message.success("User created successfully!");
        console.log("Success:", response.data);

        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="registet">
      <div className="registet_senter">
        <Form onFinish={handleRegister}>
          <Form.Item label="Name">
            <Input
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              SIGIN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
