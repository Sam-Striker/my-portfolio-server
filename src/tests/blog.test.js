import path from "path";
import "dotenv/config";
import jwt from "jsonwebtoken";
import chai, { expect, should } from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";
import Post from "../modal/blogModal";
import Comment from "../modal/commentModal";
import server from "../index";
import mockdata from "./mockdata";

const { it, describe, beforeEach, afterEach } = mocha;

chai.should();

chai.use(chaiHttp);

const { JWT_SECRET } = process.env;

const token2 = jwt.sign(mockdata.loginUser, JWT_SECRET);

const testPost = {
  Author: "issa",
  Title: "this is awesome",
  Content: "bla bla bla bla",
};

describe("Api Endpoints", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  it("should create post", async () => {
    const res = await chai
      .request(server)
      .post("/api/v1/blog/create")
      .set("auth", `Bearer ${token2}`)
      .field("Author", testPost.Author)
      .field("Title", testPost.Title)
      .field("Content", testPost.Content)
      .attach("image", path.resolve(__dirname, "./uploads/test.png"));
    res.should.have.status(201);
  });

  it("should ask for Title of post", async () => {
    const res = await chai
      .request(server)
      .post("/api/v1/blog/create")
      .set("auth", `Bearer ${token2}`)
      .field("Author", testPost.Author)
      .field("Titlle", testPost.Title)
      .field("Content", testPost.Content)
      .attach("image", path.resolve(__dirname, "./uploads/test.png"));
    res.should.have.status(400);
  });

  it("Duplicate error", async () => {
    let res = await chai
      .request(server)
      .post("/api/v1/blog/create")
      .set("auth", `Bearer ${token2}`)
      .field("Author", testPost.Author)
      .field("Title", testPost.Title)
      .field("Content", testPost.Content)
      .attach("image", path.resolve(__dirname, "./uploads/test.png"));

    res = await chai
      .request(server)
      .post("/api/v1/blog/create")
      .set("auth", `Bearer ${token2}`)
      .field("Author", testPost.Author)
      .field("Title", testPost.Title)
      .field("Content", testPost.Content)
      .attach("image", path.resolve(__dirname, "./uploads/test.png"));
    res.should.have.status(400);
  });

  it("should get all Posts", async () => {
    const res = await chai.request(server).get("/api/v1/blog/getAll");

    res.should.have.status(200);
  });

  it("should get post by ID", async () => {
    const post = await Post.create(testPost);
    await post.save();

    const res = await chai
      .request(server)
      .get(`/api/v1/blog/getPost/${post.id}`);
  });

  it("should not get any post", async () => {
    const res = await chai.request(server).get("/api/v1/blog/test");

    res.should.have.status(404);
  });

  it("should not create a comment", async () => {
    const post = await Post.create(testPost);
    await post.save();

    const signUp = await chai
      .request(server)
      .post("/api/v1/user/register")
      .send(mockdata.signUpUser);

    const login = await chai
      .request(server)
      .post("/user/login")
      .send(mockdata.loginUser);

    const mockComment = {
      message: "wow nice post",
    };

    const comment = await Comment.create(mockComment);
    await comment.save();

    const res = await chai
      .request(server)
      .post(`/api/v1/blog/comment/${post._id}`)
      .send(mockComment);
    res.should.have.status(403);
  });

  it("should create a comment", async () => {
    const post = await Post.create(testPost);
    await post.save();
    const mockComment = {
      message: "wow nice post",
    };

    const comment = await Comment.create(mockComment);
    await comment.save();

    const res = await chai
      .request(server)
      .post(`/api/v1/blog/comment/${post._id}`)
      .send(mockComment)
      .set("auth", `Bearer ${token2}`);

    res.should.have.status(201);
  });

  it("should have invalid token", async () => {
    const post = await Post.create(testPost);
    await post.save();
    const mockComment = {
      message: "wow nice post",
    };

    const comment = await Comment.create(mockComment);
    await comment.save();

    const res = await chai
      .request(server)
      .post(`/api/v1/blog/comment/${post._id}`)
      .send(mockComment)
      .set("auth", `Bearer ${token2}ssd`);

    res.should.have.status(403);
  });

  it("should update a blog post", async () => {
    const post = await Post.create(testPost);
    await post.save();

    const res = await chai
      .request(server)
      .patch(`/api/v1/blog/update/${post._id}`)
      .set("auth", `Bearer ${token2}`)
      .send(testPost.Content);
    expect(res.status).to.be.equal(200);
  });

  it("should delete a post", async () => {
    const post = await Post.create(testPost);
    await post.save();

    const res = await chai
      .request(server)
      .delete(`/api/v1/blog/delete/${post._id}`)
      .set("auth", `Bearer ${token2}`);
  });

  it("should not delete a post", async () => {
    const post = await Post.create(testPost);
    await post.save();

    const res = await chai
      .request(server)
      .delete(`/api/v1/blog/delete/${post._id}`)
      .set("authorization", "invade");
  });

  it("should not found this route", async () => {
    const res = await chai
      .request(server)
      .post("/api/v2/query")
      .send(mockdata.query);
    res.should.have.status(404);
    res.body.should.have.property("msg");
  });
});
