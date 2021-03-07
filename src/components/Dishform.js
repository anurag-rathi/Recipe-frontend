import React, { Component } from "react";
import axios from "axios";

import { Button, FormGroup, Input, Label } from "reactstrap";
import { history } from "react-router-dom";

class Dishform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishname: "",
      serving: "",
      time: "",
      image: null,
      ingredients: [],
      steps: [],
      author: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  addIngredient() {
    this.setState({ ingredients: [...this.state.ingredients, ""] });
  }

  handleIngredient(e, index) {
    this.state.ingredients[index] = e.target.value;

    this.setState({ ingredients: this.state.ingredients });
  }

  addStep() {
    this.setState({ steps: [...this.state.steps, ""] });
  }

  handleStep(e, index) {
    this.state.steps[index] = e.target.value;
    this.setState({ steps: this.state.steps });
  }

  ingredientRemove(index) {
    this.state.ingredients.splice(index, 1);
    this.setState({ ingredients: this.state.ingredients });
  }

  stepRemove(index) {
    this.state.steps.splice(index, 1);
    this.setState({ steps: this.state.steps });
  }

  handleSubmit() {
    var fd = new FormData();
    fd.append("dishname", this.state.dishname);
    fd.append("serving", this.state.serving);
    fd.append("time", this.state.time);
    fd.append("image", this.state.image);
    fd.append("ingredients", JSON.stringify(this.state.ingredients));
    fd.append("steps", JSON.stringify(this.state.steps));
    fd.append("author", this.state.author);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:4000/dishes", fd, config)
      .then((response) => {
        alert("The dish is successfully uploaded");
        window.location = "/";
      })
      .catch((error) => {});
  }

  render() {
    return (
      <div className="container content">
        <h3>Add Your Dish Here</h3>
        <div className="col-lg-8">
          <FormGroup>
            <Label htmlFor="dishname">Dish Name</Label>
            <Input
              type="text"
              id="dishname"
              name="dishname"
              value={this.state.dishname}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="serving">Serving</Label>
            <Input
              type="number"
              id="serving"
              name="serving"
              value={this.state.serving}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="time">Time to Cook</Label>
            <Input
              type="text"
              id="time"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Dish Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="ingredients">Ingredients</Label>
            {this.state.ingredients.map((ingredient, index) => {
              return (
                <div key={index} className="input-btn">
                  <Input
                    value={ingredient}
                    onChange={(e) => this.handleIngredient(e, index)}
                  />
                  <Button onClick={() => this.ingredientRemove(index)}>
                    Remove
                  </Button>
                </div>
              );
            })}
            <hr />
            <Button onClick={(e) => this.addIngredient(e)}>
              Add Ingredients
            </Button>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="preparation">Steps for Preparation</Label>
            {this.state.steps.map((step, index) => {
              return (
                <div key={index} className="input-btn">
                  <Input
                    value={step}
                    onChange={(e) => this.handleStep(e, index)}
                  />
                  <Button onClick={() => this.stepRemove(index)}>Remove</Button>
                </div>
              );
            })}
            <hr />
            <Button onClick={(e) => this.addStep(e)}>Add Steps</Button>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              value="submit"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Dishform;
