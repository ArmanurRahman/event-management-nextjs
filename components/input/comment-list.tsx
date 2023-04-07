import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
    const { eventId } = props;
    const [commentData, setCommentData] = useState([]);
    useEffect(() => {
        fetch(`/api/comments/${eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setCommentData(data);
            });
    }, [eventId]);
    return (
        <ul className={classes.comments}>
            {/* Render list of comments - fetched from API */}
            {commentData.map((comment) => (
                <li key={comment._id}>
                    <p>{comment.text}</p>
                    <div>
                        By <address>{comment.name}</address>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
