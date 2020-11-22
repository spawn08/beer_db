import React, { Component } from "react";
import { Image, List, Segment } from "semantic-ui-react";

class BeerList extends Component {
  showBeerList = (beer_list, activePage) =>
    beer_list.length > 0 &&
    beer_list[activePage - 1].map((beer, index) => (
      <Segment key={index}>
        <List relaxed="very">
          <List.Item>
            <Image size="tiny" verticalAlign="middle" src={beer.image} />
            <List.Content verticalAlign="middle">
              <List.Header as="a">{beer.name}</List.Header>
              <List.Description>
                <a href="#">
                  <b>{beer.style}</b>
                </a>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    ));

  render() {
    const activePage = this.props.activePage;
    const beer_list = this.props.beer_list;
    return <div>{this.showBeerList(beer_list, activePage)}</div>;
  }
}

export default BeerList;
