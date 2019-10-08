import React from "react";
import "./App.css";
import NewCommentInput from "./NewCommentInput";
import ShowComments from "./ShowComments";

class GetPokemonInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: {}, status: false };
    this.className = "elem-info";
  }


  getMethod = async () => {
    let new_response = await fetch(`/pokemon/${this.props.name}`)
    let data = await new_response.json();
    this.setState({ data: data.comments, status: true })
  }

  componentDidMount() {
    this.getMethod();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.name !== this.props.name) {
      this.getMethod();
    }
  }
  render() {
    if (this.state.status) {
      return (<ShowComments data={this.state.data} />_
        < FormContainer)
    }
    else return <></>
  }
}

export default GetPokemonInfo;
// console.log(this.state)
    // if (this.state.status) {
    //   return (
    //     <div className={this.className}>
    //       <p>Name: {this.state.data.name}</p>
    //       <p>Weight: {this.state.data.weight}</p>
    //       <p>Height: {this.state.data.height}</p>
    //       <p>BE: {this.state.data.base_experience}</p>
    //       <p><NewCommentInput user_id={this.state.data.id} /></p>
    //       <p>Comments: {this.state.data.comments}</p>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div className={this.className}>
    //       <p>Please Wait</p>
    //     </div>
    //   )
    // }