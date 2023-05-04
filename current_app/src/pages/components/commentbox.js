import React, { useEffect, useState } from "react";
import { Button, TextField, Stack, Typography, InputAdornment } from "@mui/material";


export default function CommentBox({id, user}) {

    const [comment, setComment] = useState("");
    const [commentUser, setUser] = useState(user);
    const [hasComment, setFlag] = useState(false);

    useEffect(() => {
        fetch(`https://express-backend-vfm5.onrender.com/comment/${id.toString()}`)
        .then(res => res.json())
        .then((res) => {
            if (res !== null) {
                setComment(res.content);
                setUser(res.user);
                setFlag(true);
            } else {
                setFlag(false);
                setUser(user)
                setComment("");
            }
        })
    }, [user, id])

    const updateComment = () => {
        let commentBody = {
            id: parseInt(id),
            user: user,
            content: comment,
        }

        console.log(commentBody)

        if (hasComment) {
            console.log("update")
            fetch(`https://express-backend-vfm5.onrender.com/update_comment/${id.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentBody),
            })
        } else {
            fetch(`https://express-backend-vfm5.onrender.com/add_comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentBody),
            })
        }
        setFlag(true);
    }

    return (
        <Stack direction="row" spacing={1}>
            <TextField 
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography>{commentUser}</Typography>
                        </InputAdornment>
                    ),
                  }}
                size="small"
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button size="small" variant="outlined" onClick={() => updateComment()}>SEND</Button>
        </Stack>
    )
}