import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "src/action";
import ConfigButton from "src/components/config-button";
// TODO: change game button name
import GameButton from "src/components/GameButton";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  // TODO: useDebounce to name and email maybe?

  const isAvailable = () => !(name && email);

  return (
    <div className="form-group">
      <div className="input-group mb-2">
        {/* TODO: reusable inputs */}
        <input
          name="name"
          value={name}
          type="text"
          placeholder="Name"
          data-testid="input-player-name"
          onChange={(e) => setName(e.target.value)}
          className="form-control mr-1"
        />
        <input
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control ml-1"
        />
      </div>
      <GameButton
        click={() => dispatch(addUser({ name, email }))}
        isAvailable={isAvailable()}
      />

      <ConfigButton />
    </div>
  );
};

export default Login;
