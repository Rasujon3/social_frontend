import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/feed");
    }
  }, []);

  const submit = async () => {
    try {
      const res = await axios.post("/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/feed");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <img src="/assets/images/login.png" className="_left_img" />
            </div>

            <div className="col-xl-4">
              <div className="_social_login_content">
                <img src="/assets/images/logo.svg" className="_left_logo" />

                <p>Welcome back</p>
                <h4>Login to your account</h4>

                <form>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control _social_login_input"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control _social_login_input"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button type="button" className="_btn1" onClick={submit}>
                    Login now
                  </button>
                </form>

                <p>
                  Don't have account?{" "}
                  <a onClick={() => router.push("/register")}>Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
