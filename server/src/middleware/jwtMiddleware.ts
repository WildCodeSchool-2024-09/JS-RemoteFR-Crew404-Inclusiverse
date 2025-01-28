import jwt from "jsonwebtoken";

const createToken = () => {
  const token = jwt.sign({ foo: "bar" }, "shhhhh");
  console.info(token);
};

export default { createToken };
