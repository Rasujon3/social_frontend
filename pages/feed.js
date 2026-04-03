// pages/feed.js
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

export default function Feed() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Post State
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posting, setPosting] = useState(false);

  // Comment State
  const [commentInputs, setCommentInputs] = useState({}); // postId => comment text
  const [replyInputs, setReplyInputs] = useState({}); // commentId => reply text

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== CREATE POST ====================
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setPosting(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("privacy", "public");
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts([res.data, ...posts]);
      setContent("");
      setImage(null);
      alert("পোস্ট সফলভাবে যোগ হয়েছে!");
    } catch (err) {
      console.error(err);
      alert("পোস্ট করতে সমস্যা হয়েছে!");
    } finally {
      setPosting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  // ==================== LIKE / UNLIKE ====================
  const toggleLike = async (postId) => {
    try {
      await axios.post("/like", { id: postId, type: "post" });

      // Refresh posts to update likes
      loadPosts();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  // ==================== ADD COMMENT ====================
  const handleAddComment = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    try {
      await axios.post("/comments", {
        post_id: postId,
        content: commentText,
      });

      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      loadPosts(); // Refresh to show new comment
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  // ==================== ADD REPLY ====================
  const handleAddReply = async (commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText?.trim()) return;

    try {
      await axios.post("/replies", {
        comment_id: commentId,
        content: replyText,
      });

      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      loadPosts();
    } catch (err) {
      console.error("Reply failed", err);
    }
  };

  return (
    <>
      <Head>
        <title>Buddy Script</title>
        <link rel="icon" href="/assets/images/logo-copy.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/common.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </Head>

      <div className="_layout _layout_main_wrapper">
        <Navbar />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>

              {/* Middle Feed */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    {/* ==================== CREATE POST SECTION ==================== */}
                    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                      <form onSubmit={handlePostSubmit}>
                        <div className="_feed_inner_text_area_box">
                          <div className="_feed_inner_text_area_box_image">
                            <img
                              src="/assets/images/txt_img.png"
                              alt="Profile"
                              className="_txt_img"
                            />
                          </div>
                          <div className="form-floating _feed_inner_text_area_box_form">
                            <textarea
                              className="form-control _textarea"
                              placeholder="Write something..."
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              required
                            />
                            <label className="_feed_textarea_label">
                              Write something ...
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="24"
                                fill="none"
                                viewBox="0 0 23 24"
                              >
                                <path
                                  fill="#666"
                                  d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z"
                                />
                              </svg>
                            </label>
                          </div>
                        </div>

                        {/* Desktop Buttons */}
                        <div className="_feed_inner_text_area_bottom">
                          <div className="_feed_inner_text_area_item">
                            <label
                              className="_feed_inner_text_area_bottom_photo _feed_common"
                              style={{ cursor: "pointer" }}
                            >
                              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill="#666"
                                    d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"
                                  />
                                </svg>
                              </span>
                              Photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                              />
                            </label>

                            {/* Video, Event, Article buttons (static) */}
                            <div className="_feed_inner_text_area_bottom_video _feed_common">
                              <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                              >
                                Video
                              </button>
                            </div>
                            <div className="_feed_inner_text_area_bottom_event _feed_common">
                              <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                              >
                                Event
                              </button>
                            </div>
                            <div className="_feed_inner_text_area_bottom_article _feed_common">
                              <button
                                type="button"
                                className="_feed_inner_text_area_bottom_photo_link"
                              >
                                Article
                              </button>
                            </div>
                          </div>

                          <div className="_feed_inner_text_area_btn">
                            <button
                              type="submit"
                              className="_feed_inner_text_area_btn_link"
                              disabled={posting || !content.trim()}
                            >
                              <svg
                                className="_mar_img"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="13"
                                fill="none"
                                viewBox="0 0 14 13"
                              >
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{posting ? "Posting..." : "Post"}</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* ==================== POSTS WITH REACTIONS & COMMENTS ==================== */}
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      posts.map((post) => (
                        <div
                          key={post.id}
                          className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16"
                        >
                          <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                            <div className="_feed_inner_timeline_post_box">
                              <img
                                src="/assets/images/post_img.png"
                                alt=""
                                className="_post_img"
                              />
                              <div>
                                <h4 className="_feed_inner_timeline_post_box_title">
                                  {post.user?.first_name} {post.user?.last_name}
                                </h4>
                                <p className="_feed_inner_timeline_post_box_para">
                                  Just now • Public
                                </p>
                              </div>
                            </div>

                            <h4 className="_feed_inner_timeline_post_title">
                              {post.content}
                            </h4>
                            {post.image && (
                              <div className="_feed_inner_timeline_image">
                                <img
                                  src={`https://socialapi.glamours-world.com/${post.image}`}
                                  alt="post"
                                  className="_time_img"
                                />
                              </div>
                            )}
                          </div>

                          {/* Likes & Comments Count */}
                          <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                            <div className="_feed_inner_timeline_total_reacts_image">
                              <img
                                src="/assets/images/react_img1.png"
                                alt=""
                                className="_react_img1"
                              />
                              <img
                                src="/assets/images/react_img2.png"
                                alt=""
                                className="_react_img"
                              />
                              <p className="_feed_inner_timeline_total_reacts_para">
                                {post.likes?.length || 0}+
                              </p>
                            </div>
                            <div className="_feed_inner_timeline_total_reacts_txt">
                              <p className="_feed_inner_timeline_total_reacts_para1">
                                <span>{post.comments?.length || 0}</span>{" "}
                                Comment
                              </p>
                              <p className="_feed_inner_timeline_total_reacts_para2">
                                <span>122</span> Share
                              </p>
                            </div>
                          </div>

                          {/* Reaction Buttons */}
                          <div className="_feed_inner_timeline_reaction">
                            <button
                              className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active"
                              onClick={() => toggleLike(post.id)}
                            >
                              <span className="_feed_inner_timeline_reaction_link">
                                Haha
                              </span>
                            </button>

                            <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
                              <span className="_feed_inner_timeline_reaction_link">
                                Comment
                              </span>
                            </button>

                            <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                              <span className="_feed_inner_timeline_reaction_link">
                                Share
                              </span>
                            </button>
                          </div>

                          {/* Comment Box */}
                          <div className="_feed_inner_timeline_cooment_area">
                            <div className="_feed_inner_comment_box">
                              <div className="_feed_inner_comment_box_content">
                                <div className="_feed_inner_comment_box_content_image">
                                  <img
                                    src="/assets/images/comment_img.png"
                                    alt=""
                                    className="_comment_img"
                                  />
                                </div>
                                <div className="_feed_inner_comment_box_content_txt">
                                  <textarea
                                    className="form-control _comment_textarea"
                                    placeholder="Write a comment..."
                                    value={commentInputs[post.id] || ""}
                                    onChange={(e) =>
                                      setCommentInputs((prev) => ({
                                        ...prev,
                                        [post.id]: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </div>
                              <button
                                className="_feed_inner_text_area_btn_link"
                                onClick={() => handleAddComment(post.id)}
                              >
                                Command
                              </button>
                            </div>
                          </div>

                          {/* Comments & Replies */}
                          <div className="_timline_comment_main">
                            {post.comments?.map((comment) => (
                              <div key={comment.id} className="_comment_main">
                                <div className="_comment_image">
                                  <img
                                    src="/assets/images/txt_img.png"
                                    alt=""
                                    className="_comment_img1"
                                  />
                                </div>
                                <div className="_comment_area">
                                  <div className="_comment_details">
                                    <h4 className="_comment_name_title">
                                      {post.user?.first_name}{" "}
                                      {post.user?.last_name}
                                    </h4>
                                    <p className="_comment_status_text">
                                      {comment.content}
                                    </p>

                                    {/* Show Replies */}
                                    {comment.replies &&
                                      comment.replies.length > 0 && (
                                        <div
                                          style={{
                                            marginLeft: "40px",
                                            marginTop: "10px",
                                          }}
                                        >
                                          {comment.replies.map((reply) => (
                                            <div
                                              key={reply.id}
                                              className="_comment_main"
                                              style={{ marginBottom: "8px" }}
                                            >
                                              <div className="_comment_image">
                                                <img
                                                  src="/assets/images/txt_img.png"
                                                  alt=""
                                                  className="_comment_img1"
                                                />
                                              </div>
                                              <div className="_comment_area">
                                                <p className="_comment_status_text">
                                                  <strong>Reply:</strong>{" "}
                                                  {reply.content}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                    <div className="_comment_reply">
                                      <textarea
                                        className="form-control _comment_textarea"
                                        placeholder="Reply..."
                                        value={replyInputs[comment.id] || ""}
                                        onChange={(e) =>
                                          setReplyInputs((prev) => ({
                                            ...prev,
                                            [comment.id]: e.target.value,
                                          }))
                                        }
                                      />
                                      <button
                                        className="_feed_inner_text_area_btn_link"
                                        onClick={() =>
                                          handleAddReply(comment.id)
                                        }
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
