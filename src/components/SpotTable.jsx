import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "reactstrap";
import { getSpotsFromMotc } from "api/motc-spot.js";

export default class SpotTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            spots: [],
            hasMore: true,
        };
        this.getSpots = this.getSpots.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.city != prevProps.city) {
            this.setState({ skip: 0 });
        }
    }

    componentDidMount() {
        this.getSpots(this.props.city, this.state.skip);
    }

    render() {
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
                    height={800}
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
            (prevState, props) => ({
                skip: prevState.skip + 30,
            }),
            () => {
                getSpotsFromMotc(this.props.city, this.state.skip)
                    .then((spots) => {
                        let nextSpots = [...this.state.spots, ...spots];
                        this.setState({
                            spots: nextSpots,
                        });
                    })
                    .catch((err) => {
                        this.setState({ hasMore: false });
                    });
            }
        );
    }
}
