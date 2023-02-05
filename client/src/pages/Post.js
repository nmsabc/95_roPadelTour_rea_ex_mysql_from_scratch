import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [newCommentInPost, setNewCommentInPost] = useState("");
  const [newUsrForComment, setNewUsrForComment] = useState("");

  const commentToInsert = {
    commentBudy: newCommentInPost,
    username: newUsrForComment,
    PostId: id,
  };

  const addCommentInPost = () => {
    axios.post("http://localhost:3213/comments/", commentToInsert);
  };

  
  const deletePost = async (commentId) => {
    await new Promise(r => setTimeout(r, 500));
    axios.delete(`http://localhost:3213/comments/byId/${commentId}`).then((response) => {
    });
  };
  // This works very fine also. However the one above is simpler
  // const deletePost = async (commentId) => {
  //   const del_response = await fetch(
  //     `http://localhost:3213/comments/byId/${commentId}`,
  //     { method: "DELETE" }
  //   );
  //   del_response.ok &&
  //     setCommentsList(
  //       commentsList.filter((comment) => comment.id !== commentId)
  //     );
  // };

  useEffect(() => {
    axios.get(`http://localhost:3213/posts/byId/${id}`).then((response) => {
      // console.log(response);
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3213/comments/${id}`).then((response) => {
      // console.log(response);
      setCommentsList(response.data);
    });
  }, [commentsList]);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
        <div className="add-comment">
          <div className="add-comment">
            <div className="commentLabel">
              <label className="comment">Place your comment below</label>
            </div>
            <input
              className="form-textarea"
              name="commentBudy"
              type="text"
              placeholder="Your comment"
              onChange={(e) => {
                setNewCommentInPost(e.target.value);
              }}
            />
            <input
              className="text-input"
              name="username"
              type="text"
              placeholder="Your username"
              onChange={(e) => {
                setNewUsrForComment(e.target.value);
              }}
            />
            <button className="btn" onClick={addCommentInPost}>
              Komm!
            </button>
          </div>
        </div>
      </div>

      {/* comments section */}
      <div className="rightSide">
        <div className="addCommentContainer">
          {commentsList.map((value, key) => {
            return (
              <table className="table" key={key}>
                <tbody>
                  <tr key={key}>
                    <td>U: {value.username}:</td>
                    <td>{value.commentBudy}</td>
                    <td>
                      <span onClick={() => deletePost(value.id)}>Delete</span>
                    </td>
                    {/* <td><span onClick={() => null}>Delete</span></td> */}
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
