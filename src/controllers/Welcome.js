function hello(req, res) {
  return res.status(200).json({ message: "Welcome to my brand APi" });
}

export default hello;
