import Post from "../modal/blog";

class Blog {
  static async create(req, res, next) {
    try {
      const { Author, Title, Content } = req.body;
      const post = await Post.create({
        Author,
        Title,
        Content,
      });

      return res.status(201).json({ success: true, data: post });
    } catch (error) {
      console.log("errorrrrrrr", error);
      return res.status(400).json({ message: `${error.message}` });
    }
  }
}

export default Blog;
