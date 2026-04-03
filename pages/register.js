import { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      const res = await axios.post("/register", form);
      localStorage.setItem("token", res.data.token);
      router.push("/feed");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <img src="/assets/images/registration.png" />
            </div>

            <div className="col-xl-4">
              <div className="_social_registration_content">
                <img src="/assets/images/logo.svg" />

                <h4>Registration</h4>

                <form>
                  <input
                    placeholder="First Name"
                    onChange={(e) =>
                      setForm({ ...form, first_name: e.target.value })
                    }
                    className="form-control"
                  />

                  <input
                    placeholder="Last Name"
                    onChange={(e) =>
                      setForm({ ...form, last_name: e.target.value })
                    }
                    className="form-control"
                  />

                  <input
                    placeholder="Email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="form-control"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="form-control"
                  />

                  <button type="button" onClick={submit} className="_btn1">
                    Register
                  </button>
                </form>

                <p>
                  Already have account?{" "}
                  <a onClick={() => router.push("/login")}>Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
