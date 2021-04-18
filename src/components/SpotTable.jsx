import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "reactstrap";
import { getSpotsFromMotc } from "api/motc-spot.js";

export default class SpotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCity: this.props.city,
      skip: 0,
      spots: [],
      hasMore: true,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.city != state.lastCity) {
      return {
        lastCity: props.city,
        skip: 0,
      };
    }
    return null;
  }
  componentDidMount() {
    this.getSpots(this.props.city, this.state.skip);
  }

  render() {
    // this.getSpots(this.props.city, this.state.skip);
    let spotIdx = 0;
    let tableItems = this.state.spots.map((spot) => (
      <tr>
        <th scope="row">{spotIdx++}</th>
        <td>{spot.name}</td>
        <td>{spot.description}</td>
      </tr>
    ));

    return (
      <div className="container-fluid">
        <InfiniteScroll
          dataLength={this.state.spots.length}
          next={this.getSpots}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={600}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{tableItems}</tbody>
          </Table>
        </InfiniteScroll>
      </div>
    );
  }

  getSpots() {
    if (this.state.hasMore === false) return;
    this.setState(
      {
        skip: this.state.skip + 30,
      },
      () => {
        getSpotsFromMotc(this.props.city, this.state.skip - 30)
          .then((spots) => {
            const newSpots = [...this.state.spots, ...spots];
            this.setState({
              spots: newSpots,
            });
          })
          .catch((err) => {
            this.setState({ hasMore: false });
          });
      }
    );
  }
}
