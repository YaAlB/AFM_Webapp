import { useRef, useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "./authSlice";
import { useLoginMutation, useSignupMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const LoginSignup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoginLoading }] = useLoginMutation();
  const [signup, { isSignupLoading }] = useSignupMutation();

  let params = useParams();
  const { value } = params;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } =
        value === "login"
          ? await login({ email, password }).unwrap()
          : await signup({ email, username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      console.log(accessToken);
      setEmail("");
      value !== "login" && setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.status === 401) {
        setErrMsg(value === "login" ? "Unauthorized" : "User already exists");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (
    (value === "login" && isLoginLoading) ||
    (value === "signup" && isSignupLoading)
  )
    return <p>Loading...</p>;

  const content = (
    <section className="public loginSignupBg">
      <header>
        <h1>{value === "login" ? "Login" : "Sign Up"}</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form__input"
            type="text"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          {value !== "login" && (
            <>
              <label htmlFor="username">Username:</label>
              <input
                className="form__input"
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameInput}
                autoComplete="off"
                required
              />
            </>
          )}

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">
            {value === "login" ? "Sign In" : "Sign Up"}
          </button>

          <p htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </p>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};
export default LoginSignup;
