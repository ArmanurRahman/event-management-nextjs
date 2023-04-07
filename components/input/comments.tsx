import { useContext, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }
    const notificationCtx = useContext(NotificationContext);
    function addCommentHandler(commentData) {
        // send data to API
        const apiPath = `/api/comments/${eventId}`;

        notificationCtx.showNotification({
            title: "Posting",
            message: "Posting comment",
            status: "pending",
        });
        fetch(apiPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentData: commentData }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((data) => {
                    throw new Error(data.message || "something went wrong!");
                });
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: "Posted",
                    message: "Comment posted successfully",
                    status: "success",
                });
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: "Error!",
                    message: error.message,
                    status: "error",
                });
            });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? "Hide" : "Show"} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList eventId={eventId} />}
        </section>
    );
}

export default Comments;
