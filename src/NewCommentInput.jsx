import React from "react";


class NewCommentInput extends React.Component {
    constructor(props) {
        super(props);
        this.link = "http://localhost:3001/comments/" + props.user_id;
    }

    render() {
        return (
            <form enctype="application/json" action={this.link} method="post">
                <input type="text" name="user" />
                <input type="text" name="id" type="hidden" value="0" />
                <input type="text" name="date" type="hidden" value="test" />
                <textarea name="comment" />
                <input type="submit" value="Submit" />
            </form>

        );
    }



}

export default NewCommentInput;