import React, { Component } from "react";
import axios from "axios";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      dish: [],
    };
  }

  componentDidMount() {
    this.dishDetails();
  }

  dishDetails = () => {
    axios
      .get(`http://localhost:4000/dishes/${this.state.slug}`)
      .then((res) => this.setState({ dish: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.dish);
    return (
      <div className="container  dish-details">
        <h3> {this.state.dish.dishname} Recipe</h3>
        <h5>Serving {this.state.dish.serving}</h5>
        <h5>Time to prepare the dish: {this.state.dish.time}</h5>
        <figure className="img-div">
          <img
            src={`http://localhost:4000/${this.state.dish.image}`}
            className="dish-image"
            alt={this.state.dish.dishname}
          />
          <figcaption className="img-caption">
            {this.state.dish.dishname}
          </figcaption>
        </figure>
        <section>
          <h4>Ingredients Required</h4>
          {this.state.dish.ingredients &&
            this.state.dish.ingredients.map((ingredient, index) => {
              return (
                <ul key={index}>
                  <li>{ingredient}</li>
                </ul>
              );
            })}
        </section>
        <hr />
        <section>
          <h4>Steps For Preparation of Dish</h4>
          {this.state.dish.steps &&
            this.state.dish.steps.map((step, index) => {
              return (
                <ul key={index}>
                  <li>{step}</li>
                </ul>
              );
            })}
        </section>
      </div>
    );
  }
}

export default Dish;
