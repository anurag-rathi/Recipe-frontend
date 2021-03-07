import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function RenderMenuItem({ dish }) {
  return (
    <div className="row">
      <Card style={{ background: "lightgray" }} className="box">
        <CardImg
          top
          width="100%"
          src={`http://localhost:4000/${dish.image}`}
          alt={dish.dishname}
        />
        <CardBody>
          <CardTitle tag="h5">{dish.dishname}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:4000/dishes")
      .then((res) => this.setState({ dishes: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    const menu = this.state.dishes.map((dish) => {
      return (
        <div key={dish._id} className="content ">
          <Link to={`/dish/${dish._id}`}>
            <RenderMenuItem dish={dish} />
          </Link>
        </div>
      );
    });
    return (
      <div className="container  app-content">
        <h3>Dishes</h3>
        <div className="grid">{menu}</div>
      </div>
    );
  }
}

export default Home;
