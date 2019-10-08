import React from "react";

class ShowComments extends React.Component {

    render() {
        console.log(this.props)
        return this.props.data.map((item, index) => (
            <div key={index}>
                <p>{item.name}</p>
                <p>{item.comment}</p>
                <p>{item.date}</p>
            </div>
        ))
    }
}

export default ShowComments;