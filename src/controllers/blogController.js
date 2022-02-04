import PostModal from "../modal/blogModal";

class Blog {
  static async createBlog(req, res) {
    try {
      const { Author, Title, Content } = req.body;

      const blogPost = await PostModal.create({
        Author,
        Title,
        Content,
      });

      if (req.files) {
        const tmp = req.files.image.tempFilePath;
        const result = await uploader.upload(tmp, (_, result) => result);
        blogPost.imageUrl = result.url;
        blogPost.imageId = result.public_id;
        blogPost.save();

        return res.status(201).json({ success: true, data: blogPost });
      }
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  }

  static async readingBlogs(req, res) {
    try {
      const blogPosts = await PostModal.find();

      return res.status(200).json({ success: true, data: blogPosts });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: `${error.message}` });
    }
  }

  static async readingSingleBlog(req, res) {
    try {
      const singlePost = await PostModal.findById(req.params.id);

      return res.status(200).json({ success: true, data: singlePost });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: `${error.message}` });
    }
  }

  static async deletingBlog(req, res) {
    try {
      const deletedPost = await PostModal.deleteOne({ id: req.params.id });
      return res
        .status(200)
        .json({ success: true, msg: "successfully delete post" });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: `${error.message}` });
    }
  }

  static async updatingBlog(req, res) {
    try {
      const updatePost = await PostModal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({ success: true, data: updatePost });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: `${error.message}` });
    }
  }
}

export default Blog;